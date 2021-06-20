import { useEffect, useState } from "react";
import MainPosts from "../components/MainPosts";
import Pagination from "../components/Pagination";

export default function Home({ posts }: any) {
	const [pageNumber, setPageNumber] = useState(0);
	const [pagePosts, setPagePosts] = useState(posts.data[pageNumber]);

	const setPage = (pageIndex: any) => {
		setPageNumber(pageIndex);
		setPagePosts(posts.data[pageIndex]);
	};

	return (
		<div>
			<MainPosts posts={pagePosts} />
			<Pagination page={pageNumber} setPage={setPage} meta={posts.meta} />
		</div>
	);
}

export async function getStaticProps() {
	try {
		const response = await fetch("http://127.0.0.1:8000/api/store/");
		const posts = await response.json();

		return {
			props: { posts }, // will be passed to the page component as props
		};
	} catch (error) {
		return {
			props: {
				posts: undefined,
			},
		};
	}
}
