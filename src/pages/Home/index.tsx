import Layout from "../../components/layout";
import axios from "axios";

export default function Home() {
  function test() {
    axios.post("/auth/test").then((res) => console.log(res));
  }

  return (
    <Layout>
      Welcome! <button onClick={test}>testt</button>
    </Layout>
  );
}
