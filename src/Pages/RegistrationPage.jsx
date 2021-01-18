import React, { useState, useEffect} from "react"
import { useForm } from 'react-hook-form';
import '../styles/login.css'
import {HttpClient} from '../Services/HttpClient';
import {Storage} from '../Services/Storage';

export default function FormRegistration() {

const { register, handleSubmit, errors } = useForm();
const [data, setData] = useState(null)
const [loading, setLoading] = useState(true)
const [user, setUser] = useState(null)

  const onSubmit = async (params) => {
      // TODO - validate error code, display appropriate error message
      const response = await HttpClient('/register')
      .post(params);

      const data = await HttpClient('/login')
        .post(params);

      if(data.token) {
        Storage().add('access_token', data.token);
        window.location.href = "/"
      }
  }


return( 
  <div className="form-wrapper">
    <div className="card">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control ">
          <input
            className="form-item" 
            placeholder="Email"
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
          <input
            className="form-item"
            placeholder="Password2"
            type="password"
            name="password2"
            ref={register({
              required: 'Password2 is required.',
              minLength: {
                value: 6,
                message: 'Password2 should be at-least 6 characters.'
              }
            })}
          />
          {errors.password && (
            <p className="errorMsg">{errors.password.message}</p>
          )}
        </div>
        <div className="form-control">
          <input className="form-submit" value="REGISTER" type="submit" />
        </div>
      </form>
      </div>
    </div>
  )
}
