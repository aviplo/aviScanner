import Navbar from "./components/Navbar";
import Compare from "./components/Compare";
import { useState } from "react";

import Welcome from "./components/Welcome";
import { Outlet, Route, Routes } from "react-router-dom";
import Describe from "./components/Describe";

function App() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <>
      <Navbar handleOpenDrawer={handleDrawerToggle} />
      <Routes>
        <Route path="/compare" element={<Compare openDrawer={openDrawer} handleOpenDrawer={handleDrawerToggle}/>}></Route>
        <Route path="/describe" element={<Describe />}></Route>
        <Route path="/" element={<Welcome />}></Route>
      </Routes>
      {/* <Outlet openDrawer={openDrawer} handleOpenDrawer={handleDrawerToggle} /> */}
      {/* <Welcome /> */}
      {/* <Compare openDrawer={openDrawer} handleOpenDrawer={handleDrawerToggle} /> */}
    </>
  );
}

export default App;
