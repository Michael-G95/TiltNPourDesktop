import React, { useState, useEffect } from 'react'
import commsHelper from '../dal/commsHelper'
import { useHistory } from 'react-router-dom';

export default () => {
    const [breweries, setBreweries] = useState([]);
    const history = useHistory();

    const onSelectBrewery = (item) => {
        history.push('/EditBrewery/' + item.object_id);
    }

    const onDbGetComplete = (items)=>{
        setBreweries(items);
    }

    const onDbGetFail = (error) => {
        alert("Error in retrieving items: " + error);
    }

    useEffect(() => {
        commsHelper.registerOnDbCompleteHandlers(onDbGetComplete, onDbGetFail);
        commsHelper.sendIpcEvent('get-breweries');
    },[])


    if (breweries.length === 0) {
        return <div>Loading...</div>
    };
    console.log(breweries);
    const breweriesHtml = breweries.map((b) => {
        return (
            <li className="list-group-item" key={b.object_id}>
                <div className="col-6">
                    {b.name}
                </div>
                <div className="col-6">
                    <button className="btn btn-primary" type="button" onClick={()=>onSelectBrewery(b)}>Edit</button>
                </div>
            </li>
        );
    })

    return (
        <div className="container-fluid">
            <ul className="list-group list-group-flush">
                {breweriesHtml}
            </ul>
        </div>
    );
};