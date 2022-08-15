import React, { Component } from 'react';
import { Table, Form, FormGroup, Label, Input, Button, Col, Row, NavItem, NavLink, Nav} from 'reactstrap';
import Loading from './Loading';
import { fetchDocs } from '../../lib/fetchDocs';

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
        status: 'unset',
        users: []
    };
  }
  
  componentDidMount = async () => {
    await this.getUsers()
    this.setState({
      status: "complete"
    });
  }

  getUsers = async () => {
    this.setState({
      status: 'loading'
    })

    let users = await fetchDocs("users");
  
    this.setState({
      status: 'complete',
      users
    })
  }

  render() {
        const { status, users } = this.state;
        if( status === "loading"){
            return <Loading />
          } 
          
        else if (status === "complete") {
            return(
              <Row>
                <Col>
              <Table striped>
              <thead>
                <tr>
                  <th>
                    #
                  </th>
                  <th>
                    Username
                  </th>
                  <th>
                    Email
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((obj, key) => {
                  return(
                      <tr key={key}>
                        <th scope="row">
                          {/* +1 as key index begins at zero */}
                          {key + 1}
                        </th>
                        <td>
                          {obj.username}
                        </td>
    
                        <td>
                          {obj.email}
                        </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
            </Col>
            </Row>
            )
        } 
    }
}
