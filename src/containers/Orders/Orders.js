import React, { Component } from "react";
import { connect } from "react-redux";

import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  componentDidMount() {
    this.props.onAutoSignup();
    console.log("onAutoSignup");
    let token = this.props.token;
    if (token === null) {
      token = localStorage.getItem("token");
    }
    this.props.onFetchInit(token);
  }

  render() {
    let order = <Spinner />;
    if (!this.props.loading) {
      order = this.props.orders.map((order) => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ));
    }
    return <div>{order}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchInit: (token) => dispatch(actions.fetchOrder(token)),
    onAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
