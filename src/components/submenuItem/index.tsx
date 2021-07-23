
import PropTypes from 'prop-types';

import MenuItem from '../menuItem';

const SubmenuItem = ( props : any ) => {
    return (
        <MenuItem
            description={props.description}
            icon={props.icon}
            withTooltip={props.withTooltip}
            disabled={props.disabled}
            path={props.path}
            onClick={props.onClick}
            isNested={true}
         />
    );
}

SubmenuItem.propTypes = {
    description: PropTypes.string.isRequired,  
    icon: PropTypes.element.isRequired,
    withTooltip: PropTypes.bool,   
    disabled: PropTypes.bool,
    path: PropTypes.string,  
    onClick: PropTypes.func,
};

SubmenuItem.defaultProps = {
    withTooltip: false,
    disabled: false
}

export default SubmenuItem;