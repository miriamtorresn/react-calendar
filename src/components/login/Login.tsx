import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import * as userActions from "../../redux/actions/userActions";

import './styles.scss';

class Login extends React.Component<any> {
    static propTypes = {
        history: PropTypes.object.isRequired
    };

    state = {
        loginInfo: {
            username: '',
            password: ''
        }
    };

    handleInputChange = (event: any) => {
        this.setState({ loginInfo: {
                ...this.state.loginInfo,
                [event.target.name] : event.target.value
            }
        });
    }

    submitLogin = (event: React.FormEvent) => {
        const { login } = this.props;

        login(this.state.loginInfo).then(() => {
            const { history } = this.props;
            history.push('/dashboard');
        });
        event.preventDefault();
    };

    render() {
        return (
        <section className="login">
            <form onSubmit={this.submitLogin} className="login__form">
                <h2>Login</h2>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={this.state.loginInfo.username}
                    onChange={this.handleInputChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={this.state.loginInfo.password}
                    onChange={this.handleInputChange}
                    required
                />
                <input type="submit" value="Submit" className="button button__primary"/>
            </form>
        </section>
        )
    }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    login: bindActionCreators(userActions.login, dispatch),
  };
};

const DecoratedLogin = withRouter(Login);

export default connect(
    () => ({}),
    mapDispatchToProps
)(DecoratedLogin);
