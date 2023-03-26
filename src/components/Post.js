import React from "react";
import Card from 'react-bootstrap/Card';
import "../pages.css";

// create the component: extend React.Component to have all the functionality of a react component
export default class Post extends React.Component {
    render(){
        return <React.Fragment>
            <Card>
                <Card.Title>Post Name</Card.Title>
                <Card.Subtitle className="mb-3 text-muted subtitle">by @username</Card.Subtitle>
                <Card.Text className="headers">Overview </Card.Text>
                <Card.Text>
                    3.0 Xbow Cycle is hfbjdcv hd jnxkmlzjnb jnzkbjfdhknvclxznbhjc lorem ipsum mwhatever.
                </Card.Text>
            </Card>
        </React.Fragment>
    }
}