import { Breadcrumbs, Paper, Typography, TextField } from '@material-ui/core';

import globalStyles from '../globalStyles';

import Breadcrumb from '../../components/breadcrumb';

const AccountPage = ( props : any ) => {
    const classes = globalStyles();
    return(
        <div>
            <Breadcrumbs className={classes.breadcrumbs} aria-label="Breadcrumb" separator=">">
                <Breadcrumb label="Home" href="/" />
                <Breadcrumb label="Account" />
            </Breadcrumbs>
            <Paper className={classes.paper}>
                <Typography variant="h1">Account</Typography>
                <div className={classes.form}>
                    <div className={classes.formControl}>
                        <label htmlFor="tname" className={classes.formLabel}>Name:</label> 
                        <TextField id="tname" value={'System Administrator'}/>
                    </div>
                    <div className={classes.formControl}>
                        <label htmlFor="tname" className={classes.formLabel}>Email:</label> 
                        <TextField id="tname" type="email" value={'admin@template.com'}/>
                    </div>
                </div>
            </Paper>
        </div>
    );
};

export default AccountPage;