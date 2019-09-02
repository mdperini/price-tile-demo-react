import React from "react";

export const Notional = params => {
    const handleChange = event => {
        console.log(event.target.value);
        params.onChange(event.target.value);
    }

    return (
        <div className="div-notional">
            <input className="notional" 
                   type='number'
                   onChange={handleChange}
                   value={params.notional} />             
        </div>            
    )
}
