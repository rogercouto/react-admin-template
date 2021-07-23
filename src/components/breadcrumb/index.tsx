import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const Breadcrumb = ( props : any ) => {
    if (props.href){
        return(
            <Button href={props.href} onClick={props.onClick} className={props.className}>
                {props.label}
            </Button>
        );
    }else if (props.onClick){
        return(
            <Button href={props.href} className={props.className}>
                {props.label}
            </Button>
        );
    }else{
        return (
            <span className={props.className}>
                {props.label}
            </span>
        );
    }
}

Breadcrumb.propTypes = {
    label: PropTypes.string.isRequired,  
    href: PropTypes.string,  
    onClick: PropTypes.func,
};

Breadcrumb.defaultProps = {}

export default Breadcrumb;