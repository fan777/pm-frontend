import { useEffect } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
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

  useEffect(() => {
    console.debug(
      "PortfolioForm",
      "createPortfolio=", typeof createPortfolio,
      "formData=", formData,
      "formErrors=", formErrors,
      "formSuccess=", formSuccess,
    );
  })

  const handleCashInput = (e) => {
    let t = e.target.value;
    e.target.value = (t.indexOf(".") >= 0) ? (t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 3)) : +t;
  }

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
          <InputGroup>
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control type="number" placeholder="Available Cash" name="cash" value={cash} onInput={handleCashInput} onChange={handleChange} />
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3" controlId="notes">
          <Form.Label>Notes</Form.Label>
          <Form.Control data-lpignore="true" /*type="text"*/ as="textarea" rows={3} placeholder="Notes" name="notes" value={notes} onChange={handleChange} />
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
