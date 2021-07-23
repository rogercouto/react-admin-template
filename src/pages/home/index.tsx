import { Paper, Typography } from '@material-ui/core';

import globalStyles from '../globalStyles';

const HomePage = ( props : any ) => {
    const classes = globalStyles();
    return(
        <div>
            <Paper className={classes.paper}>
                <Typography variant="h1">Bem vindo ao Admin template</Typography>
                <br />
                <Typography variant="h2">Modelo de área administrativa customizável</Typography>
            </Paper>
        </div>
    );
};

export default HomePage;