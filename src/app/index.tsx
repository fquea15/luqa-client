import { Redirect } from "expo-router";

const Home = () => {
  return <Redirect href={"/(root)/(drawer)/(tabs)/home"} />;
};

export default Home;
