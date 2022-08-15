import React, { Component } from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import Loading from './components/Loading';
import Count from './components/Count';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "loading",
      today: "" 
    };
  }

  componentDidMount = async () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '-' + mm + '-' + yyyy;
    console.log(today)

    this.setState({
      status: "complete",
      today
    });
  }


  render() {
    const { status, today } = this.state;
    if( status === "loading"){
      return <Loading />
    } 
    
    else if (status === "complete") {
      return (
        <Container>
          <br />
          <h1>Dashboard</h1>
          <Row>
            <Col md={6}>
              <Card className="mt-5">
                    <CardHeader># Users</CardHeader>
                    <CardBody>
                      <Count collection="users"/>
                    </CardBody>
                  </Card>
                </Col>
            <Col md={6}>
              <Card className="mt-5">
                <CardHeader># Events Collected Today</CardHeader>
                <CardBody>
                  <Count collection={today} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>);
    } 
    
    else {
      <Container>
        <h2>Error</h2>
      </Container>
    }
  }
}
