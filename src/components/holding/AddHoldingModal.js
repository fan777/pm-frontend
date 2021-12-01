import { useState, useEffect } from 'react';
import { Form, InputGroup, Button, Modal } from 'react-bootstrap';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';
import Alert from '../common/Alert'

const AddHoldingModal = ({ showModal, handleClose, handleAdd, portfolio_id }) => {

  const { formData, formErrors, formSuccess, handleChange, handleSubmit } = useForm(
    {
      symbol: "",
      shares_owned: 0,
      portfolio_id: portfolio_id,
    },
    handleAdd,
    ``,
  )
  const { symbol, shares_owned } = formData;

  const handleNumInput = (e) => {
    let t = e.target.value;
    e.target.value = (t.indexOf(".") >= 0) ? (t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 5)) : +t;
  }

  const handleSymbolInput = (e) => {
    let t = e.target.value;
    e.target.value = t.toUpperCase();
  }


  return (
    <Modal show={showModal} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add Holding</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="symbol">
            <Form.Label>Symbol</Form.Label>
            <Form.Control type="text" placeholder="Symbol" name="symbol" value={symbol} onInput={handleSymbolInput} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="shares_owned">
            <Form.Label>Shares owned</Form.Label>
            <Form.Control type="number" placeholder="Shares owned" name="shares_owned" value={shares_owned} onInput={handleNumInput} onChange={handleChange} />
          </Form.Group>
          {formErrors.length
            ? <Alert type="danger" messages={formErrors} />
            : null}
          {formSuccess
            ? <Alert type="success" messages={["Updated successfully."]} />
            : null}
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">Add</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddHoldingModal
