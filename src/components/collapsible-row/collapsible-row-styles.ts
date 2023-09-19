import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles<void>()((theme, _params, classes) => ({
   collapsibleRowContainer: {
      padding: '12px'
   },
    breakDownSection: {
       paddingLeft: '24px',
       fontSize: '16px'
     },
     iconPadded:{
        margin: '3px 6px 0px',
        fontSize: '16px'
     },
     editIcon:{
      alignSelf: 'center'
     }
 }));

export {useStyles}