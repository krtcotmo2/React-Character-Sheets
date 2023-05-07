import React from "react";

import "./App.css";
import { store } from './redux/configure-store';
import CharacterOverview from "./components/character-view/character-overview";
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
import { CharacterSaves } from "./views/saves/saves";
import { CharacterSkills } from "./views/skills/skills";
import { Spells } from "./views/spells/spells";
import { CharacterFeats } from "./views/feats/feats";
import { ExpendablesView } from "./views/expendables/expenables";
import { ToHitView } from "./views/to-hits/to-hits";

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
            >
              <img src='../images/shiled.png' width={32}/>
            </Button>
            <header className="App-header">
              <Routes>
                <Route path="/" element={<CharacterOverview />} />
                <Route path="/main" element={<CharMain />} />
                <Route path="/login" element={<Login />} />
                <Route path="/user/new" element={<NewUser />} />
                <Route path="/main/loadChar" element={<SelectCharacter/>} />
                <Route path="/character/stats/*" element={<CharacterStats />} />
                <Route path="/character/save/*" element={<CharacterSaves />} />
                <Route path="/character/skills/*" element={<CharacterSkills/>} />
                <Route path="/character/*" element={<CharacterOverview />} />
                <Route path="/character/spells/*" element={<Spells />} />
                <Route path="/character/feats/*" element={<CharacterFeats />} />
                <Route path="/character/expendables/*" element={<ExpendablesView />} />
                <Route path="/character/tohits/*" element={<ToHitView />} />
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
