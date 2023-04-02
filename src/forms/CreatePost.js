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
import { validateName, validateOverview, validateStrategy, validateArchetype } from "../components/validation";

// Card IDs object
import cardIDs from "../components/CardIDs";

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
        archetypeError: "",
        // empty array to hold the selected cards
        selectedCards: []
    };

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
    };

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
                if (event.target.name === "overview"){
                    this.validateOverview();
                }
                if (event.target.name === "strategy"){
                    this.validateStrategy();
                }
        });
    };

    updateCards = (event) => {
        console.log("card was updated");
        console.log(event.target.value);
        // dealing with arrays in the state React: you must use setState, cannont just arrayName.push()
        // arrays in the state are immutable. Therefore, we need to clone the array and setState with a modified version of it.
        
        // first, check if the value exists in the array already — if it does, delete from the array
        if (this.state.selectedCards.includes(event.target.value)){
            const indexToDelete = this.state.selectedCards.findIndex(function(currentElement){
                // condition to return (must be a truthy value): when the element in the array matches the checkbox value
                return currentElement === event.target.value;
            });

            // once we have found the index to delete, we can re-build the array in two halves:
            // 1. slice the array from the starting index to the indexToDelete (slice will not be inclusive of indxeToDelete)
            // 2. Slice the array from from the element after indexToDelete (hence indexToDelete +1) until the end of the array.
            const modifiedCards = [...this.state.selectedCards.slice(0, indexToDelete), ...this.state.selectedCards.slice(indexToDelete +1)];
            this.setState({selectedCards: modifiedCards});
        } else {
            // if it doesn't exist, then add to the array in the state. Spread the OG array; append the event's value to the end.
            const modifiedCards = [...this.state.selectedCards, event.target.value];
            this.setState({selectedCards: modifiedCards});
        }

        //this.getCards();

        /*this.state.selectedCards.map((card) => {
            console.log(card);
        });*/
    };

    // need to make a second function for updateCards based on a click from the deck display itself
    updateCardsFromDeck = (card) => {
        console.log("card was updated from deck display");
        console.log(card);
        // dealing with arrays in the state React: you must use setState, cannont just arrayName.push()
        // arrays in the state are immutable. Therefore, we need to clone the array and setState with a modified version of it.
        
        // first, check if the value exists in the array already — if it does, delete from the array
        if (this.state.selectedCards.includes(card)){
            const indexToDelete = this.state.selectedCards.findIndex(function(currentElement){
                // condition to return (must be a truthy value): when the element in the array matches the checkbox value
                return currentElement === card;
            });

            // once we have found the index to delete, we can re-build the array in two halves:
            // 1. slice the array from the starting index to the indexToDelete (slice will not be inclusive of indxeToDelete)
            // 2. Slice the array from from the element after indexToDelete (hence indexToDelete +1) until the end of the array.
            const modifiedCards = [...this.state.selectedCards.slice(0, indexToDelete), ...this.state.selectedCards.slice(indexToDelete +1)];
            this.setState({selectedCards: modifiedCards});

            // actually we shouldn't need the else statement bc this will be to remove only
        } /* else {
            // if it doesn't exist, then add to the array in the state. Spread the OG array; append the event's value to the end.
            const modifiedCards = [...this.state.selectedCards, card];
            this.setState({selectedCards: modifiedCards});
        } */
    };

    validateName = () => {
        const error = validateName(this.state.name);
        this.setState({nameError: error});
    };

    validateOverview = () => {
        const error = validateOverview(this.state.overview);
        this.setState({overviewError: error});
    };

    validateStrategy = () => {
        const error = validateStrategy(this.state.strategy);
        this.setState({strategyError: error});
    };

    validateArchetype = () => {
        const error = validateArchetype(this.state.archetype);
        this.setState({archetypeError: error});
    };
    

    updateArchetype = (event) => {
        this.setState({
            archetype: event.target.value
        }, () => {
            this.validateArchetype();
        });
    };

    // can refactor these into one function updateSlider later, tried but it didn't work for now so leave it
    updateRating = (event) => {
        this.setState({
            rating: event.target.value
        })
    };

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
    };

    // starting functionality for POST request.
    submit = async () => {
        alert("Submit function was reached!");

            // axios.post has two parameters; the api URL, and the request body.
            const result = await axios.post(`${BASE_API}posts`,
            {
                // parameters in the request's body.
                // cards will be the hardest thing to do... for now hard code the IDs
                /*cards: ["6412c055632f110d0e8812d0", "6412c159632f110d0e8ba04d", "6412c19c632f110d0e8c7c19", "6412c1ff632f110d0e8dcc71",
                    "641d4b9d04f85304f52ba96c", "641d4c4a04f85304f52ba96d", "641d5cd86bedf92c58be2d8d", "641d507504f85304f52ba96f"],*/
                cards: this.getCardIDs(),
                name: this.state.name,
                userThatPosted: this.state.userThatPosted,
                date: "03-31-23",
                archetype: this.state.archetype,
                overview: this.state.overview,
                strategy: this.state.strategy,
                rating: this.state.rating,
                difficultyLevel: this.state.difficultyLevel
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

    getCardIDs = () => {
        const documentIDs = [];
        this.state.selectedCards.forEach((card) => {
            console.log("current card: " + card);
            // to access the key by using a variable, we need to use square brackets []
            console.log("corresponding card ID: " + cardIDs[card]);
            documentIDs.push(cardIDs[card]);
        });
        
        return documentIDs;
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
                            {/* isInvalid attribute is set to true or false if nameError exists in the state 
                            (by default, it's false, because "" is a falsy value */}
                            <Form.Control
                                type="text"
                                name="name"
                                isInvalid={this.state.nameError}
                                value={this.state.name}
                                aria-describedby="postNameHelp"
                                onChange={this.updateFormField}
                            />
                            {/* normal form.control.feedback should be valid*/}
                            {/* if type="invalid" (which gets called if this.state.nameError exists), display this feedback */}
                            <Form.Control.Feedback type="invalid">
                                {this.state.nameError}
                            </Form.Control.Feedback>
                            <Form.Text id="postNameHelp" muted>
                                {/* This will conditionally render the muted text based on nameError's status in the state */}
                                {this.state.nameError ? null : "The name of your post — try to give your deck a descriptive title! (Max. 55 characters.)"}
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </div>  
                
                <div className="mb-3 post-form-group">
                    <h5>Deck</h5>

                    <p>deck creation stuff goes here...</p>
                    
                    <div className="mb-3">
                        {/* onClick only worked with an anonymous function, not sure why? */}
                        {this.state.selectedCards.map((card) => 
                            <p 
                                key={card}
                                style={{display: "inline-block",
                                        padding: "10px",
                                        margin: "2px",
                                        backgroundColor: "beige",
                                        border: "2px solid black"}}
                                onClick={()=> this.updateCardsFromDeck(card)}>
                                    {card}
                            </p>
                        )}
                    </div>
                    {/* possible improvement: use the map function to render all these checkboxes, instead of hardcoding */}
                    <Form.Check
                        inline
                        label="Xbow"
                        name="cards"
                        value="xbow"
                        type="checkbox"
                        onChange={this.updateCards}/>
                    <Form.Check
                        inline
                        label="Tesla"
                        name="cards"
                        value="tesla"
                        type="checkbox"
                        onChange={this.updateCards}/>
                    <Form.Check
                        inline
                        label="Archers"
                        name="cards"
                        value="archers"
                        type="checkbox"
                        onChange={this.updateCards}/>
                    <Form.Check
                        inline
                        label="Log"
                        name="cards"
                        value="log"
                        type="checkbox"
                        onChange={this.updateCards}/>
                    <Form.Check
                        inline
                        label="Ice Spirit"
                        name="cards"
                        value="ice_Spirit"
                        type="checkbox"
                        onChange={this.updateCards}/>
                    <Form.Check
                        inline
                        label="Skeletons"
                        name="cards"
                        value="skeletons"
                        type="checkbox"
                        onChange={this.updateCards}/>
                    <Form.Check
                        inline
                        label="Fireball"
                        name="cards"
                        value="fireball"
                        type="checkbox"
                        onChange={this.updateCards}/>
                    <Form.Check
                        inline
                        label="Knight"
                        name="cards"
                        value="knight"
                        type="checkbox"
                        onChange={this.updateCards}/>
                    <Form.Check
                        inline
                        label="Musketeer"
                        name="cards"
                        value="musketeer"
                        type="checkbox"
                        onChange={this.updateCards}/>
                    <Form.Check
                        inline
                        label="Rocket"
                        name="cards"
                        value="rocket"
                        type="checkbox"
                        onChange={this.updateCards}/>
                    <Form.Check
                        inline
                        label="Zap"
                        name="cards"
                        value="zap"
                        type="checkbox"
                        onChange={this.updateCards}/>
                    <Form.Check
                        inline
                        label="Cannon"
                        name="cards"
                        value="cannon"
                        type="checkbox"
                        onChange={this.updateCards}/>
                    <Form.Check
                        inline
                        label="Giant"
                        name="cards"
                        value="giant"
                        type="checkbox"
                        onChange={this.updateCards}/>
                    <Form.Check
                        inline
                        label="Poison"
                        name="cards"
                        value="poison"
                        type="checkbox"
                        onChange={this.updateCards}/>
                    <Form.Check
                        inline
                        label="Balloon"
                        name="cards"
                        value="balloon"
                        type="checkbox"
                        onChange={this.updateCards}/>
                    <Form.Check
                        inline
                        label="Hunter"
                        name="cards"
                        value="hunter"
                        type="checkbox"
                        onChange={this.updateCards}/>
                    <Form.Check
                        inline
                        label="Miner"
                        name="cards"
                        value="miner"
                        type="checkbox"
                        onChange={this.updateCards}/>
                    <Form.Check
                        inline
                        label="Hog Rider"
                        name="cards"
                        value="hog_Rider"
                        type="checkbox"
                        onChange={this.updateCards}/>
                    <Form.Check
                        inline
                        label="Royal Giant"
                        name="cards"
                        value="royal_Giant"
                        type="checkbox"
                        onChange={this.updateCards}/>
                    <Form.Check
                        inline
                        label="Arrows"
                        name="cards"
                        value="arrows"
                        type="checkbox"
                        onChange={this.updateCards}/>
                    <Form.Check
                        inline
                        label="Minions"
                        name="cards"
                        value="minions"
                        type="checkbox"
                        onChange={this.updateCards}/>
                    <Form.Check
                        inline
                        label="Lightning"
                        name="cards"
                        value="lightning"
                        type="checkbox"
                        onChange={this.updateCards}/>
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
                                isInvalid={this.state.overviewError}
                                value={this.state.overview}
                                aria-describedby="overviewHelp"
                                onChange={this.updateFormField}
                            />
                            <Form.Control.Feedback type="invalid">
                                {this.state.overviewError}
                            </Form.Control.Feedback>
                            <Form.Text id="overviewHelp" muted>
                                {this.state.overviewError ? null : "The overview of your deck — how would you describe it? What do you like about it? (Min. 30 characters.)"}
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
                                isInvalid={this.state.strategyError}
                                value={this.state.strategy}
                                as="textarea"
                                rows={3}
                                onChange={this.updateFormField}
                            />
                            <Form.Control.Feedback type="invalid">
                                {this.state.strategyError}
                            </Form.Control.Feedback>
                            <Form.Text id="overviewHelp" muted>
                                {this.state.strategyError ? null : "The strategy of your deck — how is it supposed to be played? What kind of tactics can you employ? (Min. 50 characters.)"}
                            </Form.Text>
                        </Form.Group>
                        {/* Range slider for rating & difficulty! Works, can implement with a hook but use state for now */}
                        {/* Seems like I can't really customize it well, maybe leave default for now and look into it later. */}
                        <div className="slider-group mt-3">
                            <div className="archetype-container">
                                <Form.Select
                                    aria-label="Archetype selection menu"
                                    onChange={this.updateArchetype}
                                    isInvalid={this.state.archetypeError}
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
                                <Form.Control.Feedback type="invalid">
                                    {this.state.archetypeError}
                                </Form.Control.Feedback>
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