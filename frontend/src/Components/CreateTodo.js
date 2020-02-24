import React, { Component } from 'react';
import axios from 'axios';

export default class CreateTodo extends Component {
  constructor(props) {
      super(props);

      this.state = {
          todo_description: '',
          todo_user: '',
          todo_priority: '',
          todo_completed: false,
          todo_content:''
      }
      this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
      this.onChangeTodoUser = this.onChangeTodoUser.bind(this);
      this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
      this.onChangeTodoContent = this.onChangeTodoContent.bind(this)
      this.onSubmit = this.onSubmit.bind(this);
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

   onChangeTodoContent(e){
     this.setState({
       todo_content: e.target.value
     })
   }

   onSubmit(e) {
       e.preventDefault();

       console.log(`Form submitted:`);
       console.log(`Todo Description: ${this.state.todo_description}`);
       console.log(`Todo Content: ${this.state.todo_content}`);
       console.log(`Todo User: ${this.state.todo_user}`);
       console.log(`Todo Priority: ${this.state.todo_priority}`);


       const newTodo = {
           todo_description: this.state.todo_description,
           todo_user: this.state.todo_user,
           todo_priority: this.state.todo_priority,
           todo_completed: this.state.todo_completed,
           todo_content: this.state.todo_content
       };

       axios.post('http://localhost:4000/todos/add', newTodo)
           .then(res => console.log(res.data));

       this.setState({
           todo_description: '',
           todo_user: '',
           todo_priority: '',
           todo_content:'',
           todo_completed: false
       })
   }

    render() {
       return (
           <div style={{marginTop: 10}}>
               <h3>Create New Todo</h3>
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
                                   id="content"
                                   type="text"
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

                   <div className="form-group">
                       <input type="submit" value="Create Todo" className="btn btn-primary" />
                   </div>
               </form>
           </div>
       )
   }
}
