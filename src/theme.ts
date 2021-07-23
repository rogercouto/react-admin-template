import { createTheme } from '@material-ui/core';

import grey from '@material-ui/core/colors/grey';

const myTheme = createTheme({
    palette : {
        primary: {
            main: '#6d8ccd'
        }
    },
    typography : {
        h1: {
            fontSize: '2.5rem',
            color: grey[600]
        },
        h2: {
            fontSize: '2.0rem',
            color: grey[600]
        },
        h3: {
            fontSize: '1.75rem',
            color: grey[600]
        },
        h4: {
            fontSize: '1.5rem',
            color: grey[600]
        },
        h5: {
            fontSize: '1.25rem',
            color: grey[600]
        },
        h6: {
            fontSize: '1.0rem',
            color: grey[600]
        },
        body1: {
            color: grey[800]
        },
        button: {
            textTransform: 'none'
        }
    }
});

export default myTheme;