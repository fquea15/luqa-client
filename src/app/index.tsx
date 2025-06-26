import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href={"/(root)/(home)/budget/category/2"} />;
}
