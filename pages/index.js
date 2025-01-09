import Link from 'next/link';
import Image from 'next/image';
import { Grid2, Box, Typography, Button} from '@mui/material';
import Property from '../components/Property';
import { baseUrl, fetchApi } from '../utils/fetchApi';

const Banner = ({ purpose, title1, title2, desc1, desc2, buttonText, linkName, imageUrl }) => (
  <Grid2 container spacing={7} justifyContent="center" alignItems="center" sx={{ margin: '40px' }}>
    <Grid2 item xs={12} sm={6}>
      <Image src={imageUrl} width={500} height={300} alt={title1} style={{ objectFit: 'cover', borderRadius: '8px' }}/>
    </Grid2>
    <Grid2 item xs={12} sm={6}>
      <Box sx={{ padding: '70px' }}>
        <Typography variant="body2" sx={{ paddingBottom: '9px' }} color="black" fontWeight="medium">{purpose}</Typography>
        <Typography variant="h4" sx={{ paddingBottom: '4px' }} fontWeight="bold">{title1}<br />{title2}</Typography>
        <Typography variant="body1" sx={{ paddingTop: '9px', paddingBottom: '17px' }} color="black">
          {desc1}<br />{desc2}
        </Typography>
        <Button variant="contained" color="primary" sx={{ fontSize: '18px' }}>
          <Link href={linkName} passHref>
          <Box
              component="a"
              sx={{
                textDecoration: 'underline',
                textDecorationColor: '#2F85DF', // Default underline color set to white
                color: '#2F85DF',
                '&:hover': {
                  textDecorationColor: '#2F85DF', // Change underline color on hover
                },
              }}
            >
            <Typography variant="button" color="white">{buttonText}</Typography>
            </Box>
          </Link>
        </Button>
      </Box>
    </Grid2>
  </Grid2>
)

export default function Home( { propertiesForSale, propertiesForRent } ) {
  return (
    <Box>
      <Banner 
        purpose="RENT A HOME"
        title1="Rental Homes for Everyone"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more..."
        buttonText="Explore Renting"
        linkName="/search?purpose=for-rent"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />

      <Box sx={{ borderBottom: '2px solid #e0e0e0', marginBottom: '40px'}} />

      <Grid2 container spacing={3}>
        {propertiesForRent.map((property) => (
          <Grid2 item xs={12} sm={6} md={4} key={property.id}>
            <Property property={property} />
          </Grid2>
        ))}
      </Grid2>

      <Box sx={{ borderBottom: '2px solid #e0e0e0', marginBottom: '40px'}} />

      <Banner 
        purpose="BUY A HOME"
        title1="Find, Buy & Own Your Dream Home"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more..."
        buttonText="Explore Buying"
        linkName="/search?purpose=for-sale"
        imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008' 
      />
      
      <Box sx={{ borderBottom: '2px solid #e0e0e0', marginBottom: '40px'}} />

      <Grid2 container spacing={3}>
        {propertiesForSale.map((property) => (
          <Grid2 item xs={12} sm={6} md={4} key={property.id}>
            <Property property={property} />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  )  
}

export async function getStaticProps() {
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`)
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`)

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    }
  }
}