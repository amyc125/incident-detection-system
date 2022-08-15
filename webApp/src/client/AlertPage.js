import React, { Component } from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import Loading from './components/Loading';
import Alerts from './components/Alerts';
import SavedAlerts from './components/SavedAlerts';
import TriggeredAlerts from './components/TriggeredAlerts';

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "loading",
    };
  }

  componentDidMount = async () => {
    this.setState({
      status: "complete",
    });
  }

  render() {
    const { status } = this.state;
    if( status === "loading"){
      return <Loading />
    } 
    
    else if (status === "complete") {
      return (
        <Container>
          <Row className="pb-3">
            <Col xs="12" lg="12">
              <Card className="mt-5">
                <CardHeader>Create Alert</CardHeader>
                <CardBody>
                  <Alerts />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="pb-3">
            <Col xs="12" lg="12">
              <Card className="mt-5">
                <CardHeader>Saved Alerts</CardHeader>
                <CardBody>
                  <SavedAlerts />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="pb-3">
            <Col xs="12" lg="12">
              <Card className="mt-5">
                <CardHeader>Triggered Alerts</CardHeader>
                <CardBody>
                  <TriggeredAlerts />
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
