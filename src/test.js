import { buildAndExportTx } from "./services/buildExportTx.ts";

const testExportTransaction = async () => {
  try {
    const privateKey = "fcc3f0b0e8a622b50ff969c4f4f12f572c77b1b03429441df3b9c2617d126470";
    const dHexAddress = "0x26e7CDeb1Eb11C18Fa760dc27C0Aab7653258612"; // Replace with actual address
    const dioneAmount = "20000000000"; // Replace with actual amount

    const txid = await buildAndExportTx({ privateKey, dHexAddress, dioneAmount });
    console.log(`Test successful! TXID: ${txid}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Test failed:", error.message);
    } else {
      console.error("Test failed:", error);
    }
  }
};

testExportTransaction();
