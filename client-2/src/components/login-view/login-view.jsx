import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './login-view.scss';

export function LoginView(props) {
    const [ username, setUsername ] =useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); 
        /* Send a request to the server for authentication */
        axios.post('https://murmuring-plateau-43729.herokuapp.com/login', {
            Username: username,
            Password: password
        })
        .then(response => {
            const data = response.data;
            props.onLoggedin(data);
        })
        .catch(e => {
            console.log('no such user')
        });
    };

    return (
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Username:</Form.Label>
                <Form.Control type='text' value={username} onChange={e => setUsername(e.target.value)} type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control  type='password' value={password} onChange={e => setPassword(e.target.value)} type="email" placeholder="Enter Password" />
                <Form.Text className='text-muted'>
                </Form.Text>
            </Form.Group>
            <Button variant='outline-dark' type='button' onClick={handleSubmit}>Submit</Button>
            <Form.Group controlId='formNewUser'>
                <Form.Text className='newUsers'>New user? click <span onClick={() => props.onClick()}>Here</span> to sign up </Form.Text>
            </Form.Group>
            
      
        
      </Form>


      
    );
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
};