import React from "react";

// import components
import CreatePost from '../forms/CreatePost';

// stylesheet
import "../pages.css"

export default class Creation extends React.Component {
    // state
    state = {

    }

    // functions

    render(){
        return (
            <React.Fragment>
                <div className="page-container">
                    <h1 className="headerText centered p-3">Create a post</h1>
                    <CreatePost/>
                </div>
            </React.Fragment>
        );
    }

}