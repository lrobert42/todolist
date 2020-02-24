import React, { Component } from 'react';
import axios from 'axios';

export default class EditTodo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            todo_description: '',
            todo_user: '',
            todo_content: '',
            todo_priority: '',
            todo_completed: false
        }

        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this)
        this.onChangeTodoUser = this.onChangeTodoUser.bind(this)
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this)
        this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this)
        this.onChangeTodoContent = this.onChangeTodoContent.bind(this)
        this.disableEnterKey = this.disableEnterKey.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.deleteTodo = this.deleteTodo.bind(this)
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    todo_description: response.data.todo_description,
                    todo_user: response.data.todo_user,
                    todo_content: response.data.todo_content,
                    todo_priority: response.data.todo_priority,
                    todo_completed: response.data.todo_completed
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeTodoDescription(e) {
        this.setState({
            todo_description: e.target.value
        });
    }

    onChangeTodoUser(e) {
        this.setState({
            todo_user: e.target.value
        });
    }

    onChangeTodoPriority(e) {
        this.setState({
            todo_priority: e.target.value
        });
    }

    onChangeTodoContent(e) {
        this.setState({
            todo_content: e.target.value
        });
    }

    onChangeTodoCompleted(e) {
        this.setState({
            todo_completed: !this.state.todo_completed
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            todo_description: this.state.todo_description,
            todo_user: this.state.todo_user,
            todo_priority: this.state.todo_priority,
            todo_content: this.state.todo_content,
            todo_completed: this.state.todo_completed
        };
        console.log(obj);
        axios.post('http://localhost:4000/todos/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/');
    }

    disableEnterKey(e){
      return e.keyCode != 13
    }

    deleteTodo(e){
      e.preventDefault();
      const obj = {
          todo_description: this.state.todo_description,
          todo_user: this.state.todo_user,
          todo_priority: this.state.todo_priority,
          todo_content: this.state.todo_content,
          todo_completed: this.state.todo_completed
      };
      console.log(obj);
      axios.post('http://localhost:4000/todos/delete/'+this.props.match.params.id, obj)
          .then(res => console.log(res.data));

      this.props.history.push('/');
  }

    render() {
        return (
            <div>
                <h3 align="center">Update Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_description}
                                onChange={this.onChangeTodoDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label>Content: </label>
                        <input
                                onKeyPress={this.disableEnterKey}
                                id="content"
                                type="text"
                                height="900"
                                className="form-control"
                                value={this.state.todo_content}
                                onChange={this.onChangeTodoContent}
                                />
                    </div>
                    <div className="form-group">
                        <label>User: </label>
                        <input
                                type="text"
                                className="form-control"
                                value={this.state.todo_user}
                                onChange={this.onChangeTodoUser}
                                />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityLow"
                                    value="Low"
                                    checked={this.state.todo_priority==='Low'}
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityMedium"
                                    value="Medium"
                                    checked={this.state.todo_priority==='Medium'}
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityHigh"
                                    value="High"
                                    checked={this.state.todo_priority==='High'}
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>
                    <div className="form-check">
                        <input  className="form-check-input"
                                id="completedCheckbox"
                                type="checkbox"
                                name="completedCheckbox"
                                onChange={this.onChangeTodoCompleted}
                                checked={this.state.todo_completed}
                                value={this.state.todo_completed}
                                />
                        <label className="form-check-label" htmlFor="completedCheckbox">
                            Completed
                        </label>
                    </div>

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Update Todo" className="btn btn-primary buttons" />
                        <input type="submit" value="Delete Todo" className="btn btn-danger buttons" onClick ={this.deleteTodo}/>
                    </div>
                </form>

            </div>
        )
    }
}
