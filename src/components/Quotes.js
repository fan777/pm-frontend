import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import useIsMountedRef from '../hooks/useIsMountedRef';
import PortfolioApi from '../api/api';
import './Quotes.css'

const Quotes = ({ label, symbols, showSymbol, showName }) => {
  const [quotes, setQuotes] = useState([]);
  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    async function getQuotes() {
      if (symbols && symbols.length > 0) {
        const data = await PortfolioApi.getQuote({ symbols });
        if (isMountedRef.current) {
          setQuotes(data);
        }
      }
    }
    getQuotes();
  }, [symbols, isMountedRef])

  const marketChangeColor = (number) => {
    if (number < 0)
      return 'red';
    else if (number > 0)
      return 'green';
    else
      return 'black';
  }

  return (
    <>
      <Table className="Quotes" responsive>
        <thead>
          <tr>
            <th className="headerTitle">{label}</th>
            <th className="headerMarketValue">VALUE</th>
            <th className="headerMarketChange">DAY CHANGE</th>
          </tr>
        </thead>
        <tbody>
          {quotes.length > 0
            ? quotes.map(({ symbol, shortName, regularMarketPrice, regularMarketChange, regularMarketChangePercent }, index) => (
              <tr key={index}>
                <td className="shortName">{showSymbol && <Link className="symbolLink" to={`/detailed?symbol=${symbol}`}>{symbol}</Link>} {showName && shortName}</td>
                <td className="regularMarketPrice">{regularMarketPrice?.toFixed(2)}</td>
                <td className="regularMarketChange" style={{ color: marketChangeColor(regularMarketChange) }}>{regularMarketChange?.toFixed(2)} <span className="percentText">({regularMarketChangePercent?.toFixed(2)}%)</span></td>
              </tr>
            ))
            :
            <tr>
              <td className="shortName">No symbols found...</td>
              <td></td>
              <td></td>
            </tr>
          }
        </tbody>
      </Table>

    </>
  )
}

export default Quotes;