import React, { useRef } from "react";

import "./App.css";
import { AppState, store } from './redux/configure-store';
import CharacterGetter from "./components/character-view/character-getter";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import { CharMain } from "./views/char-main";
import { Login } from "./views/login";
import { Button} from "@mui/material";
import { NewUser } from "./views/new-user/new-user";
import { SideDrawer } from "./components/side-drawer/side-drawer";
import { MessageManager } from "./components/modal/modal-manager";
import { SelectCharacter } from "./views/select-character/select-character";
import { Provider as ReduxProvider } from "react-redux";
import { CharacterStats } from "./views/stats/stats";

function App() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <>
      <ReduxProvider store={store}>
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
                <Route path="/main/loadChar" element={<SelectCharacter/>} />
                <Route path="/character/stats" element={<CharacterStats />} />
                <Route path="/character/*" element={<CharacterGetter />} />
              </Routes>
            </header>
            <SideDrawer drawerStatus = {drawerOpen} setDrawerStatus={setDrawerOpen}/>
          </div>
        </Router>
        <MessageManager/>
      </ReduxProvider>
    </>
  );
}

export default App;
