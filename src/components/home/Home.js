import { Row, Col } from 'react-bootstrap';
import { useAuth } from "../../hooks/useAuth";
import Quotes from '../quote/Quotes';
import TrendingSymbols from './TrendingSymbols';
import PortfolioSummary from './PortfolioSummary';

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <Row>
      <h1>Summary</h1>
      {currentUser &&
        <Col md="7">
          <PortfolioSummary />
        </Col>
      }
      <Col md={currentUser ? 5 : 12}>
        <Quotes label="US Markets" symbols={['^GSPC', '^DJI', '^IXIC', '^RUT']} showSymbol={false} showName={true} />
        <Quotes label="Crytocurrencies" symbols={['BTC-USD', 'ETH-USD']} showSymbol={false} showName={true} />
        {currentUser &&
          <Quotes label="Watchlist" symbols={currentUser?.watchlist} showSymbol={true} showName={true} />
        }
        <TrendingSymbols />
      </Col>
    </Row>
  )
}

export default Home;
