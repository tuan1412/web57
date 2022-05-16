import React from "react";
import { Form, Button } from "react-bootstrap";
import { useForm, Controller } from 'react-hook-form';
import './SignUp.css';
import axios from 'axios';

import { Link, useNavigate, NavLink } from 'react-router-dom';

function SignUp() {
  const { 
    control, 
    handleSubmit,     
    formState: { errors },
} = useForm({
    defaultValues: {
      username: '',
      password: ''
    }
  });
  const navigate = useNavigate();

  const onSubmit = async values => {
    const { username, password } = values; 
    try {
      const res = await axios({
        url: 'http://localhost:8080/api/auth/signup',
        method: 'post',
        data: {
          username,
          password
        }
      });
      if (res.data.success) {
        navigate('/')
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="SignUp">
      <div className="Login container-fluid" style={{ background: "#fafafa" }}>
        <div className="vh-100 justify-content-md-center align-items-center row">
          <div className="col-md-4 col-12">
            <div className="card-wrapper p-4">
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                    <Controller
                      name="username"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Form.Control 
                          type="text" 
                          placeholder="Enter email"
                          {...field}
                        />
                      )}
                    />
                    {errors?.username?.type === 'required' && <p>username không được để trống</p>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Controller
                      name="password"
                      control={control}
                      rules={{ minLength: 6, required: true }}
                      render={({ field }) => (
                        <Form.Control 
                          type="password" 
                          placeholder="Enter password"
                          {...field}
                        />
                      )}
                  />
                  {errors?.password?.type === 'required' && <p>Password không được để trống</p>}
                  {errors?.password?.type === 'minLength' && <p>Password phải lớn hơn 6 kí tự</p>}
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
            <div className="card-wrapper mt-4 p-3">
            <div>
              Test <NavLink to="/login">Login here</NavLink>
            </div>
              <div>
                No account? <Button variant="link" onClick={() => navigate('/login')}>Login</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
