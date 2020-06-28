import React from 'react'

export default (fieldName,value,setValue)=>{

    // Handle arrays by CSV 
    // value param is in array format, transform to CSV for value
    // split by ',' and pass array back to setValue

    const csvValue = value.join(',');

    const fieldHtml = (
        <div className="form-group" key={fieldName}>
            <label htmlFor={fieldName}>{formatFieldName(fieldName)}</label>
            <input type="text" className="form-control" id={fieldName} aria-describedby={`${fieldName}-help`} placeholder={formatFieldName(fieldName)} value={csvValue} onChange={(event)=>setValue(event.target.value.split(','))}/>
            <small id={`${fieldName}-help`} className="form-text text-muted">Please enter the value for {fieldName} in a comma-seperated value format.</small>
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