import { useContext, useState, useEffect } from 'react';

import { Breadcrumbs, Paper, Typography, Button } from '@material-ui/core';
import { DataGrid, GridColDef, GridPageChangeParams, GridRowId } from '@material-ui/data-grid';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import globalStyles from '../globalStyles';

import Breadcrumb from '../../components/breadcrumb';

import { Contact } from '../../model';

import { ToastContext } from '../../providers/toastContextProvider';

import ContactService,{ ContactData } from '../../services/contactService';
import QuestionDialog from '../../components/questionDialog';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'age', headerName: 'Age', type: 'number', width: 150, },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 }
];

const getStartPage = (contact : Contact) => {
    if (contact && contact.id){
        console.log(ContactService.getContactPage(contact))
        return ContactService.getContactPage(contact);
    }
    return 0;
}

const ContactsPage = ( props : any ) => {

    const savedContact = props.location.state?.contact;
    
    const classes = globalStyles();
    const toastContext = useContext( ToastContext );

    const [page, setPage] = useState<number>(getStartPage(savedContact));
    const [rows, setRows] = useState<Array<Contact>>([]);
    const [totalRows, setTotalRows] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);
    const [questionOpen, setQuestionOpen] = useState<boolean>(false);

    useEffect(()=>{
        setLoading(true);
        ContactService.findPage(page).then((data : ContactData)=>{
            setRows(data.pageContacts);
            setTotalRows(data.totalContacts);
            setLoading(false);
        });
    },[savedContact, page]);

    const handlePageChange = (params: GridPageChangeParams) => {
        setSelectionModel([]);
        setPage(params.page);
    };

    const haveSelection = (): boolean => {
        return (selectionModel.length > 0);
    };

    const handleInsert = () => {
        props.history.push('/contacts/add');
    };

    const getSelectedContact = () : Contact | null => {
        const id = selectionModel[0];
        const f = rows.filter((c: Contact) => {
            return c.id === id;
        });
        if (f.length > 0){
            return f[0];
        }
        return null;
    };

    const handleUpdate = () => {
        const contact = getSelectedContact();
        if (contact){
            props.history.push({
                pathname: '/contacts/edit',
                state: { contact }
            });
        }
    };

    const handleDelete = () => {
        setQuestionOpen(true);
    };

    const handleConfirmDelete = () => {
        const contact = getSelectedContact();
        if (contact){
            ContactService.delete(contact);
            const filteredRows = rows.filter((c: Contact)=>{
                return c.id !== contact.id;
            });
            setRows(filteredRows);
            setQuestionOpen(false);
            toastContext.show('Contact was deleted!', 'success');    
        }
    };

    const handleCancelDelete = () => {
        setQuestionOpen(false);
    };

    return(
        <div>
            <Breadcrumbs className={classes.breadcrumbs} aria-label="Breadcrumb" separator=">">
                <Breadcrumb label="Home" href="/" />
                <Breadcrumb label="Contacts" />
            </Breadcrumbs>
            <Paper className={classes.paper}>
                <Typography variant="h2">Contacts</Typography>
                <div className={classes.toolBar}>
                    <Button 
                        onClick={handleInsert}
                        variant="contained" type="button" color="primary">
                        <AddCircleIcon />
                        Add
                    </Button>
                    <Button 
                        onClick={handleUpdate}
                        variant="contained" type="button" color="primary" 
                        disabled={!haveSelection()}>
                        <EditIcon />
                        Edit
                    </Button>
                    <Button 
                        onClick={handleDelete}
                        variant="contained" type="button" color="primary"  
                        disabled={!haveSelection()}>
                        <DeleteForeverIcon />
                        Delete
                    </Button>
                </div>
                <div className={classes.dataGrid}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowCount={totalRows}
                        paginationMode='server'
                        onPageChange={handlePageChange}
                        loading={loading}
                        onSelectionModelChange={(newSelection) => {
                            setSelectionModel(newSelection.selectionModel);
                            console.log(newSelection.selectionModel);
                        }}
                    />
                </div>     
            </Paper>
            <QuestionDialog
                title="Warning!"
                message="The contact will be deleted, are you sure?"
                open={questionOpen}
                onConfirm={handleConfirmDelete}
                onClose={handleCancelDelete}
            />
        </div>
    );
};

export default ContactsPage;