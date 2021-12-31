import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import '../assets/scss/style.scss';
import Aux from "../hoc/_Aux";
import Breadcrumb from "../App/layout/AdminLayout/Breadcrumb";
// form
import { useFormik } from 'formik';
import * as Yup from 'yup';
// redux
import { useDispatch } from 'react-redux';
// bootstrap
import { Form } from 'react-bootstrap';
import { Alert, Button } from 'antd';
// fatch data
import axios from 'axios';
import { LOGIN } from '../store/actions';


const Login = (props) => {
    // dispatch redux
    const dispatch = useDispatch();
    const BASE_URL = process.env.REACT_APP_BASE_API
    // state
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [pesan, setPesan] = useState(null);
    // auto proses
    useEffect(()=>{
        document.title = "Login | GetSurvey"
    },[])
    // setting formik
    const formik = useFormik({
        initialValues: {
            email: 'dev@kawan.tim',
            password: 'b15m114h',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email().required('Email harus diisi.'),
            password: Yup.string().required('Password harus diisi.'),
        }),
        onSubmit: values => {
            setLoading(true);
            axios.post(`${BASE_URL}auth-admin/login`, values)
                .then((res) => {
                    console.log(res.data);

                    setLoading(false);
                    if (!res.data.success) {
                        setVisible(true);
                        setPesan("Username atau Password Salah!")
                    } else {
                        dispatch({ type: LOGIN, payload: res.data })
                        props.history.push('/');
                    }
                })
                .catch((error) => {
                    if(error.response.status === 401){
                        setPesan(error.response.data.message)
                    }else{
                        setPesan("Internal Server Error!")
                    }
                    setLoading(false);
                    setVisible(true);
                })
        }
    });

    return (
        <Aux>
            <Breadcrumb />
            <div className="auth-wrapper">
                <div className="auth-content">
                    <div className="auth-bg">
                        <span className="r" />
                        <span className="r s" />
                        <span className="r s" />
                        <span className="r" />
                    </div>
                    <div className="card">
                        <div className="card-body text-center">
                            <div className="mb-4">
                                <i className="feather icon-unlock auth-icon" />
                            </div>
                            <h3 className="mb-4">Login</h3>
                            <Form onSubmit={formik.handleSubmit} role='form'>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        placeholder="Email"
                                        type="email"
                                        autoComplete="new-email"
                                        name="email"
                                        id="email"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                    />

                                    {formik.errors.email && formik.touched.email ?
                                        <small className="text-danger">{formik.errors.email}</small>
                                        : null}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control
                                        placeholder="Password"
                                        type="password"
                                        autoComplete="new-password"
                                        name="password"
                                        id="password"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                    />
                                    {formik.errors.password && formik.touched.password ?
                                        <small className="text-danger">{formik.errors.password}</small>
                                        : null}
                                </Form.Group>
                                {visible &&
                                    <Alert message={pesan} type="error" closable showIcon style={{ marginBottom: 10 }} />
                                }
                                {loading ?
                                    <Button type='primary' loading shape='round'> Loading</Button>
                                    :
                                    <button type='submit' className="btn btn-primary shadow-2 mb-4">Login</button>
                                }
                            </Form>
                            <p className="mb-2 text-muted">Forgot password? <NavLink to="/auth/reset-password-1">Reset</NavLink></p>
                            <p className="mb-0 text-muted">Don’t have an account? <NavLink to="/auth/signup-1">Signup</NavLink></p>
                        </div>
                    </div>
                </div>
            </div>
        </Aux>
    );
}

export default Login;