import { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { Row, Col, Table, Form, Button, InputGroup, Modal } from 'react-bootstrap';
import { useAuth } from '../../hooks/useAuth';
import PortfolioApi from '../../api/api';
import Holdings from './Holdings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Holdings.css'

const Portfolio = () => {
  const { currentUser, refresh } = useAuth();
  const { id } = useParams();
  const { push } = useHistory();
  const [show, setShow] = useState(false);

  const portfolio = currentUser?.portfolios?.find(p => p.id === Number(id));

  const handleWarning = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleEditName = async (data) => {
    await PortfolioApi.updatePortfolio(id, data);
    refresh(currentUser.username);
  }
  const handleDelete = async () => {
    let res = await PortfolioApi.deletePortfolio(id);
    if (res === Number(id)) {
      refresh(currentUser.username)
      push('/home')
    }
  }


  return (
    <Row>
      <h1>{portfolio ? portfolio.name : "Invalid Portfolio..."}</h1>
      <Col>
        {portfolio &&
          <>
            <h6>
              <span className="edit"><FontAwesomeIcon icon={["fas", "edit"]} onClick={handleEditName} /> </span> Edit portfolio name
              <span className="trash"><FontAwesomeIcon icon={["fas", "trash"]} onClick={handleWarning} /> </span> Delete portfolio
            </h6>

            <Holdings label={'Holdings'} symbols={portfolio?.holdings.map(h => h.symbol)} showSymbol={true} showName={true} />

            <Table className="Holdings" responsive>
              <thead>
                <tr>
                  <th className="headerTitle">Cash</th>
                  <th className="headerMarketPrice"></th>
                  <th className="headerMarketPrice"></th>
                  <th className="headerMarketChange"></th>
                  <th className="headerMarketChange"></th>
                  <th className="headerMarketChange"></th>
                  <th className="headerMarketChange"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="shortName"></td>
                  <td className="regularMarketPrice"></td>
                  <td className="regularMarketPrice"></td>
                  <td className="regularMarketChange"></td>
                  <td className="regularMarketChange">{portfolio?.cash}</td>
                  <td className="regularMarketChange"></td>
                  <td className="regularMarketChange"></td>
                </tr>
              </tbody>
            </Table>

            <Table className="Holdings" responsive>
              <thead>
                <tr>
                  <th className="headerTitle">Total</th>
                  <th className="headerMarketPrice"></th>
                  <th className="headerMarketPrice"></th>
                  <th className="headerMarketChange"></th>
                  <th className="headerMarketChange"></th>
                  <th className="headerMarketChange"></th>
                  <th className="headerMarketChange"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="shortName"></td>
                  <td className="regularMarketPrice"></td>
                  <td className="regularMarketPrice"></td>
                  <td className="regularMarketChange"></td>
                  <td className="regularMarketChange">{portfolio?.cash}</td>
                  <td className="regularMarketChange"></td>
                  <td className="regularMarketChange"></td>
                </tr>
              </tbody>
            </Table>

            <Form.Group className="mb-3" controlId="notes">
              <Form.Label>Notes</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Notes" name="notes" value={portfolio?.notes} /* onChange={handleChange}*/ />
            </Form.Group>
            <Button>Save Notes</Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Warning</Modal.Title>
              </Modal.Header>
              <Modal.Body>Deleting portfolio is permanent! Are you sure you want to continue?</Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={handleDelete}>Delete</Button>
                <Button onClick={handleClose}>Cancel</Button>
              </Modal.Footer>
            </Modal>
          </>}
      </Col >
    </Row >
  )
}

export default Portfolio
