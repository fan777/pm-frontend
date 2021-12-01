import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { useAuth } from '../../hooks/useAuth';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import PortfolioApi from '../../api/api';
import { toDecimalHundredths } from '../../helpers/formatter';
import './Holdings.css'

const Holdings = ({ label, headerLink, symbols, showSymbol, showName }) => {
  const { currentUser, refresh } = useAuth();
  const [holdings, setHoldings] = useState([]);
  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    async function getQuote() {
      if (symbols && symbols.length > 0) {
        const data = await PortfolioApi.getQuote({ symbols });
        if (isMountedRef.current) {
          console.log(data);
          setHoldings(data);
        }
      }
    }
    getQuote();
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
    // <>
    <Table className="Holdings" responsive>
      <thead>
        <tr>
          <th className="headerTitle">{headerLink ? <Link className="symbolLink" to={headerLink}>{label}</Link> : label}</th>
          <th className="headerMarketPrice">QUANTITY</th>
          <th className="headerMarketPrice">PRICE</th>
          <th className="headerMarketChange">DAY CHANGE (%)</th>
          <th className="headerMarketChange">MARKET VALUE</th>
          <th className="headerMarketChange">COST BASIS</th>
          <th className="headerMarketChange">% ACCOUNT</th>
        </tr>
      </thead>
      <tbody>
        {holdings.length > 0
          ? holdings.map(({ symbol, shortName, regularMarketPrice, regularMarketChange, regularMarketChangePercent }, index) => (
            <tr key={index}>
              <td className="shortName">{showSymbol && <Link className="symbolLink" to={`/detailed?symbol=${symbol}`}>{symbol}</Link>} {showName && shortName}</td>
              <td className="regularMarketPrice"></td>
              <td className="regularMarketPrice">{toDecimalHundredths(regularMarketPrice)}</td>
              <td className="regularMarketChange" style={{ color: marketChangeColor(regularMarketChange) }}>{toDecimalHundredths(regularMarketChange)} <span className="percentText">({toDecimalHundredths(regularMarketChangePercent)}%)</span></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          ))
          :
          <tr>
            <td className="shortName">No symbols found...</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        }
      </tbody>
    </Table>
    // </>
  )
}

export default Holdings;