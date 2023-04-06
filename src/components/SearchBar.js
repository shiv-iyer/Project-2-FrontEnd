// imports
import React from 'react';
import {Form, Button, Row, Col} from "react-bootstrap";

// let's try a function-based component

export default function SearchBar(props){
    return (
        <React.Fragment>
            <Row className="my-4 mx-4">
                <Col>
                    <Form.Control
                    type="text"
                    value={props.search}
                    onChange={props.handleSearchChange}
                    placeholder="Search posts..."
                    className="rounded-pill"
                    />
                </Col>
                <Col xs="auto">
                    <Form.Select onChange={props.handleFilterChange}>
                        <option value="">Filter by Archetype</option>
                        <option value="Beatdown">Beatdown</option>
                        <option value="Control">Control</option>
                        <option value="Cycle">Cycle</option>
                        <option value="Siege">Siege</option>
                        <option value="Spell Bait">Spell Bait</option>
                        <option value="Bridge Spam">Bridge Spam</option>
                        <option value="Others">Others</option>
                    </Form.Select>
                </Col>
                <Col xs="auto">
                    <Button onClick={props.findResults}>Find Results</Button>
                </Col>
            </Row>
        </React.Fragment>
    );
}