//Useful for starting to build app in react.
import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../myAux/Aux';


const withErrorHandler = (WrrappedComponent, axios) => {
    return class extends Component {
        state = { 
            error: null
        }

        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({
                    error: null
                });
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(/*Shorthand return*/ res => res, error => {
                this.setState ({
                    error: error
                });
            });
        }

        componentWillUnmount () {
            console.log("Will UnMount", this.reqInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
        
        errorConfirmedHandler = () => {
            this.setState({
                error: null
            })
        }

        render () {
            return(
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrrappedComponent {...this.props}/>
                </Aux>
            )
        }
    } 
    
}

export default withErrorHandler;