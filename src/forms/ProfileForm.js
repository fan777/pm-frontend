import { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from "../hooks/useAuth";
import { useForm } from '../hooks/useForm';
import Alert from '../common/Alert'

const ProfileForm = () => {
  const { currentUser, update } = useAuth();
  const { formData, formErrors, formSuccess, handleChange, handleSubmit } = useForm(
    {
      ...currentUser,
      password: '',
    },
    update,
    '',
  )
  const { email, username, password } = formData;

  // useEffect(() => {
  //   console.debug(
  //     "ProfileForm",
  //     "update=", typeof update,
  //     "formData=", formData,
  //     "formErrors=", formErrors,
  //     "formSuccess=", formSuccess,
  //   );
  // })

  return (
    <>
      <h1>User Profile</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control disabled type="text" placeholder="Username" name="username" value={username} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Email" name="email" value={email} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={handleChange} autoComplete="off" />
        </Form.Group>
        {formErrors.length
          ? <Alert type="danger" messages={formErrors} />
          : null}
        {formSuccess
          ? <Alert type="success" messages={["Updated successfully."]} />
          : null}
        <Button type="submit">Submit</Button>
      </Form>
    </>
  )
}

export default ProfileForm;