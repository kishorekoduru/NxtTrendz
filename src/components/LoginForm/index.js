import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    isLoggedIn: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    this.setState({isLoggedIn: true})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = event => {
    event.preventDefault()
    const {username, password} = this.state

    const hardcodedUsername = 'kishore'
    const hardcodedPassword = '12345678'

    if (username === hardcodedUsername && password === hardcodedPassword) {
      const fakeJwtToken = 'hardcoded-fake-jwt-token-12345'
      this.onSubmitSuccess(fakeJwtToken)
    } else {
      this.onSubmitFailure('Invalid username or password')
    }
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <div className="input-container">
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </div>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <div className="input-container">
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </div>
    )
  }

  render() {
    const {showSubmitError, errorMsg, isLoggedIn} = this.state

    if (isLoggedIn) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-container">
        {/* Mobile logo */}
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-mobile-image"
          alt="website logo"
        />

        {/* Login illustration */}
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          className="login-image"
          alt="website login"
        />

        {/* Form container */}
        <form className="form-container" onSubmit={this.submitForm}>
          {/* Desktop logo */}
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-desktop-image"
            alt="website logo"
          />

          {this.renderUsernameField()}
          {this.renderPasswordField()}

          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
