import React, { useState } from 'react';
import {
    Box,
    Button,
    Textarea,
    VStack,
    HStack,
    Text,
    Heading,
    Flex,
    Spinner,
    useColorModeValue,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Avatar,
    IconButton,
} from '@chakra-ui/react';
import { generateContent } from './geminiService';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './store/auth/action';

const ContentGenerator = () => {
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user='C' } = useSelector(state => state.user)
    const accessToken =  localStorage.getItem('accessToken');

    const userInitial = 'C'; // Replace with the actual user's first letter (e.g., from their name or username)

    const handleGenerate = async () => {
        if (!inputText.trim()&&accessToken!=='') return;

        const userMessage = { text: inputText, sender: 'user' };
        setMessages([...messages, userMessage]);

        setLoading(true);
        const content = await generateContent(inputText,accessToken);
        if (content) {
            const botMessage = { text: content.content.parts[0].text || '', sender: 'bot' };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        }
        setLoading(false);
        setInputText('');
    };

    const bgUser = useColorModeValue('#d1f0ff', '#90cdf4');
    const bgBot = useColorModeValue('#f1f1f1', '#e2e8f0');
    const dispatch = useDispatch()
    return (
        <Box w="100vw" h="100vh" p={4} display="flex" flexDirection="column">
            <Flex as="header" bg="teal.500" color="white" p={4} alignItems="center" justifyContent="space-between">
                <Heading size="lg">ChatGPT</Heading>
                <Menu>
                    <MenuButton as={IconButton} aria-label="Options" icon={<Avatar name={userInitial} size="sm" />} />
                    <MenuList color={'black'}>
                        <MenuItem>Settings</MenuItem>
                        <MenuItem onClick={() => {
                            dispatch(logout())
                        }}>Logout</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>

            <Box flex="1" borderWidth="1px" borderRadius="md" p={4} overflowY="auto" bg="white" my={4}>
                <VStack spacing={4}>
                    {messages.map((message, index) => (
                        <HStack key={index} w="full" justify={message.sender === 'user' ? 'flex-end' : 'flex-start'}>
                            <Box
                                bg={message.sender === 'user' ? bgUser : bgBot}
                                borderRadius="md"
                                p={3}
                                maxW="80%"
                                wordBreak="break-word"
                            >
                                <Text>{message.text}</Text>
                            </Box>
                        </HStack>
                    ))}
                    {loading && (
                        <Box>
                            <Spinner />
                            <Text>Generating...</Text>
                        </Box>
                    )}
                </VStack>
            </Box>

            <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message here..."
                rows={2}
                mb={4}
            />
            <Button colorScheme="teal" onClick={handleGenerate} isDisabled={loading || !inputText.trim()} isLoading={loading}>
                {loading ? 'Generating...' : 'Send'}
            </Button>
        </Box>
    );
};

export default ContentGenerator;
