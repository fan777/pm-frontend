import { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from "../hooks/useAuth";
import { useForm } from '../hooks/useForm';
import Alert from '../common/Alert'
import PortfolioApi from '../api/api';

const PortfolioForm = () => {
  const { currentUser, refresh } = useAuth();
  const createPortfolio = async (data) => {
    try {
      await PortfolioApi.newPortfolio(data);
      await refresh(currentUser.username);
      return { success: true }
    } catch (errors) {
      return { success: false, errors };
    }
  }
  const { formData, formErrors, formSuccess, handleChange, handleSubmit } = useForm(
    {
      name: "",
      cash: 0,
      notes: "",
      username: currentUser.username,
    },
    createPortfolio,
    '/home',
  )
  const { name, cash, notes } = formData;

  // useEffect(() => {
  //   console.debug(
  //     "PortfolioForm",
  //     "createPortfolio=", typeof createPortfolio,
  //     "formData=", formData,
  //     "formErrors=", formErrors,
  //     "formSuccess=", formSuccess,
  //   );
  // })

  return (
    <>
      <h1>Create Portfolio</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Portfolio Name</Form.Label>
          <Form.Control type="text" placeholder="Portfolio Name" name="name" value={name} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="cash">
          <Form.Label>Cash</Form.Label>
          <Form.Control type="number" step="0.01" placeholder="Available Cash" name="cash" value={cash} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="notes">
          <Form.Label>Notes</Form.Label>
          <Form.Control type="text" /*as="textarea" rows={3}*/ placeholder="Notes" name="notes" value={notes} onChange={handleChange} />
        </Form.Group>
        {formErrors.length
          ? <Alert type="danger" messages={formErrors} />
          : null}
        <Button type="submit">Submit</Button>
      </Form>
    </>
  )
}

export default PortfolioForm
