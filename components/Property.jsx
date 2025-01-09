import Link from 'next/link';
import Image from 'next/image';
import { Box, Typography, Avatar, Grid2 } from '@mui/material';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';

import DefaultImage from '../assets/images/house.jpg';

const Property = ({ 
  property: { 
    coverPhoto, 
    price, 
    rentFrequency, 
    rooms, 
    title, 
    baths, 
    area, 
    agency, 
    isVerified, 
    externalID 
  } 
}) => (
  <Link href={`/property/${externalID}`} passHref>
    <Grid2 container sx={{ maxWidth: 390, p: 5, pt: 1, cursor: 'pointer' }} spacing={2}>
      <Box>
        <Image
          src={coverPhoto ? coverPhoto.url : DefaultImage}
          width={370}
          height={210}
          style={{ objectFit: 'cover', borderRadius: '12px' }}
          alt={title || 'Property Image'}
        />
      </Box>
      
      <Grid2 item xs={12}>
        <Box>
          <Grid2 container alignItems="center" justifyContent="space-between">
            <Grid2 item>
              <Box
                component="a"
                sx={{
                  textDecoration: 'underline',
                  textDecorationColor: '#f5f5f5',
                  color: '#2F85DF',
                  display: 'flex',
                  alignItems: 'center',
                  '&:hover': {
                    textDecorationColor: '#f5f5f5',
                  },
                }}
              >
                {isVerified && <GoVerified style={{ color: 'green', marginRight: 7 }} />}
                <Typography fontWeight="bold" fontSize="1.25rem" color="black">
                  AED {millify(price)} {rentFrequency && ` / ${rentFrequency}`}
                </Typography>
              </Box>
            </Grid2>
            
            <Grid2 item>
              <Avatar
                src={agency?.logo?.url}
                alt="Agency Logo"
                sx={{ width: 24, height: 24, objectFit: 'cover' }}
              />
            </Grid2>
          </Grid2>
        </Box>

        <Box
          component="a"
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: '#2F85DF',
            mt: 1,
            mb: 1,
            textDecoration: 'underline',
            textDecorationColor: '#f5f5f5',
            '&:hover': {
              textDecorationColor: '#f5f5f5',
            },
          }}
        >
          <Typography variant="body2">{rooms}</Typography>
          <FaBed style={{ margin: '0 10px' }} />
          |
          <Typography variant="body2" sx={{ margin: '0 8px' }}>
            {baths}
          </Typography>
          <FaBath style={{ margin: '0 8px' }} />
          |
          <Typography variant="body2" sx={{ margin: '0 10px' }}>
            {millify(area)} sqft
          </Typography>
          <BsGridFill />
        </Box>

        <Typography
          variant="body1"
          color="black"
          component="a"
          sx={{
            textDecoration: 'underline',
            textDecorationColor: '#f5f5f5',
            color: 'black',
            '&:hover': {
              textDecorationColor: '#f5f5f5',
            },
          }}
        >
          {title.length > 30 ? title.substring(0, 30) + '...' : title}
        </Typography>
      </Grid2>
    </Grid2>
  </Link>
);

export default Property;
