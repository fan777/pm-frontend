import { useState, useEffect } from 'react';
import PortfolioApi from '../api/api';

const QuoteDetailed = ({ symbol }) => {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    async function getQuote() {
      const data = await PortfolioApi.getQuoteDetailed({ symbol });
      setQuote(data);
    }
    getQuote();
  }, [symbol])

  return (
    <>
      {quote ? quote?.summaryDetail.dayHigh : ""}
      {quote ? quote?.summaryDetail.dayLow : ""}
      {quote ? quote?.price.longName : ""}
    </>
  )
}

export default QuoteDetailed
