import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// POST /api/ai
router.post('/', async (req, res) => {
  const { query, role } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Gemini API key not set in environment.' });
  }

  try {
    // Example Gemini API endpoint (update if needed)
    const geminiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + apiKey;
    // SYSTEM PROMPT + EXAMPLES
    const systemPrompt = `
You are FloatChat, an AI assistant for ocean data exploration. 
You answer questions about ARGO float data, ocean temperatures, salinity, float trajectories, and more.
Always provide:
- A clear, scientific answer.
- Data provenance (float ID, region, points, range).
- Available visualizations (Temperature-Depth Profile, Float Trajectory, Temperature Time Series).
If you don’t have real data, generate plausible but clearly marked “AI Generated” mock data.

Example:
Q: Show me salinity profiles near the equator in March 2023
A:
Float trajectory analysis from Indian Ocean (-12.3°, 45.6°) shows seasonal migration patterns. The temperature-depth relationship indicates deep water mass characteristics.

Data Provenance
Source: ARGO Float Network (AI Generated)
Points: 1673
Range: 2024-08 to 2025-09
Float ID: ARGO_2901234  (-12.3°, 45.6°)

Available Visualizations
Temperature-Depth Profile | Float Trajectory | Temperature Time Series

---
Now answer the following user question in the same format:
`;

    const fullPrompt = `${systemPrompt}\nQ: ${query}\nA:`;
    const geminiBody = {
      contents: [{ parts: [{ text: fullPrompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 512 },
      safetySettings: []
    };
    console.log('🤖 Sending request to Gemini API...');
    const geminiRes = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiBody)
    });
    
    console.log('📊 Gemini API Status:', geminiRes.status);
    if (!geminiRes.ok) {
      const errorText = await geminiRes.text();
      console.error('❌ Gemini API Error:', errorText);
      throw new Error(`Gemini API returned ${geminiRes.status}: ${errorText}`);
    }
    const geminiData = await geminiRes.json();
    const content = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini.';
    // Try to parse Gemini's answer for provenance and visualizations, fallback to old mock if not found
    // (For production, use a more robust parser or structured output from Gemini)
    let metadata = null;
    try {
      // Simple regex-based extraction for demo
      const floatIdMatch = content.match(/Float ID:\s*([\w_\-]+)\s*\(([^)]+)\)/);
      const pointsMatch = content.match(/Points:\s*(\d+)/);
      const rangeMatch = content.match(/Range:\s*([\d\-]+ to [\d\-]+)/);
      const sourceMatch = content.match(/Source:\s*([\w\s\(\)]+)/);
      const regionMatch = content.match(/from ([\w\s\-]+) \(([-\d\.]+)°, ([-\d\.]+)°\)/);
      metadata = {
        floatId: floatIdMatch ? floatIdMatch[1] : undefined,
        timestamp: new Date().toISOString(),
        location: floatIdMatch ? {
          lat: floatIdMatch[2].split(',')[0],
          lon: floatIdMatch[2].split(',')[1]
        } : undefined,
        visualizations: [
          { type: 'plot', title: 'Temperature-Depth Profile', description: 'Vertical temperature distribution' },
          { type: 'map', title: 'Float Trajectory', description: regionMatch ? `Geographic path in ${regionMatch[1]}` : 'Float trajectory' },
          { type: 'timeseries', title: 'Temperature Time Series', description: 'Temperature variation over time' }
        ],
        provenance: {
          source: sourceMatch ? sourceMatch[1] : 'ARGO Float Network (AI Generated)',
          dataPoints: pointsMatch ? parseInt(pointsMatch[1]) : undefined,
          timeRange: rangeMatch ? rangeMatch[1] : undefined
        }
      };
    } catch (e) {
      metadata = undefined;
    }
    res.json({ content, metadata });
  } catch (err) {
    console.error('🚨 API Error:', err.message);
    res.status(500).json({ 
      error: 'Failed to fetch from Gemini API.',
      details: err.message,
      hasApiKey: !!apiKey
    });
  }
});

export default router;
