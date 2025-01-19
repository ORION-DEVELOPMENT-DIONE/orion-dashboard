
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:9650/ext';

export const getValidatorStats = async (nodeID: string) => {
  const health = await axios.get(`${API_BASE_URL}/health`, { params: {nodeID: "NodeID-HBZJTeTJi1rin8vTWMnyFsRuMH186Lm5e"  , "method": "health.health"}});
  const readiness = await axios.get(`${API_BASE_URL}/health`, { params: { nodeID:"NodeID-HBZJTeTJi1rin8vTWMnyFsRuMH186Lm5e", "method": "health.readiness" }});
  //const liveness = await axios.get(`${API_BASE_URL}/liviness`, { params: { nodeID } });
  //const nodeInfo = await axios.get(`${API_BASE_URL}/nodeInfo`, { params: { nodeID } });
  const info = await axios.post(`${API_BASE_URL}/info/getNodeID`, { params: { method: "info.getNodeID" } });
  //const totalStake = await axios.get(`${API_BASE_URL}/totalStake`, { params: { nodeID } });
  //console.log(totalStake.data)

  return {
    health: health.data,
    readiness: readiness.data,
    info: info,
    //nodeInfo: nodeInfo.data,
    //currentValidator: currentValidator.data,
    //totalStake: totalStake.data.result.stake,
  };
};

export const fetchNodeInfo = async (nodeID: string) => {
  try {
    const API_URL = "https://testnode.dioneprotocol.com/ext/info"; // Use the correct API endpoint.

    // Fetch the node ID from the API
    const nodeIDResponse = await axios.post(API_URL, {
      jsonrpc: "2.0",
      id: 1,
      method: "info.getNodeID",
    });

    const fetchedNodeID = nodeIDResponse.data.result.nodeID;
    console.log(fetchedNodeID)
    // Compare the fetched Node ID with the provided one
    /*
    if (fetchedNodeID !== nodeID) {
      throw new Error(`Node ID mismatch. Fetched: ${fetchedNodeID}, Expected: ${nodeID}`);
    }*/

    // Fetch additional details if necessary (e.g., bootstrapped status)
    const bootstrappedResponse = await axios.post(API_URL, {
      jsonrpc: "2.0",
      id: 1,
      method: "info.isBootstrapped",
      params: {
        chain: "O", // Specify the chain: X, P, or C
      },
    });

    return {
      nodeID: nodeID,
      isBootstrapped: bootstrappedResponse.data.result.isBootstrapped,
    };
  } catch (error) {
    console.error("Error fetching node info:", error);
    throw new Error("Failed to fetch node info. Please check the API or configuration.");
  }
};


/*
import axios from "axios";

export const getValidatorStats = async (nodeID: string) => {
  try {
    // Define the base URL for the API
    const API_URL = 'https://api-testnet.odysseyscan.com/ext';

    // Make the requests using the correct JSON-RPC method
    const [livenessResponse, healthResponse] = await Promise.all([
      axios.post(API_URL, {
        jsonrpc: "2.0",
        id: 1,
        method: "health.liveness",
      }),
      axios.post(API_URL, {
        jsonrpc: "2.0",
        id: 1,
        method: "health.health",
        params: {
          tags: [
            "11111111111111111111111111111111LpoYY",
            "29uVeLPJB1eQJkzRemU8g8wZDw5uJRqpab5U2mX9euieVwiEbL",
          ],
        },
      }),
    ]);

    // Return the responses in a structured format
    return {
      liveness: livenessResponse.data,
      health: healthResponse.data,
    };
  } catch (error) {
    console.error("Error fetching validator stats:", error);
    throw new Error("Failed to fetch validator stats. Please check the node or configuration.");
  }
};
*/