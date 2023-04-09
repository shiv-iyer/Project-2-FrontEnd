import React from "react";

// React-bootstrap imports
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

// stylesheet
import "../pages.css";
import "../assets/post.css"

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
            <div className="postContainer">
                <div className="postHeaderContainer">
                    <h1 className="p-3">Post Name: {this.props.post.name}</h1>
                    <h3 className="p-1 rightAlign">Posted by: @{this.props.post.userThatPosted}</h3>
                    <h5 className="p-1 rightAlign">Date posted: {this.props.post.dateOfCreation}</h5>
                    
                    {/* conditionally render dateOfUpdation only if it exists! if null do not display!*/}
                    {this.props.post.dateOfUpdation ? <h6 className="p-1 rightAlign">Date updated: {this.props.post.dateOfUpdation}</h6> : null}
                </div>
                <div className="deckContainer">
                    {this.props.post.deck.cards.map((card) => (
                        <div key={card.cardID} className="cardItem larger">
                            <img
                                src={card.cardURL}
                                alt="One card in the user's deck of 8 cards"
                                style={{ maxWidth: "100%" }}
                            />
                            <p>{card.cardName}</p>
                        </div>
                    ))}
                </div>
                <div className="postInfoContainer">
                    <p className="p-2 mb-2">Overview: {this.props.post.postInfo.overview}</p>
                    <p className="p-2 mb-2">Strategy: {this.props.post.postInfo.strategy}</p>
                    <p className="p-2 mb-2">Archetype: {this.props.post.archetype}</p>
                    <p className="p-1">Rating: {this.props.post.postInfo.rating}</p>
                    <p className="p-1">Difficulty: {this.props.post.postInfo.difficultyLevel}</p>
                </div>
                <Button
                    variant="warning"
                    className="postButton mb-4 me-2 larger"
                    onClick={()=> this.props.updatePost(this.props.post)}
                    >Edit
                </Button>
                <Button
                    variant="danger"
                    className="postButton mb-4 ms-2 larger"
                    onClick={()=> this.props.deletePost(this.props.post)}
                    >Delete
                </Button>
            </div>
        </React.Fragment>
    }
}