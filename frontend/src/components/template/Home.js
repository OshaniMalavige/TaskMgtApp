import React, { Component } from 'react';

class Home extends Component {
    render() {
        return (
            <div className="d-flex align-items-center justify-content-center">
                <h4 className="text-center section-heading">Welcome to Task Management Application</h4>
                <img className="img-fluid" alt="home" src="https://www.cflowapps.com/wp-content/uploads/2018/07/task-management-process.png"/>
            </div>
        );
    }
}

export default Home;
