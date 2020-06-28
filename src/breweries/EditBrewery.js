import React, { useState, useEffect } from 'react'
import ItemEditor from '../itemEditor/ItemEditor';
import commsHelper from '../dal/commsHelper'
import { useParams } from "react-router";

export default () => {
    const [brewery, setBrewery] = useState({});
    const [error, setError] = useState("");

    const { id } = useParams();

    const onDbGetComplete = (items) => {
        if (items.length > 0)
            setBrewery(items[0]);
        else
            setError("No result found for object_id. Please try again or choose a different item.\n If this happens repeatedly there is a database error, please contact developer.\nObject_id " + id);
    }

    const onDbGetFail = (error) => {
        alert("Error in retrieving items: " + error);
    }

    const onDbEditComplete = (item) => {
        alert("Item successfully updated");
    }

    const onDbEditFail = (error) => {
        alert("Error in adding to database: " + error);
    }
    const onFormSubmit = (item) => {
        console.log("submit")
        commsHelper.registerOnDbCompleteHandlers(onDbEditComplete, onDbEditFail);
        commsHelper.sendIpcEvent('update-brewery', item);
    }



    useEffect(() => {
        commsHelper.registerOnDbCompleteHandlers(onDbGetComplete, onDbGetFail);
        commsHelper.sendIpcEvent('get-brewery', id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    if (error.length > 0) {
        return <div>{error}</div>
    }

    if (Object.keys(brewery).length === 0) {
        return <div>Loading...</div>
    };

    return (
        <div className="container-fluid">

            <form>
                <ItemEditor object={brewery} getObject={() => brewery} onSubmit={(item) => onFormSubmit(item)} btnString={"Update database"} />
            </form>

        </div>
    );
};