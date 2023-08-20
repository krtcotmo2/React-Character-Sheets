import { KeyValuePair } from "../../../interfaces/key-value";
import { launchModal } from "./launch-modal";

export const showError = (err: string, param?: KeyValuePair[]) => {
    let msg = '';
    let title = '';
    let modalName= '';
    let userId: KeyValuePair | undefined;
    switch(err){
        case 'char_not_found':
            userId = param?.find(pair => pair.key === 'userId');
            msg = `The character with id ${userId?.value} not found`;
            title = `Character not found`
            modalName = 'char_not_found'
            break;
        case 'stat_not_found':
            userId = param?.find(pair => pair.key === 'userId');
            msg = `The character with id ${userId?.value} missing data`;
            title = `Stats for the character not found`
            modalName = 'stat_not_found'
            break;
        case 'invalid_id':
            msg = `Enter in a valid id`;
            title = `Invalid User ID`
            modalName = 'invalid_id'
            break;
        case 'log_in_failed':
            msg = `Please check the emil and password and try again`;
            title = `Login Failed`
            modalName = 'log_in_failed'
            break;
        case 'not_logged_in':
            title = 'Not Logged In';
            msg = "You will need to login to proceed with that action";
            modalName= 'not_logged_in'
            break;
        case 'note_missing_title':
            title = 'Invalid title';
            msg = "A note must have a title";
            modalName= 'note_missing_title'
            break;
        default:
            title = err;
            msg = 'undefined error';
            modalName= 'unknown-error'
            break;
    }
    launchModal(msg, title, modalName);
}