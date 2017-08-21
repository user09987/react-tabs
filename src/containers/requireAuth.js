import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function (ComposedComponent) {
  class RequireAuth extends Component {
    componentWillMount() {
      if (!this.props.authenticated && this.props.history.location.pathname !== '/login') {
        this.props.history.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated && this.props.history.location.pathname !== '/login') {
        this.props.history.push('/login');
      }
    }

    render() {
      debugger
      return !this.props.authenticated && this.props.history.location.pathname !== '/login' ? null : <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(RequireAuth);
}