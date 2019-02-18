import React, { Component } from "react";
import { loginComplete } from "../redux/user/actions";
import { connect } from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaderStatus: false,
      nameError: "",
      passwordError: "",
      alertShow: false,
      alertErrorShow: false
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.isLoggedIn) {
      this.setState({ alertShow: true });
    }
    if (!nextProps.user.isLoggedIn) {
      this.setState({ alertErrorShow: true });
    }
  }

  login = (event) => {
    event.preventDefault();
    let { name, password } = event.target;
    if (!name.value.trim().length) {
      this.setState({ phoneError: "* Name cant be empty" });
      return;
    }

    if (!password.value.trim().length) {
      this.setState({ passwordError: "* Password cannot be empty" });
      return;
    } else {
      let data = {
        email: name.value,
        password: password.value
      };
      this.props.loginComplete(data);
    }
  }
  render() {
    return (
      <div className="login-page">
        <div className="login-form">
          <div className="login-title">Login</div>
          <form onSubmit={this.login} >
            <div className="form">
              <div className="input-group">
                <div className="input-form">
                  <div className="label">User Name</div>
                  <div className="input-field">
                    <input id="name" type="text" className="form-control" />
                  </div>
                </div>
                <div style={{ color: "red", fontSize: 12 }}>
                  {this.state.phoneError}
                </div>
                <div className="input-form">
                  <div className="label">Password</div>
                  <div className="input-field">
                    <input
                      id="password"
                      type="password"
                      className="form-control"
                    />
                  </div>
                  <div style={{ color: "red", fontSize: 12 }}>
                    {this.state.passwordError}
                  </div>
                </div>
                {this.state.alertShow && (
                  <SweetAlert
                    success
                    title="Success!"
                    onConfirm={() => this.props.history.push("./dashboard")}
                  >
                    You are sucessfully logged in!
                  </SweetAlert>
                )}
                {this.state.alertErrorShow && (
                  <SweetAlert
                    error
                    title="Error!"
                    onConfirm={() => this.setState({ alertErrorShow: false })}
                  >
                    You are unauthorised user
                  </SweetAlert>
                )}
                <div className="form-btn">
                  <button className="sub-btn">Submit</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  loginComplete
};

const mapStateToProps = state => ({
  user: state.user
});
// used to connect loginscreen with redux
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
