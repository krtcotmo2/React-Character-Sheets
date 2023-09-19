import { store } from "../redux/configure-store";
import { showError } from "./modal/business-logic/error-handler";

export const checkPerm = () => {
    const loggedIn = store.getState().user.authenticated;
    if(!loggedIn){
       throw new Error('not_logged_in');
    }
}