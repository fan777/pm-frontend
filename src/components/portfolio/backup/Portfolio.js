import { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { Row, Col, Table, Form, Button, InputGroup, Modal } from 'react-bootstrap';
import { useAuth } from '../../hooks/useAuth';
import PortfolioApi from '../../api/api';
import Holdings from './Holdings';
import DeletePortfolioModal from './DeletePortfolioModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Holdings.css'
import EditNameModal from './EditNameModal';
import Notes from './Notes';
import UpdateCashModal from './UpdateCashModal';

const Portfolio = () => {
  const { currentUser, refresh } = useAuth();
  const { id } = useParams();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditNameModal, setShowEditNameModal] = useState(false);
  const [showEditCashModal, setShowEditCashModal] = useState(false);

  const portfolio = currentUser?.portfolios?.find(p => p.id === Number(id));

  const handleDeleteWarning = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleEditNamePopup = () => setShowEditNameModal(true);
  const handleCloseEditNameModal = () => setShowEditNameModal(false);

  const handleEditCashPopup = () => setShowEditCashModal(true);
  const handleCloseEditCashModal = () => setShowEditCashModal(false);

  const handleEditPortfolio = async (data) => {
    try {
      let updated = await PortfolioApi.updatePortfolio(id, data);
      await refresh(currentUser.username);
      return { success: true, updated }
    } catch (errors) {
      return { success: false, errors };
    }
  }

  return (
    <Row>
      <h1>{portfolio ? portfolio.name : "Invalid Portfolio..."}</h1>
      <Col>
        {portfolio &&
          <>
            <h6>
              <span><FontAwesomeIcon className="edit" icon={["fas", "edit"]} onClick={handleEditNamePopup} /> Edit portfolio name</span>
              <span className="ms-3"><FontAwesomeIcon className="trash" icon={["fas", "trash"]} onClick={handleDeleteWarning} /> Delete portfolio</span>
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
                  {/* <th className="headerMarketChange"></th> */}
                  {/* <th className="headerMarketChange"></th> */}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="shortName"></td>
                  <td className="regularMarketPrice"></td>
                  <td className="regularMarketPrice"></td>
                  <td className="regularMarketChange"></td>
                  <td className="regularMarketChange">{portfolio?.cash}</td>
                  {/* <td className="regularMarketChange"></td> */}
                  {/* <td className="regularMarketChange"></td> */}
                </tr>
                <tr>
                  <td className="shortName"></td>
                  <td className="regularMarketPrice"></td>
                  <td className="regularMarketPrice"></td>
                  <td className="regularMarketChange"></td>
                  <td className="regularMarketChange"><Link to="#" onClick={handleEditCashPopup}>Update Cash</Link></td>
                  {/* <td className="regularMarketChange"></td> */}
                  {/* <td className="regularMarketChange"></td> */}
                </tr>
              </tbody>
            </Table>
            <Table className="Holdings" responsive>
              <thead>
                <tr>
                  <th className="headerTitle">Total Value</th>
                  <th className="headerMarketPrice"></th>
                  <th className="headerMarketPrice"></th>
                  <th className="headerMarketChange"></th>
                  <th className="headerMarketChange"></th>
                  {/* <th className="headerMarketChange"></th> */}
                  {/* <th className="headerMarketChange"></th> */}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="shortName"></td>
                  <td className="regularMarketPrice"></td>
                  <td className="regularMarketPrice"></td>
                  <td className="regularMarketChange"></td>
                  <td className="regularMarketChange">{portfolio?.cash}</td>
                  {/* <td className="regularMarketChange"></td> */}
                  {/* <td className="regularMarketChange"></td> */}
                </tr>
              </tbody>
            </Table>
            <Notes handleEdit={handleEditPortfolio} portfolio={portfolio} />
            <DeletePortfolioModal id={id} showModal={showDeleteModal} handleClose={handleCloseDeleteModal} />
            <EditNameModal showModal={showEditNameModal} handleClose={handleCloseEditNameModal} handleEdit={handleEditPortfolio} portfolio={portfolio} />
            <UpdateCashModal showModal={showEditCashModal} handleClose={handleCloseEditCashModal} handleEdit={handleEditPortfolio} portfolio={portfolio} />
          </>}
      </Col >
    </Row >
  )
}

export default Portfolio
