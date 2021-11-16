import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { useAuth } from "../hooks/useAuth";

const LoginForm = () => {
  const { login } = useAuth();
  const initialState = {
    username: "",
    password: ""
  }
  const [alerts, setAlerts] = useState([]);
  const [formData, setFormData] = useState(initialState);
  const { push } = useHistory();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setAlerts([]);
    let result = await login(formData);
    if (result.success) {
      push('/portfolio');
    } else {
      setFormData(initialState);
      setAlerts(result.err)
    }
  }

  return (
    <Container fluid>
      <p>LoginForm</p>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Username" name="username" value={formData.username} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
        </Form.Group>
        {alerts && alerts.map((alert, index) => <div className="alert alert-danger" key={index}>{alert}</div>)}
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  )
}

export default LoginForm;