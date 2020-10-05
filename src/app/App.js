import React from 'react';
import Tasks from "./components/Tasks";
import {   BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect }  from "react-router-dom";
import HomePage from "./components/HomePage";
import NavBar from "./components/nav";
import Main from "./components/main";
import Customer from "./components/Customer";
import Employee from "./components/Employee";

const App = () => {
          
  return (
<Router>    
  <div className="container-fluid ">      
    <div className="row">
    <NavBar/>        

      <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
        <Main/>
        <Route exact path="/" component={HomePage} />
        <Route path="/Tasks" component={Tasks} />  
        <Route path="/Employees" component={Employee} />  
        <Route path="/Customers" component={Customer} />  
    </main>
    </div>
  </div>
  </Router>       
  );
         
 }


export default App;