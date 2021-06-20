import { useState } from "react";
import MainPosts from "../../../components/MainPosts";
import Pagination from "../../../components/Pagination";

const CategoryView = ({ posts }: any) => {
	const [pageNumber, setPageNumber] = useState(0);
	const [pagePosts, setPagePosts] = useState(posts.data[pageNumber]);
	// console.log(posts.data[1].data[1].product_image[0].image);

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
};

export default CategoryView;

export async function getStaticProps(context: any) {
	try {
		const response = await fetch(
			`http://127.0.0.1:8000/api/store/category/${context.params.id}`
		);
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

export const getStaticPaths = async () => {
	const response = await fetch(`http://127.0.0.1:8000/api/store/categories`);
	const categories = await response.json();
	const ids = categories.map((post: any) => post.id);
	const paths = ids.map((id: any) => ({ params: { id: id.toString() } }));

	return {
		paths,
		fallback: false,
	};
};
