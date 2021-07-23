import { makeStyles } from '@material-ui/core/styles';

const globalStyles = makeStyles((theme) => ({
    root: {
        "& h1": {
            fontSize: '2rem',
            color: '#777'
        },
        '& h2': {
            fontSize: '1.5rem',
            color: '#777'
        }
    },
    breadcrumbs: {
        backgroundColor: theme.palette.grey[300],
        borderRadius: '10px',
        margin: '1rem',
        padding: '0.0005rem'
    },
    paper: {
        margin: '1rem',
        padding: '2rem'
    },
    dataGrid: {
        width: '100%',
        height: 400,
        marginTop: '0rem'
    },
    form: {
        margin: '2rem 3rem',
        display: 'flex',
        flexDirection: 'column',
        '@media (max-width:780px)': {
            margin: '0.5rem 0 0 0'
        }
    },
    formControl: {
        margin: '1rem 1rem 0 1rem',
        flexGrow: 1,
        '@media (max-width:780px)': {
            margin: '0.5rem 0 0 0'
        }
    },
    row: {
        margin: '0 0 0 1rem',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        '@media (max-width:780px)': {
            flexDirection: 'column',
            margin: 0
        }
    },
    innerFormControlSm: {
        margin: '1rem 1rem 0 0',
        width: 100,
        '@media (max-width:780px)': {
            margin: '0.5rem 0 0 0'
        }
    },
    innerFormControl: {
        margin: '1rem 1rem 0 0',
        flexGrow: 1,
        '@media (max-width:780px)': {
            margin: '0.5rem 0 0 0'
        }
    },
    buttonDiv: {
        flexGrow: 1,
        '& button' : {
            margin: '1rem 1rem 0 0',
            float: 'right',
        }
    },
    toolBar: {
        margin: '0.5rem 0 0.5rem 0',
        '& button' : {
            marginRight: '0.5rem'
        }
    }
}));

export default globalStyles;