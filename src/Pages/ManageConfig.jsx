import React, {useEffect} from "react"
import { useForm } from 'react-hook-form';
import '../styles/login.css'
import {HttpClient} from '../Services/HttpClient';
import {Storage} from '../Services/Storage';

export default function ManageConfig(props) {

  const { register, handleSubmit, errors } = useForm();

  const handleLogin = async(params) => {
    const data = await HttpClient('/config')
      .post(params);
  }

  useEffect(() => {
    const configName = props.match.params.name;
    const loadConfig = async () => {
      const response = await HttpClient(`/config/${configName}`).get();
      console.log(response);
    }
    
    configName && loadConfig()

  }, [])

  return( 
    <div className="form-wrapper">Create:
      <div className="card">
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-control ">
            <input
              className="form-item"
              placeholder="Name"
              name="name"
              ref={register({
                required: 'Name is required.'
              })}
            />
            {errors.name && <p className="errorMsg">{errors.name.message}</p>}
          </div>
          <div className="form-control">
            <input
              className="form-item"
              placeholder="Version"
              name="version"
              ref={register({
                required: 'Version is required.'
              })}
            />
            {errors.version && (
              <p className="errorMsg">{errors.version.message}</p>
            )}
          </div>
          <div className="form-control">
            <input
              className="form-item"
              placeholder="Data"
              name="data"
              ref={register({
                required: 'Data is required.'
              })}
            />
            {errors.data && (
              <p className="errorMsg">{errors.data.message}</p>
            )}
          </div>
          <div className="form-control">
            <input className="form-submit" value="Save" type="submit" />
          </div>
        </form>
        </div>
      </div>
    )
}
