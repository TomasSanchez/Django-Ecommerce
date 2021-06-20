// import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import App from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			{/* <Navbar categories={pageProps.categories} /> */}
			<Navbar />
			<Component {...pageProps} />
		</>
	);
}
export default MyApp;

// FIX For some reason it is not fetching
MyApp.getInitialProps = async (appContext: any) => {
	const appProps = await App.getInitialProps(appContext);
	const response = await fetch("http://127.0.0.1:8000/api/store/categories");
	const categories = await response.json();
	console.log("desdeapp", categories); // not logging anything

	return { ...appProps, categories: categories };
};
