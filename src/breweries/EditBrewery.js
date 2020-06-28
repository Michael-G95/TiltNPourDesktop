import React, { useState, useEffect } from 'react'
import ItemEditor from '../itemEditor/ItemEditor';
import commsHelper from '../dal/commsHelper'
import {useHistory} from 'react-router-dom';
import { useParams } from "react-router";

export default  () => {
    const history = useHistory();

    const [brewery,setBrewery] = useState({});
    
    const onDbGetComplete = (items)=>{
        setBrewery(items);
    }

    const onDbGetFail = (error) => {
        alert("Error in retrieving items: " + error);
    }

    const onDbComplete = (item)=>{
        alert("Item successfully added");
        history.push('/EditBrewery/'+item.object_id);
    }

    const onDbFail = (error)=>{
        alert("Error in adding to database: "+error);
    }
    const onFormSubmit = (item) =>{
        commsHelper.registerOnDbCompleteHandlers(onDbComplete,onDbFail);
        commsHelper.sendIpcEvent('update-brewery',item);
    }

    const {id} = useParams();

    useEffect(() => {
        commsHelper.registerOnDbCompleteHandlers(onDbGetComplete, onDbGetFail);
        commsHelper.sendIpcEvent('get-brewery',id);
    },[id])


    if(!brewery){
        return <div>Loading...</div>
    };

    return (
        <div className="container-fluid">

            <form>
                <ItemEditor getObject={() => brewery} onSubmit={onFormSubmit} />
            </form>
            
        </div>
    );
};