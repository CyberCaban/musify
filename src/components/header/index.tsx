import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Paths } from "../../paths";
import "./index.css";

export default function Header() {
  return (
    <div className="header">
      <Link to={Paths.home} className="HomeIcon">
        Home
      </Link>
      <Link to={Paths.login} className="HomeIcon">
        Login
      </Link>
      <Link to={Paths.register} className="HomeIcon">
        Register
      </Link>
      <Link to={Paths.uploadPage} className="HomeIcon">
        Upload
      </Link>
      <Link to={Paths.gallery} className="HomeIcon">
        Gallery
      </Link>
    </div>
  );
}
