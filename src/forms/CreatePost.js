import React from "react";

// react-bootstrap components
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

// external import: range-slider
import RangeSlider from 'react-bootstrap-range-slider';

// stylesheet
import "../pages.css";


// create the component: extend React.Component to have all the functionality of a react component
export default class CreatePost extends React.Component {

    // state
    // ensure that the state keys match the database's keys!
    state = {
        name: "",
        overview: "",
        strategy: "",
        archetype: "",
        rating: 5,
        difficultyLevel: 3,
        userThatPosted: "",
        password: ""
    }

    // functions

    // for text fields, can use event.target.name to use one function to perform the updation for all.
    updateFormField = (event) => {
        console.log("Event target name: " + event.target.name);
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    updateArchetype = (event) => {
        this.setState({
            archetype: event.target.value
        })
    }

    // can refactor these into one function updateSlider later, tried but it didn't work for now so leave it
    updateRating = (event) => {
        this.setState({
            rating: event.target.value
        })
    }

    updateDifficulty = (event) => {
        this.setState({
            difficultyLevel: event.target.value
        });
    };

    // placeholder functionality for the submit button, for now log all info, later this will perform the POST request!
    // can also do validation here, later on.
    submit = () => {
        alert("Submit button was clicked!");
        console.log("post name: " + this.state.name);
        console.log("deck overview: " + this.state.overview);
        console.log("deck strategy: " + this.state.strategy);
        console.log("deck archetype: " + this.state.archetype);
        console.log("deck rating: " + this.state.rating);
        console.log("deck difficulty level: " + this.state.difficultyLevel);
    };


    render(){
        return <React.Fragment>
            <div className="container post-form">

                <h3 className="header-text">Main Post Info</h3>
                <div className="post-form-group">
                    <Form>
                        <Form.Group controlId="inputName">
                            <Form.Label>Post Name</Form.Label>
                            {/* type=text for plain text; aria-describedby references what describes the form*/}
                            {/* onChange should be here. */}
                            <Form.Control
                                type="text"
                                name="name"
                                value={this.state.name}
                                aria-describedby="postNameHelp"
                                onChange={this.updateFormField}
                            />
                            <Form.Text id="postNameHelp" muted>
                                The name of your post — try to give your deck a descriptive title!
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </div>

                <div className="mb-3 post-form-group">
                    <h5>Deck</h5>
                    <p>deck creation stuff goes here...</p>
                </div>

                <h3 className="header-text">Deck Info</h3>
                <div className="post-form-group">
                    <Form>
                        <Form.Group className="mb-2" controlId="inputOverview">
                            <Form.Label>Deck Overview</Form.Label>
                            {/* type=text for plain text; aria-describedby references what describes the form*/}
                            <Form.Control
                                type="text"
                                name="overview"
                                value={this.state.overview}
                                aria-describedby="overviewHelp"
                                onChange={this.updateFormField}
                            />
                            <Form.Text id="overviewHelp" muted>
                                The overview of your deck — how would you describe it? What do you like about it? (Min. 30 characters.)
                            </Form.Text>
                        </Form.Group>
                    </Form>

                    {/* By default, Form.Text is an 'input', but can customize to TextArea if needed! */}
                    <Form>
                        <Form.Group className="mb-2" controlId="inputStrategy">
                            <Form.Label>Strategy</Form.Label>
                            <Form.Control
                                type="text"
                                name="strategy"
                                value={this.state.strategy}
                                as="textarea"
                                rows={3}
                                onChange={this.updateFormField}
                            />
                            <Form.Text id="overviewHelp" muted>
                                The strategy of your deck — how is it supposed to be played? What kind of tactics can you employ? (Min. 50 characters.)
                            </Form.Text>
                        </Form.Group>
                        {/* Range slider for rating & difficulty! Works, can implement with a hook but use state for now */}
                        {/* Seems like I can't really customize it well, maybe leave default for now and look into it later. */}
                        <div className="slider-group mt-3">
                            <div>
                                <Form.Select
                                    aria-label="Archetype selection menu"
                                    onChange={this.updateArchetype}
                                >
                                    <option>— Select an Archetype —</option>
                                    <option value="Beatdown">Beatdown</option>
                                    <option value="Control">Control</option>
                                    <option value="Cycle">Cycle</option>
                                    <option value="Siege">Siege</option>
                                    <option value="Spell Bait">Spell Bait</option>
                                    <option value="Bridge Spam">Bridge Spam</option>
                                    <option value="Others">Others</option>
                                </Form.Select>
                            </div>
                            <div>
                                <h5>Rating</h5>
                                <RangeSlider
                                     min={1}
                                    max={10}
                                    value={this.state.rating}
                                    onChange={this.updateRating}
                                />
                             </div>
                            <div>
                                <h5>Difficulty</h5>
                                <RangeSlider
                                    min={1}
                                    max={5}
                                    value={this.state.difficultyLevel}
                                    onChange={this.updateDifficulty}
                                />
                            </div>
                        </div>
                    </Form>
                </div>
                <h3 className="header-text">User Details</h3>
                <div className="post-form-group">
                    <Form>
                        <Row>
                            <Col md="6">
                                <Form.Group className="mb-2" controlId="inputUsername">
                                    {/* use an input group to style username a bit better!
                                    the Form.Label has to be outside of the InputGroup. */}
                                    <Form.Label>Username</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>@</InputGroup.Text>
                                        <Form.Control
                                            type="text"
                                            name="userThatPosted"
                                            value={this.state.userThatPosted}
                                            placeholder="Enter Username"
                                            onChange={this.updateFormField}
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col md="6">
                                <Form.Group className="mb-2" controlId="inputPassword">
                                    <Form.Label>Password</Form.Label>
                                    {/* type=password automatically hashes out the characters! */}
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={this.state.password}
                                        placeholder="Enter Password"
                                        onChange={this.updateFormField}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </div>

                <div className="centered mt-3">
                    <Button
                        id="submit-btn"
                        onClick={this.submit}
                     >
                    Submit Post</Button>
                </div>
            </div>
        </React.Fragment>
    }
}