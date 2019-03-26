import React, { Component } from 'react';
import Aux from '../../hoc/myAux/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControl from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders.js';

const INGREDIENT_PRICES = {
    salad: 3.50,
    cheese: 5.00,
    meat: 8.00,
    bacon: 4.00
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 23,
        purchasable: true,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://my-awesome-burger-in-react.firebaseio.com/ingredients.json')
            .then(Response => {
                this.setState({ ingredients: Response.data });
                return Response;
            })
            .catch(err => {
                this.setState({ error: true });
                return err;
            });
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            }).reduce((sum, el) => {
                return sum + el;
            })
        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice, ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            totalPrice: newPrice, ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }
    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    }
    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    }
    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
            console.log(i);
        }
        queryParams.push('price=' + this.state.totalPrice)
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
        //alert("You Continued!");
        // this.setState({
        //     loading: true
        // })
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     //Other dummy info
        //     customer: {
        //         name: 'my name',
        //         address: {
        //             street: 'my address 123',
        //             zipCode: '1010',
        //             country: 'USA',
        //         },
        //         email: 'test@gmail.com',
        //     },
        //     deliveryMethod: 'Cheapest/Slow'
        // }
        // axios.post('/post.json', order)
        //     .then(Response => {
        //         console.log(Response);
        //         this.setState({
        //             loading: false,
        //             purchasing: false
        //         });
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         this.setState({
        //             loading: false,
        //             purchasing: false
        //         });
        //     });
    }
    render() {

        const disabledInfo = {
            ...this.state.ingredients
        }

        
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;

        let burger = this.state.error ? <h1 style={{ padding: "30px", textAlign: "center", marginTop: '20%', lineHeight: '20px' }}>Error 404: Burger not found!</h1> : <Spinner />;

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BurgerControl
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disable={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice} />
                </Aux>
            );
            //Note if it has a Component name with the same variable name, Always make the variable small cases for error free.
            orderSummary = <OrderSummary ingredients={this.state.ingredients}
                modalClosed={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler} />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} clicked={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);