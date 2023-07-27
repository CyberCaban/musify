import React from "react";
import Layout from "../../components/layout";
import { Link } from "react-router-dom";
import { Paths } from "../../paths";
import customFetch from "../../handlers/customFetch";

export default function Login() {
	const userLogin = async (e: any) => {
		e.preventDefault();
		const email = e.target[0].value;
		const password = e.target[1].value;

		const data = { email, password };

		customFetch("auth/login", "POST", data, "").then((res) => {
			console.log(res);
		});
	};

	const userLogout = async (e: any) => {
		e.preventDefault();

		customFetch("/auth/logout", "POST", {}, "").then((res) => {
			console.log(res);
		});
	};

	const test = async (e: any) => {
		e.preventDefault();

		customFetch("/auth/test", "POST", {}, "").then((res) => {
			console.log(res);
		});
	};

	return (
		<Layout>
			<form onSubmit={(e) => userLogin(e)}>
				<input
					type="email"
					name="email"
					placeholder="example@mail.com"
				/>
				<input type="password" name="password" placeholder="password" />
				<button type="submit">Войти</button>
				<button onClick={(e) => userLogout(e)}>logout</button>
				<button onClick={(e) => test(e)}>test</button>
			</form>
			<Link to={Paths.register}>Еще не зарегистрированы?</Link>
		</Layout>
	);
}
