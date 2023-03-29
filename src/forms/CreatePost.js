import React from "react";

// react-bootstrap components
// can just do it in one line!
import {Form, Container, Row, Col, Button, InputGroup} from "react-bootstrap";
// import Form from "react-bootstrap/Form";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Button from "react-bootstrap/Button";
// import InputGroup from "react-bootstrap/InputGroup";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// external import: range-slider
import RangeSlider from 'react-bootstrap-range-slider';

// API and Axios
import BASE_API from '../components/BaseApi';
import axios from "axios";

// validation
import { validateName } from "../components/validation";

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
        password: "",
        // empty array of errors
        errors: [],
        isValid: false,
        // one item in the state for each possible error
        nameError: "",
        overviewError: "",
        strategyError: "",
        archetypeError: ""

    }

    // functions

    errorValidation = () => {
        console.log("error checking")
        const {name, overview, strategy, archetype, userThatPosted, password } = this.state;
        if (!name || !overview || !strategy || !archetype || !userThatPosted || !password) {
            console.log(name, overview, strategy, archetype, userThatPosted, password)
            this.setState(
                {
                    isValid: false,
                }
            )
        }
        else {
            this.setState(
                {
                    isValid: true,
                }
            )
        }
    }

    // for text fields, can use event.target.name to use one function to perform the updation for all.
    updateFormField = (event) => {
        console.log("Event target name: " + event.target.name);
        this.errorValidation();
        this.setState({
            [event.target.name]: event.target.value
            //setState has two functions: second one can be a function to be called after state is set
        }, () => {
                if (event.target.name === "name"){
                    this.validateName();
                }
        }
        )
    }

    validateName = () => {
        const error = validateName(this.state.name);
        this.setState({nameError: error});
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

    // check errors first, if no errors then call submit function
    checkErrors = () => {
        // validation.

        // let errors = 0;

        // // because setState is async, my old method doesn't work the first time around, so instead,
        // // create a local variable errors and can push to it, then setState will hold the actual error messages
        // // but can check from the local variable so we can avoid a setState call before the check
        // // React fundamental: arrays in the state are immutable, but arrays outside of the state are fine

        // // if name field is left blank
        // // this.state.errors.push is not react-like, have to splice and set a new array
        // if (!this.state.name){
        //     errors++;
        //     // 1. create a new array of the og array, slice with no parameters copies
        //     const modifiedErrors = this.state.errors.slice();

        //     // 2. push to the new array
        //     modifiedErrors.push("name was left blank");

        //     // 3. setState from the old errors array to the new array with errors
        //     this.setState({
        //         errors: modifiedErrors
        //     });

        //     alert("name was left blank");
        // }

        //console.log("errors array length: " + errors.length);

        // if there are no errors, then we can call the submit function

        if (this.state.isValid) {
            this.submit();
        } else {
            alert("You have errors, plz fix them.");
        }
    }

    // starting functionality for POST request.
    submit = async () => {
        alert("Submit function was reached!");

            // axios.post has two parameters; the api URL, and the request body.
            const result = await axios.post(`${BASE_API}posts`,
            {
                // parameters in the request's body.
                // cards will be the hardest thing to do... for now hard code the IDs
                cards: ["6412c055632f110d0e8812d0", "6412c159632f110d0e8ba04d", "6412c19c632f110d0e8c7c19", "6412c1ff632f110d0e8dcc71",
                    "641d4b9d04f85304f52ba96c", "641d4c4a04f85304f52ba96d", "641d5cd86bedf92c58be2d8d", "641d507504f85304f52ba96f"],
                name: "4.5 Xbow Cycle",
                userThatPosted: "Alannn",
                date: "03-28-23",
                archetype: "test archetype.",
                overview: "test overview.",
                strategy: "test strategy.",
                rating: 9,
                difficultyLevel: 4
            });
            console.log("Result data...");
            console.log(result.data);
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
                                isInvalid={this.state.nameError}
                                value={this.state.name}
                                aria-describedby="postNameHelp"
                                onChange={this.updateFormField}
                            />
                            {/* normal form.control.feedback should be valid*/}
                            <Form.Control.Feedback type="invalid">
                                {this.state.nameError}
                            </Form.Control.Feedback>
                            <Form.Text id="postNameHelp" muted>
                                {/* This will conditionally render the muted text based on if there's an error or not */}
                                {this.state.nameError ? null : "The name of your post — try to give your deck a descriptive title!"}
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
                            <div className="archetype-container">
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
                            <div className="sliders rating-container">
                                <h5>Rating</h5>
                                <RangeSlider
                                     min={1}
                                    max={10}
                                    value={this.state.rating}
                                    onChange={this.updateRating}
                                />
                             </div>
                            <div className="sliders difficulty-container">
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
                        onClick={this.checkErrors}
                        disabled={!this.state.isValid}
                     >
                    Submit Post</Button>
                </div>
            </div>
        </React.Fragment>
    }
}