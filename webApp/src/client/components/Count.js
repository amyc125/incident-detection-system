import React, { Component } from 'react';
import { Table, Form, FormGroup, Label, Input, Button, Col, Row, NavItem, NavLink, Nav} from 'reactstrap';
import Loading from './Loading';
import { countCollectionDocs } from '../../lib/countCollectionDocs';

export default class Count extends Component {
  constructor(props) {
    super(props);
    this.state = {
        status: 'unset',
        collection: props.collection,
        count: 0
    };
  }
  
  componentDidMount = async () => {
    await this.getCount()
    this.setState({
      status: "complete"
    });
  }


  getCount = async () => {
    this.setState({
      status: 'loading'
    })

    let count = await countCollectionDocs(this.state.collection);
  
    this.setState({
      status: 'complete',
      count
    })
  }

  render() {
        const { count, status} = this.state;
        if( status === "loading"){
            return <Loading />
          } 
          
        else if (status === "complete") {
            return(
                <center>
                    <h1>{count}</h1>
                </center>
            )
        } 
    }
}
