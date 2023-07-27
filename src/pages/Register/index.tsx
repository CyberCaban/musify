import React from "react";
import Layout from "../../components/layout";
import { Link } from "react-router-dom";
import { Paths } from "../../paths";
import customFetch from "../../handlers/customFetch";

export default function Register() {
	const userRegister = async (e: any) => {
		e.preventDefault();
		const email = e.target[0].value;
		const password = e.target[1].value;
		const name = e.target[2].value;

		const data = { email: email, password: password, name: name };

		customFetch("/auth/register", "POST", data, "").then((res) => {
			console.log(res);
		});
	};

	return (
		<Layout>
			<form onSubmit={(e) => userRegister(e)}>
				<input
					type="email"
					name="email"
					placeholder="example@mail.com"
				/>
				<input type="password" name="password" placeholder="password" />
				<input type="name" name="name" placeholder="name" />
				<button type="submit">Зарегистрироваться</button>
			</form>
			<Link to={Paths.login}>Уже зарегистрированы?</Link>
		</Layout>
	);
}
