import { makeStyles } from 'tss-react/mui';

const useSpellStyles = makeStyles<void>()((theme, _params, classes) => ({
   inputField:{
    '& input':{
        padding: '4px 8px !important',

    },
      textAlign:'left'
   },
   editIcon:{
    alignSelf: 'center'
   }
 }));

export {useSpellStyles}