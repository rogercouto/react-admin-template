import { Fragment } from 'react';
import PropTypes from 'prop-types';

import { List, Collapse} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import MenuItem from '../menuItem';

const CollapseMenu = ( props : any ) => {

    return (
        <Fragment>
            <MenuItem
                description={props.description}
                icon={props.icon}
                onClick={props.onClick}
                withTooltip={props.withTooltip}
                disabled={props.disabled}
            >
                {props.open ? <ExpandLess /> : <ExpandMore />}
            </MenuItem>
            <Collapse in={props.open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {props.children}
                </List>
            </Collapse>
        </Fragment>
    );

};

CollapseMenu.propTypes = {
    description: PropTypes.string.isRequired,  
    icon: PropTypes.element.isRequired,
    onClick: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    withTooltip: PropTypes.bool,
    disabled: PropTypes.bool,
};

CollapseMenu.defaultProps = {
    withTooltip: false,
    disabled: false
}

export default CollapseMenu;