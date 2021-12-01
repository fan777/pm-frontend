import { Form, Button } from 'react-bootstrap';
import { useForm } from '../../hooks/useForm';
import Alert from '../common/Alert'

const Notes = ({ handleEdit, portfolio }) => {
  const { formData, formErrors, formSuccess, handleChange, handleSubmit } = useForm(
    {
      notes: portfolio.notes,
    },
    handleEdit,
    "",
  )
  const { notes } = formData;

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="notes">
        <Form.Label>Notes</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="Notes" name="notes" value={notes} onChange={handleChange} />
      </Form.Group>
      {formErrors.length
        ? <Alert type="danger" messages={formErrors} />
        : null}
      {formSuccess
        ? <Alert type="success" messages={["Updated successfully."]} />
        : null}
      <Button type="submit">Save Notes</Button>
    </Form>
  )
}

export default Notes;