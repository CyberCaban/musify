import React from "react";
import Header from "../header";
import "./index.css";

type Props = {
	children: React.ReactNode;
};

export default function Layout({ children }: Props) {
	return (
		<div className="layout">
			<Header />
			{children}
		</div>
	);
}
