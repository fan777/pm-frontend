
import { useAuth } from "../hooks/useAuth";

const Portfolio = () => {
  const { currentUser } = useAuth();
  return (
    <>
      <p>Portfolio</p>
      {currentUser
        ? <p>Welcome {currentUser?.username}</p>
        : ""}
    </>
  )
}

export default Portfolio;
