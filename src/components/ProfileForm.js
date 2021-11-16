import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { useAuth } from "../hooks/useAuth";

const ProfileForm = () => {
  const { currentUser, update } = useAuth();
  const initialState = {
    email: currentUser.email,
    username: currentUser.username,
    password: ""
  };
  const [success, setSuccess] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [formData, setFormData] = useState(initialState);
  const { push } = useHistory();


  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }))
    setAlerts([]);
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setAlerts([]);
    let result = await update(formData);
    if (result.success) {
      setSuccess(true);
      push('/profile');
    } else {
      // setFormData(initialState);
      setAlerts(result.err)
    }
    setFormData(initialState);
    // try {
    //   let { username, password, email } = formData;
    //   let user = await PortfolioApi.updateUser(username, { password, email });
    //   setSuccess(true);
    //   setCurrentUser(user);
    //   setFormData(f => ({ ...f, password: "" }));
    // } catch (err) {
    //   setAlerts(result.err)
    // }
  }

  return (
    <Container fluid>
      <p>ProfileForm</p>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control disabled type="text" placeholder="Username" name="password" value={formData.username} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
        </Form.Group>
        {success && (<div className="alert alert-success">Updated successfully!</div>)}
        {alerts && alerts.map((alert, index) => <div className="alert alert-danger" key={index}>{alert}</div>)}
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  )
}

export default ProfileForm;