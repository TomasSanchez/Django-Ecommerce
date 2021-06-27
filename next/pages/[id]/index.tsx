import { SyntheticEvent } from "react";
import { useState } from "react";
import { productType, imageType, rawItemType } from "../../types/storeTypes";
import Cookies from "../../ui/js-cookie";

type propType = {
	post: productType;
};

const Product = ({ post }: propType) => {
	const [error, setError] = useState<string>("");
	const [item, setItem] = useState<rawItemType>({
		product: post.id,
		size: "M",
		color: "Wood",
		paper_type: "Mate",
		quantity: 1,
		image:
			post.product_image.find(
				(picture: imageType) => picture.is_feature
			) || "https://dummyimage.com/400x400", // || post?.product_image[0] indicating first picture if there are no feature images
	});

	const handleChange = (place: string, value: string | number) => {
		setItem({ ...item, [place]: value });
	};

	const addToCart = async (e: SyntheticEvent) => {
		e.preventDefault();
		try {
			const response = await fetch("http://localhost:8000/api/cart/add", {
				headers: {
					"Content-Type": "application/json",
					"X-CSRFToken": Cookies.get("csrftoken"),
				},
				method: "POST",
				credentials: "include",
				body: JSON.stringify(item),
			});
			if (response.ok) {
				// Router.push("/");
				// ADD Modal pop to go to cart or continue shopping
			}

			if (response.status == 406) {
				setError("Item Already in Cart");
				throw new Error(error);
			}
		} catch (err) {
			console.error(err);
		}
	};
	// changing the price according to size
	var price = post?.medium_price;
	switch (item.size) {
		case "S":
			price = post?.small_price;
			break;
		case "M":
			price = post?.medium_price;
			break;
		case "L":
			price = post?.large_price;
			break;
		default:
			break;
	}

	return (
		<div>
			<section className='text-gray-600 body-font overflow-hidden'>
				<div className='container px-5 py-24 mx-auto'>
					<div className='flex justify-items-center mb-8 ml-80'>
						<h3 className='text-red-400'>{error}</h3>
					</div>
					<div className='lg:w-4/5 mx-auto flex flex-wrap'>
						<img
							alt='ecommerce'
							className='lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded'
							src='https://dummyimage.com/400x400'
						/>
						<div className='lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0'>
							<h2 className='text-sm title-font text-gray-500 tracking-widest'>
								{post?.category.title}
							</h2>
							<h1 className='text-gray-900 text-3xl title-font font-medium mb-1'>
								{post?.title}
							</h1>
							<div className='flex mb-4'>
								<span className='flex items-center'>
									<svg
										fill='currentColor'
										stroke='currentColor'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										className='w-4 h-4 text-indigo-500'
										viewBox='0 0 24 24'>
										<path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
									</svg>
									<svg
										fill='currentColor'
										stroke='currentColor'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										className='w-4 h-4 text-indigo-500'
										viewBox='0 0 24 24'>
										<path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
									</svg>
									<svg
										fill='currentColor'
										stroke='currentColor'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										className='w-4 h-4 text-indigo-500'
										viewBox='0 0 24 24'>
										<path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
									</svg>
									<svg
										fill='currentColor'
										stroke='currentColor'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										className='w-4 h-4 text-indigo-500'
										viewBox='0 0 24 24'>
										<path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
									</svg>
									<svg
										fill='none'
										stroke='currentColor'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										className='w-4 h-4 text-indigo-500'
										viewBox='0 0 24 24'>
										<path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
									</svg>
									<span className='text-gray-600 ml-3'>
										4 Reviews
									</span>
								</span>
							</div>
							<p className='leading-relaxed'>
								Fam locavore kickstarter distillery. Mixtape
								chillwave tumeric sriracha taximy chia
								microdosing tilde DIY. XOXO fam indxgo
								juiceramps cornhole raw denim forage brooklyn.
								Everyday carry +1 seitan poutine tumeric.
								Gastropub blue bottle austin listicle pour-over,
								neutra jean shorts keytar banjo tattooed umami
								cardigan.
							</p>
							<div className='flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5'>
								<div className='flex'>
									<span className='mr-3'>Color</span>
									<button
										className='border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none'
										onClick={() =>
											handleChange("color", "White")
										}
									/>
									<button
										className='border-2 border-gray-300 ml-1 bg-gray-900 rounded-full w-6 h-6 focus:outline-none'
										onClick={() =>
											handleChange("color", "Black")
										}
									/>
									<button
										className='border-2 border-gray-300 ml-1 bg-yellow-800 rounded-full w-6 h-6 focus:outline-none'
										onClick={() =>
											handleChange("color", "Wood")
										}
									/>
								</div>
								<div className='flex ml-6 items-center'>
									<span className='mr-3'>Size</span>
									<div className='relative'>
										<select
											value={item.size}
											onChange={(e: any) =>
												handleChange(
													"size",
													e.target.value
												)
											}
											className='rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10'>
											<option value={"S"}>S</option>
											<option value={"M"}>M</option>
											<option value={"L"}>L</option>
										</select>
										<span className='absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center'>
											<svg
												fill='none'
												stroke='currentColor'
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												className='w-4 h-4'
												viewBox='0 0 24 24'>
												<path d='M6 9l6 6 6-6' />
											</svg>
										</span>
									</div>
									<span className='ml-4 mx-2'>
										Paper Type
									</span>
									<div className='relative'>
										<select
											value={item.paper_type}
											onChange={(e: any) =>
												handleChange(
													"paper_type",
													e.target.value
												)
											}
											className='rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10'>
											<option value={"Mate"}>Mate</option>
											<option value={"Glossy"}>
												Glossy
											</option>
										</select>
										<span className='absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center'>
											<svg
												fill='none'
												stroke='currentColor'
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												className='w-4 h-4'
												viewBox='0 0 24 24'>
												<path d='M6 9l6 6 6-6' />
											</svg>
										</span>
									</div>
									{/*  */}
									<span className='ml-4 mx-2'>Quantity</span>
									<div className='relative'>
										<select
											value={item.quantity}
											onChange={(e: any) =>
												handleChange(
													"quantity",
													e.target.value
												)
											}
											className='rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10'>
											<option value={"1"}>1</option>
											<option value={"2"}>2</option>
											<option value={"3"}>3</option>
											<option value={"4"}>4</option>
											<option value={"5"}>5</option>
											<option value={"6"}>6</option>
											<option value={"7"}>7</option>
										</select>
										<span className='absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center'>
											<svg
												fill='none'
												stroke='currentColor'
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												className='w-4 h-4'
												viewBox='0 0 24 24'>
												<path d='M6 9l6 6 6-6' />
											</svg>
										</span>
									</div>
								</div>
							</div>
							<div className='flex'>
								<span className='title-font font-medium text-2xl text-gray-900'>
									${price}
								</span>
								<button
									onClick={addToCart}
									className='flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded'>
									Add to Cart
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export async function getServerSideProps(context: any) {
	const res = await fetch(
		`http://127.0.0.1:8000/api/store/${context.params.id}`
	);
	const post = await res.json();
	console.log("post from index: ", post);

	if (!post) {
		return {
			notFound: true,
		};
	}

	return {
		props: { post },
	};
}

export default Product;
