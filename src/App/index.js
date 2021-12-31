import React, { Component, Suspense, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

import '../../node_modules/font-awesome/scss/font-awesome.scss';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

import Loader from './layout/Loader'
import Aux from "../hoc/_Aux";
import ScrollToTop from './layout/ScrollToTop';
import routes from "../route";
// redux
import { useSelector } from 'react-redux'

const AdminLayout = Loadable({
    loader: () => import('./layout/AdminLayout'),
    loading: Loader
});

const menu = routes.map((route, index) => {
    return (route.component) ? (
        <Route
            key={index}
            path={route.path}
            exact={route.exact}
            name={route.name}
            render={props => (
                <route.component {...props} />
            )} />
    ) : (null);
});

const App = () => {
    useEffect(() => {
        document.title = "GetSurvey | Administrator"
    })
    const auth = useSelector(state => state)
    return (
        <Aux>
            <ScrollToTop>
                <Suspense fallback={<Loader />}>
                    <Switch>
                        {menu}
                        {!auth.isLogin ? (
                            <Redirect to="/auth/login" />
                        ) : (
                            <Route path="/" component={AdminLayout} />
                        )
                        }
                    </Switch>
                </Suspense>
            </ScrollToTop>
        </Aux>
    );

}

export default App;
