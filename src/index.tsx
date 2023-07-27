import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { Paths } from "./paths";
import "./index.css";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/Home"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const UploadPage = lazy(() => import("./pages/UploadPage"));

const router = createBrowserRouter([
	{ path: Paths.home, element: <Home /> },
	{ path: Paths.register, element: <Register /> },
	{ path: Paths.login, element: <Login /> },
	{ path: Paths.uploadPage, element: <UploadPage /> },
]);

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<Provider store={store}>
		<Suspense fallback="Loading...">
			<RouterProvider router={router} />
		</Suspense>
	</Provider>
);
