import React, { Component } from 'react';
import { Table, Form, FormGroup, Label, Input, Button, Col, Row, NavItem, NavLink, Nav} from 'reactstrap';
import Loading from './Loading';
import { fetchDocs } from '../../lib/fetchDocs';


export default class Count extends Component {
  constructor(props) {
    super(props);
    this.state = {
        status: 'unset',
        triggeredAlerts: []
    };
  }
  
  componentDidMount = async () => {
    await this.getTriggeredAlerts();
    this.timer = setInterval(async () => {
      // refreshes the triggered alerts every minute
      console.log("refresh");
      await this.getTriggeredAlerts()
    },10000)
  }

  getTriggeredAlerts = async () => {
    this.setState({
      status: 'loading'
    })

    const triggeredAlerts = await fetchDocs("triggered_alerts");
    
    this.setState({
      triggeredAlerts,
      status: 'complete'
    })
  }

  render() {
        const { triggeredAlerts, status} = this.state;

        if( status === "loading"){
            return <Loading />
          } 
        else if (status === "complete") {
              if (status === 'unset' || status === 'loading'){
                return (<Loading/>)
              } else if (status === 'complete' && triggeredAlerts.length > 0) {
      
                      return (
                        <Row>
                          <Col md={5}>
      
                          </Col>
                          <Col md={5}>
      
                          </Col>
                          <Col md={1}>
      
                          </Col>
                          <Col md={1}>

                          </Col>
                        <Table striped>
                          <thead>
                            <tr>
                              <th>
                                # ID
                              </th>
                              <th>
                                Alert ID
                              </th>
                              <th>
                                Alert Category
                              </th>
                              <th>
                                Match
                              </th>
                              <th>
                                Alert Value
                              </th>
                              <th>
                                Date Created
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {triggeredAlerts.map((obj, key) => {
                              return(
                                  <tr key={key}>
                                    <th scope="row">
                                      {obj.id}
                                    </th>

                                    <td>
                                      {obj.alert_id}
                                    </td>

                                    <td>
                                      {obj.alert_category}
                                    </td>

                                    <td>
                                      "=="
                                    </td>
      
                                    <td>
                                      {obj.alert_value}
                                    </td>
      
                                    <td>
                                      {obj.time_generated}
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
}
