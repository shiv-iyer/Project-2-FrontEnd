import React from "react";

// react-bootstrap components

// stylesheet
import "../pages.css";

export default class Home extends React.Component {
    // state
    state = {

    }

    // functions

    render(){
        return (
            <React.Fragment>
                This is the home page.
                {/* Hero image container*/}
                <div id="heroContainer" className="mb-3">
                    <div id="heroContent">
                        <h1>Welcome to Royale Raves!</h1>
                    </div>
                </div>
                <div>
                    <p>Discover the latest and most popular user-submitted decks in Clash Royale, and find out what everyone is saying about them!</p>
                </div> 
            </React.Fragment>
        );
    }

}