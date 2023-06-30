import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles<void>()((theme, _params, classes) => ({
   inputField:{
      width: '300px',
      backgroundColor: 'white',
      textAlign:'left'
   }
 }));

export {useStyles}