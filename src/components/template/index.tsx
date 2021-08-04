import { Fragment, useContext, useState } from 'react';
import { useWindowDimensions } from '../../util/ScreenUtil';
import { createBrowserHistory } from 'history';

import clsx from 'clsx';

import { CssBaseline, Drawer, Box, AppBar, Toolbar, Typography,
IconButton, Container, Grid, List, Divider, Avatar, Snackbar, 
Button, Tooltip, Menu, MenuItem, Link } from '@material-ui/core';

import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import MenuIcon from '@material-ui/icons/Menu';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import NoMeetingRoomIcon from '@material-ui/icons/NoMeetingRoom';

import HomeIcon from '@material-ui/icons/Home';
import FaceIcon from '@material-ui/icons/Face';

import ContactsIcon from '@material-ui/icons/Contacts';
import ViewListIcon from '@material-ui/icons/ViewList';
import EditIcon from '@material-ui/icons/Edit';
import TuneIcon from '@material-ui/icons/Tune';
import HelpIcon from '@material-ui/icons/Help';

import CustomMenuItem from '../menuItem';
import CollapseMenu from '../collapseMenu';
import SubmenuItem from '../submenuItem';

import { ToastContext } from '../../providers/toastContextProvider';
import { User } from '../../model';
import UserService from '../../services/userService';
import LoginDialog from '../loginDialog';

import useStyles from './styles';

const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Template = ( props : any ) => {
   
    const history = createBrowserHistory();
    const pathname = history.location.pathname;

    const classes = useStyles();

    const { width } = useWindowDimensions();
    
    const [user, setUser] = useState<User|null>( UserService.getCurrentUser() );
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);
    const [collapseMenuOpen, setCollapseMenuOpen] = useState<boolean>(['/contacts', '/contacts/add'].includes(pathname));
    
    const [loginOpen, setLoginOpen] = useState<boolean>(false);
    const [loginRefresh, setLoginRefresh] = useState<number>(0);

    const [aMenuAnchorEl, setAMenuAnchorEl] = useState<any | null>(null);

    const toaster = useContext(ToastContext);

    const haveUser = () : boolean => {
        return (user !== null);
    };

    const handleDrawerOpen = () => {
        setMobileDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setMobileDrawerOpen(false);
    };

    const isDrawerMaxed = () : boolean => {
        return width > 1024;
    };

    const isMobile = () : boolean => {
        return width < 600;
    };

    const handleCollapseToggle = () => {
        setCollapseMenuOpen(!collapseMenuOpen);
    };

    const SideMenu = () => {
        const withTooltip = !isMobile() && !isDrawerMaxed();
        return (
            <List>
                <CustomMenuItem 
                    description="Home"
                    path="/"
                    icon={<HomeIcon />}
                    withTooltip={withTooltip}
                />
                <Divider />
                <CustomMenuItem 
                    description="Account info"
                    path="/account"
                    icon={<FaceIcon />}
                    withTooltip={withTooltip}
                    disabled={!haveUser()}
                />
                <Divider />
                <CollapseMenu 
                    description="Contacts"
                    open={collapseMenuOpen}
                    onClick={handleCollapseToggle}
                    icon={<ContactsIcon />}
                    withTooltip={withTooltip}
                    disabled={!haveUser()}
                >   
                    <Divider />
                    <SubmenuItem 
                        description="List contacts"
                        path="/contacts"
                        icon={<ViewListIcon />}
                        withTooltip={withTooltip}
                        disabled={!haveUser()}
                    />
                    <SubmenuItem 
                        description="Add contact"
                        path="/contacts/add"
                        icon={<EditIcon />}
                        withTooltip={withTooltip}
                        disabled={!haveUser()}
                    />
                </CollapseMenu>
                <Divider />
                <CustomMenuItem 
                    description="Settings"
                    path="/settings"
                    icon={<TuneIcon />}
                    withTooltip={withTooltip}
                    disabled={!haveUser()}
                />
                <Divider />
                <CustomMenuItem 
                    description="Help"
                    path="/help"
                    icon={<HelpIcon />}
                    withTooltip={withTooltip}
                />
                <Divider /> 
            </List>
        );
    }
    

    const FixedDrawer = () => {
        if (width > 600 && (!history.location || pathname !== '/login')){
            const open = width > 1024;
            return (
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                    }}
                    open={open}
                >
                    <div className={classes.toolbarIcon}>
                    </div>
                    <SideMenu />
                </Drawer>   
            );
        }
        return <Fragment />
    };

    const MobileDrawer = () => {
        return (
          <Drawer
            anchor={'left'} 
            open={mobileDrawerOpen}
            onClose={handleDrawerClose}
            classes={{
                paper: classes.drawerPaper,
            }}
          >
              <div className={classes.toolbarIcon}>
              </div>
              <SideMenu />
          </Drawer>
        );
    }

    const openLogin = () => {
        setLoginOpen(true);
    };

    const closeLogin = () => {
        setLoginOpen(false);
    }

    const confirmLogin = async (email: string, password: string) => {
        const tmpUser = await UserService.login(email, password);
        if (tmpUser){
            setUser(tmpUser);
            toaster.show(`Welcome ${tmpUser.name}!`, 'success');
            closeLogin();
            setLoginRefresh(loginRefresh + 1);
        }else{
            toaster.show('Wrong usename or password!', 'error');
        }
    }

    const confirmLogout = () => {
        UserService.logout();
        setUser(null);
    }

    
    const handleAvatarClick = (target : any) => {
        setAMenuAnchorEl(target);
    };
    
    const handleAvatarMenuClose = () => {
      setAMenuAnchorEl(null);
    };

    const TopRightMenu = () => {
        if (user){
            return (
                <Fragment>
                    <Tooltip title="Logout">
                        <Button className={classes.topRightButton} onClick={confirmLogout}>
                            <NoMeetingRoomIcon />
                        </Button>
                    </Tooltip>
                </Fragment>
            );
        }
        return(
            <Tooltip title="Login">
                <Button className={classes.topRightButton} onClick={openLogin}>
                    <MeetingRoomIcon />
                </Button>
            </Tooltip>
        );
    };

    const Copyright = () => {
        return (
            <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
                Roger Eduardo de Couto - {new Date().getFullYear()}
            {'.'}
            </Typography>
        );
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, isDrawerMaxed() && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, !isMobile() && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <SupervisorAccountIcon />
                    <Typography component="h5" variant="h5" color="inherit" noWrap>
                        Admin Template 
                    </Typography>
                    <span className={classes.expand}/>
                    <TopRightMenu />
                    <Button aria-controls="simple-menu" aria-haspopup="true" 
                        style={{ display: user? 'block' : 'none'}}
                        onClick={(e)=>{
                            handleAvatarClick(e.currentTarget);
                        }}
                    >
                        <Avatar className={classes.orange} >A</Avatar>
                    </Button>
                </Toolbar>
            </AppBar>
            <FixedDrawer />
            <MobileDrawer />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3} className={classes.normalContent}>
                    <Grid item xs={12}>
                        {props.children}
                    </Grid>
                </Grid>
                <Box pt={4}>
                    <Copyright />
                </Box>
                </Container>
            </main>
            <Menu
                id="user-menu"
                anchorEl={aMenuAnchorEl}
                keepMounted
                open={Boolean(aMenuAnchorEl)}
                onClose={handleAvatarMenuClose}
            >
                <MenuItem>
                    <Link href="/account" className={classes.menuLink}>
                        My Account
                    </Link>
                </MenuItem>
                <MenuItem onClick={()=>{
                    confirmLogout();
                    handleAvatarMenuClose();
                }}>Logout</MenuItem>
            </Menu>
            <LoginDialog 
                open={loginOpen}
                onSubmit={confirmLogin}
                onClose={closeLogin}
                refresh={loginRefresh}
            />
            <Snackbar open={toaster.toast.open} autoHideDuration={10000} onClose={toaster.hide}>
                <Alert onClose={toaster.hide} severity={toaster.toast.color}>
                {toaster.toast.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Template;