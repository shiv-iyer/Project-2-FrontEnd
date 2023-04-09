import React from "react";

// react-bootstrap components
// can just do it in one line!
import {Form, Row, Col, Button, InputGroup} from "react-bootstrap";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// external import: range-slider
import RangeSlider from 'react-bootstrap-range-slider';

// external import: rc-slider
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

// react-icons
import { BsEnvelopeHeartFill } from "react-icons/bs"

// API and Axios
import BASE_API from '../components/BaseApi';
import axios from "axios";

// validation
import { validateName, validateOverview, validateStrategy, validateArchetype } from "../components/validation";

// stylesheets
import "../pages.css";
import "../assets/create.css";
import  "../assets/componentStyles.css"


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
        selectedCards: [],

        // hold the cards from the axios.get 
        cards: [],
        labels: []
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

    handleRatingChange = (value) => {
        this.setState({
            rating: value
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

        const date = new Date();
        // date.getMonth() starts from 0, so we need to add 1 to get the current month
        const currentDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
        console.log("Current date: " + currentDate);

        // don't submit if the user has not selected a deck of 8 cards
        if (this.state.selectedCards.length !== 8){
            alert("Please select all 8 cards!");
        } else {
            alert("Doing post request!");
            // axios.post has two parameters; the api URL, and the request body.
            const result = await axios.post(`${BASE_API}posts`,
            {
                // parameters in the request's body.
                cards: this.getCardIDs(),
                name: this.state.name,
                userThatPosted: this.state.userThatPosted,
                date: currentDate,
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
        }
    };

    getCardIDs = () => {
        const documentIDs = [];
        this.state.selectedCards.forEach((card) => {
            // push the card's MongoDB Document ID for the API post request
            documentIDs.push(card.id);
        })
        return documentIDs;
    };

    // load cards function
    loadCards = async () => {
        // get from API 
        const cardsResponse = await axios.get(`${BASE_API}cards`);
        // store the data in a separate object
        const dataObj = cardsResponse.data.listings;
        // create a temporary array to store the new objects in first, will setState with it later
        const tempLabel = []
        // run through the object and extract card id, cardURL and cardName
        dataObj.forEach((element) => {
            const id = element._id;
            const cardURL = element.cardURL;
            const cardName = element.cardInfo.name;
            const output = {
                    cardName,
                    cardURL,
                    id
            } 
            tempLabel.push(output)
        })

        this.setState({
            labels: tempLabel
        })
        // set state from the response
        this.setState({
            // postsResponse.data.posts
            cards: cardsResponse.data.listings
        })
    
        // console log out to test
        console.log("cards: ");
        console.log(this.state.cards);
    }

    // function for selecting a card
    selectCard = (card) => {
        console.log("Card was selected");
        console.log("state: " + this.state.selectedCards);
        if (this.state.selectedCards.length < 8 && !this.state.selectedCards.includes(card)){
            this.setState({
                selectedCards: [...this.state.selectedCards, card]
            })
        }
        console.log("State after edit: " + this.state.selectedCards[0]);

        console.log("doing card ids function");
        this.getCardIDs();
    }

    // function for unselecting a card
    unselectCard = (card) => {
        const filteredArray = this.state.selectedCards.filter((deckCard) => card !== deckCard);
        this.setState({
            selectedCards: filteredArray
        })
    }

    // on componentDidMount, call the function to load the posts
    componentDidMount = () => {
        try {
            this.loadCards();
        } catch (error) {
            console.error(error);
        }
    }

    render(){
        return <React.Fragment>
            <div className="container post-form">
                <h3 className="header-text">Main Post Info</h3>
                <div className="post-form-group bodyText">
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
                
                <div className="mb-3 post-form-group bodyText">
                    <h4>Deck</h4>

                    <p>Create your deck! Maximum of 8 cards.</p>
                    
                    <h5 className="deckHeader">Selected Deck ({this.state.selectedCards.length})</h5>
                    <div className="deckGrid mb-3">
                        {this.state.selectedCards.map((card, index) => {
                            return (
                                <div key={index} className="clashCard larger" onClick={() => this.unselectCard(card)}>
                                    <img className="cardImg" src={card.cardURL} alt={card.cardName}/>
                                    <p>{card.cardName}</p>
                            </div>
                            )
                        })
                        }
                    </div>
                    
                    {/* have to map in curly braces, because we are trying to use an expression */}
                    {/* map second argument is the index: we use index because there is no ID to be used. How React works:
                    if none of the components have a key, React won't know which one is being changed. Performance issue where
                    it'll try to figure out what is changed. Though, if the user tries to change a component just based on Key #1,
                    React JUST has to re-render Key #1 instead of looking for it. */}

                    <h5 className="deckHeader">Card Selector</h5>
                    {/* wrap everything in a parent div, that way it can be formatted and ordered nicely. */}
                    <div className="cardGrid">
                        {/* map the labels object, creating a clickable card based on the card name and its corresponding image URL */}
                        {/* we avoid hardcoding by mapping everything in this.state.labels. */}
                        {this.state.labels.map((card, index) => {
                            {/* conditional styling based on if selected or not, using the ternary operator:
                            condition is <isSelected = this.state.selectedCards.includes(card)> */}
                            return (
                                <div key={index} className="clashCard customClashCard larger"
                                 onClick={() => this.selectCard(card)}
                                 style={{
                                     borderColor: this.state.selectedCards.includes(card)
                                         ? 'rgba(0, 123, 255, 0.75)'
                                         : 'initial',
                                     borderWidth: this.state.selectedCards.includes(card)
                                         ? '3px'
                                         : 'initial',
                                     borderStyle: this.state.selectedCards.includes(card)
                                         ? 'solid'
                                         : 'initial',
                                     boxShadow: this.state.selectedCards.includes(card)
                                         ? '0 0 0 0.2rem rgba(0, 123, 255, 0.5)'
                                         : 'initial',
                                     margin: this.state.selectedCards.includes(card)
                                         ? '2px'
                                         : '4px',
                                    boxSizing: "border-box",
                                 }}>
                                    <img src={card.cardURL} alt={card.cardName} className="cardImg"/>
                                     <p>{card.cardName}</p>
                                </div>
                            )
                        })}
                    </div>

                </div>

                <h3 className="header-text">Deck Info</h3>
                <div className="post-form-group bodyText">
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
                                {/* <RangeSlider
                                     min={1}
                                    max={10}
                                    value={this.state.rating}
                                    onChange={this.updateRating}
                                /> */}
                                <Slider
                                    className="bouncy my-2 customSlider"
                                    min={1}
                                    max={10}
                                    value={this.state.rating}
                                    onChange={this.handleRatingChange}>
                                </Slider>
                                <div className="sliderValue">{this.state.rating}</div>
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
                <div className="post-form-group bodyText">
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

                <div className="centered mt-3 bodyText larger">
                    <Button
                        id="submit-btn moreBtnStyles"
                        onClick={this.checkErrors}
                        disabled={!this.state.isValid}
                     >
                    <BsEnvelopeHeartFill/> Submit Post</Button>
                </div>
            </div>
        </React.Fragment>
    }
}