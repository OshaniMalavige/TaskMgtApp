import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/task");
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.auth.isAuthenticated && !prevProps.auth.isAuthenticated) {
      this.props.history.push("/task");
    }

    // Check for changes in errors
    if (this.props.errors !== prevProps.errors) {
      this.setState({
        errors: this.props.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
      errors: {
        ...this.state.errors,
        [e.target.id]: "",
      },
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
        <div className="container mt-5 mb-5 p-lg-5">
          <div className="row">
            <div className="col-md-6">
              <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                  alt="user login"
                  className="img-fluid"
              />
            </div>
            <div className="col-md-6 m-auto">
              <div className="card border-0">
                <div className="card-body">
                  <h4 className="card-title">
                    Login
                  </h4>
                  <form noValidate onSubmit={this.onSubmit}>
                    <div className="form-group mb-3">
                      <label htmlFor="email">Email</label>
                      <input
                          onChange={this.onChange}
                          value={this.state.email}
                          error={errors.email}
                          id="email"
                          type="email"
                          className={classnames("form-control", {
                            invalid: errors.email || errors.emailnotfound,
                          })}
                      />
                      <span className="text-danger">
                      {errors.email}
                        {errors.emailnotfound}
                    </span>
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="password">Password</label>
                      <input
                          onChange={this.onChange}
                          value={this.state.password}
                          error={errors.password}
                          id="password"
                          type="password"
                          className={classnames("form-control", {
                            invalid:
                                errors.password || errors.passwordincorrect,
                          })}
                      />
                      <span className="text-danger">
                      {errors.password}
                        {errors.passwordincorrect}
                    </span>
                    </div>
                    <div className="form-group mb-3">
                      <div className="col-md-12">
                        <button type="submit" className="btn btn-primary w-100">
                          Login
                        </button>
                      </div>
                    </div>
                  </form>
                  <p className="text-center">
                    Don't have an account? <Link to="/register">Signup</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
