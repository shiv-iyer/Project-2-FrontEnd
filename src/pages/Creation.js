import React from "react";

// import components
import CreatePost from '../forms/CreatePost';

export default class Creation extends React.Component {
    // state
    state = {

    }

    // functions

    render(){
        return (
            <React.Fragment>
                This is the create posts page.
                <CreatePost/>
            </React.Fragment>
        );
    }

}