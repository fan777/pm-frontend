import { useAuth } from "../hooks/useAuth";
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import Quotes from './Quotes';
import './Quotes.css'

const PortfolioSummary = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <Table className="Quotes" responsive>
        <thead>
          <tr>
            <th className="headerTitle"><Link className="symbolLink" to="/create-portfolio">Create new portfolio +</Link></th>
            <th className="headerMarketValue"></th>
            <th className="headerMarketChange"></th>
          </tr>
        </thead>
        <tbody><tr><td className="shortName">{currentUser?.portfolios?.length ?? "0"} portfolios found</td><td></td><td></td></tr></tbody>
      </Table>
      {currentUser?.portfolios?.length
        ? currentUser?.portfolios.map(p => {
          const symbols = p.holdings.map(h => h.symbol)
          return <Quotes key={`p${p.id}`} label={`${p.name}`} symbols={symbols} showSymbol={true} showName={true} />
        })
        : ""}
    </>
  )
}

export default PortfolioSummary
