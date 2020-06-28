import React from 'react'

export default (fieldName,value,setValue)=>{
    const fieldHtml = (
        <div className="form-group" key={fieldName}>
            <label htmlFor={fieldName}>{formatFieldName(fieldName)}</label>
            <input type="text" className="form-control" id={fieldName} aria-describedby={`${fieldName}-help`} placeholder={formatFieldName(fieldName)} value={value} onChange={(event)=>setValue(event.target.value)}/>
            <small id={`${fieldName}-help`} className="form-text text-muted">Please enter the value for {fieldName}</small>
        </div>
    );

    const getFieldData = ()=>value;

    return {
        fieldHtml,
        getFieldData,
        fieldName
    };
}

function formatFieldName(str) { 
    let fmtStr =  (str[0].toUpperCase() + str.slice(1)); 
    return fmtStr.replace(/_/g,' ');
} 