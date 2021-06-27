import { useContext, useEffect, useState } from "react";
import { itemType, cart_info } from "../types/storeTypes";
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
									<img
										alt='team'
										className='flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4'
										src='https://dummyimage.com/200x200'
									/>
									<div className='flex-grow sm:pl-8 flex justify-between'>
										<div className='flex flex-col'>
											<h2 className='title-font font-medium text-lg text-gray-900'>
												{item.product.title} {item.id}
											</h2>
											<h3 className='text-gray-500 mb-3'>
												{item.product.category.title}
											</h3>
											<div className='mb-4'>
												<div>{item.paper_type}</div>
												<div>{item.size} </div>
												{item.color}
											</div>
											{/* <span className='inline-flex'>
												$ {item.price * item.quantity}
											</span> */}
										</div>
										<div className='flex flex-col'>
											<div>
												<div className='mt-4 pb-2'>
													Cantidad {item.quantity}
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
													className='text-red-400 hover:bg-red-200 rounded-md p-1 mt-5'>
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
