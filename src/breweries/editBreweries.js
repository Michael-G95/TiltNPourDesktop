import React from 'react'
import { testDb } from '../dal/database'

export default () =>{

    return (
        <div className="container-fluid">
            Hi
            <button onClick={()=>testDb()}>Test</button>
        </div>
    );
}