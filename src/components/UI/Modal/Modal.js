import React, { Component } from 'react';
import classes from './Modal.css'
import Aux from '../../../hoc/myAux/Aux';
import Backdrop from '../Backdrop/Backdrop';


class modal extends Component {

    //Improve the performance of the app by preventing the other component unnecessary rendering.
    shouldComponentUpdate(nextProps){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentWillUpdate(){
        console.log("[Modal] Updated");
    }

    render (){
        return(
            <Aux>
                <Backdrop show = {this.props.show} clicked={this.props.modalClosed}/>
                <div 
                style={{transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'}}
                className={classes.Modal}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default modal; 