import React, { useEffect, useState, useRef } from 'react';
import UserCard from './UserCard';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
// Bootstrap imports
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// On ComponentDidMount:
//     - Fetch the tweets of a particular user by the username
//     - Update state
//     - Map each tweet to a card

function UserExists(props) {
    // State
    const location = useLocation()
    const [Tweets, setTweets] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    const [userName, setusrname] = useState(null)
    const [url, setUrl] = useState('')
    const initialRender = useRef(true);
    const [show, setShow] = useState(false)

    // ComponentDidMount logic
    useEffect(()=>{
        console.log(location.state.username)
        console.log('in')
        axios.get('http://localhost:8000/tweets', {
            params:{
                user_id: location.state.user_id
            }
        }).then(res=>{
            console.log(res.data)
            console.log(typeof Array.from(res.data))
            console.log(typeof res.data)
            setusrname(location.state.username)
            setTweets(res.data)
        })
    }, [])

    // Function definitions

    // Handles the clsing of the modal
    const handleClose = () => setShow(false);

    // Handles the download buttons action
    function handleDownload(event){
        event.preventDefault();
          // Prepare the file
        let output;
        
        output = JSON.stringify({tweets: Tweets}, null, 4);
        
        // Download it
        const blob = new Blob([output]);
        const fileDownloadUrl = URL.createObjectURL(blob);
        console.log(fileDownloadUrl)
        setUrl(fileDownloadUrl)
        setShow(true)
        // alert('Download in progress!!')
    }
    function download (event) {
        event.preventDefault();
          // Prepare the file
        let output;
        
        output = JSON.stringify({tweets: Tweets}, null, 4);
        
        // Download it
        const blob = new Blob([output]);
        const fileDownloadUrl = URL.createObjectURL(blob);
        console.log(fileDownloadUrl)
        setUrl(fileDownloadUrl)
      }
    useEffect(() => {
        if(initialRender.current){
            initialRender.current = false
        }
        else{
            document.getElementById('download-link').click()   
        }
    }, [url])

    return (
        <React.Fragment>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>The download is in progress</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col xs={12} md={10}>
                        <Container fluid>
                            {/* If someone tries to acces the URL directly
                            the location.state will be undefined */}
                            {!location.state ? (<h1> 404 Page not found </h1>) : (

                                // Else render the tweets

                                <React.Fragment>
                                    {Tweets.length === 0 ? (<div  style={{textAlign: 'center',marginTop:50, fontSize: 35}}>User has no tweets :(</div>) : (
                                        <Row className="justify-content-xs-center">
                                            <Col xs={12}>
                                                <div className='heading'> 10 most recent tweets from {userName} </div>
                                            </Col>
                                            <Col xs={12}>
                                                <a className="hidden"
                                                    style={{display: 'None'}}
                                                    download='tweets.json'
                                                    href={url}
                                                    id='download-link'
                                                >download it</a>
                                                <Button style={{ marginTop: 20, marginBottom: 60, width: '100%' }} onClick={handleDownload}>
                                                    <i style={{ marginRight: 5 }} class="bi bi-download"></i>
                                                    Download
                                                </Button>
                                            </Col>
                                        </Row>
                                    )}

                                    {/* Mapping the tweets */}
                                    <Row className="justify-content-md-center">
                                        {Tweets.map(t => {
                                            return (
                                                <React.Fragment>
                                                    <Col xs={12} md={5}>
                                                        <UserCard
                                                            username = {userName ? userName : ''}
                                                            tweet = {t.text ? t.text : ''}
                                                        />
                                                    </Col>
                                                </React.Fragment>
                                            )
                                        })}
                                    </Row>

                                </React.Fragment>
                            )}
                        </Container>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default UserExists;