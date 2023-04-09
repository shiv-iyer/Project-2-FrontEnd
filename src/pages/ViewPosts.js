import React from "react";
import "../pages.css";

// import components
import Post from "../components/Post";
import SearchBar from "../components/SearchBar";

// React Bootstrap imports
import Container from 'react-bootstrap/Container';
import { Modal, Form } from "react-bootstrap";

// range-slider
import RangeSlider from 'react-bootstrap-range-slider';

// validation
import { validateName, validateOverview, validateStrategy, validateArchetype } from "../components/validation";

// API and Axios
import BASE_API from '../components/BaseApi';
import axios from "axios";
import { Button } from "react-bootstrap";

export default class ViewPosts extends React.Component {
    // state
    state = {
        // keep the data in the state within an array
        posts: [],
        numPosts: 1,
        updatedName: "",
        updatedDate: "04-01-23",
        updatedArchetype: "",
        updatedOverview: "",
        updatedStrategy: "",
        updatedRating: 5,
        updatedDifficultyLevel: 3,
        editingPost: false,
        deletingPost: false,
         // one item in the state for each possible error
        nameError: "",
        overviewError: "",
        strategyError: "",
        archetypeError: "",
        currentPostID: "",

        // hold search and filter values
        search: "",
        archetypeFilter: "",
        // set minRating and maxDifficulty to the most extreme values, so that the initial search will always return all of the posts.
        ratingFilter: 1,
        difficultyFilter: 5,

        // empty array to hold the selected cards
        selectedCards: [],
        // hold the cards from the axios.get, for use in the editing modal...
        
        cards: [],
        labels: []
    }

    // variables

    // functions
    // componentDidMount() will probably call the axios get request

    updateFormField = (event) => {
        console.log("Event target name: " + event.target.name);
        this.setState({
            [event.target.name]: event.target.value
            //setState has two functions: second one can be a function to be called after state is set
        }, () => {
                if (event.target.name === "updatedName"){
                    this.validateName();
                }
                if (event.target.name === "updatedOverview"){
                    this.validateOverview();
                }
                if (event.target.name === "updatedStrategy"){
                    this.validateStrategy();
                }
        });
    };

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

        getCardIDs = () => {
            const documentIDs = [];
            this.state.selectedCards.forEach((card) => {
                // push the card's MongoDB Document ID for the API post request
                documentIDs.push(card.id);
            })
            return documentIDs;
        };

    updatePost = (post) => {

        // get the current date
        const date = new Date();
        // date.getMonth() starts from 0, so we need to add 1 to get the current month
        const currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;


        // first step: setState so existing post info isn't lost
        this.setState({
            editingPost: true,
            updatedName: post.name,
            updatedDate: currentDate,
            updatedCards: ["array of cards"],
            updatedArchetype: post.archetype,
            updatedOverview: post.postInfo.overview,
            updatedStrategy: post.postInfo.strategy,
            updatedRating: post.postInfo.rating,
            updatedDifficultyLevel: post.postInfo.difficultyLevel,
            currentPostID: post._id
        });

        console.log(post);

    }

    cancelEdit = () => {
        this.setState({
            editingPost: false,
            // clear selectedCards array
            selectedCards: []
        })
    }

    submitEdit = async () => {
        try {
            // PUT request to API: 1st param is url, second param is body
            const updateResponse = await axios.put(`${BASE_API}posts/${this.state.currentPostID}`,{
                // save cards for later / cards: this.getCardIDs(),
                name: this.state.updatedName,
                date: this.state.updatedDate,
                archetype: this.state.updatedArchetype,
                overview: this.state.updatedOverview,
                strategy: this.state.updatedStrategy,
                rating: this.state.updatedRating,
                difficultyLevel: this.state.updatedDifficultyLevel
            });
    
            console.log("Result data...");
            console.log(updateResponse.data);

            this.setState({editingPost: false});
            this.loadPosts();
        } catch (error) {
            console.error(error);
        }
    }

    deletionInterim = (post) => {
        this.setState({
            deletingPost: true,
            currentPostID: post._id
        })
    }

    cancelDeletion = () => {
        this.setState({
            deletingPost: false
        })
    }

    deletePost = async () => {
        try {
            const deleteResponse = await axios.delete(`${BASE_API}posts/${this.state.currentPostID}`)
            console.log("Result data...");
            console.log(deleteResponse.data);

            this.setState({deletingPost: false});
            this.loadPosts();
        } catch (error) {
            console.error(error);
        }
    }

    // load posts function
    loadPosts = async () => {
        // get from API 
        // backtick strings `` and $ are for passing in a parameter as part of the string (axios.get requires a string?)
        // posts: the name of my collection I want to retrieve from, in this case it's posts
        // &minRating=${this.state.ratingFilter}&maxDifficulty=${this.state.difficultyFilter}
        const postsResponse = await axios.get(`${BASE_API}posts?name=${this.state.search}&archetype=${this.state.archetypeFilter}
                                               &minRating=${this.state.ratingFilter}&maxDifficulty=${this.state.difficultyFilter}`);

        // set state from the response
        this.setState({
            // postsResponse.data.posts
            posts: postsResponse.data.listings
        })

        // console log out to test
        console.log("posts: ");
        console.log(this.state.posts);
        
    }

    loadCards = async () => {
        // get cards from API
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

    validateName = () => {
        const error = validateName(this.state.updatedName);
        this.setState({nameError: error});
    };

    validateOverview = () => {
        const error = validateOverview(this.state.updatedOverview);
        this.setState({overviewError: error});
    };

    validateStrategy = () => {
        const error = validateStrategy(this.state.updatedStrategy);
        this.setState({strategyError: error});
    };

    validateArchetype = () => {
        const error = validateArchetype(this.state.updatedArchetype);
        this.setState({archetypeError: error});
    };
    

    updateArchetype = (event) => {
        this.setState({
            updatedArchetype: event.target.value
        }, () => {
            this.validateArchetype();
        });
    };

    updateRating = (event) => {
        this.setState({
            updatedRating: event.target.value
        })
    };

    updateDifficulty = (event) => {
        this.setState({
            updatedDifficultyLevel: event.target.value
        });
    };

    handleSearchChange = (event) => {
        this.setState({
            search: event.target.value
        })
    }

    handleFilterChange = (event) => {
        this.setState({
            archetypeFilter: event.target.value
        })
    }

    handleRatingChange = (value) => {
        this.setState({
            ratingFilter: value
        })
    }

    handleDifficultyChange = (value) => {
        this.setState({
            difficultyFilter: value
        })
    }

    findSearchResults = () => {
        this.loadPosts();
    }

    // on componentDidMount, call the function to load the posts and cards

    componentDidMount = () => {
        try {
            this.loadPosts();
            this.loadCards();
        } catch (error) {
            console.error(error);
        }
    }

    // then, we will use the map function to display the content from the posts

    render(){
        return (
            <React.Fragment>
                <div className="page-container">
                    <h1 className="headerText centered p-3">View all posts</h1>
                    {/* pass in the relevant values as props */}
                    <SearchBar
                        search={this.state.search}
                        handleSearchChange={this.handleSearchChange}
                        handleFilterChange={this.handleFilterChange}
                        rating={this.state.ratingFilter}
                        handleRatingChange={this.handleRatingChange}
                        difficulty={this.state.difficultyFilter}
                        handleDifficultyChange={this.handleDifficultyChange}
                        findResults={this.findSearchResults}
                    />
                    <Container id="postsContainer" className="p-3">
                        <div>{this.state.posts.map(post => (
                            // inside the Post component, to access the value of the post object, it will be this.props.key
                            // we pass in the value of post from the mapping function
                            // For the mapping function, passing in a key attribute ensures that each post will be unique
                            // another option: passing in the index as part of the map function

                            // also pass in the updatePost function
                            <Post
                                post={post}
                                key={post._id}
                                updatePost={this.updatePost}
                                deletePost={this.deletionInterim}/>
                            // <div key={post._id}>
                            // </div>
                        ))}
                        </div>
                    </Container>     
                </div>
                {/* Modal for editing post */}
                {/* show is linked to the state: only render when shown */}
                <Modal show={this.state.editingPost} onHide={this.cancelEdit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Post</Modal.Title>
                    </Modal.Header>
                    {/* main body of the modal popup */}
                    <Modal.Body className="editingModal">
                        <div className="post-form-group">
                            <Form>
                                <Form.Group controlId="inputName">
                                    <Form.Label>Post Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="updatedName"
                                        isInvalid={this.state.nameError}
                                        value={this.state.updatedName}
                                        aria-describedby="postNameHelp"
                                        onChange={this.updateFormField}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {this.state.nameError}
                                    </Form.Control.Feedback>
                                    <Form.Text id="postNameHelp" muted>
                                        {this.state.nameError ? null : "The name of your post — try to give your deck a descriptive title! (Max. 55 characters.)"}
                                    </Form.Text>
                                </Form.Group>
                            </Form>
                        </div>  

                        <div className="mb-3 post-form-group">
                            <h5>Deck</h5>

                            <p>Edit your deck! Still a maximum of 8 cards.</p>
                    
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

                                <h5 className="deckHeader">Card Selector</h5>
                                <div className="cardGrid">
                                    {this.state.labels.map((card, index) => {
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
                        <div className="post-form-group">
                            <Form>
                                <Form.Group className="mb-2" controlId="inputOverview">
                                    <Form.Label>Deck Overview</Form.Label>
                                    {/* type=text for plain text; aria-describedby references what describes the form*/}
                                    <Form.Control
                                        type="text"
                                        name="updatedOverview"
                                        isInvalid={this.state.overviewError}
                                        value={this.state.updatedOverview}
                                        as="textarea"
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
                                        name="updatedStrategy"
                                        isInvalid={this.state.strategyError}
                                        value={this.state.updatedStrategy}
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
                                <div className="slider-group mt-3">
                                    <div className="archetype-container">
                                        <Form.Select
                                            aria-label="Archetype selection menu"
                                            onChange={this.updateArchetype}
                                            isInvalid={this.state.archetypeError}
                                            value={this.state.updatedArchetype}
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
                                            value={this.state.updatedRating}
                                            onChange={this.updateRating}
                                        />
                                    </div>
                                    <div className="sliders difficulty-container">
                                        <h5>Difficulty</h5>
                                        <RangeSlider
                                            min={1}
                                            max={5}
                                            value={this.state.updatedDifficultyLevel}
                                            onChange={this.updateDifficulty}
                                        />
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.cancelEdit}>
                                Close
                        </Button>
                        <Button variant="primary" onClick={this.submitEdit}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Modal for deleting post */}
                <Modal show={this.state.deletingPost} onHide={this.cancelDeletion}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Post</Modal.Title>
                    </Modal.Header>
                    {/* main body of the modal popup */}
                    <Modal.Body className="deletionContainer">
                        <div className="deletionItems">
                            <img src={require("../assets/crying.png")} className="cryingImg mb-4" alt="crying king face"></img>
                            <p>ARE YOU SURE? Deletion is permanent!</p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.cancelDeletion}>
                                Don't Delete
                        </Button>
                        <Button variant="danger" onClick={this.deletePost}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
}