import React, {Component} from 'react';
import App from '../App';
       
export default class Tasks extends Component   {
  constructor(){
    super();
  
  this.state = {
      title: '',
      description:'',
      comments:'',
      _id:'',
      tasks:[]
   }; 
   this.handleChange = this.handleChange.bind(this); 
   this.addTask = this.addTask.bind(this);
  }
  handleChange(e) {
      const { name, value } = e.target;
      this.setState({
        [name]: value
      });
    }
  
    addTask(e) {
      e.preventDefault();
      if(this.state._id) {
        fetch(`/api/tasks/${this.state._id}`, {
          method: 'PUT',
          body: JSON.stringify({
            title: this.state.title,
            description: this.state.description,
            comments: this.state.comments
          }),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => {
            console.log('Task Updated');
            this.setState({_id: '', title: '', description: '', comments:''});
            this.fetchTasks();
          });
      } else {
        fetch('/api/tasks', {
          method: 'POST',
          body: JSON.stringify(this.state),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            console.log('Task Saved');
            this.setState({title: '', description: '', comments:''});
            this.fetchTasks();
          })
          .catch(err => console.error(err));
      }
  
    }
  
    deleteTask(id) {
      if(confirm('Are you sure you want to delete it?')) {
        fetch(`/api/tasks/${id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            console.log('Task Deleted');
            this.fetchTasks();
          });
      }
    }
  editTask(id) {
      fetch(`/api/tasks/${id}`)
      .then(res => res.json())
      .then(data => {
          console.log(data);
          this.setState({
              title: data.title,
              description: data.description,
              comments: data.comments,
              _id: data._id
          });
      });
  } 
   
  componentDidMount(){
      this.fetchTasks();
  }
  
  fetchTasks(){
      fetch('/api/tasks')
      .then(res=> res.json())
      .then(data => {
          this.setState({tasks: data});
          console.log(this.state.tasks);
  
      });
  } 


  render () {

      return(     
    
        
          



    <div className="container">

            <div className="row">
              <div className="col s5">
                <div className="card">
                  <div>
                    <form onSubmit={this.addTask}>
                      <div className="row pt-5 pl-1 pr-1 ">
                        <div className="input-field col s12">
                          <input className="form-control" name="title" onChange={this.handleChange} value={this.state.title} type="text" placeholder="Task Title" autoFocus/>
                        </div>
                        
                      </div>
                      <div className="row pt-5 pl-1 pr-1">
                        <div className="input-field col s12">
                          <input className="form-control" name="description" onChange={this.handleChange} value={this.state.description} cols="30" rows="10" placeholder="Task Description"/>
                        </div>
                      </div>

                      <div className="row pt-5 pl-1 pr-1">
                        <div className="input-field col s12">
                          <input className="form-control" name="comments" onChange={this.handleChange} value={this.state.comments} cols="30" rows="10" placeholder="Task Comments" />
                        </div>
                      </div>
  
  
                      <button type="submit" className="btn btn-info mt-5 ml-2 mb-2">
                        Send 
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col s7">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Description</th>
                      <th scope="col">Comments</th>
                    </tr>
                  </thead>
                  <tbody>
                    { 
                      this.state.tasks.map(task => {
                        return (
                          
                            <tr scope="row" key={task._id}>
                            <td>{task.title}</td>
                            
                            <td>{task.description}</td>
                            
                            <td>{task.comments}</td>
                            
                            <td>
                              <button onClick={() => this.deleteTask(task._id)} className="btn btn-danger">
                                <i>Delete</i> 
                              </button>
                              <button onClick={() => this.editTask(task._id)} className="btn btn-success" style={{margin: '4px'}}>
                                <i className="">edit</i>
                              </button>
                            </td>
                          </tr>
                            
                          
                          
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
      ) 
 }
}