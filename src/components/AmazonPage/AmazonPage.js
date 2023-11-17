import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import AmazonLogo from '../../assets/amazon-logo.png';
import ExampleProduct from '../../assets/example-product.png';

const AmazonPage = () => {
  const mainContainerStyle = {
    backgroundColor: '#f8e8a2',
    minHeight: '90vh',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const typoStyle = {
    color: '#000',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 700,
    fontSize: '48px',
  };

  const descriptionStyle = {
    color: '#000',
    fontFamily: 'Arial, sans-serif',
    fontSize: '24px',
    margin: '20px 120px',
  };

  const buttonStyle = {
    backgroundColor: '#ffa500',
    color: '#fff',
    padding: '15px 30px',
    fontSize: '18px',
    margin: '20px 0',
    borderRadius: '5px',
    fontWeight: 700,
    fontFamily: 'Arial, sans-serif',
  };

  React.useEffect(() => {
    const originalBackgroundColor = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#f8e8a2';
    return () => {
      document.body.style.backgroundColor = originalBackgroundColor;
    };
  }, []);

  return (
    <Box style={mainContainerStyle}>
      <img src={AmazonLogo} alt="Amazon Logo" style={{ width: '400px', marginBottom: '20px' }} />
      <Typography style={typoStyle} variant="h2">
        Get a FREE $500 Gift Card!
      </Typography>
      <img src={ExampleProduct} alt="Example Product" style={{ width: '300px', margin: '20px 0' }} />
      <Typography style={descriptionStyle} variant="h4">
        Congratulations! You qualify for a Free $500 Amazon Gift Card! 
      </Typography>
      <Button style={buttonStyle}>
        CLAIM NOW
      </Button>
    </Box>
  );
};

export default AmazonPage;
