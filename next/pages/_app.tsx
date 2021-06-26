// import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import Navbar from "../components/Navbar";
import App from "next/app";
import AuthContext from "../components/AuthContext";
import type { AppProps } from "next/app";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AuthContext>
			{/* <Navbar categories={pageProps.categories} /> */}
			<Navbar />
			<Component {...pageProps} />
		</AuthContext>
	);
}
export default MyApp;

// MyApp.getInitialProps = async (appContext: any) => {
// 	const appProps = await App.getInitialProps(appContext);
// 	const response = await fetch("http://127.0.0.1:8000/api/store/categories");
// 	const categories = await response.json();
// 	console.log("desdeapp", categories);

// 	return { ...appProps, categories: categories };
// };
