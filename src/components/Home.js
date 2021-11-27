// import { useState, useEffect } from 'react';
import { useAuth } from "../hooks/useAuth";
import Portfolio from '../components/Portfolio';
import Quotes from './Quotes';

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <Quotes name="US Markets" symbols={['^GSPC', '^DJI', '^IXIC', '^R123UT']} showSymbol={false} />
      <Quotes name="Crytocurrencies" symbols={['BTC-USD', 'ETH-USD']} showSymbol={false} />
      {currentUser && <Portfolio />}
    </>
  )
}

export default Home;
