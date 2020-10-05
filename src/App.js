import React from 'react';
import './App.css';

// React Router DOM
import { BrowserRouter as Router, Switch, Route, Link, useParams } from 'react-router-dom';

// Components
/* Header */
import Header from './components/header/Header';
import AdminHeader from './components/adminHeader/AdminHeader';

/* Content */
import Home from './components/home/Home';
import Login from './components/login/Login';
import First from './components/first/First';
import Second from './components/second/Second';
import Dessert from './components/dessert/Dessert';
import Recap from './components/recap/Recap';
import Complete from './components/complete/Complete';

/* Admin */
import Dashboard from './components/dashboard/Dashboard';

/* Footer */
import Footer from './components/footer/Footer';

function App() {
  return ( 
    <div className="App"> 
      <Router>
        {/* Header Switching */}
        <Switch>
          <Route path="/admin">
              <AdminHeader></AdminHeader>
          </Route>

          <Route path="/">
            <Header></Header>
          </Route>
        </Switch>
        
        {/* Body Content Switching */}
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route> 

          <Route exact path="/login">
            <Login></Login>
          </Route> 

          <Route exact path="/admin/dashboard">
            <Dashboard></Dashboard>
          </Route> 

          <Route exact path="/neworder/first">
            <First></First>
          </Route> 

          <Route exact path="/neworder/second">
            <Second></Second>
          </Route> 

          <Route exact path="/neworder/dessert">
            <Dessert></Dessert>
          </Route> 

          <Route exact path="/neworder/complete">
            <Complete></Complete>
          </Route> 

          <Route exact path="/neworder/recap">
            <Recap></Recap>
          </Route> 

        </Switch> 

      </Router>

      {/* Footer */}
      <Footer></Footer> 
    </div> 
  ); 
} 

export default App; 
 