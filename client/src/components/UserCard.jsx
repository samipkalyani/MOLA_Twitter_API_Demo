import React from 'react'
import Card from 'react-bootstrap/Card';

// Takes props:
//     username -> twitter screen name

function UserCard(props){
    return(
        <React.Fragment>
            <Card className='userCard'>
                <Card.Body>

                    {/* Username */}
                    <Card.Title>
                        @{props.username ? props.username:''}
                    </Card.Title>
                    
                    {/* Tweet */}
                    <Card.Text>
                        {props.tweet ? props.tweet:''}
                    </Card.Text>
                    
                </Card.Body>
            </Card>
        </React.Fragment>
    )
}

export default UserCard;