import React from "react";

// react-bootstrap components
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// external import: range-slider
import RangeSlider from 'react-bootstrap-range-slider';

// stylesheet
import "../pages.css";


// create the component: extend React.Component to have all the functionality of a react component
export default class CreatePost extends React.Component {

    // state
    state = {
        archetype: "",
        rating: 1,
        difficulty: 1
    }

    // functions

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
            difficulty: event.target.value
        });
    };


    render(){
        return <React.Fragment>
            <h1>Create a post</h1>
            <div className="container post-form">

                <h3>Main Post Info</h3>
                <div className="post-form-group">
                    <Form>
                        <Form.Group controlId="inputName">
                            <Form.Label>Post Name</Form.Label>
                            {/* type=text for plain text; aria-describedby references what describes the form*/}
                            {/* onChange should be here. */}
                            <Form.Control
                                type="text"
                                aria-describedby="postNameHelp"
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

                <h3>Deck Info</h3>
                <div className="post-form-group">
                    <Form>
                        <Form.Group className="mb-2" controlId="inputOverview">
                            <Form.Label>Deck Overview</Form.Label>
                            {/* type=text for plain text; aria-describedby references what describes the form*/}
                            <Form.Control
                                type="text"
                                aria-describedby="overviewHelp"
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
                                as="textarea"
                                rows={3}
                            />
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
                                    value={this.state.difficulty}
                                    onChange={this.updateDifficulty}
                                />
                            </div>
                        </div>
                    </Form>
                
                </div>

                <div>
                </div>
            </div>
        </React.Fragment>
    }
}