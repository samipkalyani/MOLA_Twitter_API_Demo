import React, { useState } from 'react'
import Footer from './Footer';
import { useHistory } from 'react-router';
// Bootstrap imports
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function Home(){
    // State
    const [username, setUserName] = useState('')
    const [show, setShow] = useState(false);
    
    let history = useHistory();
    
    // Function definitions

    // Handles closing of the modal
    const handleClose = () => setShow(false);

    // Updates the username in state
    function handleUsername(e){
        setUserName(e.target.value)
    }

    // Used for calling the twitter api
    function searchuser(e){
        e.preventDefault()
        var usr = username
        if(usr === '@' && usr.length === 1){
            alert('User does not exists')
            return null
        }
        if(usr[0] === '@'){
            usr = usr.slice(1)
            console.log(usr)
        }
        axios.get('http://localhost:8000/check_username', {
            params:{
                username: usr
            }
        }).then(
            res=>{
                console.log(res)
                if (res.data.exists && usr !== ''){
                    history.push({
                        pathname: '/user',
                        state: {
                            user_id: res.data.data ? res.data.data.id : '',
                            username: res.data.data ? res.data.data.username : ''
                        }
                    })
                }
                else{
                    setShow(true)
                    // alert('User does not exists')
                }
            }
        )
    }
    return(
        <React.Fragment>

            {/* ---- Modal starts here ---- */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Invalid user</Modal.Title>
                </Modal.Header>
                <Modal.Body>The username entered in incorrect or the user does not exist</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* ---- Modal ends here ---- */}

            <Container fluid>
                {/* Outer container */}
                <Row className="justify-content-md-center">
                    <Col xs={12} md={8}>
                        {/* Inner container */}
                        <Container fluid>
                            <Row>
                                <Col>
                                    <Card style={{marginTop: 20}}>
                                        <Card.Body>
                                            <Form>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Search for tweets</Form.Label>
                                                    <Form.Control onChange={handleUsername} type="text" placeholder="Enter username" />
                                                    <Form.Text className="text-muted">
                                                        Enter the twitter username here 
                                                    </Form.Text>
                                                </Form.Group>
                                                <Button variant="primary" type="submit" onClick={searchuser}>
                                                    <i style={{marginRight: 5}} class="bi bi-search"></i>
                                                    Search
                                                </Button>
                                            </Form>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                        {/* End inner container */}
                    </Col>
                </Row>
            </Container>
            {/* end outer container */}
            <Footer />
        </React.Fragment>
    )
}

export default Home;