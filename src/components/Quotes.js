import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import PortfolioApi from '../api/api';
import './Quotes.css'

const Quotes = ({ name, symbols, showSymbol }) => {
  const [quotes, setQuotes] = useState(null);

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
      {quotes &&
        <Table className="Quotes" responsive>
          <thead>
            <tr>
              <th>{name}</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {quotes.map(({ symbol, shortName, regularMarketPrice, regularMarketChange, regularMarketChangePercent }, index) => (
              <tr key={index}>
                <td style={{ width: '70%', textAlign: 'left' }}>{showSymbol && <span style={{ width: '100px', display: 'inline-block' }}><a href="#">{symbol}</a></span>} {shortName}</td>
                <td style={{ width: '15%', textAlign: 'right' }}>{regularMarketPrice}</td>
                <td style={{ width: '15%', textAlign: 'right', color: marketChangeColor(regularMarketChange) }}>{regularMarketChange} <span style={{ textAlign: 'right', width: '75px', display: 'inline-block' }}>({regularMarketChangePercent.toFixed(2)}%)</span></td>
              </tr>
            ))}
          </tbody>
        </Table>
      }
    </>
  )
}

export default Quotes;