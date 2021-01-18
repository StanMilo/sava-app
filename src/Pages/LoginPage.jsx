import React from "react"
import { useForm } from 'react-hook-form';
import '../styles/login.css'
import {HttpClient} from '../Services/HttpClient';
import {Storage} from '../Services/Storage';

export default function Login(props) {
console.log('props:', props);
  const { register, handleSubmit, errors } = useForm();

  const handleLogin = async(params) => {
    const data = await HttpClient('/login')
      .post(params);
    // TODO - validate response error type
    // TODO - display error message
    if(data.token) {
      Storage().add('access_token', data.token);
      window.location.href = "/"
    }

  }
  return( 
    <div className="form-wrapper">LOGIN:
      <div className="card">
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-control ">
            <input
              className="form-item"
              placeholder="Username"
              type="text"
              name="email"
              ref={register({
                required: 'Email is required.',
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: 'Email is not valid.'
                }
              })}
            />
            {errors.email && <p className="errorMsg">{errors.email.message}</p>}
          </div>
          <div className="form-control">
            <input
              className="form-item"
              placeholder="Password"
              type="password"
              name="password"
              ref={register({
                required: 'Password is required.',
                minLength: {
                  value: 6,
                  message: 'Password should be at-least 6 characters.'
                }
              })}
            />
            {errors.password && (
              <p className="errorMsg">{errors.password.message}</p>
            )}
          </div>
          <div className="form-control">
            <input className="form-submit" value="SIGN IN" type="submit" />
          </div>
        </form>
        </div>
      </div>
    )
}
