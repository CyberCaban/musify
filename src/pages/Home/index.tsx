import { useEffect } from "react";
import Layout from "../../components/layout";
import customFetch from "../../handlers/customFetch";

export default function Home() {
	useEffect(() => {
		customFetch("/auth/test", "POST", {}, "").then((res) =>
			console.log(res)
		);
	});
	return <Layout>Welcome!</Layout>;
}
