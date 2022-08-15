import React, { Component } from 'react';
import {Badge, Form, FormGroup, Label, Input, Button, Table, Row, Col, CloseButton, Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import Loading from './Loading';
import { fetchDocs } from '../../lib/fetchDocs';

export default class EventLogs extends Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef(); 
    this.state = {
        status: 'unset',
        date: '',
        eventLogs: [],
        logCollections: [],
        modal: false
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

  getEventLogs = async () => {
    this.setState({
      status: 'loading'
    })

    const eventLogs = await fetchDocs(this.state.date)
    
    this.setState({
      eventLogs,
      status: 'complete'
    })
  }
  
  reset = () => {
    this.setState({status: 'unset', date: ''})
  } 

  render() {
        const { date, eventLogs, status, logCollections, modal, modalData} = this.state;

        if(modal) {
          return (
          <Modal ref={this.wrapper} isOpen={modal}>
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

        if (status === 'unset' && logCollections.length > 0){
          return (
            <Form>
              <Row>
                <Col md={10}>
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
                <Col md={2}>
                <Label for=""></Label>
                  <center>
                  {date !== '' && date !== '-- None --' ? <Button className="mt-2" color="primary" onClick={this.getEventLogs}>Get Event Logs</Button> : <Button className="mt-2" color="primary" disabled onClick={this.getEventLogs}>Get Event Logs</Button>}
                </center>
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
              return(
                  <tr key={key}>
                    <th scope="row">
                      {/* +1 as key index begins at zero */}
                      {key + 1}
                    </th>
                    <td>
                      <a onClick={() => this.handleShowModal(obj)}><u>{obj.event_id}</u></a>
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