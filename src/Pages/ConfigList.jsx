import React, { useEffect, useState } from 'react';
import {HttpClient} from '../Services/HttpClient';

export default function ConfigList() {
    const [configs, setConfgis] = useState()

    const loadConfig = async () => {
        const data = await HttpClient('/config').get()
        setConfgis(data)
    }

    useEffect(() => {
      loadConfig()
    }, [])


    return (
      <div>
      {configs && configs.map((config, index) => {
        return <ul key={index}>
            <li>{config.config_name}, {config.version}</li>
        </ul>
      })}
      </div>
    )
  };