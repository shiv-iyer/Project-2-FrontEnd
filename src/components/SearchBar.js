// imports
import React from 'react';
import {Form, Button, Row, Col, Container} from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";

import '../assets/componentStyles.css';

// let's try a function-based component

export default function SearchBar(props){
    return (
        // <React.Fragment>
        //     <Row className="my-4 mx-4 searchBarContainer">
        //         <Row>
        //             <Col>
        //                 <Form.Control
        //                 type="text"
        //                 value={props.search}
        //                 onChange={props.handleSearchChange}
        //                 placeholder="Search posts..."
        //                 className="rounded-pill searchInput bouncy"
        //                 />
        //             </Col>
        //             <Col xs="auto">
        //                 <Form.Select onChange={props.handleFilterChange} className="filterSelect bouncy">
        //                     <option value="">Filter by Archetype</option>
        //                     <option value="Beatdown">Beatdown</option>
        //                     <option value="Control">Control</option>
        //                     <option value="Cycle">Cycle</option>
        //                     <option value="Siege">Siege</option>
        //                     <option value="Spell Bait">Spell Bait</option>
        //                     <option value="Bridge Spam">Bridge Spam</option>
        //                     <option value="Others">Others</option>
        //                 </Form.Select>
        //             </Col>
        //         </Row>
        //         <Row className="my-4 sliderContainer">
        //             <Col>
        //                 <Row className="slider">
        //                     <label>Min. Rating: </label>
        //                     <Col>
        //                         <RangeSlider
        //                             className="bouncy"
        //                             min={1}
        //                             max={10}
        //                             value={props.rating}
        //                             onChange={props.handleRatingChange}
        //                         />
        //                     </Col>
        //                     <label>Max. Difficulty: </label>
        //                     <Col>
        //                         <RangeSlider
        //                             className="bouncy"
        //                             min={1}
        //                             max={5}
        //                             value={props.difficulty}
        //                             onChange={props.handleDifficultyChange}
        //                         />
        //                     </Col>
        //                 </Row>
        //             </Col>
        //             <Col>
        //                 <Button onClick={props.findResults} className="bouncy">Find Results</Button>
        //             </Col>
        //         </Row>
        //     </Row>
        // </React.Fragment>

        // 2
//         <React.Fragment>
//   <Container fluid>
//     <Row className="my-4 searchBarContainer">
//       <Col md={5} className="d-flex justify-content-center">
//         <Form.Control
//           type="text"
//           value={props.search}
//           onChange={props.handleSearchChange}
//           placeholder="Search posts..."
//           className="rounded-pill searchInput bouncy"
//         />
//       </Col>
//       <Col md={5} className="d-flex justify-content-center">
//         <Form.Select onChange={props.handleFilterChange} className="filterSelect bouncy">
//           <option value="">Filter by Archetype</option>
//           <option value="Beatdown">Beatdown</option>
//           <option value="Control">Control</option>
//           <option value="Cycle">Cycle</option>
//           <option value="Siege">Siege</option>
//           <option value="Spell Bait">Spell Bait</option>
//           <option value="Bridge Spam">Bridge Spam</option>
//           <option value="Others">Others</option>
//         </Form.Select>
//       </Col>
//     </Row>
//     <Row className="my-4 sliderContainer">
//       <Col md={4} className="d-flex justify-content-center">
//         <label>Min. Rating: </label>
//         <RangeSlider
//           className="bouncy mx-2"
//           min={1}
//           max={10}
//           value={props.rating}
//           onChange={props.handleRatingChange}
//         />
//       </Col>
//       <Col md={4} className="d-flex justify-content-center">
//         <label>Max. Difficulty: </label>
//         <RangeSlider
//           className="bouncy mx-2"
//           min={1}
//           max={5}
//           value={props.difficulty}
//           onChange={props.handleDifficultyChange}
//         />
//       </Col>
//       <Col md={4} className="d-flex justify-content-center">
//         <Button onClick={props.findResults} className="bouncy">
//           Find Results
//         </Button>
//       </Col>
//     </Row>
//   </Container>
// </React.Fragment>

// 3
// <React.Fragment>
//   <Container fluid>
//     <Row className="my-4 searchBarContainer">
//       <Col md={6} className="d-flex justify-content-end">
//         <Form.Control
//           type="text"
//           value={props.search}
//           onChange={props.handleSearchChange}
//           placeholder="Search posts..."
//           className="rounded-pill searchInput bouncy"
//         />
//       </Col>
//       <Col md={6} className="d-flex justify-content-start">
//         <Form.Select onChange={props.handleFilterChange} className="filterSelect bouncy">
//           <option value="">Filter by Archetype</option>
//           <option value="Beatdown">Beatdown</option>
//           <option value="Control">Control</option>
//           <option value="Cycle">Cycle</option>
//           <option value="Siege">Siege</option>
//           <option value="Spell Bait">Spell Bait</option>
//           <option value="Bridge Spam">Bridge Spam</option>
//           <option value="Others">Others</option>
//         </Form.Select>
//       </Col>
//     </Row>
//     <Row className="my-4 sliderContainer">
//       <Col md={4} className="d-flex justify-content-end">
//         <label>Min. Rating: </label>
//         <RangeSlider
//           className="bouncy mx-2"
//           min={1}
//           max={10}
//           value={props.rating}
//           onChange={props.handleRatingChange}
//         />
//       </Col>
//       <Col md={4} className="d-flex justify-content-center">
//         <label>Max. Difficulty: </label>
//         <RangeSlider
//           className="bouncy mx-2"
//           min={1}
//           max={5}
//           value={props.difficulty}
//           onChange={props.handleDifficultyChange}
//         />
//       </Col>
//       <Col md={4} className="d-flex justify-content-start">
//         <Button onClick={props.findResults} className="bouncy">
//           Find Results
//         </Button>
//       </Col>
//     </Row>
//   </Container>
// </React.Fragment>

<React.Fragment>
  <Container fluid>
    <Row className="my-4 searchBarContainer">
      <Col xs={12} md={6} className="d-flex justify-content-md-end justify-content-center">
        <Form.Control
          type="text"
          value={props.search}
          onChange={props.handleSearchChange}
          placeholder="Search posts..."
          className="rounded-pill searchInput bouncy"
        />
      </Col>
      <Col xs={12} md={6} className="d-flex justify-content-md-start justify-content-center mt-3 mt-md-0">
        <Form.Select onChange={props.handleFilterChange} className="filterSelect bouncy">
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
    </Row>
    <Row className="my-4 sliderContainer">
      <Col xs={12} md={4} className="d-flex flex-column justify-content-center align-items-center">
        <label>Min. Rating: </label>
        <RangeSlider
          className="bouncy"
          min={1}
          max={10}
          value={props.rating}
          onChange={props.handleRatingChange}
        />
      </Col>
      <Col xs={12} md={4} className="d-flex flex-column justify-content-center align-items-center">
        <label>Max. Difficulty: </label>
        <RangeSlider
          className="bouncy"
          min={1}
          max={5}
          value={props.difficulty}
          onChange={props.handleDifficultyChange}
        />
      </Col>
      <Col xs={12} md={4} className="d-flex justify-content-center mt-3 mt-md-0">
        <Button onClick={props.findResults} className="bouncy">
          Find Results
        </Button>
      </Col>
    </Row>
  </Container>
</React.Fragment>

    );
}