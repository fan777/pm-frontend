import { useAuth } from '../../hooks/useAuth';
import PortfolioApi from '../../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Star = ({ symbol }) => {
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

  if (!currentUser) return <></>;

  return (
    <>
      {currentUser?.watchlist?.includes(symbol)
        ? <><FontAwesomeIcon icon={["fas", "star"]} onClick={() => handleClick("remove")} /> Remove from watchlist</>
        : <><FontAwesomeIcon icon={["far", "star"]} onClick={() => handleClick("add")} /> Add to watchlist</>
      }
    </>
  )
}

export default Star
