import React, { Component } from 'react';
import { Table, Form, FormGroup, Label, Input, Button, Col, Row, NavItem, NavLink, Nav} from 'reactstrap';
import Loading from './Loading';
import { fetchDocs } from '../../lib/fetchDocs';
import { deleteCollectionDoc } from '../../lib/deleteCollectionDoc';

export default class SavedAlerts extends Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.state = {
        status: 'unset',
        savedAlerts: []
    };
  }
  
  componentDidMount = async () => {
    await this.getSavedAlerts();
  }

  getSavedAlerts = async () => {
    this.setState({
      status: 'loading'
    })

    const savedAlerts = await fetchDocs("alerts");
    
    this.setState({
      savedAlerts,
      status: 'complete'
    })
  }

  refresh = async() => {
    await this.getSavedAlerts();
  }

  delete = async (alertId) => {
    console.log("delete");
    console.log(alertId);
    const deleteAlert = await deleteCollectionDoc("alerts", alertId);
    console.log(deleteAlert)
    await this.getSavedAlerts()
  }

  render() {
        const { status, savedAlerts } = this.state;

        if (status === 'unset' || status === 'loading'){
          return (<Loading/>)
        } else if (status === 'complete' && savedAlerts.length > 0) {

                return (
                  <Row>
                    <Col md={5}>

                    </Col>
                    <Col md={5}>

                    </Col>
                    <Col md={1}>

                    </Col>
                    <Col md={1}>
                      <Button className="mt-2 bl-4" color="info" onClick={this.refresh}>Refresh</Button>
                    </Col>
                  <Table striped>
                    <thead>
                      <tr>
                        <th>
                          # ID
                        </th>
                        <th>
                          Alert Category
                        </th>
                        <th>
                          Alert Value
                        </th>
                        <th>
                          Date Created
                        </th>
                        <th>
                        Delete
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {savedAlerts.map((obj, key) => {
                        return(
                            <tr key={key}>
                              <th scope="row">
                                {obj.id}
                              </th>
                              <td>
                                {obj.alert_category}
                              </td>

                              <td>
                                {obj.alert_value}
                              </td>

                              <td>
                                {obj.date}
                              </td>

                              <td>
                                <Button className="mt-2 bl-4" color="danger" onClick={() => this.delete(obj.id)}>Delete</Button>
                              </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                  </Row>
                )

        }
  }
}
