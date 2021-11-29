import { useState, useEffect } from "react";
import { Row, Col } from 'react-bootstrap';
import useQuery from '../hooks/useQuery';
import PortfolioApi from '../api/api';
import Quotes from './Quotes';

const SearchResults = () => {
  const query = useQuery();
  const [searchVal, setSearchVal] = useState(null);
  const [results, setResults] = useState(null);

  useEffect(() => {
    setSearchVal(query?.get("term"))
  }, [query])

  useEffect(() => {
    async function search() {
      if (searchVal) {
        let results = await PortfolioApi.searchQuote(searchVal);
        results?.count ? setResults(results) : setResults(null);
      }
    }
    search();
  }, [searchVal]);

  useEffect(() => {
    console.debug(
      "Results",
      "searchVal=", searchVal,
      "results=", results,
    );
  })

  const renderNews = (news) => {
    return (
      <>
        <h4>NEWS</h4>
        {news.map(article => (
          <p key={article.uuid}><a href={`${article.link}`}>{article.title}</a> <br />
            published by {article.publisher} @ {article.providerPublishTime}
          </p>
        ))}
      </>
    )
  }

  return (
    <Row>
      <h1>Searching for "{searchVal}"</h1>
      {results?.count > 0 ?
        <>
          <Col>
            {results?.quotes && (
              <>
                <Quotes label="Indexes" symbols={results.quotes.filter(a => a.quoteType === 'INDEX').map(s => s.symbol)} showSymbol={true} showName={true} />
                <Quotes label="Equities" symbols={results.quotes.filter(a => a.quoteType === 'EQUITY').map(s => s.symbol)} showSymbol={true} showName={true} />
                <Quotes label="ETFS" symbols={results.quotes.filter(a => a.quoteType === 'ETF').map(s => s.symbol)} showSymbol={true} showName={true} />
                <Quotes label="Options" symbols={results.quotes.filter(a => a.quoteType === 'OPTION').map(s => s.symbol)} showSymbol={true} showName={true} />
                <Quotes label="Futures" symbols={results.quotes.filter(a => a.quoteType === 'FUTURE').map(s => s.symbol)} showSymbol={true} showName={true} />
              </>
            )}
          </Col>
          <Col md={5}>
            {results?.news && renderNews(results.news)}
          </Col>
        </>
        : <p>No results found!</p>
      }
    </Row>
  )
}

export default SearchResults
