const express = require("express");
const axios = require("axios");
const cache = require("./routeCache/routeCache");

const app = express();
const port = 3003;
const token = "73d62591af4b3ccb51986ff5f8af5676";


// Define the API endpoint you want to proxy
const apiEndpoint = `https://rest.entitysport.com/v2/matches?token=${token}`;

// Apply the middleware to the specific route
app.use("/matches", cache(60));

// Set up a route to proxy requests
app.get("/matches", async (req, res) => {
  try {
    // Extract query parameters from the client request
    const queryParams = req.query;

    // Make a request to the API endpoint with the extracted query parameters
    const apiResponse = await axios.get(apiEndpoint, { params: queryParams });

    // Send the API response to the client
    res.json(apiResponse.data);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Proxy server is running at http://localhost:${port}`);
});