import { KeyValuePair } from "../../../interfaces/key-value";
import { launchModal } from "./launch-modal";

export const showError = (err: string, param?: KeyValuePair[]) => {
    let msg = '';
    let title = '';
    let modalName= '';
    switch(err){
        case 'char_not_found':
            const userId = param?.find(pair => pair.key === 'userId');
            msg = `The character with id ${userId?.value} not found`;
            title = `Character not found`
            modalName = 'char_not_found'
            break;
        case 'invalid_id':
            msg = `'Enter in a valid id`;
            title = `Invalid User ID`
            modalName = 'invalid_id'
            break;
        default:
            title = err;
            msg = 'undefined error';
            modalName= 'unknown-error'
            break;
    }
    launchModal(msg, title, modalName);
}