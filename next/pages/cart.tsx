import { useState } from "react";

const Cart = ({ items }: any) => {
	const [total, setTotal] = useState(0);

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
						{items.map((item: any) => (
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
												{item.product.title}
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
													{item.price * item.quantity}
												</div>
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

export async function getStaticProps() {
	try {
		const response = await fetch("http://127.0.0.1:8000/api/cart/items");
		const items = await response.json();

		return {
			props: { items }, // will be passed to the page component as props
		};
	} catch (error) {
		return {
			props: {
				items: undefined,
			},
		};
	}
}
