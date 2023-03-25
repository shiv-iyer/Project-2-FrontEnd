import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";

// create the component: extend React.Component to have all the functionality of a react component
export default class CreatePost extends React.Component {
    render(){
        return <React.Fragment>
            <h1>Create a post</h1>
            <div className="container">
                <div className="mb-3">
                    <Form.Label htmlFor="inputName">Post Name</Form.Label>
                    {/* type=text for plain text; aria-describedby references what describes the form*/}
                    <Form.Control
                        type="text"
                        id="inputName"
                        aria-describedby="postNameHelp"
                    />
                    <Form.Text id="postNameHelp" muted>
                        The name of your post — try to give your deck a descriptive title!
                    </Form.Text>
                </div>
                <div>
                <Form.Label htmlFor="inputOverview">Deck Overview</Form.Label>
                {/* type=text for plain text; aria-describedby references what describes the form*/}
                <Form.Control
                    type="text"
                    id="inputOverview"
                    aria-describedby="overviewHelp"
                />
                <Form.Text id="overviewHelp" muted>
                    The overview of your deck — how would you describe it? What do you like about it? (Max x characters.)
                </Form.Text>
                </div>
            </div>
        </React.Fragment>
    }
}