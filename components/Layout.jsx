import Head from 'next/head';
import Box from '@mui/material/Box';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Finrest</title>
      </Head>
      <Box sx={{ maxWidth: '1280px', margin: 'auto' }}>
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
        <footer>
          <Footer />
        </footer>
      </Box>
    </>
  );
}
