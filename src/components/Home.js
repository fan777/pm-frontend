import { useAuth } from "../hooks/useAuth";

const Home = () => {
  const { currentUser } = useAuth();
  return (
    <div>
      <p>Home</p>
      {currentUser
        ? <p>Welcome {currentUser?.username}</p>
        : ""}
    </div>
  )
}

export default Home;
