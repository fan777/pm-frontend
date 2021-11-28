import { useState, useEffect } from 'react';
// import { Container, Row, Col, Card } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { useAuth } from "../hooks/useAuth";
import PortfolioApi from '../api/api';
import Portfolio from './Portfolio';
import Quotes from './Quotes';
import LoadingSpinner from '../common/LoadingSpinner';

const Home = () => {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    async function getTrendingSymbols() {
      const data = await PortfolioApi.getTrendingSymbols();
      if (data?.count > 0) {
        setTrending(data.quotes.map(a => a.symbol));
      } else {
        setTrending([])
      }
      setIsLoading(true);
    }
    setIsLoading(false);
    getTrendingSymbols();
  }, []);

  if (!isLoading) return <LoadingSpinner />;

  return (
    <Row>
      {currentUser ? <Col><Portfolio /></Col> : ""}
      <Col md={currentUser ? 5 : 12}>
        <Quotes label="US Markets" symbols={['^GSPC', '^DJI', '^IXIC', '^RUT']} showSymbol={false} showName={true} />
        <Quotes label="Crytocurrencies" symbols={['BTC-USD', 'ETH-USD']} showSymbol={false} showName={true} />
        {(currentUser && currentUser?.watchlist) ? <Quotes label="Watchlist" symbols={currentUser.watchlist} showSymbol={true} showName={true} /> : ""}
        {trending.length > 0 ? <Quotes label="Today's Trending Symbols" symbols={[...trending]} showSymbol={true} showName={true} /> : ""}
      </Col>
    </Row>
  )
}


export default Home;
