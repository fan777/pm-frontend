// import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useAuth } from "../hooks/useAuth";
// import PortfolioApi from '../api/api';
import Quotes from './Quotes';
import TrendingSymbols from './TrendingSymbols';
// import LoadingSpinner from '../common/LoadingSpinner';

const Home = () => {
  const { currentUser } = useAuth();
  console.log(currentUser)

  return (
    <Row>
      {currentUser &&
        <Col md="7">
          {currentUser?.portfolios.length > 0
            ? currentUser?.portfolios.map(p => {
              const symbols = p.holdings.map(h => h.symbol)
              return <Quotes key={`p${p.id}`} label={`Portfolio - ${p.name}`} symbols={symbols} showSymbol={true} showName={true} />
            })
            : "No portfolios"}
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
