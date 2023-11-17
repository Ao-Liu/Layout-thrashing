import React, { useState, useEffect } from "react";
import { ref, set, onValue } from "firebase/database";
import { database } from "../../firebase";

const CatsPage = () => {
  const [maliciousButtonVisible, setMaliciousButtonVisible] = useState(false);
  const [showPics, setShowPics] = useState(false);
  const [count, setCount] = useState(0);

  const updateCount = () => {
    for (let i = 0; i < 10000000; i++) {
      setCount(prevCount => prevCount + 1);
    }
  };
//   var pics = ( <div id="images"></div>);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       causeLayoutThrashing();
//     }, 10);

//     return () => clearInterval(interval);
//   }, []);

  useEffect(() => {
    for (let i = 0; i < 1000; i++) {
        // setCount(prevCount => prevCount + 1);
    }
  }, [showPics]);

  const revealPics = () => {
    updateCount();
    setShowPics(true);
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

  const pics = ( <div id="images" style={styles.images}>
    <div style={styles.imageContainer}>
        <a onClick={() => handleCatClick(1)}>
        <img src={`https://cataas.com/cat?random=${Math.random()}`} alt="Cat 1" />
        </a>
    </div>
    <div style={styles.imageContainer}>
        <a onClick={() => handleCatClick(2)}>
        <img src={`https://cataas.com/cat?random=${Math.random()}`} alt="Cat 2" />
        </a>
    </div>
    <div style={styles.imageContainer}>
        <a onClick={() => handleCatClick(3)}>
        <img src={`https://cataas.com/cat?random=${Math.random()}`} alt="Cat 3" />
        </a>
    </div>
    <div style={styles.imageContainer}>
        <a onClick={() => handleCatClick(4)}>
        <img src={`https://cataas.com/cat?random=${Math.random()}`} alt="Cat 4" />
        </a>
    </div>
    </div>)

  return (
    <div style={styles.page}>
      {showPics && pics}
      <div style={styles.container}>
        <button style={styles.button} onClick={revealPics}>
          Show Image
        </button>
        {maliciousButtonVisible && (
          <button style={{ ...styles.button, visibility: "hidden" }} onClick={revealPics}>
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
    width: "auto",
    height: "auto",
    overflow: "hidden",
    margin: "10px",
    display: "inline-block",
  },
};

export default CatsPage;
