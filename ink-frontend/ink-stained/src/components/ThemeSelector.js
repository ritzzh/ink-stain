import React, { useState } from 'react';
import { IconButton, Box, Tooltip } from '@mui/material';
import { useDispatch } from 'react-redux';
import PaletteIcon from '@mui/icons-material/Palette';
import { setTheme } from '../features/theme/themeSlice';

const themes = [
  { id: 1, color: '#FFFFFF' },
  { id: 2, color: '#33FF57' },
  { id: 3, color: '#3357FF' },
  { id: 4, color: '#F7DC6F' },
  { id: 5, color: '#8E44AD' },
  { id: 6, color: '#E74C3C' },
  { id: 7, color: '#2ECC71' },
];

const ThemeSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleThemeChange = (color) => {
    dispatch(setTheme(color));
  };

  return (
    <Box position="absolute" top={16} left={12} zIndex={1000}>
      <Tooltip title="Select Theme" arrow>
        <IconButton
          color="primary"
          onClick={() => setIsOpen(!isOpen)}
          sx={{ backgroundColor: 'white', boxShadow: 3 }}
        >
          <PaletteIcon />
        </IconButton>
      </Tooltip>
      {isOpen && (
        <Box
          display="flex"
          gap={2}
          mt={1}
          p={1}
          sx={{
            backgroundColor: 'white',
            borderRadius: 1,
            boxShadow: 3,
            alignItems: 'center',
          }}
        >
          {themes.map((theme) => (
            <IconButton
              key={theme.id}
              sx={{
                backgroundColor: theme.color,
                border: '1px solid white',
                '&:hover': { boxShadow: 3 },
                border: '.5px solid black'
              }}
              onClick={() => handleThemeChange(theme.color)}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ThemeSelector;
