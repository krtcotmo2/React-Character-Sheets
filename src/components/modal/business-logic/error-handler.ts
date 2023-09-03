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
        case 'passwords_dont_match':
            title = 'Form Error';
            msg = "Passwords do not match";
            modalName= 'passwords_dont_match'
            break;
        case 'user_already_exists':
            const eamilKey = param?.find(key => key.key === 'userEmail')
            title = 'User creation';
            msg = `Account with ${eamilKey?.value} already exists`;
            modalName= 'user_already_exists'
            break;
        case 'user_created':
            const nameKey = param?.find(key => key.key === 'userName')
            title = 'User creation';
            msg = `Account for ${nameKey?.value} has been created. Please login with the credentials just submitted.`;
            modalName= 'user_created'
            break;
        case 'Email not found':
            const eamil2Key = param?.find(key => key.key === 'userEmail')
            title = 'Password reset';
            msg = `No account with ${eamil2Key?.value} was found`;
            modalName= 'user_not_found'
            break;
        case 'password_reset':
            title = 'Password reset';
            msg = `Password reset, check the email for a new email. Check you spam box as well and log in with the new provided credentials`;
            break;
        default:
            title = err; 
            msg = 'undefined error';
            modalName= 'unknown-error'
            break;
    }
    launchModal(msg, title, modalName);
}