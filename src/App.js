import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Navigation from './navbar/Navigation';
import Routes from './route/Routes';

function App() {

  return (
    <BrowserRouter>
      <Navigation />
      <Routes />
    </BrowserRouter>
  )
}

export default App;
