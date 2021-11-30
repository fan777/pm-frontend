import { useAuth } from '../hooks/useAuth';
import PortfolioApi from '../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const WatchlistStar = ({ symbol }) => {
  const { currentUser, refresh } = useAuth();

  const handleClick = async (action) => {
    try {
      if (action === 'add') {
        await PortfolioApi.addToWatchlist(currentUser.username, symbol);
      } else if (action === 'remove') {
        await PortfolioApi.removeFromWatchlist(currentUser.username, symbol);
      }
      refresh(currentUser.username);
    } catch (errors) {
      return { success: false, errors };
    }
  }

  return (
    <>
      {currentUser?.watchlist?.includes(symbol)
        ? <FontAwesomeIcon icon={["fas", "star"]} onClick={() => handleClick("remove")} />
        : <FontAwesomeIcon icon={["far", "star"]} onClick={() => handleClick("add")} />
      }
    </>
  )
}

export default WatchlistStar
