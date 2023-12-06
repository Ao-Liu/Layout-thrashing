import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import { Link } from 'react-router-dom';
import { TouchBarBtn } from './styles';
import catIcon from '../../assets/cat-nav.png';
import amazonIcon from '../../assets/amazon-nav.png';
import saleImg from '../../assets/sale.jpeg'

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerContent = (
    <div onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <TouchBarBtn component={Link} to="/" variant="text" size="large" color="primary">
        <img src={amazonIcon} alt="Amazon" style={{ maxWidth: '50px', marginRight: '8px' }} />
        Amazon
      </TouchBarBtn>
      <TouchBarBtn component={Link} to="/cat" variant="text" size="large" color="primary">
        <img src={catIcon} alt="Cat" style={{ maxWidth: '50px', marginRight: '8px' }} />
        Cat
      </TouchBarBtn>
      <TouchBarBtn component={Link} to="/sale" variant="text" size="large" color="primary">
        <img src={saleImg} alt="Sale" style={{ maxWidth: '50px', marginRight: '8px' }} />
        Sale
      </TouchBarBtn>
    </div>
  );

  return (
    <div>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        style={{ position: "fixed", top: 10, left: 20, zIndex: 1000 }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="top" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </div>
  );
};

export default Navbar;
