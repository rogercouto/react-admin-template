import { Breadcrumbs, Paper, Typography } from '@material-ui/core';

import globalStyles from '../globalStyles';

import Breadcrumb from '../../components/breadcrumb';

const HelpPage = ( props : any) => {
    const classes = globalStyles();
    return(
        <div>
            <Breadcrumbs className={classes.breadcrumbs} aria-label="Breadcrumb" separator=">">
                <Breadcrumb label="Home" href="/" />
                <Breadcrumb label="Help" />
            </Breadcrumbs>
            <Paper className={classes.paper}>
                <Typography variant="h1">Help</Typography>
                
                
            </Paper>
        </div>
    );
};

export default HelpPage;