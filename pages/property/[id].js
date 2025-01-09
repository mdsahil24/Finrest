import { Box, Grid2, Typography, Avatar, Divider } from '@mui/material';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';

import { baseUrl, fetchApi } from '../../utils/fetchApi';
import ImageScrollbar from '../../components/ImageScrollbar';

const PropertyDetails = ({ 
  propertyDetails: { 
    price, 
    rentFrequency, 
    rooms, 
    title, 
    baths, 
    area, 
    agency, 
    isVerified, 
    description, 
    type, 
    purpose, 
    furnishingStatus, 
    amenities, 
    photos 
  } 
}) => (
  <Box maxWidth="1000px" margin="auto" padding={4}>
    {photos && <ImageScrollbar data={photos} />}
    
    <Box width="100%" padding={1}>
      <Grid2 container alignItems="center" spacing={1.5}>
        <Grid2 item>
          {isVerified && <GoVerified style={{ color: 'green' }} />}
        </Grid2>
        
        <Grid2 item>
          <Typography variant="h6" fontWeight="bold">
            AED {millify(price)} {rentFrequency && `/${rentFrequency}`}
          </Typography>
        </Grid2>
        
        <Grid2 item style={{ marginLeft: 'auto' }}>
          <Avatar src={agency?.logo?.url} />
        </Grid2>
      </Grid2>

      <Grid2 container alignItems="center" spacing={1.3} style={{ color: '#2F85DF' }}>
        <Grid2 item>{rooms}</Grid2>
        <Grid2 item><FaBed /></Grid2>
        <Grid2 item>|</Grid2>
        <Grid2 item>{baths}</Grid2>
        <Grid2 item><FaBath /></Grid2>
        <Grid2 item>|</Grid2>
        <Grid2 item>{millify(area)} sqft</Grid2>
        <Grid2 item><BsGridFill /></Grid2>
      </Grid2>
    </Box>

    <Box marginTop={2}>
      <Typography variant="h6" fontWeight="bold" marginBottom={2}>
        {title}
      </Typography>
      <Typography color="textSecondary" lineHeight={1.6}>
        {description}
      </Typography>
    </Box>

    <Grid2 container spacing={15} marginTop={4}>
      <Grid2 item xs={12} sm={6}>
        <Box display="flex" textTransform="uppercase" justifyContent="space-between" width="155px" padding={1} borderBottom="1.5px solid #e0e0e0">
          <Typography>Type :</Typography>
          <Typography fontWeight="bold">{type}</Typography>
        </Box>
      </Grid2>

      <Grid2 item xs={12} sm={6}>
        <Box display="flex" textTransform="uppercase" justifyContent="space-between" width="180px" padding={1} borderBottom="1.5px solid #e0e0e0">
          <Typography>Purpose :</Typography>
          <Typography fontWeight="bold">{purpose}</Typography>
        </Box>
      </Grid2>

      {furnishingStatus && (
        <Grid2 item xs={12} sm={6}>
          <Box display="flex" textTransform="uppercase" justifyContent="space-between" width="285px" padding={1} borderBottom="1.5px solid #e0e0e0">
            <Typography>Furnishing Status :</Typography>
            <Typography fontWeight="bold">{furnishingStatus}</Typography>
          </Box>
        </Grid2>
      )}
    </Grid2>

    {amenities?.length > 0 && (
      <Box marginTop={5}>
        <Typography variant="h6" fontWeight="bold">
          Facilities:
        </Typography>
        
        <Grid2 container spacing={1} marginTop={1}>
          {amenities.map((item) =>
            item.amenities.map((amenity) => (
              <Grid2 item key={amenity.text}>
                <Typography
                  fontWeight="bold"
                  color="#2F85DF"
                  padding={1}
                  style={{
                    backgroundColor: '#D4D4D4',
                    borderRadius: 8,
                  }}
                >
                  {amenity.text}
                </Typography>
              </Grid2>
            ))
          )}
        </Grid2>
      </Box>
    )}
  </Box>
);

export default PropertyDetails;

export async function getServerSideProps({ params: { id } }) {
  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);

  return {
    props: {
      propertyDetails: data,
    },
  };
}
