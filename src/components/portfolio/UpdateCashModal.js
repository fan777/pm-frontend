import { Form, InputGroup, Button, Modal } from 'react-bootstrap';
import { useForm } from '../../hooks/useForm';
import Alert from '../common/Alert'

const UpdateCashModal = ({ showModal, handleClose, handleEdit, portfolio }) => {
  const { formData, formErrors, formSuccess, handleChange, handleSubmit } = useForm(
    {
      cash: portfolio.cash,
    },
    handleEdit,
    "",
  )
  const { cash } = formData;

  const handleCashInput = (e) => {
    let t = e.target.value;
    e.target.value = (t.indexOf(".") >= 0) ? (t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 3)) : +t;
  }

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Update Available Cash</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Cash</Form.Label>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control type="number" placeholder="Available Cash" name="cash" value={cash} onInput={handleCashInput} onChange={handleChange} />
            </InputGroup>
            <Form.Text muted>Fractional cents is not allowed.</Form.Text>
          </Form.Group>
          {formErrors.length
            ? <Alert type="danger" messages={formErrors} />
            : null}
          {formSuccess
            ? <Alert type="success" messages={["Updated successfully."]} />
            : null}
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">Update</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default UpdateCashModal
