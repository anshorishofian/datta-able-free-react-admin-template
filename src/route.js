import React from 'react';

const SignUp1 = React.lazy(() => import('./Demo/Authentication/SignUp/SignUp1'));
const Login = React.lazy(() => import('./auth/Login'));

const route = [
    { path: '/auth/signup-1', exact: true, name: 'Signup 1', component: SignUp1 },
    { path: '/auth/login', exact: true, name: 'Login', component: Login }
];

export default route;