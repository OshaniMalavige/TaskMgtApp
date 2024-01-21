import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authActions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSignOut} from "@fortawesome/free-solid-svg-icons";

const Header = ({ auth, logoutUser }) => {

    const onLogoutClick = (e) => {
        e.preventDefault();
        logoutUser();
    };

    const { isAuthenticated, user } = auth;

    const authLinks = (
        <div className="d-flex">
            <span className="btn">Hi, {user.name}</span>
            <button onClick={onLogoutClick} className="btn btnHeader"><FontAwesomeIcon icon={faSignOut} /><span className="ms-1">Logout</span></button>
        </div>
    );

    const guestLinks = (
        <div className="d-flex">
            <Link to="/register" className="btn btnHeader">
                Signup
            </Link>
            <Link to="/login" className="btn btnHeader">
                Login
            </Link>
        </div>
    );

    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    <img src={"https://www.strunkmedia.com/wp-content/uploads/2018/05/bigstock-Print-163213010.png"} height="40" alt="logo" />
                </Link>
                {isAuthenticated ? authLinks : guestLinks}
            </div>
        </nav>
    );
};

Header.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Header);
