import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import "./index.css";

export default function Header() {
	return (
		<div className="header">
			<a href="" className="HomeIcon">
				<HomeOutlined style={{ fontSize: "40px", color: "rgb()" }} />
			</a>
		</div>
	);
}
