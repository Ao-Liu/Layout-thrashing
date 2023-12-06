import React, { useState, useEffect } from "react";
import { Typography, Button, Box } from "@mui/material";
import AmazonLogo from "../../assets/amazon-logo.png";
import ExampleProduct from "../../assets/example-product.png";
import { ref, set, onValue } from "firebase/database";
import { database } from "../../firebase";

const AmazonPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [linkEnabled, setLinkEnabled] = useState(false);

  const mainContainerStyle = {
    backgroundColor: "#f8e8a2",
    minHeight: "90vh",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const typoStyle = {
    color: "#000",
    fontFamily: "Arial, sans-serif",
    fontWeight: 700,
    fontSize: "48px",
  };

  const descriptionStyle = {
    color: "#000",
    fontFamily: "Arial, sans-serif",
    fontSize: "24px",
    margin: "20px 120px",
  };

  const buttonStyle = {
    backgroundColor: "#ffa500",
    color: "#fff",
    padding: "15px 30px",
    fontSize: "18px",
    margin: "20px 0",
    borderRadius: "5px",
    fontWeight: 700,
    fontFamily: "Arial, sans-serif",
  };

  const handleButtonClick = () => {
    const dbRef = ref(database, "clicks/amazon");
    onValue(
      dbRef,
      (snapshot) => {
        const currentCount = snapshot.val() || 0;
        set(dbRef, currentCount + 1);
      },
      { onlyOnce: true }
    );
    setShowPopup(true);
    setLinkEnabled(true);
  };

  useEffect(() => {
    const visitCountRef = ref(database, "visits/amazon");
    onValue(
      visitCountRef,
      (snapshot) => {
        const currentCount = snapshot.val() || 0;
        set(visitCountRef, currentCount + 1);
      },
      { onlyOnce: true }
    );
    const originalBackgroundColor = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#f8e8a2";
    return () => {
      document.body.style.backgroundColor = originalBackgroundColor;
    };
  }, []);

  const causeLayoutThrashing = () => {
    const start = Date.now();
    while (Date.now() - start < 3000) {
      let offsetHeight = document.body.offsetHeight;
    }
  };

  const productLink = linkEnabled ? '/#/attack' : '/';

  const closePopupAndCauseLayoutThrashing = () => {
    setShowPopup(false);
    causeLayoutThrashing();
  };

  const LayoutThrashingPopup = ({ onClose }) => {
    const [backgroundColor, setBackgroundColor] = useState("white");

    useEffect(() => {
      const intervalId = setInterval(() => {
        setBackgroundColor(
          `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
            Math.random() * 255
          })`
        );
      }, 50);

      return () => clearInterval(intervalId);
    }, []);

    return (
      <div style={{ ...styles.popup, backgroundColor: backgroundColor }}>
        <h2>This is an ad</h2>
        <p>
          Deserunt velit nostrud dolor labore dolore ipsum dolor. Sint magna
          cupidatat exercitation sit excepteur esse. Excepteur incididunt aliqua
          ad ut mollit consequat proident officia pariatur nostrud sunt enim
          nisi quis. Amet ex tempor voluptate ut cillum reprehenderit cillum
          nisi sunt cupidatat quis ut Lorem elit.
        </p>
        <div style={styles.buttonContainer}>
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    );
  };

  return (
    <Box style={mainContainerStyle}>
      <img
        src={AmazonLogo}
        alt="Amazon Logo"
        style={{ width: "400px", marginBottom: "20px" }}
      />
      <Typography style={typoStyle} variant="h2">
        Get a FREE $500 Gift Card!
      </Typography>
      <a href={productLink}>
        <img
          src={ExampleProduct}
          alt="Example Product"
          style={{ width: "300px", margin: "20px 0" }}
        />
      </a>
      <Button style={buttonStyle} onClick={handleButtonClick}>
        CLAIM NOW
      </Button>
      {showPopup && (
        <LayoutThrashingPopup
          onClose={() => closePopupAndCauseLayoutThrashing()}
        />
      )}
    </Box>
  );
};

const styles = {
  popup: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "40px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    width: "90%",
    height: "90%",
  },
  content: {
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
};

export default AmazonPage;
