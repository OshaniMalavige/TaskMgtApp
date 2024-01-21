import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
        <div className="container mt-3 mb-5">
          <div className="row">
            <div className="col-md-6">
              <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                  alt="user register"
                  className="img-fluid"
              />
            </div>
            <div className="col-md-6">
              <div className="card border-0">
                <div className="card-body">
                  <h4 className="card-title">
                    Signup
                  </h4>
                  <form noValidate onSubmit={this.onSubmit}>
                    <div className="form-group mb-3">
                    <label htmlFor="name">Name</label>
                    <input
                        onChange={this.onChange}
                        value={this.state.name}
                        error={errors.name}
                        id="name"
                        type="text"
                        className={classnames("form-control", {
                          invalid: errors.name
                        })}
                    />
                    <span className="text-danger">{errors.name}</span>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                      onChange={this.onChange}
                      value={this.state.email}
                      error={errors.email}
                      id="email"
                      type="email"
                      className={classnames("form-control", {
                        invalid: errors.email
                      })}
                  />
                  <span className="text-danger">{errors.email}</span>
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
                        invalid: errors.password
                      })}
                  />
                  <span className="text-danger">{errors.password}</span>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password2">Confirm Password</label>
                  <input
                      onChange={this.onChange}
                      value={this.state.password2}
                      error={errors.password2}
                      id="password2"
                      type="password"
                      className={classnames("form-control", {
                        invalid: errors.password2
                      })}
                  />
                  <span className="text-danger">{errors.password2}</span>
                </div>
                    <div className="mb-3">
                      <button
                          className="btn btn-primary"
                          type="submit"
                          style={{
                            width: "100%",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            marginTop: "1rem"
                          }}
                      >
                        Signup
                      </button>
                    </div>
                  </form>
                  <p className="text-center">
                    Already have an account? <Link to="/login">Log in</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
