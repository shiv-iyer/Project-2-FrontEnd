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
        updatedCards: ["array of cards"],
        updatedArchetype: "",
        updatedOverview: "",
        updatedStrategy: "",
        updatedRating: 5,
        updatedDifficultyLevel: 3,
        editingPost: false,
         // one item in the state for each possible error
        nameError: "",
        overviewError: "",
        strategyError: "",
        archetypeError: "",
        currentPostID: "",

        // hold search and filter values
        search: "",
        archetypeFilter: ""
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

    updatePost = (post) => {

        // first step: setState so existing post info isn't lost
        this.setState({
            editingPost: true,
            updatedName: post.name,
            updatedDate: "04-01-23",
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
            editingPost: false
        })
    }

    submitEdit = async () => {
        try {
            // PUT request to API: 1st param is url, second param is body
            const updateResponse = await axios.put(`${BASE_API}posts/${this.state.currentPostID}`,{
                // save cards for later / cards: this.getCardIDs(),
                name: this.state.updatedName,
                date: "04-01-23",
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

    // load posts function
    loadPosts = async () => {
        // get from API 
        // backtick strings `` and $ are for passing in a parameter as part of the string (axios.get requires a string?)
        // posts: the name of my collection I want to retrieve from, in this case it's posts
        const postsResponse = await axios.get(`${BASE_API}posts?name=${this.state.search}&archetype=${this.state.archetypeFilter}`);

        // set state from the response
        this.setState({
            // postsResponse.data.posts
            posts: postsResponse.data.listings
        })

        // console log out to test
        console.log("posts: ");
        console.log(this.state.posts);
        
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

    findSearchResults = () => {
        this.loadPosts();
    }

    // on componentDidMount, call the function to load the posts

    componentDidMount = () => {
        try {
            this.loadPosts();
        } catch (error) {
            console.error(error);
        }
    }

    // then, we will use the map function to display the content from the posts

    render(){
        return (
            <React.Fragment>
                <div className="page-container">
                    <h1 className="centered p-3">View all posts</h1>
                    {/* pass in the relevant values as props */}
                    <SearchBar
                        search={this.state.search}
                        handleSearchChange={this.handleSearchChange}
                        handleFilterChange={this.handleFilterChange}
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
                                updatePost={this.updatePost}/>
                            // <div key={post._id}>
                            // </div>
                        ))}
                        </div>
                    </Container>     
                </div>
                {/* show is linked to the state: only render when shown */}
                <Modal show={this.state.editingPost} onHide={this.cancelEdit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Post</Modal.Title>
                    </Modal.Header>
                    {/* main body of the modal popup */}
                    <Modal.Body>
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
            </React.Fragment>
        );
    }
}