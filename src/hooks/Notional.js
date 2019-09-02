import React from "react";

export const Notional = params => {
    let [notional, setNotional] = React.useState(0);
   
    const handleChange = event => {
        console.log(event.target.value);
        params.onChange(notional);
        setNotional(event.target.value)
    }

    React.useEffect(() => {
        setNotional(params.notional);
      }, [params.notional]);
  
    return (
        <div className="div-notional">
            <input className="notional" 
                   type='number'
                   onChange={handleChange}
                   value={notional} />             
        </div>            
    )
}
