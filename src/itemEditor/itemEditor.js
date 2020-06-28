import React, { useState, useEffect } from 'react'
import Field from './Field'

export default ({ getObject }) => {
    const [item, setItem] = useState(getObject());
    const [fields,setFields] = useState([]);
    const [loaded,setLoaded] = useState(false);

    useEffect(() => {
        const tmpFields = [];

        for (const fieldName of Object.keys(item)) {
            // Only handle string types for now
            if (!(typeof item[fieldName] === 'string' || item[fieldName] instanceof String))
                continue;
            const field = Field(fieldName,item[fieldName],(val)=>{
                let tmp = {...item};
                tmp[fieldName] = val;
                setItem(tmp);
            })
            tmpFields.push(field);
        }
        setFields(tmpFields);
        setLoaded(true);
    }, [item]);

    if(!fields || !loaded){
        return (
            <div>Loading...</div>
        ); 
    }

    const fieldsHtml = fields.map(field=>field.fieldHtml);

    return (
        <form>
            {fieldsHtml}
        </form>
    )
}

