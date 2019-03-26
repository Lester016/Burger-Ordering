import React from 'react';
import { withRouter } from 'react-router-dom';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = (props) => {
    console.log(props);
    let TransformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return[...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={i+igKey} type={igKey} />
        });
    }).reduce((arr, el) => {
        return arr.concat(el)}, []
    );
    if (TransformedIngredients.length === 0){
        TransformedIngredients = <p>Please add an ingredients</p>;
    }
    console.log(TransformedIngredients);
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
                {TransformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default withRouter(burger);