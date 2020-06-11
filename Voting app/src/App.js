import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      voteAllowed: 0,
      voteNotAllowed: 0,
      name: '',
      age: '',
      data: []
    }
  }
  onInputChange(e) {
    this.setState({
      //name:'a'
      [e.target.name]: e.target.value
    })
  }
  submitForm(e) {
    e.preventDefault()

    const { name, age, voteAllowed, voteNotAllowed, data } = this.state;

    const obj = {
      name,
      age
    }

    if (parseInt(age) > 18) {
      this.setState({
        voteAllowed: voteAllowed + 1
      })
    } else {
      this.setState({
        voteNotAllowed: voteNotAllowed + 1
      })
    }
    this.setState({
      name: '',
      age: ''
    })
    data.push(obj)
  
    e.target.reset()
  }
    renderList(){
      const { data } = this.state

      const out = data.map((d, i) => {
        return (
          <li key={i}> {d.name}-{d.age} </li>
        )
      })
      return out
    }
  
    render() {
      return (
        <div className="container">

          <div className="row">

            <div className="col-sm-6">
              <ul>
                {this.renderList()}
              </ul>
            </div>

            <div className="col-sm-6">
              Vote Allowed: {this.state.voteAllowed}<br />
            Vote Not Allowed: {this.state.voteNotAllowed}
            </div>

          </div>
          <form onSubmit={this.submitForm.bind(this)}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" onChange={this.onInputChange.bind(this)} value={this.state.name} name="name" className="form-control" id="text" />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age:</label>
              <input type="text" onChange={this.onInputChange.bind(this)} value={this.state.age} name="age" className="form-control" id="age" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>


        </div>
      );
    }
  }

  export default App;
