
import { createBrowserHistory } from 'history';

import { ListItem, ListItemIcon, ListItemText, Tooltip } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import PropTypes from 'prop-types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    default: {},
    nested: {
      paddingLeft: theme.spacing(4),
    },
    selected: {
      backgroundColor: theme.palette.action.hover,
    },
  }),
);

const CustomMenuItem = ( props : any ) => {

    const styles = useStyles();
    const style = props.isNested ? styles.nested : styles.default;
    const history = createBrowserHistory();
    const pathname = history.location.pathname;

    if (props.withTooltip){
        return (
            <Tooltip title={props.description}>
                <span>
                    <ListItem 
                    button 
                    disabled={props.disabled}
                    className={clsx(style, pathname === props.path && styles.selected)}
                    component="a" 
                    href={props.path}
                    onClick={props.onClick}>
                    <ListItemIcon>
                        {props.icon}
                    </ListItemIcon>
                    {props.children}
                </ListItem>
                </span>
            </Tooltip> 
        );
    }else{
        return (
            <ListItem 
                button 
                disabled={props.disabled}
                className={clsx(style, pathname === props.path && styles.selected)}
                component="a" 
                href={props.path}
                onClick={props.onClick}>
                <ListItemIcon>
                    {props.icon}
                </ListItemIcon>
                <ListItemText primary={props.description} />
                {props.children}      
            </ListItem>
        );
    }
}

CustomMenuItem.propTypes = {
    description: PropTypes.string.isRequired,  
    icon: PropTypes.element.isRequired,

    withTooltip: PropTypes.bool,
    isNested: PropTypes.bool,
    disabled: PropTypes.bool,

    path: PropTypes.string,  
    onClick: PropTypes.func,
    children: PropTypes.node,
};

CustomMenuItem.defaultProps = {
    withTooltip: false,
    isNested: false,
    disabled: false
}

export default CustomMenuItem;