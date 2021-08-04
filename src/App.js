<<<<<<< HEAD
import React,{Component} from "react";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder'
 class  App extends Component{
  render(){
    return(
    <div >
      <Layout><BurgerBuilder /></Layout>
      
    </div>
  )}
    
=======
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
>>>>>>> Initialize project using Create React App
}

export default App;
