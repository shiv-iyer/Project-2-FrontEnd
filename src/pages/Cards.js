import React from "react";

// API and Axios
import BASE_API from '../components/BaseApi';
import axios from "axios";

// components
import CardGrid from "../components/CardGrid";

export default class Cards extends React.Component {
    // state
    state = {
        cards: []
    }

    // functions
    // load cards function
    loadCards = async () => {
        // get from API 
        const cardsResponse = await axios.get(`${BASE_API}cards`);
        // store the data in a separate object
        const dataObj = cardsResponse.data.listings;
        console.log(dataObj);
        // create a temporary array to store the new objects in first, will setState with it later
        const tempCards = []
        // run through the object and extract all the info to be saved for displaying later
        dataObj.forEach((element) => {
            const cardName = element.cardInfo.name;
            const cardURL = element.cardURL;
            const cardRenderURL = element.renderURL;
            const cardRarity = element.cardInfo.rarity;
            const elixirCost = element.cardInfo.elixirCost;
            const cardCategories = element.cardInfo.category;
            const output = {
                    cardName,
                    cardURL,
                    cardRenderURL,
                    cardRarity,
                    elixirCost,
                    cardCategories
            } 
            tempCards.push(output)
        })

        this.setState({
            cards: tempCards
        })

        console.log("This.state.cards");
        console.log(this.state.cards);
    }

    loadCardPopup = (card) => {
        console.log(card);
    }

    componentDidMount = () => {
        try {
            this.loadCards();
        } catch (error) {
            console.error(error);
        }
    }

    render(){
        return (
            <React.Fragment>
                <h5 className="deckHeader my-3">View Cards</h5>
                <CardGrid cards={this.state.cards} click={this.loadCardPopup}/>
            </React.Fragment>
        );
    }
}