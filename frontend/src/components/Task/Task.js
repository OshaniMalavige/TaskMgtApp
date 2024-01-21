import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Pagination from "react-js-pagination";
import {addTask, getTask, updateTask} from "../../actions/taskActions";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class Task extends Component {
    constructor() {
        super();
        this.state = {
            tasks: [],
            newTask: {
                title: '',
                description: '',
            },
            updatedTask: {
                id: "",
                title: "",
                description: "",
                status: "incomplete",
            },
            isModalOpen: false,
            isUpdateModalOpen: false,
            selectedTaskId: null,
            currentPage: 1,
            itemsPerPage: 6,
            titleError: '',
            descriptionError: '',
        };
    }

    componentDidMount() {
        this.getAllTasks();
    }

    getAllTasks = () => {
        const userId = this.props.auth.user.id;

        axios
            .get(`/api/tasks/all?userId=${userId}`)
            .then((response) => {
                const allTasks = response.data;
                const filteredTasks = this.filterTasksByUserId(allTasks, userId);

                this.setState({ tasks: filteredTasks });
            })
            .catch((error) => {
                console.error('Error fetching tasks:', error);
            });
    };

    filterTasksByUserId = (tasks, userId) => {
        return tasks.filter((task) => task.userId === userId);
    };

    handleInputChange = (e, field) => {
        this.setState({
            [field]: {
                ...this.state[field],
                [e.target.name]: e.target.value,
            },
            titleError: '',
            descriptionError: '',
        });
    };

    handleAddTask = () => {
        const { newTask, tasks } = this.state;
        const userId = this.props.auth.user.id;

        if (!newTask.title || !newTask.description) {
            this.setState({
                titleError: !newTask.title ? 'Title is required.' : '',
                descriptionError: !newTask.description ? 'Description is required.' : '',
            });
            return;
        }

        // Check if a task with the same title already exists
        const isDuplicateTitle = tasks.some(task => task.title === newTask.title);

        if (isDuplicateTitle) {
            this.setState({
                titleError: 'Task with this title already exists.',
                descriptionError: '',
            });
            return;
        }

        const taskData = {
            ...newTask,
            userId: userId,
        };

        axios
            .post('/api/tasks/add', taskData)
            .then(() => {
                this.getAllTasks();
                this.setState({
                    newTask: {
                        title: "",
                        description: "",
                        userId: "",
                    },
                });
            })
            .catch((error) => {
                console.error('Error adding task:', error);
            });
    };


    updateTask = () => {
        const { updatedTask } = this.state;

        // Make API request to update task
        axios
            .put(`/api/tasks/update/${updatedTask.id}`, {
                title: updatedTask.title,
                description: updatedTask.description,
                status: updatedTask.status,
            })
            .then(() => {
                this.getAllTasks();
            })
            .catch((error) => {
                console.error("Error updating task:", error);
            });
    };

    // Add Task
    handleOpenModal = () => {
        this.setState({ isModalOpen: true });
    };

    handleCloseModal = () => {
        this.setState({ isModalOpen: false });
    };

    // Update Task
    handleOpenUpdateModal = (task) => {
        this.setState({
            isUpdateModalOpen: true,
            selectedTaskId: task._id,
            updatedTask: {
                id: task._id,
                title: task.title,
                description: task.description,
                status: task.status || 'incomplete',
            },
        });
    };

    handleCloseUpdateModal = () => {
        this.setState({ isUpdateModalOpen: false });
    };

    handlePageChange = (pageNumber) => {
        this.setState({ currentPage: pageNumber });
    };

    getCurrentPageTasks = () => {
        const { currentPage, itemsPerPage, tasks } = this.state;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return tasks.slice(startIndex, endIndex);
    };

    render() {
        const { newTask, isModalOpen, isUpdateModalOpen } = this.state;
        const currentTasks = this.getCurrentPageTasks();

        return (
            <div className="container mt-5">
                <button
                    type="button"
                    className="btn btn-primary btnAdd"
                    onClick={this.handleOpenModal}
                >
                    Add Task
                </button>

                <div
                    className={`modal fade ${isModalOpen ? 'show' : ''}`}
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden={!isModalOpen}
                    style={{ display: isModalOpen ? 'block' : 'none' }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">
                                    Add New Task
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={this.handleCloseModal}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group mb-3">
                                    <label htmlFor="taskTitle" className="form-label">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Title"
                                        value={newTask.title}
                                        className="form-control"
                                        onChange={(e) => this.handleInputChange(e, 'newTask')}
                                    />
                                    {this.state.titleError && (
                                        <div className="text-danger">{this.state.titleError}</div>
                                    )}
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="taskDescription" className="form-label">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        placeholder="Description"
                                        value={newTask.description}
                                        className="form-control"
                                        onChange={(e) => this.handleInputChange(e, 'newTask')}
                                    />
                                    {this.state.descriptionError && (
                                        <div className="text-danger">{this.state.descriptionError}</div>
                                    )}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={this.handleCloseModal}
                                >
                                    Close
                                </button>
                                <button
                                    className="btn btn-primary btnSubmit"
                                    onClick={this.handleAddTask}
                                >
                                    Add Task
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-3 mb-3">
                    {currentTasks.map((task) => (
                        <div key={task._id} className="col-md-4 mb-4">
                            <div className={`card ${task.status === 'completed' ? 'bgCompleted' : ''}`}>
                                <div className="card-body">
                                    <p className="cardTitle">{task.title}</p>
                                    <p className="cardText">{task.description}</p>
                                    <p className="cardText">{task.status}</p>
                                    <button className="btn btn-primary btnSubmit" onClick={() => this.handleOpenUpdateModal(task)}><FontAwesomeIcon icon={faEdit} /><span className="ms-1">Update</span></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="d-flex justify-content-end mt-4 mb-5">
                    <Pagination
                        activePage={this.state.currentPage}
                        itemsCountPerPage={this.state.itemsPerPage}
                        totalItemsCount={this.state.tasks.length}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange}
                        itemClass="page-item"
                        linkClass="page-link"
                        activeLinkClass="active"
                    />
                </div>

                <div
                    className={`modal fade ${isUpdateModalOpen ? 'show' : ''}`}
                    id="exampleModal2"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden={!isUpdateModalOpen}
                    style={{ display: isUpdateModalOpen ? 'block' : 'none' }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">
                                    Update Task
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={this.handleCloseUpdateModal}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group mb-3">
                                    <label htmlFor="taskTitle" className="form-label">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Title"
                                        className="form-control"
                                        value={this.state.updatedTask.title}
                                        onChange={(e) => this.handleInputChange(e, "updatedTask")}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="taskDescription" className="form-label">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        placeholder="Description"
                                        className="form-control"
                                        value={this.state.updatedTask.description}
                                        onChange={(e) => this.handleInputChange(e, "updatedTask")}
                                    />
                                    <label htmlFor="status">Status</label>
                                    <select
                                        name="status"
                                        className="form-control"
                                        value={this.state.updatedTask.status}
                                        onChange={(e) => this.handleInputChange(e, "updatedTask")}
                                    >
                                        <option value="incomplete">Incomplete</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={this.handleCloseUpdateModal}
                                >
                                    Close
                                </button>
                                <button
                                    className="btn btn-primary btnSubmit"
                                    onClick={this.updateTask}
                                >
                                    Update Task
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Task.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    addTask: PropTypes.func.isRequired,
    getTask: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { addTask, getTask, updateTask })(Task);
