import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box 
    sx={{
      textAlign: 'center',
      p: 2,
      color: 'gray.600',
      borderTop: '1px solid',
      borderColor: 'gray.100',
    }}
  >
    <Typography variant="body2" color="textSecondary">
      © 2021 Realtor, Inc.
    </Typography>
  </Box>
);

export default Footer;
