import React, { useState, useEffect } from "react";
import { ref, set, onValue } from "firebase/database";
import { database } from "../../firebase";
import Button from "@mui/material/Button";

const CatsPage = () => {
  const [maliciousButtonVisible, setMaliciousButtonVisible] = useState(false);
  const [showPics, setShowPics] = useState(false);
  const [count, setCount] = useState(0);
  const [linkEnabled, setLinkEnabled] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(false);

  useEffect(() => {
    for (let i = 0; i < 1000; i++) {
      // setCount(prevCount => prevCount + 1);
    }
  }, [showPics]);

  React.useEffect(() => {
    const visitCountRef = ref(database, "visits/cat-page");
    onValue(
      visitCountRef,
      (snapshot) => {
        const currentCount = snapshot.val() || 0;
        set(visitCountRef, currentCount + 1);
      },
      { onlyOnce: true }
    );
  }, []);

  const causeLayoutThrashing = () => {
    const start = Date.now();
    while (Date.now() - start < 5000) {
      let offsetHeight = document.body.offsetHeight;
    }
  };

  const revealPics = () => {
    causeLayoutThrashing();
    setShowPics(true);
    setIsImageLoading(true)
  };

  const recordClick = (catNumber) => {
    const clicksRef = ref(database, `clicks/cat-btn-${catNumber}`);
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

  const productLink = linkEnabled ? "/#/attack_cat" : "#/cat";

  const handleImageLoad = (catNumber) => {
    setTimeout(() => {
      setLinkEnabled(false);
    }, 1000);
  };

  const pics = (
    <div id="images" style={styles.images}>
      <div style={styles.imageContainer}>
        <a onClick={() => handleCatClick(1)} href={productLink}>
          <img src="https://placekitten.com/400/400" alt="Cat 1" onLoad={() => handleImageLoad(1)}/>
        </a>
      </div>
      <div style={styles.imageContainer}>
        <a onClick={() => handleCatClick(2)} href={productLink}>
          <img src="https://placekitten.com/400/400" alt="Cat 2" onLoad={() => handleImageLoad(2)}/>
        </a>
      </div>
      <div style={styles.imageContainer}>
        <a onClick={() => handleCatClick(3)} href={productLink}>
          <img src="https://placekitten.com/400/400" alt="Cat 3" onLoad={() => handleImageLoad(3)}/>
        </a>
      </div>
    </div>
  );

  const largeButtonStyle = {
    fontSize: "30px",
    padding: "20px 40px",
    minWidth: "200px",
    minHeight: "100px",
  };

  return (
    <div style={styles.page}>
      {showPics && pics}
      <br />
      <div style={styles.container}>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={revealPics}
          style={largeButtonStyle}
          disabled={isImageLoading} 
        >
          Generate Random Cat Image
        </Button>
        {maliciousButtonVisible && (
          <Button
            variant="contained"
            color="primary"
            disableElevation
            style={{ visibility: "hidden" }}
            onClick={revealPics}
            disabled={isImageLoading} 
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
    maxWidth: "90%"
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
