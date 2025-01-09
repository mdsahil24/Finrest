import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { 
  Box, 
  Select, 
  MenuItem, 
  Input, 
  Button, 
  CircularProgress, 
  IconButton, 
  Typography 
} from '@mui/material';
import { MdCancel } from 'react-icons/md';
import { filterData, getFilterValues } from '../utils/filterData';
import { baseUrl, fetchApi } from '../utils/fetchApi';
import noresult from '../assets/images/noresult.svg';

export default function SearchFilters() {
  const [filters] = useState(filterData);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationData, setLocationData] = useState([]);
  const [showLocations, setShowLocations] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const searchProperties = (filterValues) => {
    const path = router.pathname;
    const { query } = router;

    const values = getFilterValues(filterValues);
    values.forEach((item) => {
      if (item.value && filterValues?.[item.name]) {
        query[item.name] = item.value;
      }
    });

    router.push({ pathname: path, query });
  };

  const clearFilters = () => {
    // Reset query parameters
    router.push({ pathname: router.pathname, query: {} });
    setSearchTerm('');
  };

  useEffect(() => {
    if (searchTerm !== '') {
      const fetchData = async () => {
        setLoading(true);
        const data = await fetchApi(`${baseUrl}/auto-complete?query=${searchTerm}`);
        setLocationData(data?.hits || []);
        setLoading(false);
      };

      fetchData();
    }
  }, [searchTerm]);

  return (
    <Box 
      sx={{ 
        padding: 6, 
        borderRadius: 2, 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        gap: 2 
      }}
    >
      {filters.map((filter) => (
        <Box key={filter.queryName} sx={{ minWidth: 200 }}>
          <Select
            fullWidth
            displayEmpty
            value={router.query[filter.queryName] || ''}
            onChange={(e) => searchProperties({ [filter.queryName]: e.target.value })}
            renderValue={(selected) => selected ? selected : <span style={{ color: 'grey' }}>{filter.placeholder}</span>
            }
            sx={{ padding: 0.5, borderRadius: 3, border: '0px solid', borderColor: 'grey.300' }}
          >
            {filter.items.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
      ))}

      <Box sx={{ display: 'flex', gap: 2, marginTop: 4 }}>
        <Button 
          variant="contained" 
          onClick={() => setShowLocations((prev) => !prev)} 
          sx={{ borderRadius: 30, border: '0px solid', borderColor: 'grey.300' }}
        >
          Search Location
        </Button>

        <Button 
          variant="outlined" 
          onClick={clearFilters} 
          sx={{ borderRadius: 30, border: '0px solid', borderColor: 'grey.300' }}
        >
          Clear Filters
        </Button>
      </Box>

      {showLocations && (
        <Box sx={{ width: '100%', marginTop: 2 }}>
          <Input
            placeholder="Type to search locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            sx={{ padding: 1, marginBottom: 2, border: '1px solid', borderColor: 'grey.300', borderRadius: 1 }}
          />
          {searchTerm && (
            <IconButton 
              onClick={() => setSearchTerm('')} 
              sx={{ position: 'absolute', right: 20, top: 12 }}
            >
              <MdCancel />
            </IconButton>
          )}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ maxHeight: 300, overflowY: 'auto', border: '1px solid', borderColor: 'grey.300', borderRadius: 1 }}>
              {locationData.length > 0 ? (
                locationData.map((location) => (
                  <Box
                    key={location.id}
                    sx={{ 
                      padding: 1, 
                      cursor: 'pointer', 
                      '&:hover': { backgroundColor: 'grey.200' } 
                    }}
                    onClick={() => {
                      searchProperties({ locationExternalIDs: location.externalID });
                      setSearchTerm(location.name);
                      setShowLocations(false);
                    }}
                  >
                    <Typography variant="body1">{location.name}</Typography>
                  </Box>
                ))
              ) : (
                <Box sx={{ textAlign: 'center', padding: 2 }}>
                  <Image src={noresult} alt="No result" width={150} height={150} />
                  <Typography variant="body2" sx={{ marginTop: 2 }}>
                    No results found.
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
