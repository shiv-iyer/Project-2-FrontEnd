import React from "react";
import Form from "react-bootstrap/Form";

// stylesheet
import "../pages.css";


// create the component: extend React.Component to have all the functionality of a react component
export default class CreatePost extends React.Component {

    // state
    state = {

    }

    render(){
        return <React.Fragment>
            <h1>Create a post</h1>
            <div className="container post-form">

                <h3>Main Post Info</h3>
                <div className="mb-3 post-form-group">
                    <Form.Label htmlFor="inputName">Post Name</Form.Label>
                    {/* type=text for plain text; aria-describedby references what describes the form*/}
                    {/* onChange should be here. */}
                    <Form.Control
                        type="text"
                        id="inputName"
                        aria-describedby="postNameHelp"
                    />
                    <Form.Text id="postNameHelp" muted>
                        The name of your post — try to give your deck a descriptive title!
                    </Form.Text>
                </div>

                <div className="mb-3 post-form-group">
                    <h5>Deck</h5>
                    <p>deck creation stuff goes here...</p>
                </div>

                <h3>Deck Info</h3>
                <div className="mb-3 post-form-group">
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

                    {/* By default, Form.Text is an 'input', but can customize to TextArea if needed! */}
                    <Form.Label>Strategy</Form.Label>
                </div>

                <div>
                </div>
            </div>
        </React.Fragment>
    }
}