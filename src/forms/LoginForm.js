import { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from "../hooks/useAuth";
import { useForm } from '../hooks/useForm';
import Alert from '../common/Alert'

const LoginForm = () => {
  const { login } = useAuth();
  const { formData, formErrors, formSuccess, handleChange, handleSubmit } = useForm(
    {
      username: "",
      password: "",
    },
    login,
    '/portfolio',
  )
  const { username, password } = formData;

  useEffect(() => {
    console.debug(
      "LoginForm",
      "login=", typeof login,
      "formData=", formData,
      "formErrors=", formErrors,
      "formSuccess=", formSuccess,
    );
  })

  return (
    <>
      <p>LoginForm</p>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Username" name="username" value={username} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={handleChange} autoComplete="off" />
        </Form.Group>
        {formErrors.length
          ? <Alert type="danger" messages={formErrors} />
          : null}
        <Button type="submit">Submit</Button>
      </Form>
    </>
  )
}

export default LoginForm;