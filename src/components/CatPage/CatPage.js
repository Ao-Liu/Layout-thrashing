import React, { useState, useEffect } from "react";
import { ref, set, onValue } from "firebase/database";
import { database } from "../../firebase";
import Button from "@mui/material/Button";

const CatsPage = () => {
  const [maliciousButtonVisible, setMaliciousButtonVisible] = useState(false);
  const [showPics, setShowPics] = useState(false);
  const [count, setCount] = useState(0);

  const updateCount = () => {
    for (let i = 0; i < 10000000; i++) {
      setCount((prevCount) => prevCount + 1);
    }
  };

  useEffect(() => {
    for (let i = 0; i < 1000; i++) {
      // setCount(prevCount => prevCount + 1);
    }
  }, [showPics]);

  React.useEffect(() => {
    const visitCountRef = ref(database, "visits/cats");
    onValue(
      visitCountRef,
      (snapshot) => {
        const currentCount = snapshot.val() || 0;
        set(visitCountRef, currentCount + 1);
      },
      { onlyOnce: true }
    );
  }, []);

  const revealPics = () => {
    updateCount();
    setShowPics(true);
  };

  const recordClick = (catNumber) => {
    const clicksRef = ref(database, `clicks/cat${catNumber}`);
    onValue(
      clicksRef,
      (snapshot) => {
        const currentCount = snapshot.val() || 0;
        set(clicksRef, currentCount + 1);
      },
      { onlyOnce: true }
    );
  };

  const handleCatClick = (catNumber) => {
    recordClick(catNumber);
  };

  const pics = (
    <div id="images" style={styles.images}>
      <div style={styles.imageContainer}>
        <a onClick={() => handleCatClick(2)}>
          <img src="https://placekitten.com/400/400" alt="Cat 2" />
        </a>
      </div>
      <div style={styles.imageContainer}>
        <a onClick={() => handleCatClick(3)}>
          <img src="https://placekitten.com/400/400" alt="Cat 3" />
        </a>
      </div>
      <div style={styles.imageContainer}>
        <a onClick={() => handleCatClick(4)}>
          <img src="https://placekitten.com/400/400" alt="Cat 4" />
        </a>
      </div>
    </div>
  );

  return (
    <div style={styles.page}>
      {showPics && pics}
      <br/>
      <div style={styles.container}>
        <Button variant="contained" color="primary" disableElevation onClick={revealPics}>
          Show Image
        </Button>
        {maliciousButtonVisible && (
          <Button
            variant="contained"
            color="primary"
            disableElevation
            style={{ visibility: "hidden" }}
            onClick={revealPics}
          >
            Show Image
          </Button>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "90vh",
    margin: 0,
    backgroundColor: "#fff",
  },
  container: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
  },
  images: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  imageContainer: {
    width: "400px",
    height: "400px",
    overflow: "hidden",
    margin: "10px",
    display: "inline-block",
  },
};

export default CatsPage;
