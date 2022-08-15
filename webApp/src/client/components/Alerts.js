import React, { Component } from 'react';
import { Alert, Form, FormGroup, Label, Input, Button, Col, Row, NavItem, NavLink, Nav} from 'reactstrap';
import { addDocToCollection } from '../../lib/addDocToCollection';

export default class Alerts extends Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.state = {
        status: 'unset',
        inputValue: '',
        selectValue: 'Event ID',
        today: '',
        error: false
    };
  }
  componentDidMount = async () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '-' + mm + '-' + yyyy;

    this.setState({
      today
    }); 
  }

  sendAlert = async () => {
    let alertData = {
      "date": this.state.today, 
      "alert_category": this.state.selectValue, 
      "alert_value": this.state.inputValue
    }
    let response = await addDocToCollection("alerts", alertData);
    if (response === 'ok'){
        this.setState({
        status: 'complete'
      })
    } else {
      this.setState({
        error: true
      })
    }
  }
  
  reset = () => {
    document.getElementById("form").reset();
    this.setState({
      status: 'unset', 
      selectValue: 'Event ID',
      inputValue: '',
      error: false
    })
  } 

  render() {
        const {status, selectValue, inputValue } = this.state;
        return(
          <Form id="form" ref={this.wrapper}>
               <Row>
                <Col md={5}>
                  <FormGroup>
                        <Label for="eventId">
                          Alert Category
                        </Label>
                        <Input
                          id="eventId"
                          name="eventId"
                          type="select"
                          onChange={(e) => this.setState({selectValue: e.target.value})}>
                        <option>
                          Event ID
                        </option>
                        <option>
                          Username
                        </option>
                        <option>
                          Event Type
                        </option>
                        <option>
                          Audit Category
                        </option>
                        </Input>
                  </FormGroup>
                </Col>
                <Col md={5}>
                  <FormGroup>
                        {selectValue === 'Event ID' ? <Label for="eventId">Event ID</Label> : selectValue === 'Username' ? <Label>Username</Label> : selectValue === 'Event Type' ? <Label>Event Type</Label> : <Label>Audit Category</Label>}
                        {selectValue === 'Event Type' ? 
                          <Input
                            id="inputValue"
                            name="inputValue"
                            type="select"
                            onChange={(e) => this.setState({inputValue: e.target.value})}
                          >
                          <option>
                            -- None --
                          </option>
                          <option>
                            AUDIT_FAILURE
                          </option>
                          <option>
                            AUDIT_SUCCESS
                          </option>
                          <option>
                            INFORMATION_TYPE
                          </option>
                          <option>
                            WARNING_TYPE
                          </option>
                          <option>
                            ERROR_TYPE
                          </option>
                          </Input> : selectValue === 'Audit Category' ?
                            <Input
                             id="inputValue"
                             name="inputValue"
                             type="select"
                             onChange={(e) => this.setState({inputValue: e.target.value})}
                            >
                            <option>
                            -- None --
                            </option>
                            <option>
                              Account Logon
                            </option>
                            <option>
                              Account Management
                            </option>
                            <option>
                              Directory Service
                            </option>
                            <option>
                              Logon Logoff
                            </option>
                            <option>
                              Non Audit
                            </option>
                            <option>
                              Object Access
                            </option>
                            <option>
                              Policy Change
                            </option>
                            <option>
                              Privilege Use
                            </option>
                            <option>
                              Process Tracking
                            </option>
                            <option>
                              System
                            </option>
                            <option>
                              Uncategorized
                            </option>
                           </Input> :
                          <Input
                            onChange={(e) => this.setState({inputValue: e.target.value})}
                            id="inputValue" 
                            name="inputValue"
                            type="text">
                          </Input>
                        }
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <Label for=""></Label>
                  <FormGroup>
                      {inputValue === '' || inputValue === '-- None -- ' ? <Button className="mt-2 pl-4" onClick={this.sendAlert} disabled color="primary">Create Alert</Button> : <Button className="mt-2 pl-4" onClick={this.sendAlert} color="primary">Create Alert</Button>}
                      <Button className="mt-2 bl-4" color="danger" onClick={this.reset}>Reset</Button>
                  </FormGroup>
                </Col>
              </Row>
              {status ==='complete' ? <Alert>Alert Successfully created!</Alert> : <p></p>}
              {status ==='error' ? <Alert>An error ocuured when attempting to create your alert, please reset and try again</Alert> : <p></p>}
            </Form>
          )
        } 
}
