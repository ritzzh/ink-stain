import React, { useState, useEffect, useContext } from 'react';
import { Box, TextField, Button, Typography, IconButton, Stack, Avatar } from '@mui/material';
import { Send as SendIcon, Mic as MicIcon, Image as ImageIcon, NightsStay as NightsStayIcon } from '@mui/icons-material';
import { SocketContext } from '../../../utils/SocketContext'; // Import Socket Context
import { useSelector } from 'react-redux';

function ChatBox() {
  const { user, loading: userLoading } = useSelector((state) => state.auth);
  const socket = useContext(SocketContext); // Use Socket Context
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Join Room on mount
  useEffect(() => {
    const roomID = [user.username, user.partner].sort().join('_');
    socket.emit('joinRoom', { user1: user.username, user2: user.partner});

    socket.on('receiveMessage', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [socket, user.username, user.partner]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        sender: user.username,
        receiver: user.partner,
        message: newMessage,
        type: 'text',
      };
      // Emit message to the server
      socket.emit('sendMessage', message);
      setNewMessage(''); // Clear input
    }
  };  

  return (
    <Box
      sx={{
        width: '100%',
        maxHeight: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 1,
        background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        borderRadius: 2,
        boxShadow: 3,
        color: '#2c2c54',
      }}
    >
      {/* Chat Header */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          width: '100%',
          padding: 2,
          borderRadius: 2,
          backgroundColor: '#ffe4e1',
          boxShadow: 2,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ bgcolor: '#ffe4e1', color: '#2c2c54', fontSize: '1.2rem', fontWeight: 'bold' }}>
            {user.partner[0]}
          </Avatar>
          <Typography variant="h6" component="div" sx={{ fontFamily: "'Dancing Script', cursive" }}>
            {user.partner}
          </Typography>
        </Stack>
        <IconButton color="primary">
          <NightsStayIcon />
        </IconButton>
      </Stack>

      {/* Chat Messages */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'scroll',
          marginTop: 1,
          padding: 2,
          backgroundColor: '#fff8f5',
          borderRadius: 2,
          boxShadow: 3,
          width: '100%',
          height: '80%'
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: msg.sender === user.username ? 'flex-end' : 'flex-start',
              marginBottom: 2,
            }}
          >
            <Typography
              sx={{
                padding: 1,
                backgroundColor: msg.sender === user.username ? '#ffb3ba' : '#d5d5f7',
                color: '#2c2c54',
                borderRadius: 2,
                maxWidth: '70%',
              }}
            >
              {msg.message}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Chat Input */}
      <Stack direction="row" spacing={1} marginTop={1} alignItems="center" sx={{ width: '100%' }}>
        <TextField
          fullWidth
          placeholder="Whisper your words..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          sx={{
            backgroundColor: '#fff',
            borderRadius: 2,
            boxShadow: 1,
          }}
        />
        <IconButton color="secondary">
          <ImageIcon />
        </IconButton>
        <IconButton color="secondary">
          <MicIcon />
        </IconButton>
        <Button
          variant="contained"
          color="secondary"
          endIcon={<SendIcon />}
          onClick={sendMessage}
          sx={{
            borderRadius: 2,
            padding: '10px 20px',
            background: 'linear-gradient(135deg, #ff9a9e, #fad0c4)',
            color: '#fff',
            fontWeight: 'bold',
          }}
        >
          Send
        </Button>
      </Stack>
    </Box>
  );
}

export default ChatBox;
