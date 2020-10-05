import React, {Component} from 'react';
import App from '../App';
       
export default class Employees extends Component   {
  constructor(){
    super();
  
  this.state = {
    name : '',
    surname: '',
    telephone: '',
    email: '',
    position: '',
    employees:[]
   }; 
   this.handleChange = this.handleChange.bind(this); 
   this.addEmployee = this.addEmployee.bind(this);
  }
  handleChange(e) {
      const { name, value } = e.target;
      this.setState({
        [name]: value
      });
    }
  
    addEmployee(e) {
      e.preventDefault();
      if(this.state._id) {
        fetch(`/api/employees/${this.state._id}`, {
          method: 'PUT',
          body: JSON.stringify({
            name : this.state.name,
            surname: this.state.surname,
            telephone: this.state.telephone,
            email: this.state.email,
            position: this.state.position
          }),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => {
            console.log('Employee Updated');
            this.setState({_id: '', name: '', surname: '',telephone: '',email: '',position: ''});
            this.fetchEmployees();
          });
      } else {
        fetch('/api/employees', {
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
            console.log('Employee Saved');
            this.setState({_id: '', name: '', surname: '',telephone: '',email: '',position: ''});
            this.fetchEmployees();
          })
          .catch(err => console.error(err));
      }
  
    }
  
    deleteEmployee(id) {
      if(confirm('Are you sure you want to delete it?')) {
        fetch(`/api/employees/${id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            console.log('Employee Deleted');
            this.fetchEmployees();
          });
      }
    }
  editEmployee(id) {
      fetch(`/api/employees/${id}`)
      .then(res => res.json())
      .then(data => {
          console.log(data);
          this.setState({
            name : this.state.name,
            surname: this.state.surname,
            telephone: this.state.telephone,
            email: this.state.email,
            position: this.state.position,
            _id: data._id
          });
      });
  } 
   
  componentDidMount(){
      this.fetchEmployees();
  }
  
  fetchEmployees(){
      fetch('/api/employees')
      .then(res=> res.json())
      .then(data => {
          this.setState({employees: data});
          console.log(this.state.employees);
  
      });
  } 


  render () {

      return(     
        
    <div className="container">
            <div className="row">
              <div className="col s5">
                <div className="card">
                  <div>
                    <form onSubmit={this.addEmployee}>
                      <div className="row pt-5 pl-1 pr-1">
                        <div className="input-field col s12">
                          <input className ="form-control" name="name" onChange={this.handleChange} value={this.state.name} type="text" placeholder="Employee Name" autoFocus/>
                        </div>
                      </div>
                      <div className="row pt-5 pl-1 pr-1">
                        <div className="input-field col s12">
                          <input className="form-control" name="surname" onChange={this.handleChange} value={this.state.surname} cols="30" rows="10" placeholder="Employee Surname" />
                        </div>
                      </div>
                      <div className="row pt-5 pl-1 pr-1">
                        <div className="input-field col s12">
                          <input className="form-control" name="telephone" onChange={this.handleChange} value={this.state.telephone} type="text" placeholder="Employee Telephone" autoFocus/>
                        </div>
                      </div>
                      <div className="row pt-5 pl-1 pr-1">
                        <div className="input-field col s12">
                          <input  className="form-control" name="email" onChange={this.handleChange} value={this.state.email} placeholder="Employee Email" />
                        </div>
                      </div>
  
                      <div className="row pt-5 pl-1 pr-1">
                        <div className="input-field col s12">
                          <input  className="form-control" name="position" onChange={this.handleChange} value={this.state.position} placeholder="Employee position" />
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
                <table  className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Surname</th>
                      <th scope="col">Email</th>
                      <th scope="col">Telephone</th>
                      <th scope="col">position</th>
                    </tr>
                  </thead>
                  <tbody>
                    { 
                      this.state.employees.map(employee => {
                        return (
                          <tr  scope="row" key={employee._id}>
                            <td>{employee.name}</td>
                            <td>{employee.surname}</td>
                            <td>{employee.telephone}</td>
                            <td>{employee.email}</td>
                            <td>{employee.position}</td>
                            
                            <td>
                              <button onClick={() => this.deleteEmployee(employee._id)} className="btn btn-danger pl-3">
                                <i>Del</i> 
                              </button>
                              <button onClick={() => this.editEmployee(employee._id)} className="btn btn-success">
                                <i>Edit</i>
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