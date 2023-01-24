import React from "react";
import "./Loader.css"
function Loader (){
    return <div className="loader">
            <img alt='loader animation' className="loaderAnimation" src={require('../../assets/loder-no-background.gif')}></img>
    </div>
}
export default Loader;