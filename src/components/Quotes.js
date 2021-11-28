import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import PortfolioApi from '../api/api';
import useIsMountedRef from '../hooks/useIsMountedRef';
import './Quotes.css'

const Quotes = ({ label, symbols, showSymbol, showName }) => {
  const [quotes, setQuotes] = useState([]);
  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    async function getQuotes() {
      if (symbols && symbols.length > 0) {
        const data = await PortfolioApi.getQuotes({ symbols });
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
            <th className="headerText">VALUE</th>
            <th className="headerText">DAY CHANGE</th>
          </tr>
        </thead>
        <tbody>
          {quotes.length > 0
            ? quotes.map(({ symbol, shortName, regularMarketPrice, regularMarketChange, regularMarketChangePercent }, index) => (
              <tr key={index}>
                <td className="shortName">{showSymbol && <span style={{ display: 'block' }}><a href="#">{symbol}</a></span>} {showName && shortName}</td>
                <td className="regularMarketPrice">{regularMarketPrice.toFixed(2)}</td>
                <td className="regularMarketChange" style={{ color: marketChangeColor(regularMarketChange) }}>{regularMarketChange.toFixed(2)} <span style={{ width: '60px', display: 'inline-block' }}>({regularMarketChangePercent.toFixed(2)}%)</span></td>
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