import axios from 'axios';

const GEMINI_API_URL = 'https://chatgpt-server-1qs2.onrender.com/api/generate';
export const generateContent = async (prompt) => {
  try {
    const response = await axios.post(
      `${GEMINI_API_URL}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.candidates[0]; 
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return null;
  }
};
