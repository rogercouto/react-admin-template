import { Breadcrumbs, Paper, Typography } from '@material-ui/core';

import globalStyles from '../globalStyles';

import Breadcrumb from '../../components/breadcrumb';

const SettingsPage = ( props : any) => {
    const classes = globalStyles();
    return(
        <div>
            <Breadcrumbs className={classes.breadcrumbs} aria-label="Breadcrumb" separator=">">
                <Breadcrumb label="Home" href="/" />
                <Breadcrumb label="Settings" />
            </Breadcrumbs>
            <Paper className={classes.paper}>
                <Typography variant="h1">Settings</Typography>
                
                
            </Paper>
        </div>
    );
};

export default SettingsPage;