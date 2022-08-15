import React, { Component } from 'react';
import { Badge, Table, Form, FormGroup, Label, Input, Button, Col, Row, CloseButton, Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import Loading from './Loading';
import { fetchEventViaQuery } from '../../lib/fetchEventViaQuery';
import { fetchDocs } from '../../lib/fetchDocs';

export default class SearchTool extends Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    //look up react state 
    this.state = {
        status: 'unset',
        date: '',
        inputValue: '',
        selectValue: 'Event ID',
        logCollections: [],
        modal: false,
    };
  }

  componentDidMount = async () => {
    let logCollections = await fetchDocs("event_log_collections")
    logCollections.unshift({"date": "-- None --"})
    this.setState({
      logCollections,
    })  
  }

  handleShowModal = (obj) => {
    console.log(obj)
    this.setState({
        modal: true,
        modalData: obj
    })
  }

  handleHideModal = () => {
    this.setState({
        modal: false,
        modalData: null
    })
  }


  getEvents = async () => {
    this.setState({
      status: 'loading'
    })

    let eventLogs = []
    if(this.state.selectValue === 'Event ID') {
      eventLogs = await fetchEventViaQuery(this.state.date, 'event_id', this.state.inputValue)
    } else if (this.state.selectValue === 'Username'){
      eventLogs = await fetchEventViaQuery(this.state.date, 'username', this.state.inputValue)
    } else if (this.state.selectValue === 'Event Type') {
      eventLogs = await fetchEventViaQuery(this.state.date, 'event_type', this.state.inputValue)
    } else if (this.state.selectValue === 'Audit Category') { 
      eventLogs = await fetchEventViaQuery(this.state.date, 'audit_category', this.state.inputValue.toLowerCase().replace(" ", "_"))
    } else if (this.state.selectValue === 'Email') { 
      eventLogs = await fetchEventViaQuery(this.state.date, 'email', this.state.inputValue)
    }
    
    this.setState({
      eventLogs,
      status: 'complete'
    })
  }
  
  reset = () => {
    this.setState({
      status: 'unset', 
      selectValue: 'Event ID',
      inputValue: '',
      date: ''
    })
  } 

  render() {
        const { selectValue, eventLogs, status, logCollections, modal, modalData} = this.state;

        if(modal) {
          return (
          <Modal isOpen={modal}>
            <ModalHeader value={modal} toggle={this.handleHideModal}>Event ID: <Badge color="primary" pill>{modalData.event_id}</Badge> | {modalData.time_generated}</ModalHeader>
            <ModalBody>
              <p><u>Message</u>: {modalData.message === "" || modalData.message == null ? "No value present" : modalData.message}</p>
              <p><u>Event Type</u>: {modalData.event_type === "" || modalData.event_type == null ? "No value present" : modalData.event_type}</p>
              <p><u>Event Category</u>: {modalData.event_category === "" || modalData.event_category == null ? "No value present" : modalData.event_category}</p>
              <p><u>Logtype</u>: {modalData.logtype === "" || modalData.logtype == null ? "No value present" : modalData.logtype}</p>
              <p><u>Record Number</u>: {modalData.record_number === "" || modalData.record_number == null ? "No value present" : modalData.record_number}</p>
              <p><u>Source</u>: {modalData.source === "" || modalData.source == null ? "No value present" : modalData.source}</p>
              <p><u>Computer Name</u>: {modalData.computer_name === "" || modalData.computer_name == null ? "No value present" : modalData.computer_name}</p>
              <p><u>Username</u>: {modalData.username === "" || modalData.username == null ? "No value present" : modalData.username}</p>
              <p><u>Email</u>: {modalData.email === "" || modalData.email == null ? "No value present" : modalData.email}</p>
              <p><u>More Info</u>: {modalData.external_info === "" || modalData.external_info == null || modalData.external_info == "unknown" ? "No value present" : <a href={modalData.external_info}>"Link"</a>}</p>
            </ModalBody>
            <ModalFooter>
              {' '}
              <Button color="danger" onClick={this.handleHideModal}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
          )
        }
        
        if (status === 'unset'){
          return (
            <Form>
               <Row>
                <Col md={3}>
                  <FormGroup>
                        <Label for="selectDate">
                          Select Date
                        </Label>
                        <Input
                          onChange={(e) => this.setState({date: e.target.value})}
                          id="selectDate"
                          name="selectDate"
                          type="select"
                          dd={logCollections}>
                          {logCollections.map(dropdown => {
                              return <option key={dropdown.date} dropdown={dropdown.date} value={dropdown.date}>
                                {dropdown.date}</option>;
                              })
                          }
                        </Input>
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                        <Label for="eventId">
                          Search Category
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
                <Col md={4}>
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
                          {selectValue === 'Audit Category' ?  this.setState({inputValue: "test"}) : ''}
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
                    {this.state.inputValue === '' || this.state.date === '' || this.state.date === '-- None --' ? <Button className="mt-2 pl-4" disabled color="success" onClick={this.getEvents}>Get Event Log</Button> : <Button className="mt-2 ml-4" color="success" onClick={this.getEvents}>Get Event Log</Button>}
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          )
        } else if (status === 'loading') {
            return <Loading />
        } else if (status === 'complete') {
            if (eventLogs.length < 1){
              return (
                <Row>
                  <center>
                    <h3>No Results Found</h3>
                    <br />
                    <Button color="danger" onClick={this.reset}>Back to Search</Button>
                  </center>
                </Row>
              )
            }
           return (
            <Col>
              <CloseButton onClick={this.reset}/>
            <Table striped>
            <thead>
              <tr>
                <th>
                  #
                </th>
                <th>
                  Doc ID
                </th>
                <th>
                  Event ID
                </th>
                <th>
                  Event Type
                </th>
                <th>
                  Computer Name
                </th>
                <th>
                  Event Category
                </th>
                <th>
                  Event Source
                </th>
                <th>
                  Time Generated
                </th>
              </tr>
            </thead>
            <tbody>
              {eventLogs.map((obj, key) => {
                console.log(obj)
                return(
                    <tr key={key}>
                      <th scope="row">
                        {/* +1 as key index begins at zero */}
                       
                      </th>
                      <td>
                        <a onClick={() => this.handleShowModal(obj)}><u>{obj.event_id}</u></a>
                      </td>
                      <td>
                        {obj.id}
                      </td>
                      <td>
                        {obj.event_type}
                      </td>

                      <td>
                        {obj.computer_name}
                      </td>

                      <td>
                        {obj.event_category}
                      </td>

                      <td>
                        {obj.source}
                      </td>

                      <td>
                        {obj.time_generated}
                      </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
          </Col>
          )
        }
    } 
}
