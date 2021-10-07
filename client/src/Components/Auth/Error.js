import React from 'react'
import classes  from './Styles/err.module.css';
const Error = (props) => {
    return(
        <div className={"container " + classes['cont']}>
        <p className={classes['err']}>* {props.msg}</p>
        </div>
    )
}
export default Error;