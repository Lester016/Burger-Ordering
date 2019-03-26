import React, {Component} from 'react';
import Aux from '../myAux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar.js';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    closeSideDrawerHandler = () => {
        this.setState({showSideDrawer: false});
    }

    openSideDrawerHandler = () => {
        this.setState( ( prevState ) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }

    render () {
        return(
            <Aux>
                <Toolbar show={this.openSideDrawerHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.closeSideDrawerHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;