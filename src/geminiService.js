import axiosInstance from './axios';

export const generateContent = async (prompt) => {
  try {
    const response = await axiosInstance.post('/api/generate',
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
