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
    `/portfolio/${portfolio_id}`,
  )

  const { symbol, shares_owned } = formData;

  useEffect(() => {
    // console.log(holding);
    // console.log(shares_owned);
    // console.log(formData);
  })

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add Holding</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="symbol">
            <Form.Label>Symbol</Form.Label>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control type="text" placeholder="Symbol" name="symbol" value={symbol} /*onInput={handleNumInput}*/ onChange={handleChange} />
            </InputGroup>
            <Form.Text muted>Fractional cents is not allowed.</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="shares_owned">
            <Form.Label>Shares owned</Form.Label>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control type="number" placeholder="Shares owned" name="shares_owned" value={shares_owned} /*onInput={handleNumInput}*/ onChange={handleChange} />
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
          <Button type="submit">Add</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddHoldingModal
