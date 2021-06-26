import { useContext, useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import Cookies from "../ui/js-cookie";
import Router from "next/router";
import { ContextAuth } from "./AuthContext";
import { categoryType } from "../types/storeTypes";

const Navbar = () => {
	const [categories, setCategories] = useState<categoryType[]>();
	const { isLogedIn, setIsLogedIn } = useContext(ContextAuth);

	const get_categories = async () => {
		try {
			const response = await fetch(
				"http://127.0.0.1:8000/api/store/categories"
			);
			const categories = await response.json();

			setCategories(categories);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		get_categories();
	}, []);

	const handleLogout = async () => {
		try {
			const response = await fetch(
				"http://localhost:8000/api/users/logout",
				{
					headers: {
						"Content-Type": "application/json",
						"X-CSRFToken": Cookies.get("csrftoken"),
					},
					method: "POST",
					credentials: "include",
				}
			);
			if (response.ok) {
				setIsLogedIn(false);
				Router.push("/");
			}
		} catch (error) {}
	};

	return (
		<header className='text-gray-600 body-font shadow-lg bg-gray-50'>
			<div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
				<nav className='flex lg:w-2/5 flex-wrap items-center text-base '>
					<h1>
						<a href='/'>Home</a>
					</h1>
					<Dropdown categories={categories} />
					<a className='mr-5 ml-2 hover:text-gray-900'>First Link</a>
					<a className='mr-5 hover:text-gray-900'>Second Link</a>
					<a className='mr-5 hover:text-gray-900'>Third Link</a>
				</nav>

				<div className='lg:w-2/5 inline-flex lg:justify-end ml-auto'>
					{!isLogedIn ? (
						<div>
							<a
								href='/login'
								className='mr-5 inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0'>
								Login
								<svg
									fill='none'
									stroke='currentColor'
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									className='w-4 h-4 ml-1'
									viewBox='0 0 24 24'>
									<path d='M5 12h14M12 5l7 7-7 7' />
								</svg>
							</a>
							<a
								href='/signup'
								className='inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0'>
								SignUp
								<svg
									fill='none'
									stroke='currentColor'
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									className='w-4 h-4 ml-1'
									viewBox='0 0 24 24'>
									<path d='M5 12h14M12 5l7 7-7 7' />
								</svg>
							</a>
						</div>
					) : (
						<div>
							<div className='inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 mr-4'>
								Username
							</div>
							<button
								onClick={handleLogout}
								className='inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0'>
								Logout
								<svg
									fill='none'
									stroke='currentColor'
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									className='w-4 h-4 ml-1'
									viewBox='0 0 24 24'>
									<path d='M5 12h14M12 5l7 7-7 7' />
								</svg>
							</button>
						</div>
					)}
				</div>
			</div>
		</header>
	);
};

export default Navbar;
