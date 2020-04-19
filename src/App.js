import React, { Component, Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";
import Spinner from "./components/UI/Spinner/Spinner";

const Checkout = React.lazy(() => import("./containers/Checkout/Checkout"));
const Orders = React.lazy(() => import("./containers/Orders/Orders"));
const Authentication = React.lazy(() => import("./containers/Auth/Auth"));

class App extends Component {
  componentDidMount() {
    this.props.onAutoSignup();
  }

  render() {
    return (
      <div>
        <Layout>
          <Suspense fallback={<Spinner />}>
            <Switch>
              <Route path="/checkout" component={Checkout} />
              <Route path="/orders" component={Orders} />
              <Route path="/auth" exact component={Authentication} />
              <Route path="/logout" component={Logout} />
              <Route path="/" exact component={BurgerBuilder} />
              <Redirect to="/" />
            </Switch>
          </Suspense>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(App));
