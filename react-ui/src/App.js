import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import FacebookLogin from 'react-facebook-login';


class App extends Component {
  state = {
    hello: null,
    postgres: null,
    error: null
  }

  componentDidMount() {
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => {
        this.setState({ hello: data })
      })

    fetch('/api/postgres')
      .then(res => {
        if (!res.ok) {
          throw new Error(`/api/postgres HTTP status ${res.status}`)
        }

        return res
      })
      .then(res => res.json())
      .then(data => {
        this.setState({ postgres: data })
      })
      .catch(err => {
        this.setState({ error: err.toString() })
      })
  }
  render() {
    const { hello, postgres, error } = this.state
    const responseFacebook = (response) => {
  console.log(response);
}

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Facebook Lead Management</h1>
        </header>
<FacebookLogin
    appId="481509582240559"
    autoLoad={true}
    fields="name,email,picture"
    callback={responseFacebook} />
        <p className="App-intro">{hello}</p>
        <p className="App-intro">{postgres}</p>
        <p className="App-intro">{error}</p>
      </div>
    )
  }
}

export default App
