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
      <Box display="flex" justifyContent="center" alignItems="center" position="absolute" left={0} zIndex={1}>
        <IconButton
          onClick={scrollPrev}
          sx={{
            position: 'absolute',
            left: '15px', // Close to the left of the container
            top: '50%', // Vertically centers the button
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
          scrollBehavior: 'smooth', // Ensures smooth scrolling
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
              width: '940px', // Adjust width as needed
              overflow: 'hidden',
            }}
          >
            <Image
              placeholder="blur"
              blurDataURL={item.url}
              src={item.url}
              alt={`Image ${item.id}`}
              width={1000}
              height={500}
              sizes="(max-width: 500px) 100px, (max-width: 1023px) 400px, 1000px"
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
      <Box display="flex" justifyContent="center" alignItems="center" position="absolute" right={0} zIndex={1}>
        <IconButton
          onClick={scrollNext}
          sx={{
            position: 'absolute',
            right: '15px', // Close to the right of the container
            top: '50%', // Vertically centers the button
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
