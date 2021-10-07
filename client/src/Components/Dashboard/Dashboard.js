import React,{Fragment,useEffect, useState} from 'react'
import Navbar from '../Layouts/Navbar/Navbar';
import {setpost} from '../../Actions/post';
import {connect} from'react-redux';
import Prepost from '../Dashboard/Posts/Prepost';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../Layouts/Spinner';
const  Dashboard =(props) => {
useEffect((   
) => {localStorage.setItem("postid", null);},[])
    if (localStorage.getItem("isAuthenticated") === "false") {
      return <Redirect to="/login" />;
    }
    return (
      <Fragment>
        <Navbar />
        <Prepost/>
      </Fragment>
    );
    }

Dashboard.propTypes = {
    posts:PropTypes.object.isRequired
}
const mapStateToProps  = state => ({
    posts:state.post.posts
})
export default connect(mapStateToProps,{})(Dashboard);
