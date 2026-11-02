
const express = require('express');
const axios = require('axios');

const router = express.Router();

router.post('/crop-disease-check', async (req, res) => {
  try {
    const { crop, symptoms, imageBase64, mimeType } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: 'Gemini API key is not configured.'
      });
    }

    if (!imageBase64 || !mimeType) {
      return res.status(400).json({
        error: 'Please upload a crop image.'
      });
    }

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp'
    ];

    if (!allowedTypes.includes(mimeType)) {
      return res.status(400).json({
        error: 'Only JPG, PNG and WEBP images are supported.'
      });
    }

    const cleanBase64 = imageBase64.replace(
      /^data:image\/\w+;base64,/,
      ''
    );

    const prompt = `
You are an agricultural plant health assistant.

Analyze the uploaded crop image carefully.

Crop selected by user: ${crop || 'Not specified'}
Symptoms selected by user: ${
      Array.isArray(symptoms) ? symptoms.join(', ') : 'None'
    }

Please provide:
1. Visible observations from the image.
2. Possible disease or pest problems, if evidence supports them.
3. Confidence level: Low, Medium or High.
4. Recommended safe next steps.
5. Prevention advice.

Important:
- Do not claim certainty from an unclear image.
- If the image is unclear, say that a reliable identification is not possible.
- Do not recommend specific pesticide doses.
- Advise consulting a local agricultural expert or KVK before treatment.
- Distinguish visual observations from possible diagnoses.
`;

    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent',
      {
        contents: [
          {
            parts: [
              { text: prompt },
              {
                inline_data: {
                  mime_type: mimeType,
                  data: cleanBase64
                }
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 1000
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': process.env.GEMINI_API_KEY
        }
      }
    );

    const analysis =
      response.data.candidates?.[0]?.content?.parts
        ?.map(part => part.text || '')
        .join('\n')
        .trim();

    if (!analysis) {
      return res.status(502).json({
        error: 'AI could not analyze this image. Please try again.'
      });
    }

    res.json({
      success: true,
      analysis
    });

  } catch (error) {
    console.error(
      'Crop disease analysis error:',
      error.response?.data || error.message
    );

    res.status(500).json({
      error: 'Crop analysis failed. Please try again later.'
    });
  }
});

module.exports = router;
