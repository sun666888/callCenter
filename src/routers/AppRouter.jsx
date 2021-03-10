import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { mainRouter, } from './router'


// function RedirectPage() {
//     let token = localStorage.getItem('token');
//     if (token) {
//         return <Redirect to='/home' />
//     } else {
//         return <Redirect to='/login' />
//     }
// }

export default class AppRouter extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    {
                        mainRouter.map(route => {
                            return <Route key={route.path} {...route} />
                        })
                    }
                    <Redirect to='/login' />
                </Switch>
            </Router>
        )
    }
} 