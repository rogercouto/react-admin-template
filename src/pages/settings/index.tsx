import { Breadcrumbs, Paper, Typography, Button, Checkbox, Switch } from '@material-ui/core';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import globalStyles from '../globalStyles';

import Breadcrumb from '../../components/breadcrumb';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
      marginBottom: '1rem',
    },
  }),
);

const SettingsPage = ( props : any) => {
    const classes = globalStyles();
    const styles = useStyles();
    return(
        <div className={props.root}>
            <Breadcrumbs className={classes.breadcrumbs} aria-label="Breadcrumb" separator=">">
                <Breadcrumb label="Home" href="/" />
                <Breadcrumb label="Settings" />
            </Breadcrumbs>
            <Paper className={classes.paper}>
                <Typography variant="h1">Settings</Typography>
                <Typography variant="h2">Components exemple</Typography>
                <br />
                <Typography variant="h3">Buttons</Typography>
                <div className={styles.root}>
                    <Button variant="contained">Default</Button>
                    <Button variant="contained" color="primary">
                        Primary
                    </Button>
                    <Button variant="contained" color="secondary">
                        Secondary
                    </Button>
                    <Button variant="contained" disabled>
                        Disabled
                    </Button>
                    <Button variant="contained" color="primary" href="#contained-buttons">
                        Link
                    </Button>
                </div>
                <Typography variant="h3">Text Buttons</Typography>
                <div className={styles.root}>
                    <Button>Default</Button>
                    <Button color="primary">Primary</Button>
                    <Button color="secondary">Secondary</Button>
                    <Button disabled>Disabled</Button>
                    <Button href="#text-buttons" color="primary">
                        Link
                    </Button>
                </div>
                <Typography variant="h3">Outlined Buttons</Typography>
                <div className={styles.root}>
                    <Button variant="outlined">Default</Button>
                    <Button variant="outlined" color="primary">
                        Primary
                    </Button>
                    <Button variant="outlined" color="secondary">
                        Secondary
                    </Button>
                    <Button variant="outlined" disabled>
                        Disabled
                    </Button>
                    <Button variant="outlined" color="primary" href="#outlined-buttons">
                        Link
                    </Button>
                </div>
                <Typography variant="h3">Checkboxes</Typography>
                <div>
                    <Checkbox
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    <Checkbox
                        defaultChecked
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                    <Checkbox disabled inputProps={{ 'aria-label': 'disabled checkbox' }} />
                    <Checkbox disabled checked inputProps={{ 'aria-label': 'disabled checked checkbox' }} />
                    <Checkbox
                        defaultChecked
                        indeterminate
                        inputProps={{ 'aria-label': 'indeterminate checkbox' }}
                    />
                    <Checkbox
                        defaultChecked
                        color="default"
                        inputProps={{ 'aria-label': 'checkbox with default color' }}
                    />
                    <Checkbox
                        defaultChecked
                        size="small"
                        inputProps={{ 'aria-label': 'checkbox with small size' }}
                    />
                </div>
                <Typography variant="h3">Switches</Typography>
                <div>
                    <Switch
                        name="checkedA"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    <Switch
                        color="primary"
                        name="checkedB"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    <Switch inputProps={{ 'aria-label': 'primary checkbox' }} />
                    <Switch disabled inputProps={{ 'aria-label': 'disabled checkbox' }} />
                    <Switch disabled checked inputProps={{ 'aria-label': 'primary checkbox' }} />
                    <Switch
                        defaultChecked
                        color="default"
                        inputProps={{ 'aria-label': 'checkbox with default color' }}
                    />
                </div>
            </Paper>
        </div>
    );
};

export default SettingsPage;