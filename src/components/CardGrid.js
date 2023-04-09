// imports
import React from 'react';
import {Form, Button, Row, Col, Container} from "react-bootstrap";

import '../assets/componentStyles.css';

// let's try a function-based component

export default function CardGrid(props){
    return (        
        <React.Fragment>
            <div>
                    {/* wrap everything in a parent div, that way it can be formatted and ordered nicely. */}
                    <div className="cardGrid">
                        {/* map the labels object, creating a clickable card based on the card name and its corresponding image URL */}
                        {/* we avoid hardcoding by mapping everything in this.state.labels. */}
                        {props.cards.map((card, index) => {
                            return (
                                <div key={index} className="clashCard customClashCard larger"
                                 onClick={() => props.click(card, card.cardName, card.cardRenderURL, card.cardDescription,
                                          card.elixirCost, card.cardRarity, card.cardCategories)}>
                                    <img src={card.cardURL} alt={card.cardName} className="cardImg"/>
                                     <p>{card.cardName}</p>
                                </div>
                            )
                        })}
                    </div>
            </div>
        </React.Fragment>

    );
}