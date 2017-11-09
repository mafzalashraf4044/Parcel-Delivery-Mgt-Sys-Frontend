import React from 'react';

//  third party libraries
import PropTypes from 'prop-types';

//  third party components
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

//  redux
import { connect } from 'react-redux';
import * as Actions from '../actions';

//  styles
import './LoginForm.css';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        };
    }

    render() {
        return (
            <div className="login-container paper-container">
                <Paper className="login-paper paper" zDepth={2}>
                    <div className="header">
                        Login Here
                    </div>

                    <div className="login-form form">

                        <div className="username input-field">
                            <TextField
                                type="text"
                                fullWidth
                                floatingLabelText="Username"
                                value={this.state.username}
                                data-key="username"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="password input-field">
                            <TextField
                                type="password"
                                fullWidth
                                floatingLabelText="Password"
                                value={this.state.password}
                                data-key="password"
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="actions">
                        <FlatButton label="Login" primary={true} onClick={this.login} />
                    </div>

                </Paper>
            </div>
        );
    }
}

LoginForm.propTypes = {
    setIsLoggedIn: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});
  
const mapDispatchToProps = (dispatch) => ({
    login: credentials => dispatch(Actions.login(credentials)),
    setLoader: loader => dispatch(Actions.setLoader(loader)),
    setResponseMsg: responseMsg => dispatch(Actions.setResponseMsg(responseMsg)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);