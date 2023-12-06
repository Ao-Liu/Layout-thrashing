import React, { useState, useEffect } from "react";
import saleImg from '../../assets/sale.jpeg';
import { Typography } from '@mui/material';

const SalePage = () => {
    const [showImage, setShowImage] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowImage(true);
      }, 1500); // 1500 milliseconds = 1.5 seconds
  
      return () => clearTimeout(timer); // Cleanup timeout
    }, []);

    const buttonStyle = {
        width: '300px', // Width of the button
        height: '50px', // Height of the button
        padding: '10px', // Padding inside the button
        margin: '10px 0', // Margin outside the button (vertical margin only)
    };

    const typoStyle = {
        color: '#000',
        fontFamily: 'Arial, sans-serif',
        fontWeight: 700,
        fontSize: '30px',
        marginTop: '20px'
      };

    return (
        <div>
        <Typography style={typoStyle} variant="h5">
            Would you like to participate in the sale?
        </Typography>
        <div style={{ textAlign: 'center' }}>
            {showImage && (
            <img 
                src={saleImg} 
                width="400" 
                height="200"
                marginTop="50"
            />
            )}
            
            <div style={{ marginTop: '10px' }}>
                <button style={buttonStyle}>Yes! Sign me up!</button>
            </div>
            <div style={{ marginTop: '10px' }}>
                <button style={buttonStyle}>No, take me back</button>
            </div>
        </div>
        </div>
    );
};

export default SalePage;