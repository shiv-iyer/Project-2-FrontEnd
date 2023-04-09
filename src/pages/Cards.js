import React from "react";

// API and Axios
import BASE_API from '../components/BaseApi';
import axios from "axios";

// components
import CardGrid from "../components/CardGrid";

// react-bootstrap
import { Modal, Button } from "react-bootstrap";

// stylesheet
import "../assets/cards.css"

export default class Cards extends React.Component {
    // state
    state = {
        cards: [],
        showingPopup: false,
        currentCard: "",
        currentCardRenderURL: "",
        currentCardDescription: "",
        currentCardElixirCost: 0,
        currentCardRarity: "",
        currentCardCategories: []
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
            const cardDescription = element.cardInfo.description;
            const cardRarity = element.cardInfo.rarity;
            const elixirCost = element.cardInfo.elixirCost;
            const cardCategories = element.cardInfo.category;
            const output = {
                    cardName,
                    cardURL,
                    cardRenderURL,
                    cardDescription,
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

    loadCardPopup = (card, cardName, cardURL, cardDescription, cardElixirCost, cardRarity, cardCategories) => {
        this.setState({
            showingPopup: true,
            currentCard: cardName,
            currentCardRenderURL: cardURL,
            currentCardDescription: cardDescription,
            currentCardElixirCost: cardElixirCost,
            currentCardRarity: cardRarity,
            currentCardCategories: cardCategories
        })
        console.log(card);
    }

    hideCardPopup = () => {
        this.setState({
            showingPopup: false,
            currentCard: "",
            currentCardRenderUrl: "",
            currentCardDescription: "",
            currentCardElixirCost: 0,
            currentCardRarity: "",
            currentCardCategories: []
        })
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
                <Modal show={this.state.showingPopup} onHide={this.hideCardPopup}>
                    <Modal.Header className="header modalMain">
                        <Modal.Title>{this.state.currentCard}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modalBody">
                        {/* conditional rendering: if the current card render URL exists, display it as an image, else don't display anything */}
                        {/* split the current card categories by a comma anad a space, in the event that there are multiple values (ex. Xbow) */}
                        {this.state.currentCardRenderURL ? <img src={this.state.currentCardRenderURL} alt={this.state.currentCard} className="renderImg largeish"/> : null}
                        <div className="infoBody largeish">
                            <p>{this.state.currentCardDescription}</p>
                            <p>Rarity: {this.state.currentCardRarity}</p>
                            <p>Card categories: {this.state.currentCardCategories.join(", ")}</p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="modalMain">
                        <Button variant="primary" className="moreBtnStyles larger" onClick={this.hideCardPopup}>
                            Cool!
                        </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
}