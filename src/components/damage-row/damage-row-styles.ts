import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles<void>()((theme, _params, classes) => ({
   damageRowContainer: {
      padding: '0 12px 12px 12px'
   },
    breakDownSection: {
       paddingLeft: '24px',
       fontSize: '16px'
     },

 }));

export {useStyles}