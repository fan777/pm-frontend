import { useState, useEffect } from 'react';
import { useAuth } from "../hooks/useAuth";
import PortfolioApi from '../api/api';
import Portfolio from './Portfolio';
import Quotes from './Quotes';
import QuoteDetailed from "./QuoteDetailed";
import Watchlist from './Watchlist';

const Home = () => {
  const { currentUser } = useAuth();
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    async function getTrendingSymbols() {
      const data = await PortfolioApi.getTrendingSymbols();
      console.log(data);
      if (data?.count > 0)
        setTrending(data.quotes.map(a => a.symbol));
      else
        setTrending([])
    }
    getTrendingSymbols();
  }, [])

  return (
    <>
      {trending.length > 0 ? <Quotes label="Today's Trending Symbols" symbols={[...trending]} showSymbol={true} /> : ""}
      <Quotes label="US Markets" symbols={['^GSPC', '^DJI', '^IXIC', '^R123UT']} showSymbol={false} />
      <Quotes label="Crytocurrencies" symbols={['BTC-USD', 'ETH-USD']} showSymbol={false} />

      {/* <QuoteDetailed symbol="SOFI" /> */}
      {currentUser ? <Portfolio /> : ""}
      {currentUser ? <Watchlist /> : ""}
    </>
  )
}

export default Home;
