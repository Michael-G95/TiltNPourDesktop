import React from 'react'
import ItemEditor from '../itemEditor/ItemEditor';
import commsHelper from '../dal/commsHelper'
import {useHistory} from 'react-router-dom';
const Brewery = require('../dal/brewery');



export default  () => {
    const history = useHistory();

    const onDbComplete = (item)=>{
        alert("Item successfully added");
        history.push('/EditBrewery/'+item.object_id);
    }

    const onDbFail = (error)=>{
        alert("Error in adding to database: "+error);
    }
    const onFormSubmit = (item) =>{
        commsHelper.registerOnDbCompleteHandlers(onDbComplete,onDbFail);
        commsHelper.sendIpcEvent('insert-brewery',item);
    }
    return (
        <div className="container-fluid">

            <form>
                <ItemEditor getObject={() => Brewery.createEmptyObject({})} onSubmit={onFormSubmit} btnString={"Add item to database"} />
            </form>
            
        </div>
    );
};