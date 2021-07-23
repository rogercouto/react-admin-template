import { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent,DialogContentText, DialogTitle, TextField, Button } from '@material-ui/core';
import PropTypes from 'prop-types';

import globalStyles from '../../pages/globalStyles';

const LoginDialog = ( props : any ) => {

    const classes = globalStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setEmail('');
        setPassword('');
    },[props.refresh]);
    
    return (
        <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Login</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter credentials to access the system
                </DialogContentText>
                <form 
                    className={classes.form}
                    onSubmit={(e : any)=>{
                        e.preventDefault();
                        props.onSubmit(email, password);
                    }}>
                    <TextField 
                        label="E-mail" 
                        variant="outlined" 
                        className={classes.formControl}
                        type="email"
                        required
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
                    />
                    <TextField 
                        label="Password" 
                        variant="outlined" 
                        type="password" 
                        className={classes.formControl}
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />
                    <Button 
                        color="primary" 
                        variant="contained" 
                        type="submit" 
                        className={classes.formControl}>
                        Entrar
                    </Button>
                </form>
            </DialogContent>
            <DialogActions>
            </DialogActions>
        </Dialog>
    );
};

LoginDialog.propTypes = {
    refresh: PropTypes.number,
    open: PropTypes.bool,
    onSubmit:PropTypes.func.isRequired, 
    onClose: PropTypes.func.isRequired
};

LoginDialog.defaultProps = {
    refresh: 0,
    open: false,
}

export default LoginDialog;