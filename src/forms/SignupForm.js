import { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from "../hooks/useAuth";
import { useForm } from '../hooks/useForm';
import Alert from '../common/Alert'

const SignupForm = () => {
  const { signup } = useAuth();
  const { formData, formErrors, formSuccess, handleChange, handleSubmit } = useForm(
    {
      email: "",
      username: "",
      password: "",
    },
    signup,
    '/portfolio',
  )
  const { email, username, password } = formData;

  useEffect(() => {
    console.debug(
      "SignupForm",
      "signup=", typeof signup,
      "formData=", formData,
      "formErrors=", formErrors,
      "formSuccess=", formSuccess,
    );
  })

  return (
    <>
      <p>SignupForm</p>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Email" name="email" value={email} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Username" name="username" value={username} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={handleChange} />
        </Form.Group>
        {formErrors.length
          ? <Alert type="danger" messages={formErrors} />
          : null}
        <Button type="submit">Submit</Button>
      </Form>
    </>
  )
}

export default SignupForm;