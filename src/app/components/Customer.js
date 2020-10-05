import React, {Component} from 'react';
import App from '../App';
       
export default class Customers extends Component   {
  constructor(){
    super();
  
  this.state = {
    name : '',
    surname: '',
    telephone: '',
    email: '',
    company: '',
    customers:[]
   }; 
   this.handleChange = this.handleChange.bind(this); 
   this.addCustomer = this.addCustomer.bind(this);
  }
  handleChange(e) {
      const { name, value } = e.target;
      this.setState({
        [name]: value
      });
    }
  
    addCustomer(e) {
      e.preventDefault();
      if(this.state._id) {
        fetch(`/api/customers/${this.state._id}`, {
          method: 'PUT',
          body: JSON.stringify({
            name : this.state.name,
            surname: this.state.surname,
            telephone: this.state.telephone,
            email: this.state.email,
            company: this.state.company
          }),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => {
            console.log('Customer Updated');
            this.setState({_id: '', name: '', surname: '',telephone: '',email: '',company: ''});
            this.fetchCustomers();
          });
      } else {
        fetch('/api/customers', {
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
            console.log('Customer Saved');
            this.setState({_id: '', name: '', surname: '',telephone: '',email: '',company: ''});
            this.fetchCustomers();
          })
          .catch(err => console.error(err));
      }
  
    }
  
    deleteCustomer(id) {
      if(confirm('Are you sure you want to delete it?')) {
        fetch(`/api/customers/${id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            console.log('Customer Deleted');
            this.fetchCustomers();
          });
      }
    }
  editCustomer(id) {
      fetch(`/api/customers/${id}`)
      .then(res => res.json())
      .then(data => {
          console.log(data);
          this.setState({
            name : this.state.name,
            surname: this.state.surname,
            telephone: this.state.telephone,
            email: this.state.email,
            company: this.state.company,
            _id: data._id
          });
      });
  } 
   
  componentDidMount(){
      this.fetchCustomers();
  }
  
  fetchCustomers(){
      fetch('/api/customers')
      .then(res=> res.json())
      .then(data => {
          this.setState({customers: data});
          console.log(this.state.customers);
  
      });
  } 


  render () {

      return(     
        
    <div className="container">
            <div className="row">
              <div className="col s5">
                <div className="card">
                  <div>
                    <form onSubmit={this.addCustomer}>
                      <div className="row pt-5 pl-1 pr-1 ">
                        <div className="input-field col s12">
                          <input className="form-control" name="name" onChange={this.handleChange} value={this.state.name} type="text" placeholder="Customer Name" autoFocus/>
                        </div>
                      </div>
                      <div className="row pt-5 pl-1 pr-1 ">
                        <div className="input-field col s12">
                          <input  className="form-control" name="surname" onChange={this.handleChange} value={this.state.surname} cols="30" rows="10" placeholder="Customer Surname"/>
                        </div>
                      </div>
                      <div className="row pt-5 pl-1 pr-1 ">
                        <div className="input-field col s12">
                          <input  className="form-control" name="telephone" onChange={this.handleChange} value={this.state.telephone} type="text" placeholder="Customer Telephone" autoFocus/>
                        </div>
                      </div>
                      <div className="row pt-5 pl-1 pr-1 ">
                        <div className="input-field col s12">
                          <input  className="form-control" name="email" onChange={this.handleChange} value={this.state.email} cols="30" rows="10" placeholder="Customer Email"/>
                        </div>
                      </div>
  
                      <div className="row pt-5 pl-1 pr-1 ">
                        <div className="input-field col s12">
                          <input  className="form-control" name="company" onChange={this.handleChange} value={this.state.company} cols="30" rows="10" placeholder="Customer company"/>
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
                      <th scope="col">Name</th>
                      <th scope="col">Surname</th>
                      <th scope="col">Email</th>
                      <th scope="col">Telephone</th>
                      <th scope="col">Company</th>
                    </tr>
                  </thead>
                  <tbody>
                    { 
                      this.state.customers.map(customer => {
                        return (
                          <tr scope="row" key={customer._id}>
                            <td>{customer.name}</td>
                            <td>{customer.surname}</td>
                            <td>{customer.telephone}</td>
                            <td>{customer.email}</td>
                            <td>{customer.company}</td>
                            
                            <td>
                              <button onClick={() => this.deleteCustomer(customer._id)} className="btn btn-danger pl-3">
                                <i>Del</i> 
                              </button>
                              <button onClick={() => this.editCustomer(customer._id)} className="btn btn-success">
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