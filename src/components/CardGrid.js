// imports
import React from 'react';

// stylesheets
import "../assets/componentStyles.css";
import "../assets/cards.css";

// let's try a function-based component

export default function CardGrid(props){
    return (        
        <React.Fragment>
            <div>
                    {/* wrap everything in a parent div, that way it can be formatted and ordered nicely. */}
                    <div className="cardGrid">
                        {/* map everything from the parent component's cards array, which has all the info we need to display everything */}
                        {props.cards.map((card, index) => {
                            return (
                                <div key={index} className="clashCard customClashCard larger"
                                 onClick={() => props.click(card, card.cardName, card.cardRenderURL, card.cardDescription,
                                          card.elixirCost, card.cardRarity, card.cardCategories)}>
                                    <img src={card.cardURL} alt={card.cardName} className="cardImg"/>
                                     <p className="clashCard">{card.cardName}</p>
                                </div>
                            )
                        })}
                    </div>
            </div>
        </React.Fragment>

    );
}