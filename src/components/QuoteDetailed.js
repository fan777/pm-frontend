import { useState, useEffect } from 'react';
import { Row, Col, Card, ListGroup } from 'react-bootstrap';
import { abbreviateNumber } from "js-abbreviation-number";
import useQuery from '../hooks/useQuery';
import useIsMountedRef from '../hooks/useIsMountedRef';
import PortfolioApi from '../api/api';
import Quotes from './Quotes';
import QuoteChartContainer from './QuoteChartContainer';
import "./QuoteDetailed.css";
import WatchlistStar from './WatchlistStar';

const QuoteDetailed = () => {
  const query = useQuery();
  const [searchVal, setSearchVal] = useState(null);
  const [quoteSummary, setQuoteSummary] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    setSearchVal(query?.get("symbol"))
  }, [query])

  useEffect(() => {
    async function getQuoteSummary() {
      if (searchVal) {
        const quoteSummary = await PortfolioApi.getQuoteSummary({ symbol: searchVal });
        if (isMountedRef.current) {
          setQuoteSummary(quoteSummary);
        }
      }
    }
    async function getRecommended() {
      if (searchVal) {
        const recommended = await PortfolioApi.getRecommendations(searchVal);
        if (recommended.success) {
          if (isMountedRef.current) {
            setRecommended(recommended.res.recommendedSymbols.map(data => data.symbol));
          }
        }
      }
    }
    getQuoteSummary();
    getRecommended();
  }, [searchVal, isMountedRef])

  useEffect(() => {
    console.debug(
      "QuoteDetailed",
      "searchVal=", searchVal,
      "results=", quoteSummary,
      "recommendations=", recommended,
    );
  })

  const generateListItem = ({ label, subtext, value, type }) => {
    let retValue;
    if (type === "percent") {
      retValue = typeof value === 'number' ? (value * 100).toFixed(2) + '%' : "--";
    } else if (type === "date") {
      retValue = new Date(value).toDateString();
    } else {
      retValue = (typeof value === 'number' ? abbreviateNumber(value, 1, { symbols: ["", "k", "M", "B", "T", "P", "E"] }) : value) ?? "--";
    }
    return (
      <ListGroup.Item><span className="listLabel">{label} {subtext && <span className="listSubtext">({subtext})</span>}</span> <span className="listValue float-right">{retValue}</span></ListGroup.Item>
    )
  };

  return (
    <Row>
      {quoteSummary ?
        <>
          <h1>{quoteSummary?.price?.shortName ?? "-NAME NOT FOUND-"}</h1>
          <h4>{quoteSummary?.price?.symbol} <WatchlistStar symbol={quoteSummary?.price?.symbol} /></h4>
          <Col md={7}>
            <QuoteChartContainer symbol={quoteSummary?.price?.symbol} />
            <Card>
              <Card.Header>Summary</Card.Header>
              <Card.Body>
                <Card.Text>
                  {quoteSummary?.summaryProfile?.longBusinessSummary ?? "Not found..."}
                </Card.Text>
                <Card.Text><span className="summaryLabel">Industry</span> {quoteSummary?.summaryProfile?.industry ?? "Not found..."}</Card.Text>
                <Card.Text><span className="summaryLabel">Sector</span> {quoteSummary?.summaryProfile?.sector ?? "Not found..."}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={5}>
            <Quotes label="Recommended Symbols" symbols={[...recommended]} showSymbol={true} showName />
            <Row>
              <Col xl={6}>
                <Card className="mb-3">
                  <Card.Header>Details</Card.Header>
                  <ListGroup className="listItems" variant="flush">
                    {generateListItem({ label: "Today's Open", subtext: "", value: quoteSummary?.summaryDetail?.open })}
                    {generateListItem({ label: "Previous Close", subtext: "", value: quoteSummary?.summaryDetail?.previousClose })}
                    {generateListItem({ label: "Day's Range", subtext: "", value: `${quoteSummary?.summaryDetail?.dayLow ?? "--"} - ${quoteSummary?.summaryDetail?.dayHigh ?? "--"}` })}
                    {generateListItem({ label: "52 Week Range", subtext: "", value: `${quoteSummary?.summaryDetail?.fiftyTwoWeekLow ?? "--"} - ${quoteSummary?.summaryDetail?.fiftyTwoWeekHigh ?? "--"}` })}
                    {generateListItem({ label: "Average Volume", subtext: "", value: quoteSummary?.summaryDetail?.averageVolume })}
                  </ListGroup>
                </Card>
                <Card className="mb-3">
                  <Card.Header>Dividends</Card.Header>
                  <ListGroup className="listItems" variant="flush">
                    {generateListItem({ label: "Annual Dividend Rate", subtext: "", value: quoteSummary?.summaryDetail?.dividendRate })}
                    {generateListItem({ label: "Annual Dividend Yield", subtext: "", value: quoteSummary?.summaryDetail?.dividendYield, type: "percent" })}
                    {generateListItem({ label: "Previous Ex-Date", subtext: "", value: quoteSummary?.summaryDetail?.exDividendDate, type: "date" })}
                  </ListGroup>
                </Card>
              </Col>
              <Col xl={6}>
                <Card className="mb-3">
                  <Card.Header>Earnings</Card.Header>
                  <ListGroup className="listItems" variant="flush">
                    {generateListItem({ label: "Earnings Per Share", subtext: "", value: quoteSummary?.defaultKeyStatistics?.trailingEps })}
                    {generateListItem({ label: "Price/Earnings", subtext: "", value: quoteSummary?.summaryDetail?.trailingPE })}
                    {generateListItem({ label: "Forward P/E", subtext: "", value: quoteSummary?.summaryDetail?.forwardPE })}
                    {generateListItem({ label: "Price to Earnings / Growth", subtext: "", value: quoteSummary?.defaultKeyStatistics?.pegRatio })}
                  </ListGroup>
                </Card>
                <Card className="mb-3">
                  <Card.Header>Shares</Card.Header>
                  <ListGroup className="listItems" variant="flush">
                    {generateListItem({ label: "Market Capitalization", subtext: "", value: quoteSummary?.summaryDetail?.marketCap })}
                    {generateListItem({ label: "Enterprise Value", subtext: "", value: quoteSummary?.defaultKeyStatistics?.enterpriseValue })}
                    {generateListItem({ label: "Shares Outstanding", subtext: "", value: quoteSummary?.defaultKeyStatistics?.sharesOutstanding })}
                    {generateListItem({ label: "Shares Held By Inst.", subtext: "", value: quoteSummary?.defaultKeyStatistics?.heldPercentInstitutions, type: "percent" })}
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </Col>
        </>
        : <p>Invalid symbol!</p>}
    </Row>
  )
}

export default QuoteDetailed
