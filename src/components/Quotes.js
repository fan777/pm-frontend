import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import PortfolioApi from '../api/api';
import './Quotes.css'

const Quotes = ({ label, symbols, showSymbol }) => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    async function getQuotes() {
      const data = await PortfolioApi.getQuotes({ symbols });
      setQuotes(data);
    }
    getQuotes();
  }, [symbols])

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
      {quotes.length > 0 ?
        <Table className="Quotes" responsive>
          <thead>
            <tr>
              <th className="headerTitle shortName">{label}</th>
              <th className="headerText regularMarketPrice">VALUE</th>
              <th className="headerText regularMarketChange">DAY CHANGE</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map(({ symbol, shortName, regularMarketPrice, regularMarketChange, regularMarketChangePercent }, index) => (
              <tr key={index}>
                <td className="shortName">{showSymbol && <span style={{ width: '100px', display: 'inline-block' }}><a href="#">{symbol}</a></span>} {shortName}</td>
                <td className="regularMarketPrice">{regularMarketPrice.toFixed(2)}</td>
                <td className="regularMarketChange" style={{ color: marketChangeColor(regularMarketChange) }}>{regularMarketChange.toFixed(2)} <span style={{ width: '65px', display: 'inline-block' }}>({regularMarketChangePercent.toFixed(2)}%)</span></td>
              </tr>
            ))}
          </tbody>
        </Table>
        : ""}
    </>
  )
}

export default Quotes;