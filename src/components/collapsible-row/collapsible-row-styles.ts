import { relative } from 'path';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles<void>()((theme, _params, classes) => ({
    breakDownSection: {
       paddingLeft: '24px',
       fontSize: '16px'
     },
     iconPadded:{
        position: 'relative',
        top:'0px',
        left: '10px',
        fontSize: '16px'
     }

 }));

export {useStyles}