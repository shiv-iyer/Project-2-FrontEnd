import React from "react";

// React-bootstrap imports
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
        return <React.Fragment>
            <Card className="post-card mb-3 p-2">
                <Card.Title>— Post Name —</Card.Title>
                <Card.Subtitle className="mb-1 text-muted subtitle">by @username</Card.Subtitle>
                <Card.Subtitle className="mb-3 text-muted subtitle">2023-03-26</Card.Subtitle>
                {/* Probably need to put the deck here. As well as deck information, maybe deck and card components*/}
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
        </React.Fragment>
    }
}