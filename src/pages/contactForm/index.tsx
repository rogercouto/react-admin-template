import { useContext, useState } from 'react';

import ReactInputMask from 'react-input-mask';

import { TextField, Button, Breadcrumbs, Paper, Typography } from '@material-ui/core';

import Breadcrumb from '../../components/breadcrumb';
import globalStyles from '../globalStyles';

import SaveIcon from '@material-ui/icons/Save';

import { ToastContext } from '../../providers/toastContextProvider';
import { Contact } from '../../model';
import ContactService from '../../services/contactService';

const ContactFormPage = ( props : any ) => {
    const contact = props.location.state?.contact;

    const classes = globalStyles();
    const toaster = useContext( ToastContext );

    const [name, setNome] = useState<string>(contact?.name || '');
    const [erroNome, setErroNome] = useState<string>('');
    const [temErroNome, setTemErroNome] = useState<boolean>(false);

    const [age, setAge] = useState<number | null>(contact?.age || null);
    const [phone, setPhone] = useState<string | null>(contact?.phone || null);
    const [email, setEmail] = useState<string | null>(contact?.email || null);

    const handleNomeChange = (e : any) => {
        const tmpNome = e.target.value;
        if (tmpNome.trim().length === 0){
            setErroNome('Nome não pode ficar em branco!');
            setTemErroNome(true);
        }else{
            setErroNome('');
            setTemErroNome(false);
        }
        setNome(tmpNome);
    };

    const handleNomeExit = () => {
        if (name.trim().length === 0){
            setErroNome('Titulo não pode ficar em branco!');
            setTemErroNome(true);
        }
    };

    const canSubmit = () => {
        if (name){
            return name.trim().length > 0;
        }
        return false;
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        toaster.show('Contact saved', 'success');
        let savedContact;
        if (contact && contact.id){
            //edit
            savedContact = new Contact(contact.id, name, age || undefined, phone || undefined, email || undefined);
            ContactService.update(savedContact);
        }else{
            //insert
            savedContact = new Contact(undefined, name, age || undefined, phone || undefined, email || undefined);
            savedContact.id = await ContactService.insert(savedContact);
        }   
        props.history.push({
            pathname: '/contacts',
            state: { contact: savedContact }
        });
    };

    return(
        <div>
            <Breadcrumbs className={classes.breadcrumbs} aria-label="Breadcrumb" separator=">">
                <Breadcrumb label="Home" href="/" />
                <Breadcrumb label="Contacts" href="/contacts" />
                <Breadcrumb label={contact ? 'Edit' : 'Add'} />
            </Breadcrumbs>
            <Paper className={classes.paper}>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Typography variant="h3" className={classes.formControl}>{contact ? 'Edit' : 'Add'} contact</Typography>
                    <TextField 
                        error={temErroNome}
                        helperText={erroNome}
                        label="Nome *" 
                        variant="outlined" 
                        className={classes.formControl}
                        type="text"
                        value={name}
                        onChange={handleNomeChange}
                        onBlur={handleNomeExit}
                    />
                    <div className={classes.row}>
                        <TextField 
                            label="Age" 
                            variant="outlined" 
                            className={classes.innerFormControlSm}
                            type="number"
                            value={age}
                            onChange={(e:any)=>{setAge(e.target.value)}}
                        />
                        <ReactInputMask 
                            mask="(99) 99999-9999" 
                            defaultValue="" 
                            value={phone||''}
                            onChange={(e:any)=>{setPhone(e.target.value)}}
                            >
                            <TextField 
                                label="Phone" 
                                variant="outlined" 
                                className={classes.innerFormControl}
                                type="phone"
                            />
                        </ReactInputMask>
                        <TextField 
                            label="E-mail" 
                            variant="outlined" 
                            className={classes.innerFormControl}
                            type="email"
                            value={email}
                            onChange={(e:any)=>{setEmail(e.target.value)}}
                        />
                    </div>
                    <div className={classes.buttonDiv}>
                        <Button 
                            disabled={!canSubmit()}
                            variant="contained" type="submit" color="primary">
                            <SaveIcon />
                            Salvar
                        </Button>
                    </div>
                </form>
            </Paper>
        </div>
    );
};

export default ContactFormPage;