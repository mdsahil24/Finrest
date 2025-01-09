import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Box, Typography, IconButton, Grid2, Divider } from '@mui/material';
import { BsFilter } from 'react-icons/bs';
import Property from '../components/Property';
import SearchFilters from '../components/SearchFilters';
import { baseUrl, fetchApi } from '../utils/fetchApi';
import noresult from '../assets/images/noresult.svg';

const Search = ({ properties }) => {
  const [searchFilters, setSearchFilters] = useState(false);
  const router = useRouter();

  return (
    <Box>
      <Box
        onClick={() => setSearchFilters(!searchFilters)}
        sx={{
          cursor: 'pointer',
          bgcolor: 'gray.100',
          borderBottom: '1px solid',
          borderColor: 'gray.200',
          padding: '8px',
          fontWeight: 'bold',
          fontSize: '18px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="body1">Search Property By Filters</Typography>
        <IconButton sx={{ paddingLeft: '8px' }}>
          <BsFilter />
        </IconButton>
      </Box>
      {searchFilters && <SearchFilters />}
      <Typography variant="h4" sx={{ padding: '16px', fontWeight: 'bold' }}>
        Properties {router.query.purpose}
      </Typography>
      <Grid2 container spacing={3}>
        {properties.map((property) => (
          <Grid2 item xs={12} sm={6} md={4} key={property.id}>
            <Property property={property} />
          </Grid2>
        ))}
      </Grid2>
      {properties.length === 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 5, marginBottom: 5 }}>
          <Image src={noresult} alt="No results" />
          <Typography variant="h6" sx={{ marginTop: 3 }}>
            No Result Found.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export async function getServerSideProps({ query }) {
  const purpose = query.purpose || 'for-rent';
  const rentFrequency = query.rentFrequency || 'yearly';
  const minPrice = query.minPrice || '0';
  const maxPrice = query.maxPrice || '1000000';
  const roomsMin = query.roomsMin || '0';
  const bathsMin = query.bathsMin || '0';
  const sort = query.sort || 'price-desc';
  const areaMax = query.areaMax || '35000';
  const locationExternalIDs = query.locationExternalIDs || '5002';
  const categoryExternalID = query.categoryExternalID || '4';

  const data = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`
  );

  return {
    props: {
      properties: data?.hits,
    },
  };
}

export default Search;
