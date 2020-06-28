import React from 'react'
import ItemEditor from '../itemEditor/itemEditor';
const Brewery = require('../dal/brewery');
const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;


export default () =>{
    return (
        <div className="container-fluid">
            <ItemEditor getObject={()=>Brewery.createEmptyObject({})}/>
        </div>
    );
}