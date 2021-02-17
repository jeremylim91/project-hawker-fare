import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default function LoginModal({ changeUserEmail, updateUserIsAdmin }) {
  const [show, setShow] = useState(false);
  const [fEmail, setFEmail] = useState('');
  const [fPassword, setFPassword] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleEmailInputChange = (e) => setFEmail(e.target.value);
  const handlePasswordInputChange = (e) => setFPassword(e.target.value);

  const handleLogin = () => {
    handleClose();
    // do axios post to verify login and set cookie in client browser
    axios.post('/verifyLogin', { fEmail, fPassword })
      .then(({ data }) => {
        // update the state with this email
        changeUserEmail(data.userName);
        // if data.userName is not null, give him the
        updateUserIsAdmin(data.updateUserIsAdmin);
      })
      .catch((error) => (console.log(error)));
  };
  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Login
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-4">
                <div>
                  <label htmlFor="fEmail"> Email: </label>
                </div>
              </div>
              <div className="col-12 col-lg-8">
                <div>
                  <input
                    type="text"
                    id="fEmail"
                    name="fEmail"
                    className="form-control"
                    value={fEmail}
                    placeholder="e.g. jon-doe@gmail.com"
                    required
                    onChange={handleEmailInputChange}

                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-lg-4">
                <div>
                  <label htmlFor="fPassword"> Password: </label>
                </div>
              </div>
              <div className="col-12 col-lg-8">
                <div>
                  <input
                    type="password"
                    id="fPassword"
                    name="fPassword"
                    className="form-control"
                    value={fPassword}
                    placeholder="Password"
                    required
                    onChange={handlePasswordInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-lg-7 btnCol">

                <div className="signUpText">
                  Not yet a member? Sign up
                  {' '}
                  <a href="/signup">here</a>
                </div>
              </div>
            </div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLogin}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
