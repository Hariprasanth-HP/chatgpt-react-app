import React, { useState } from 'react';
import { Button, TextField, Box, Paper, Typography, Container, Grid, AppBar } from '@mui/material';
import { generateContent } from './geminiService'; 

const ContentGenerator = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]); 
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!inputText.trim()) return;

    const userMessage = { text: inputText, sender: 'user' };
    setMessages([...messages, userMessage]); 

    setLoading(true);
    const content = await generateContent(inputText);
    if (content) {
      const botMessage = { text: content.content.parts[0].text ||'', sender: 'bot' }; 
      setMessages((prevMessages) => [...prevMessages, botMessage]); 
    }
    setLoading(false);
    setInputText(''); 
  };

  return (
    <Container  style={{ height: '100vh', display: 'flex',width:'100%', flexDirection: 'column', justifyContent: 'center' }}>
       <AppBar position="static">
        <Typography variant="h6" style={{ padding: '10px', color: '#fff' }}>
          ChatGPT 
        </Typography>
      </AppBar>
      <Paper elevation={3} style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px', borderRadius: '8px' }}>
        <Box flex={1} overflow="auto" style={{ marginBottom: '16px', paddingRight: '10px', paddingLeft: '10px' }}>
          {messages.map((message, index) => (
            <Box key={index} style={{ marginBottom: '10px', textAlign: message.sender === 'user' ? 'right' : 'left' }}>
              <Typography
                variant="body1"
                style={{
                  backgroundColor: message.sender === 'user' ? '#d1f0ff' : '#f1f1f1',
                  borderRadius: '8px',
                  padding: '8px',
                  display: 'inline-block',
                  maxWidth: '80%',
                  wordWrap: 'break-word',
                }}
              >
                {message.text}
              </Typography>
            </Box>
          ))}
          {loading && (
            <Typography variant="body1" style={{ textAlign: 'left', marginTop: '10px' }}>
              Generating...
            </Typography>
          )}
        </Box>
        <TextField
          fullWidth
          multiline
          rows={2}
          variant="outlined"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message here..."
          style={{ marginBottom: '10px' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerate}
          disabled={loading || !inputText.trim()}
        >
          {loading ? 'Generating...' : 'Send'}
        </Button>
      </Paper>
    </Container>
  );
};

export default ContentGenerator;
