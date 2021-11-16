import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import * as userActions from "../../redux/actions/userActions";

class Login extends React.Component<any> {
    static propTypes = {
        history: PropTypes.object.isRequired
    };

    state = {
        username: '',
        password: ''
    };

    handleUsernameChange = (event: any) => {
        this.setState({username: event.target.value});
    };

    handlePasswordChange = (event: any) => {
        this.setState({password: event.target.value});
    };

    submitLogin = (event: React.FormEvent) => {
        const { login } = this.props;

        login({
            username: this.state.username,
            password: this.state.password
        }).then(() => {
            const { history } = this.props;
            history.push('/dashboard');
        });
        event.preventDefault();
    };

    render() {
        return (
        <section>
            <form onSubmit={this.submitLogin}>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleUsernameChange}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                        required
                    />
                </label>
                <input type="submit" value="Submit" />
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
