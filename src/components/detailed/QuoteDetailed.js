import { useState, useEffect } from 'react';
import { Row, Col, Card, ListGroup } from 'react-bootstrap';
import useQuery from '../../hooks/useQuery';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import PortfolioApi from '../../api/api';
import { toReadableDate, toPercent, toAbbreviateNumber, toDecimalHundredths } from '../../helpers/formatter';
import Quotes from '../quote/Quotes';
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

  const generateListItem = ({ label, subtext, text }) => {
    let value = (typeof text === 'number' ? toAbbreviateNumber(text) : text) ?? "--";
    return (
      <ListGroup.Item><span className="listLabel">{label} {subtext && <span className="listSubtext">({subtext})</span>}</span> <span className="listValue">{value}</span></ListGroup.Item>
    )
  };

  return (
    <Row>
      {quoteSummary ?
        <>
          <h1>{quoteSummary?.price?.shortName ?? "-NAME NOT FOUND-"} <span className="fs-5">({quoteSummary?.price?.symbol})</span></h1>
          <h6><WatchlistStar symbol={quoteSummary?.price?.symbol} /></h6>
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
                    {generateListItem({ label: "Today's Open", subtext: "", text: quoteSummary?.summaryDetail?.open })}
                    {generateListItem({ label: "Previous Close", subtext: "", text: quoteSummary?.summaryDetail?.previousClose })}
                    {generateListItem({ label: "Day's Range", subtext: "", text: `${toDecimalHundredths(quoteSummary?.summaryDetail?.dayLow)} - ${toDecimalHundredths(quoteSummary?.summaryDetail?.dayHigh)}` })}
                    {generateListItem({ label: "52 Week Range", subtext: "", text: `${toDecimalHundredths(quoteSummary?.summaryDetail?.fiftyTwoWeekLow)} - ${toDecimalHundredths(quoteSummary?.summaryDetail?.fiftyTwoWeekHigh)}` })}
                    {generateListItem({ label: "Average Volume", subtext: "", text: quoteSummary?.summaryDetail?.averageVolume })}
                  </ListGroup>
                </Card>
                <Card className="mb-3">
                  <Card.Header>Dividends</Card.Header>
                  <ListGroup className="listItems" variant="flush">
                    {generateListItem({ label: "Annual Dividend Rate", subtext: "", text: quoteSummary?.summaryDetail?.dividendRate })}
                    {generateListItem({ label: "Annual Dividend Yield", subtext: "", text: toPercent(quoteSummary?.summaryDetail?.dividendYield) })}
                    {generateListItem({ label: "Previous Ex-Date", subtext: "", text: toReadableDate(quoteSummary?.summaryDetail?.exDividendDate) })}
                  </ListGroup>
                </Card>
              </Col>
              <Col xl={6}>
                <Card className="mb-3">
                  <Card.Header>Earnings</Card.Header>
                  <ListGroup className="listItems" variant="flush">
                    {generateListItem({ label: "Earnings Per Share", subtext: "", text: quoteSummary?.defaultKeyStatistics?.trailingEps })}
                    {generateListItem({ label: "Price/Earnings", subtext: "", text: quoteSummary?.summaryDetail?.trailingPE })}
                    {generateListItem({ label: "Forward P/E", subtext: "", text: quoteSummary?.summaryDetail?.forwardPE })}
                    {generateListItem({ label: "Price to Earnings / Growth", subtext: "", text: quoteSummary?.defaultKeyStatistics?.pegRatio })}
                  </ListGroup>
                </Card>
                <Card className="mb-3">
                  <Card.Header>Shares</Card.Header>
                  <ListGroup className="listItems" variant="flush">
                    {generateListItem({ label: "Market Capitalization", subtext: "", text: quoteSummary?.summaryDetail?.marketCap })}
                    {generateListItem({ label: "Enterprise Value", subtext: "", text: quoteSummary?.defaultKeyStatistics?.enterpriseValue })}
                    {generateListItem({ label: "Shares Outstanding", subtext: "", text: quoteSummary?.defaultKeyStatistics?.sharesOutstanding })}
                    {generateListItem({ label: "Shares Held By Inst.", subtext: "", text: toPercent(quoteSummary?.defaultKeyStatistics?.heldPercentInstitutions) })}
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
