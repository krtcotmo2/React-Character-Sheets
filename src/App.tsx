import React from "react";

import "./App.css";
import { store } from './redux/configure-store';
import CharacterOverview from "./components/character-view/character-overview";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import { CharMain } from "./views/char-main";
import { Button} from "@mui/material";
import { NewUser } from "./components/new-user/new-user";
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
import { CharacterCore } from "./views/char-core/char-core";
import { CharacterArmor } from "./views/armor/armor";
import { CharacterNotes } from "./views/notes/notes";
import { LandingPage } from "./views/landing/landing";
import NewCharacter from "./components/character-view/new-character";
import { LevelsModified } from "./components/levels-modifier/levels";

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
              <img alt='menu' src={`${process.env.PUBLIC_URL}/images/shiled.png`} width={32}/>
            </Button>
            <header className="App-header">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/main" element={<CharMain />} />
                <Route path="/login" element={<LandingPage />} />
                <Route path="/user/new" element={<NewUser />} />
                <Route path="/main/loadChar" element={<SelectCharacter/>} />
                <Route path="/main/newChar" element={<NewCharacter />} />
                <Route path="/character/stats/*" element={<CharacterStats />} />
                <Route path="/character/save/*" element={<CharacterSaves />} />
                <Route path="/character/levels/*" element={<LevelsModified />} />
                <Route path="/character/skills/*" element={<CharacterSkills/>} />
                <Route path="/character/overview/*" element={<CharacterOverview />} />
                <Route path="/character/*" element={<CharacterCore />} />
                <Route path="/character/spells/*" element={<Spells />} />
                <Route path="/character/feats/*" element={<CharacterFeats />} />
                <Route path="/character/expendables/*" element={<ExpendablesView />} />
                <Route path="/character/tohits/*" element={<ToHitView />} />
                <Route path="/character/acs/*" element={<CharacterArmor />} />
                <Route path="/character/notes/*" element={<CharacterNotes />} />
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
