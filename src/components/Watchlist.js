import { useState, useEffect } from 'react';
import { useAuth } from "../hooks/useAuth";

const Watchlist = () => {
  const { currentUser } = useAuth();
  console.log(currentUser.watchlist)
  return (
    <div>
      {currentUser.username}
      {currentUser.watchlist}
    </div>
  )
}

export default Watchlist
