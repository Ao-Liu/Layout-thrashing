import React from 'react';
import thinkEmoji from '../../assets/think-emoji.png';
import { Typography, Button, Box } from "@mui/material";

const AttackPage = () => {
  return (
    <div style={styles.container}>
      <img src={thinkEmoji} alt="Thinking Emoji" style={styles.image} />
      <br/>
      <Typography style={styles.typoStyle} variant="h2">Oops!</Typography>
    </div>
  );
};

const styles = {
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center', 
    textAlign: 'center',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  typoStyle: {
    color: "#000",
    fontFamily: "Arial, sans-serif",
    fontWeight: 700,
    fontSize: "48px",
  }
};

export default AttackPage;
