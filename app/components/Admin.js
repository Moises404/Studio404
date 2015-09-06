import React from 'react'
import Router from 'react-router'
import reactor from '../state/reactor'
import Store from '../state/main'
import { firebaseRef } from '../state/firebaseRefs'
var Link = Router.Link
var RouteHandler = Router.RouteHandler

export default React.createClass({
  mixins: [reactor.ReactMixin],

  getDataBindings() {
    return {currentUser: ['currentUser']}
  },

  authorizeGoogle() {
    firebaseRef.authWithOAuthPopup('google', (err, data) => {
      if (err) { console.log('Login failed!', err) }
      else { console.log('login success!: ', data) }
    },
    {scope:'email'})
  },

  logoutCurrentUser() {
    Store.actions.logoutCurrentUser()
  },

  render() {
    var navBarStyle = {
      padding: '20px 0'
    }
    var navLinkStyle = {
      margin: '0 10px'
    }
    if (this.state.currentUser && this.state.currentUser.get('isAdmin')) {
      return (
        <div className="admin">
          <div className="admin-nav-bar" style={navBarStyle}>
            <Link to="adminTags" style={navLinkStyle}>Tags</Link>
            <Link to="adminProjects" style={navLinkStyle}>Edit Projects</Link>
            <Link to="adminCreateProject" style={navLinkStyle}>Create Project</Link>
            <Link to="adminCreateImage" style={navLinkStyle}>Upload Image</Link>
            <Link to="adminImages" style={navLinkStyle}>Edit Images</Link>
            <button onClick={this.logoutCurrentUser}>Logout</button>
          </div>
          <RouteHandler/>
        </div>
      )
    } else {
      return (
        <div className="admin">
          <div className="admin-nav-bar" style={navBarStyle}>
            <button onClick={this.authorizeGoogle}>Login with Google</button>
          </div>
          <p>You must be an admin to continue</p>
        </div>
      )
    }
  }
})
