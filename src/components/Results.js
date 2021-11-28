import { useState, useEffect } from "react";
import useQuery from '../hooks/useQuery';
import PortfolioApi from '../api/api';

const Results = () => {
  const query = useQuery();
  const [searchVal, setSearchVal] = useState(null);
  const [results, setResults] = useState(null);

  useEffect(() => {
    setSearchVal(query?.get("term"))
  }, [query])

  useEffect(() => {
    const search = async () => {
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

  const renderIndexes = (indexes, displayName) => {
    if (indexes.length < 1) return "";
    return (
      <>
        <h3>{displayName}</h3>
        {indexes.map((data, index) => <p key={`${displayName}-${index}`}>{data.symbol} {data.shortname}</p>)}
      </>
    )
  }

  const renderQuotes = (quotes, displayName) => {
    if (quotes.length < 1) return "";
    return (
      <>
        <h3>{displayName}</h3>
        {quotes.map((data, index) => <p key={`${displayName}-${index}`}>{data.symbol} {data.longname}</p>)}
      </>
    )
  }

  const renderNews = (news) => {
    return (
      <>
        <h3>NEWS</h3>
        {news.map(article => (
          <p key={article.uuid}><a href={`${article.link}`}>{article.title}</a> <br />
            published by {article.publisher} @ {article.providerPublishTime}
          </p>
        ))}
      </>
    )
  }

  return (
    <>
      <p>Searching for "{searchVal}"</p>
      {results?.count > 0 ?
        <>
          {results?.quotes && (renderIndexes(results.quotes.filter(a => a.quoteType === 'INDEX'), "INDEXES"))}
          {results?.quotes && (renderQuotes(results.quotes.filter(a => a.quoteType === 'EQUITY'), "EQUITIES"))}
          {results?.quotes && (renderQuotes(results.quotes.filter(a => a.quoteType === 'ETF'), "ETFS"))}
          {results?.quotes && (renderQuotes(results.quotes.filter(a => a.quoteType === 'OPTION'), "OPTIONS"))}
          {results?.news && renderNews(results.news)}
        </>
        : "No results"
      }
    </>
  )
}

export default Results
