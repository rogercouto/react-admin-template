import { Paper, Typography } from '@material-ui/core';

import globalStyles from '../globalStyles';

const HomePage = ( props : any ) => {
    const classes = globalStyles();
    return(
        <div>
            <Paper className={classes.paper}>
                <Typography variant="h1">Welcome to Admin template</Typography>
                <br />
                <Typography variant="h2">Template for react app using Material UI and Typescript</Typography>
            </Paper>
        </div>
    );
};

export default HomePage;