import React, {Component}from 'react';
import { Card, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal'

export default class MainUserCard extends Component{
    constructor(props){
        super(props);
    }

    render(){
        
        return(
            <div>
                <Modal show={this.props.showMatchPop} onHide={this.props.handleMatchClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>It's a Match!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo! {this.props.potentialMatches[0].user_firstname} likes you as well!</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleMatchClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}