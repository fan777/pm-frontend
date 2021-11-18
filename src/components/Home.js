// import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useAuth } from "../hooks/useAuth";
// import { getCurrentData, getCurrentPrice, getHistoricalPrices } from "yahoo-stock-prices-fetch";

const Home = () => {
  const { currentUser } = useAuth();

  // const [stockInfo, setStockInfo] = useState({})

  // useEffect(() => {
  //   const getResults = async () => {
  //     if (!stockInfo) {
  //       console.log(stockInfo)
  //       // const stocks = ['AMZN', 'NFLIX'];
  //       const data = await getCurrentData('AAPL');
  //       setStockInfo(data);

  //     }
  //   }
  //   getResults();
  //   console.log(stockInfo)
  // }, [stockInfo])

  // const data = await getCurrentData('AAPL');
  // console.log(data);

  // const test = async () => {
  //   try {
  //     const data = await getCurrentData('AAPL');
  //     console.log(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  // test()

  return (
    <Container fluid>
      <p>Home</p>
      {currentUser
        ? <p>Welcome {currentUser?.username}</p>
        : ""}
      { }
    </Container>
  )
}

export default Home;
