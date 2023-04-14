import React, { useRef } from "react";

import "./App.css";
import CharacterGetter from "./components/character-view/character-getter";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import { CharMain } from "./views/char-main";
import { Login } from "./views/login";
import { Button} from "@mui/material";
import { NewUser } from "./views/new-user";
import { SideDrawer } from "./components/side-drawer/side-drawer";
import { MessageManager } from "./components/modal/modal-manager";

function App() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <>
      <Router>
        <div className="App">
          <Button 
            style={{position:'absolute', left: 0, top: '10px'}}
            onClick={()=>setDrawerOpen(!drawerOpen)}
          >Nav</Button>
          <header className="App-header">
            <Routes>
              <Route path="/" element={<CharacterGetter />} />
              <Route path="/main" element={<CharMain />} />
              <Route path="/login" element={<Login />} />
              <Route path="/user/new" element={<NewUser />} />
            </Routes>
          </header>
          <SideDrawer drawerStatus = {drawerOpen} setDrawerStatus={setDrawerOpen}/>
        </div>
      </Router>
      <MessageManager/>
    </>
  );
}

export default App;
