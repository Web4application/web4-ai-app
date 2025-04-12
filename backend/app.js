const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// AI Interaction Function
const runAIModel = async (userInput) => {
  const data = {
    dataPrompt: {
      preamble: "Provides accurate information and answers queries across a wide range of topics...",
      columns: [
        { columnId: "path_name", displayName: "Path Name", isInput: true },
        { columnId: "output", displayName: "Output" },
      ],
      rows: [
        { columnBindings: { "output": "Browser Compatibility", "path_name": "Browser path" }, rowId: "row1" },
        // More rows as needed...
      ],
    },
    runSettings: {
      temperature: 1.0,
      model: "models/gemini-1.5-flash",
      candidateCount: 1,
      topP: 0.95,
      maxOutputTokens: 8192,
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        // More safety categories...
      ],
      responseMimeType: "text/plain",
    },
  };

  try {
    // Replace with the actual AI model API URL
    const response = await axios.post('YOUR_AI_MODEL_URL', data, {
      headers: { 'Authorization': 'Bearer YOUR_API_KEY' },
    });
    return response.data;
  } catch (error) {
    console.error('Error interacting with the AI model:', error);
    throw error;
  }
};

// Define the route to handle user queries
app.post('/api/query', async (req, res) => {
  try {
    const userQuery = req.body.query;  // User input from the frontend
    const aiResponse = await runAIModel(userQuery);
    res.json(aiResponse);
  } catch (error) {
    res.status(500).send('Failed to interact with AI model');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
