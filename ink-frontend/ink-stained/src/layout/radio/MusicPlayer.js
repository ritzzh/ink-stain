import React, { useState, useRef, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import { PlayArrow, Pause, MusicNote } from '@mui/icons-material';
import musicFile from '../../assets/tum.mp3'; // Local music file

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(
    JSON.parse(localStorage.getItem('isPlaying')) || false // Default: not playing
  );
  const [isUsingFallback, setIsUsingFallback] = useState(false); // State to track if fallback is being used
  const playerRef = useRef(null);
  const audioRef = useRef(null);

  const currentVideo = 'C7WoqglcHDo'; // Default YouTube video ID

  // Load the YouTube iframe API
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.youtube.com/iframe_api";
    script.onload = () => {
      window.onYouTubeIframeAPIReady = () => {
        playerRef.current = new window.YT.Player('player', {
          height: '0',  // Hide video
          width: '0',   // Hide video
          videoId: currentVideo,
          playerVars: {
            autoplay: 1, // Start playing as soon as it's ready
            controls: 0, // No controls
            modestbranding: 1, // Minimize branding
            loop: 1, // Loop video
            mute: 0, // Unmute audio
          },
          events: {
            onError: (e) => {
              console.error('YouTube Error:', e);
              // If an error occurs (e.g., video cannot be played), switch to local audio
              setIsUsingFallback(true);
            },
          },
        });

        // Auto-play on load if previously playing
        if (isPlaying) {
          playerRef.current.playVideo();
        }
      };
    };
    document.body.appendChild(script);

    // Cleanup YouTube API script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, [currentVideo, isPlaying]);

  // Initialize the local audio player if fallback is used
  useEffect(() => {
    if (isUsingFallback) {
      audioRef.current = new Audio(musicFile);
      audioRef.current.loop = true; // Enable looping
      if (isPlaying) {
        audioRef.current.play().catch((err) => console.error('Playback Error:', err.message));
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = ''; // Cleanup
      }
    };
  }, [isUsingFallback, isPlaying]);

  // Handle Play/Pause
  const togglePlayPause = () => {
    if (isUsingFallback) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) => console.error('Playback Error:', err.message));
      }
    } else {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    }
    setIsPlaying(!isPlaying);

    // Save state in localStorage
    localStorage.setItem('isPlaying', JSON.stringify(!isPlaying));
  };

  return (
    <Box position="absolute" top={64} left={12} zIndex={1000}>
      {/* Play/Pause Button */}
      <IconButton
        color="primary"
        onClick={togglePlayPause}
        sx={{
          width: 40,
          height: 40,
          backgroundColor: 'white',
          boxShadow: 3,
          '&:hover': { backgroundColor: '#f1f1f1' },
        }}
      >
        {isPlaying ? <Pause fontSize="large" /> : <PlayArrow fontSize="large" />}
      </IconButton>

      {/* Hidden YouTube Player */}
      {!isUsingFallback && <div id="player" style={{ display: 'none' }}></div>} {/* Hide video */}
    </Box>
  );
};

export default MusicPlayer;
