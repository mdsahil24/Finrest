import { useRef } from 'react';
import Image from 'next/image';
import { Box, IconButton } from '@mui/material';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

export default function ImageScrollbar({ data }) {
  // Reference to the scrollable container
  const scrollContainerRef = useRef(null);

  // Fallback manual scrolling logic
  const scrollPrev = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 950; // Adjust scroll distance as needed
    }
  };

  const scrollNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 950; // Adjust scroll distance as needed
    }
  };

  if (!Array.isArray(data)) {
    return <div>Error: Data should be an array.</div>;
  }

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        padding: '20px 0',
      }}
    >
      {/* Left Arrow */}
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        position="absolute" 
        left={0} 
        zIndex={1}
        sx={{
          display: { xs: 'none', sm: 'flex' }, // Hide on small screens
        }}
      >
        <IconButton
          onClick={scrollPrev}
          sx={{
            position: 'absolute',
            left: '15px', // Adjusted for smaller screens
            top: '50%',
            transform: 'translateY(520%)',
            fontSize: '2rem',
            backgroundColor: '#fff',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: '#f0f0f0',
            },
          }}
        >
          <FaArrowAltCircleLeft />
        </IconButton>
      </Box>

      {/* Scrollable Image Container */}
      <Box
        ref={scrollContainerRef}
        sx={{
          display: 'flex',
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          gap: '10px',
          '&::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar for Webkit browsers
          '-ms-overflow-style': 'none', // Hide scrollbar for IE and Edge
          'scrollbar-width': 'none', // Hide scrollbar for Firefox
        }}
      >
        {data.map((item) => (
          <Box
            key={item.id}
            sx={{
              flex: '0 0 auto',
              width: '85%', // Adjust width for mobile and tablet
              maxWidth: '940px', // Maximum width for larger screens
              overflow: 'hidden',
              margin: '0 auto',
            }}
          >
            <Image
              placeholder="blur"
              blurDataURL={item.url}
              src={item.url}
              alt={`Image ${item.id}`}
              width={1000}
              height={500}
              sizes="(max-width: 500px) 100vw, (max-width: 1023px) 80vw, 1000px"
              style={{
                borderRadius: '1px',
                boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
                objectFit: 'cover',
              }}
            />
          </Box>
        ))}
      </Box>

      {/* Right Arrow */}
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        position="absolute" 
        right={0} 
        zIndex={1}
        sx={{
          display: { xs: 'none', sm: 'flex' }, // Hide on small screens
        }}
      >
        <IconButton
          onClick={scrollNext}
          sx={{
            position: 'absolute',
            right: '15px', // Adjusted for smaller screens
            top: '50%',
            transform: 'translateY(-630%)',
            fontSize: '2rem',
            backgroundColor: '#fff',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: '#f0f0f0',
            },
          }}
        >
          <FaArrowAltCircleRight />
        </IconButton>
      </Box>
    </Box>
  );
}
