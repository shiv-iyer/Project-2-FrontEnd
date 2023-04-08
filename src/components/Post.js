import React from "react";

// React-bootstrap imports
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

// stylesheet
import "../pages.css";

// create the component: extend React.Component to have all the functionality of a react component
export default class Post extends React.Component {
    // state?
    state = {
        rating: 9,
        difficulty: 4
    }

    render(){

        console.log(this.props.post);

        return <React.Fragment>
            <div className="border shadow">
                                    <h1 className="p-3">Post Name: {this.props.post.name}</h1>
                                    <h5 className="p-1">Posted by: {this.props.post.userThatPosted}</h5>
                                    <h5 className="p-1">Date posted: {this.props.post.dateOfCreation}</h5>
                                    <h6 className="p-1">Date updated: {this.props.post.dateOfUpdation}</h6>
                                    <div id="deckContainer" className="p-3 mb-2">
                                        <h5 className="my-2">Deck</h5>
                                        {this.props.post.deck.cards.map((card) => (
                                            <div>
                                                <p>{card.cardName}</p>
                                                <img src={card.cardURL} alt="One card in the user's deck of 8 cards"/>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="p-3 mb-2">Overview: {this.props.post.postInfo.overview}</p>
                                    <p className="p-3 mb-2">Strategy: {this.props.post.postInfo.strategy}</p>
                                    <p className="p-3 mb-2">Archetype: {this.props.post.archetype}</p>
                                    <p className="p-1">Rating: {this.props.post.postInfo.rating}</p>
                                    <p className="p-1">Difficulty: {this.props.post.postInfo.difficultyLevel}</p>
                                    <Button
                                        variant="secondary"
                                        onClick={()=> this.props.updatePost(this.props.post)}
                                        >Edit</Button>
                                </div>
            {/* 
            <Card className="post-card mb-3 p-2">
                <Card.Title>— Post Name —</Card.Title>
                <Card.Subtitle className="mb-1 text-muted subtitle">by @username</Card.Subtitle>
                <Card.Subtitle className="mb-3 text-muted subtitle">2023-03-26</Card.Subtitle>
                // Probably need to put the deck here. As well as deck information, maybe deck and card components
                <Card.Text className="headers mb-1">Overview</Card.Text>
                <Card.Text className="mb-3">
                    3.0 Xbow Cycle is hfbjdcv hd jnxkmlzjnb jnzkbjfdhknvclxznbhjc lorem ipsum mwhatever.
                </Card.Text>
                <Card.Text className="headers mb-1">Strategy</Card.Text>
                <Card.Text className="mb-3">
                    Just anyhow throw cards lol!
                </Card.Text>
                <Container>
                    <Row>
                        <Col><Card.Text className="side-headers">Rating: {this.state.rating}</Card.Text></Col>
                        <Col><Card.Text className="side-headers">Difficulty: {this.state.difficulty}</Card.Text></Col>
                    </Row>
                </Container>
            </Card>
            */}

        </React.Fragment>
    }
}