import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { CharacterReducerFunctions } from "./reducers/character-reducer";
import { StatsReducerFunctions } from "./reducers/stats-reducer";
import { SavesReducerFunctions } from "./reducers/saves-reducer";
import { SkillReducerFunctions } from "./reducers/skills.reducer";
import { CharLevelReducerFunctions } from "./reducers/level-reducer";
import { SpellReducerFunctions } from "./reducers/spell-reducer";
import { FeatsReducerFunctions } from "./reducers/feates-reducer";
import { ExpendableReducerFunctions } from "./reducers/expendables-reducer";
import { ToHitReducerFunctions } from "./reducers/to-hit-reducer";
import { ArmorReducerFunctions } from "./reducers/armor-reducer";
import { EquipmentReducerFunctions } from './reducers/equipment-reducer'
import { UserReducerFunctions } from "./reducers/user-reducer";

const rootReducer = combineReducers({
    character: CharacterReducerFunctions,
    stats: StatsReducerFunctions,
    saves: SavesReducerFunctions,
    skills: SkillReducerFunctions,
    levels: CharLevelReducerFunctions,
    spells: SpellReducerFunctions,
    feats: FeatsReducerFunctions,
    expendables: ExpendableReducerFunctions,
    toHitGroups: ToHitReducerFunctions,
    user: UserReducerFunctions,
    armor: ArmorReducerFunctions,
    equipment: EquipmentReducerFunctions,
})
export type AppState = ReturnType<typeof rootReducer>

const composeEnhancers = composeWithDevTools({
  name: "POLookup",
  maxAge: 10,
})
export const store = createStore(rootReducer, composeEnhancers())
