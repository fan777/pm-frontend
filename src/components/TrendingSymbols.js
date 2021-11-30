import { useState, useEffect } from 'react';
import PortfolioApi from '../api/api';
import Quotes from './Quotes';

const TrendingSymbols = () => {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    async function getTrendingSymbols() {
      const data = await PortfolioApi.getTrendingSymbols();
      if (data?.count > 0) {
        setTrending(data.quotes.map(a => a.symbol));
      } else {
        setTrending([])
      }
    }
    getTrendingSymbols();
  }, []);

  return (
    <>
      {trending.length > 0
        ? <Quotes label="Today's Trending Symbols" symbols={[...trending]} showSymbol={true} showName={true} />
        : ""}
    </>
  )
}

export default TrendingSymbols
