import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends Component {
  // Getting data through url params (without Redux!).
  // componentWillMount () {
  //     const query = new URLSearchParams( this.props.location.search );
  //     const ingredients = {};
  //     let price = 0;
  //     for ( let param of query.entries() ) {
  //         // ['salad', '1']
  //         if (param[0] === 'price') {
  //             price = param[1];
  //         } else {
  //             ingredients[param[0]] = +param[1];
  //         }
  //     }
  //     this.setState( { ingredients: ingredients, totalPrice: price } );
  // }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ingredients) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <React.Fragment>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </React.Fragment>
      );
    }
    return <div>{summary}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
