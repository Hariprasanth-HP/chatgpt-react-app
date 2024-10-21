import axiosInstance from './axios';

export const generateContent = async (prompt,accessToken) => {
  console.log('test',JSON.stringify({
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
  }));
  
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
          Authorization:`Bearer ${accessToken}`,
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
