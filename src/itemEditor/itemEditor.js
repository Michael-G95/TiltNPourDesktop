import React, { useState, useEffect } from 'react'
import StringField from './StringField'
import ArrayField from './ArrayField'
export default ({ object=null, getObject, onSubmit, btnString }) => {
    const [item, setItem] = useState(object === null ? getObject() : object);
    const [fields, setFields] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const tmpFields = [];

        for (const fieldName of Object.keys(item)) {
            let field;
            if ((typeof item[fieldName] === 'string' || item[fieldName] instanceof String)) {

                field = StringField(fieldName, item[fieldName], (val) => {
                    let tmp = { ...item };
                    tmp[fieldName] = val;
                    setItem(tmp);
                })
            }

            if (Array.isArray(item[fieldName])) {
                field = ArrayField(fieldName, item[fieldName], (val) => {
                    let tmp = { ...item };
                    tmp[fieldName] = val;
                    setItem(tmp);
                })
            }
            if(field===undefined || field===null){
                console.log(fieldName);
            }
            tmpFields.push(field);
        }
        setFields(tmpFields);
        setLoaded(true);
    }, [item]);

    if (!fields || !loaded) {
        return (
            <div>Loading...</div>
        );
    }
    const fieldsHtml = fields.map(field => field.fieldHtml);

    return (
        <>
            {fieldsHtml}
            <button type="button" className="btn btn-primary mb-5" onClick={()=>onSubmit(item)}>{btnString}</button>
        </>
    )
}

