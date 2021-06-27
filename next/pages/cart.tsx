import { useContext, useEffect, useState } from "react";
import { itemType, cart_info, rawItemType } from "../types/storeTypes";
import { ContextAuth } from "../components/AuthContext";
import Cookies from "../ui/js-cookie";
import Router from "next/router";
import { SyntheticEvent } from "react";

type cartType = {
	cart_info: cart_info;
	items: itemType[] | undefined;
};

const Cart = () => {
	const [total, setTotal] = useState(0);
	const [cart, setCart] = useState<cartType>();
	const [item, setItem] = useState<rawItemType | {}>({});
	const { isLogedIn, setIsLogedIn } = useContext(ContextAuth);

	const get_cart = async () => {
		try {
			const response = await fetch("http://localhost:8000/api/cart/", {
				credentials: "include",
			});

			if (response.ok) {
				const cart = await response.json();
				console.log("cart: ", cart);

				setCart(cart);
			} else {
				Router.push("/");
				throw new Error("You need to log in to acces cart");
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleRemove = async (id: number) => {
		const response = await fetch(`http://localhost:8000/api/cart/${id}`, {
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": Cookies.get("csrftoken"),
			},
			method: "DELETE",
			credentials: "include",
		});
		if (response.ok) {
			get_cart();
		}
	};

	const handleChange = async (field: string, value: number, id: number) => {
		const response = await fetch(
			`http://localhost:8000/api/cart/${id}/${field}`,
			{
				headers: {
					"Content-Type": "application/json",
					"X-CSRFToken": Cookies.get("csrftoken"),
				},
				method: "PUT",
				credentials: "include",
				body: JSON.stringify({ [field]: value }),
			}
		);
		if (response.ok) {
			get_cart();
		}
	};

	useEffect(() => {
		get_cart();
	}, []);
	return (
		<div>
			<section className='text-gray-600 body-font'>
				<div className='container px-5 pt-10 mx-auto'>
					<div className='flex flex-col text-center w-full mb-8'>
						<h1 className='text-2xl font-medium title-font mb-4 text-gray-900 tracking-widest'>
							Carrito
						</h1>
					</div>
					<div
						className='flex flex-wrap -m-4 border-l-2 border-r-2'
						style={{ width: "90%" }}>
						{/* begginning of content */}
						{cart?.items?.map((item: itemType) => (
							<div
								key={item.id}
								className='p-4 lg:w-1/2 border-b-2'
								style={{ width: "100%" }}>
								<div className='h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left'>
									<a href={`/${item.id}`}>
										<img
											alt='team'
											className='flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4'
											src='https://dummyimage.com/200x200'
										/>
									</a>
									{/*  */}
									<div className='flex-grow sm:pl-8 flex justify-between'>
										<div className='flex flex-col'>
											<a href={`/${item.id}`}>
												<h2 className='title-font font-medium text-lg text-gray-900'>
													{item.product.title}{" "}
													{item.id}
												</h2>
											</a>
											<a
												href={`/category/${item.product.category.id}`}>
												<h3 className='text-gray-500 mb-3'>
													{
														item.product.category
															.title
													}
												</h3>
											</a>
											<div className='mb-4'>
												{/* asd */}
												<div className='relative pb-1'>
													<select
														value={item.size}
														onChange={(e: any) =>
															handleChange(
																"size",
																e.target.value,
																item.id
															)
														}
														className='rounded border appearance-none border-gray-300 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 w-20'>
														{/* className='rounded border appearance-none border-gray-300 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 w-20'> */}
														<option value={"S"}>
															S
														</option>
														<option value={"M"}>
															M
														</option>
														<option value={"L"}>
															L
														</option>
													</select>
													<span className='absolute right-5 top-0 h-full  text-center text-gray-600 pointer-events-none flex items-center justify-center'>
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
												{/* papertype */}
												<div className='relative pb-1'>
													<select
														value={item.paper_type}
														onChange={(e: any) =>
															handleChange(
																"paper_type",
																e.target.value,
																item.id
															)
														}
														className='rounded border appearance-none border-gray-300 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 w-20'>
														<option value={"Mate"}>
															Mate
														</option>
														<option
															value={"Glossy"}>
															Glossy
														</option>
													</select>
													<span className='absolute right-5 top-0 h-full  text-center text-gray-600 pointer-events-none flex items-center justify-center'>
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
												{/* color */}
												<div className='relative pb-1'>
													<select
														value={item.color}
														onChange={(e: any) =>
															handleChange(
																"color",
																e.target.value,
																item.id
															)
														}
														className='rounded border appearance-none border-gray-300 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 w-20'>
														<option value={"White"}>
															White
														</option>
														<option value={"Black"}>
															Black
														</option>
														<option value={"Wood"}>
															Wood
														</option>
													</select>
													<span className='absolute right-5 top-0 h-full  text-center text-gray-600 pointer-events-none flex items-center justify-center'>
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
										<div className='flex flex-col'>
											<div>
												<div className='mt-4 pb-2'>
													<div className='relative'>
														<select
															value={
																item.quantity
															}
															onChange={(
																e: any
															) =>
																handleChange(
																	"quantity",
																	e.target
																		.value,
																	item.id
																)
															}
															className='rounded border appearance-none border-gray-300 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10'>
															<option value={"1"}>
																1
															</option>
															<option value={"2"}>
																2
															</option>
															<option value={"3"}>
																3
															</option>
															<option value={"4"}>
																4
															</option>
															<option value={"5"}>
																5
															</option>
															<option value={"6"}>
																6
															</option>
															<option value={"7"}>
																7
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
												</div>
												<div>
													${" "}
													{parseInt(item.price) *
														item.quantity}
												</div>
											</div>
											<div>
												<button
													onClick={() =>
														handleRemove(item.id)
													}
													className='text-red-400 hover:bg-red-200 rounded-md p-1 mt-20'>
													Remove
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
						{/* end content */}
					</div>
					<div className='border-t-2 mt-4'> Total</div>
				</div>
			</section>
		</div>
	);
};

export default Cart;
