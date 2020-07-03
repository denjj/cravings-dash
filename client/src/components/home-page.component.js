import React from 'react';
import { UncontrolledCarousel, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Row, Col } from 'reactstrap';



const delivery1 = require('../assests/homepage/delivery1.jpg');
const delivery2 = require('../assests/homepage/delivery2.jpg');
const delivery3 = require('../assests/homepage/delivery3.jpg');
const card1 = require('../assests/homepage/fork.jpg');
const card2 = require('../assests/homepage/home.jpg');
const card3 = require('../assests/homepage/clock.jpg');

const items = [
  {
    src: delivery1,
    altText: 'Slide 1',
    caption: '',
    header: '',
    key: '1'
  },
  {
    src: delivery2,
    altText: 'Slide 2',
    caption: '',
    header: '',
    key: '2'
  },
  {
    src: delivery3,
    altText: 'Slide 3',
    caption: '',
    header: '',
    key: '3'
  }
];

export default class Homepage extends React.Component{
    
    render() {
        return (
            <div>
                <h3>Welcome to Cravings Dash </h3>
                <UncontrolledCarousel items={items} />
                <hr/>
                <h4>Why choose Cravings Dash?</h4>
                <br/>
                <Row className="row justify-content-md-center">
                  <Col sm="2">
                    <Card>
                      <CardImg top width="100%" src={card1} alt="Card image cap" />
                      <CardBody className="text-center">
                        <CardTitle></CardTitle>
                        <CardSubtitle></CardSubtitle>
                        <CardText>Wide Variety of Restaurants</CardText>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col sm="2">
                    <Card>
                    <CardImg top width="100%" src={card2} alt="Card image cap" />
                      <CardBody className="text-center">
                        <CardTitle></CardTitle>
                        <CardSubtitle></CardSubtitle>
                        <CardText>Delivery Straight to Your Door</CardText>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col sm="2">
                    <Card>
                     <CardImg top width="100%" src={card3} alt="Card image cap" />
                      <CardBody className="text-center">
                        <CardTitle></CardTitle>
                        <CardSubtitle></CardSubtitle>
                        <CardText>Fast and Easy Ordering</CardText>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <br/>
                <p>DISCLAIMER: * This is a student project for educational purposes only. No monetary value is being exchanged. * </p>
            </div>
        )
    }


}
