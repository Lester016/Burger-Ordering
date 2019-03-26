import React, { Component } from 'react';
import Aux from '../../../hoc/myAux/Aux'
import Button from '../../UI/Button/Button';
import classes from './OrderSummary.css';

class OrderSummary extends Component {
    //This could be a functional component, I just check if it renders something in the app.
    componentWillUpdate(){
        console.log("[OrderSummary] Updated");
    }

    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return( 
                <li key = {igKey} className={classes.ItemList}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span> + {this.props.ingredients[igKey]}
                </li>
                )
            });
        return(
            <Aux>
                <h3>Your Order</h3>
                <p className={classes.OrderSummary}>A delicious burger with the following ingredients: </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>continue to checkout?</p>
                <Button btnType="Danger" clicked={this.props.modalClosed}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Aux>
        )
    }
}

export default OrderSummary;