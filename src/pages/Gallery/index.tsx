import axios from "axios";
import Layout from "../../components/layout";

export default function Gallery() {
  const img = {
    id: "bd5422fa-c5f9-4e29-bc1e-c793cb6b550e",
    filename: "1704114748892-178490341-Vxn6mvstsRw.jpg",
    title: "",
    userId: "0496a334-f113-4b16-8e76-33ad4e1f63c8",
  };
  console.log("./");

  function test() {
    axios.post("/api/getAllImages").then((res) => {
      console.log(res);
    });
  }

  return (
    <Layout>
      gallery <button onClick={test}>testt</button>
      <img
        // src="./server/media/images/1704114748892-178490341-Vxn6mvstsRw.jpg"
        alt=""
      />
    </Layout>
  );
}
