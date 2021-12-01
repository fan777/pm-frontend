import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { useAuth } from "../../hooks/useAuth";
import Quotes from '../quote/Quotes';
import '../quote/Quotes.css'

const PortfolioSummary = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <Table className="Quotes" responsive>
        <thead>
          <tr>
            <th className="headerTitle"><Link className="symbolLink" to="/create-portfolio">++ Create a new portfolio ++</Link></th>
            <th className="headerMarketValue"></th>
            <th className="headerMarketChange"></th>
          </tr>
        </thead>
        <tbody><tr><td className="shortName">{currentUser?.portfolios?.length ?? "0"} portfolios found for {currentUser?.username}</td><td></td><td></td></tr></tbody>
      </Table>
      {currentUser?.portfolios?.length
        ? currentUser?.portfolios.map(p => {
          const symbols = p.holdings.map(h => h.symbol)
          return <Quotes key={`p${p.id}`} label={`${p.name}`} headerLink={`/portfolio/${p.id}`} symbols={symbols} showSymbol={true} showName={true} />
        })
        : ""}
    </>
  )
}

export default PortfolioSummary
