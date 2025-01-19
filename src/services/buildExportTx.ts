import "dotenv/config";
import OdysseyCore from '../dist/index.js';
import Web3 from "web3";
import { OmegaVMAPI } from "../dist/apis/omegavm";
import { costExportTx } from "../dist/utils";
import { DELTAAPI } from "../dist/apis/delta";
import {BN} from "bn.js"; // Correctly import BN from bn.js
export const buildAndExportTx: (params: { privateKey: string; dHexAddress: string; dioneAmount: string; }) => Promise<string> = async ({
  privateKey,
  dHexAddress,
  dioneAmount
}: {
  privateKey: string;
  dHexAddress: string;
  dioneAmount: string;
}): Promise<string> => {
  try {
    // Hardcoded parameters
    const ip = process.env.IP;
    console.log(ip)
    const port = Number(process.env.PORT);
    const protocol = process.env.PROTOCOL;
    const networkID = Number(process.env.NETWORK_ID);
    if (!networkID) {
      throw new Error("NETWORK_ID is not defined in environment variables");
    }
    if (!port) {
      throw new Error("port is not defined in environment variables");
    }
    
    const dioneAssetID = "BUuypiq2wyuLMvyhzFXcPyxPMCgSp7eeDohhQRqTChoBjKziC";
    const omegaChainBlockchainID = "11111111111111111111111111111111LpoYY";

    // Initialize Odyssey and APIs
    const odyssey: OdysseyCore = new OdysseyCore(ip, port, protocol);
    odyssey.setNetworkID(networkID);
    const ochain: OmegaVMAPI = odyssey.api("OChain");
    const dchain: DELTAAPI = odyssey.api("DChain");

    // Import the private key
    const privKey: Buffer = Buffer.from(privateKey, "hex");
    const oKeychain: any = ochain.keyChain();
    const dKeychain: any = dchain.keyChain();
    oKeychain.importKey(privKey);
    dKeychain.importKey(privKey);

    // Set up Web3 connection for Delta chain
    const path: string = "/ext/bc/D/rpc";
    const web3: any = new Web3(`${protocol}://${ip}${path}`);

    // Prepare addresses and parameters
    const oAddressStrings: string[] = ochain.keyChain().getAddressStrings();
    const dAddressStrings: string[] = [dHexAddress];
    const dioneBNAmount: any = new BN(dioneAmount);
    const locktime: any = new BN(0);
    const threshold: number = 1;

    // Fetch base fee and transaction nonce
    const baseFeeResponse: string = await dchain.getBaseFee();
    const baseFee = new BN(parseInt(baseFeeResponse, 16));
    const txcount = await web3.eth.getTransactionCount(dHexAddress);
    const nonce: number = Number(txcount);
    let fee: any = baseFee.div(new BN(1e9));
    fee = fee.add(new BN(1));

    // Build the Export transaction
    let unsignedTx: any = await dchain.buildExportTx(
      dioneBNAmount,
      dioneAssetID,
      omegaChainBlockchainID,
      dHexAddress,
      dAddressStrings[0],
      oAddressStrings,
      nonce,
      locktime,
      threshold,
      fee
    );

    // Adjust the fee based on export cost
    const exportCost: number = costExportTx(unsignedTx);
    fee = fee.mul(new BN(exportCost));

    // Rebuild the transaction with updated fee
    unsignedTx = await dchain.buildExportTx(
      dioneBNAmount,
      dioneAssetID,
      omegaChainBlockchainID,
      dHexAddress,
      dAddressStrings[0],
      oAddressStrings,
      nonce,
      locktime,
      threshold,
      fee
    );

    // Sign and issue the transaction
    const tx: any = unsignedTx.sign(dKeychain);
    const txid: string = await dchain.issueTx(tx);
    return txid;
  } catch (error) {
    console.error("Error while building or issuing Export transaction:", error);
    throw error;
  }
};