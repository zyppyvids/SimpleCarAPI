import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import SearchForm from "./components/SearchForm";
import UpdateForm from "./components/UpdateForm";
import CreateForm from './components/CreateForm';
import DeleteForm from './components/DeleteForm';
import NavbarComp from './components/NavbarComp';

class App extends Component {
  constructor(props){
    super(props)
    // Set web title
    document.title = "Simple Car API"

    // Set initial state
    this.state = {view: 'search'}
      
    // Binding this keyword
    this.handleClick = this.handleClick.bind(this)
  }

  determineView(){
    if(this.state.view === 'search'){
      return this.loadSearchView()
    } else if(this.state.view === 'update'){
      return this.loadUpdateView()
    } else if(this.state.view === 'create'){
      return this.loadCreateView()
    } else if(this.state.view === 'delete'){
      return this.loadDeleteView()
    }
  }

  loadSearchView(){
    return (
      <div className='vertical-horizontal-center'>
        <div className='search form content'>
          <SearchForm />
        </div>
      </div>
    ); 
  }

  loadUpdateView(){
    return (
      <div className='vertical-horizontal-center'>
        <div className='update form content'>
          <UpdateForm />
        </div>
      </div>
    ); 
  }

  loadCreateView(){
    return (
      <div className='vertical-horizontal-center'>
        <div className='create form content'>
          <CreateForm />
        </div>
      </div>
    ); 
  }

  loadDeleteView(){
    return (
      <div className='vertical-horizontal-center'>
        <div className='delete form content'>
          <DeleteForm />
        </div>
      </div>
    ); 
  }
  
  handleClick(viewName){
    this.setState({view: viewName})
  }

  render() {
    return [
    <NavbarComp handleClick={this.handleClick} />,
    this.determineView()
    ];
  }
}

export default App;
