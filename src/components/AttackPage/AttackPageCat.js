import thinkEmoji from "../../assets/think-emoji.png";
import catIcon from "../../assets/cat-nav.png";
import { Typography, Button, Box } from "@mui/material";
import React, { useEffect } from "react";
import { ref, set, onValue } from "firebase/database";
import { database } from "../../firebase";

const AttackPageCat = () => {
  useEffect(() => {
    const visitCountRef = ref(database, "visits/cat-attack");
    onValue(
      visitCountRef,
      (snapshot) => {
        const currentCount = snapshot.val() || 0;
        set(visitCountRef, currentCount + 1);
      },
      { onlyOnce: true }
    );
  }, []);

  return (
    <div style={styles.container}>
      <div>
        <img src={catIcon} alt="cat icon" style={styles.image} />
        <img src={thinkEmoji} alt="Thinking Emoji" style={styles.image} />
      </div>
      <br />
      <Typography style={styles.typoStyle} variant="h4">
        Oops! Something malicious happens here
      </Typography>
    </div>
  );
};

const styles = {
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  image: {
    maxWidth: "180px",
    maxHeight: "180px",
    padding: "0px 20px 0px 20px",
  },
  typoStyle: {
    color: "#000",
    fontFamily: "Arial, sans-serif",
    fontWeight: 700,
  },
};

export default AttackPageCat;
