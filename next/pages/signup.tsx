import { SyntheticEvent, useEffect, useState } from "react";
import Cookies from "../ui/js-cookie";
import Router from "next/router";

const SignUp = () => {
	const [csrfToken, setCsrfToken] = useState<string>("");
	const [user, setUser] = useState({
		email: "",
		first_name: "",
		last_name: "",
		password: "",
	});

	const get_csrf = async () => {
		const response = await fetch(
			"http://localhost:8000/api/users/get_csrf",
			{
				credentials: "include",
			}
		);

		const jsResponse = await response.json();
		setCsrfToken(Cookies.get("csrftoken"));
	};

	useEffect(() => {
		get_csrf();
	}, []);

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();
		try {
			const response = await fetch(
				"http://localhost:8000/api/users/create",
				{
					headers: {
						"Content-Type": "application/json",
						"X-CSRFToken": csrfToken,
					},
					method: "POST",
					credentials: "include",
					body: JSON.stringify(user),
				}
			);
			const jsResponse = await response.json();
			if (!response.ok) {
				throw new Error("Connecting problem");
			}
			Router.push("/login");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<div className='hidden sm:block' aria-hidden='true'>
				<div className='py-5'>
					<div className='border-t border-gray-200' />
				</div>
			</div>

			<div className='mt-10 sm:mt-0'>
				<div className='md:grid md:grid-cols-3 md:gap-6'>
					<div
						className='md:col-span-1 px-4'
						style={{ width: "60%" }}>
						<div className='px-4 sm:px-0'>
							<h3 className='text-lg font-medium leading-6 text-gray-900'>
								Personal Information
							</h3>
							<p className='mt-1 text-sm text-gray-600'>
								Use a permanent address where you can receive
								mail.
							</p>
						</div>
					</div>
					<div
						className='mt-5 md:mt-0 md:col-span-2 mr-6 justify-items-center'
						style={{ marginLeft: "-200px", marginRight: "100px" }}>
						<form onSubmit={handleSubmit} method='POST'>
							<div className='shadow overflow-hidden sm:rounded-md'>
								<div className='px-4 py-5 bg-white sm:p-6 '>
									<div className='grid grid-cols-6 gap-6'>
										<div className='col-span-6 sm:col-span-3'>
											<label
												htmlFor='first_name'
												className='block text-sm font-medium text-gray-700'>
												First name
											</label>
											<input
												type='text'
												name='first_name'
												id='first_name'
												value={user.first_name}
												onChange={(e) =>
													setUser({
														...user,
														first_name:
															e.target.value,
													})
												}
												autoComplete='given-name'
												className='mt-1 focus:ring-indigo-500 border-gray-300 focus:border-indigo-500 block w-full shadow-sm sm:text-sm  rounded-md px-2'
												style={{
													borderWidth: "0.5px",
													height: "1.8rem",
												}}
											/>
										</div>

										<div className='col-span-6 sm:col-span-3'>
											<label
												htmlFor='last_name'
												className='block text-sm font-medium text-gray-700'>
												Last name
											</label>
											<input
												type='text'
												name='last_name'
												id='last_name'
												value={user.last_name}
												onChange={(e) =>
													setUser({
														...user,
														last_name:
															e.target.value,
													})
												}
												autoComplete='family-name'
												className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-2'
												style={{
													borderWidth: "0.5px",
													height: "1.8rem",
												}}
											/>
										</div>

										<div className='col-span-6 sm:col-span-4'>
											<label
												htmlFor='email_address'
												className='block text-sm font-medium text-gray-700'>
												Email address
											</label>
											<input
												type='text'
												name='email_address'
												id='email_address'
												value={user.email}
												onChange={(e) =>
													setUser({
														...user,
														email: e.target.value,
													})
												}
												autoComplete='email'
												className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-2'
												style={{
													borderWidth: "0.5px",
													height: "1.8rem",
												}}
											/>
										</div>

										<div className='col-span-6 sm:col-span-4'>
											<label
												htmlFor='password'
												className='block text-sm font-medium text-gray-700'>
												Password
											</label>
											<input
												type='text'
												name='password'
												id='password'
												value={user.password}
												onChange={(e) =>
													setUser({
														...user,
														password:
															e.target.value,
													})
												}
												autoComplete='email'
												className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-2'
												style={{
													borderWidth: "0.5px",
													height: "1.8rem",
												}}
											/>
										</div>

										<div className='col-span-6 sm:col-span-3'>
											<label
												htmlFor='country'
												className='block text-sm font-medium text-gray-700'>
												Country / Region
											</label>
											<select
												id='country'
												name='country'
												autoComplete='country'
												className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'>
												<option>Argentina</option>
												{/* <option>Canada</option> */}
												{/* <option>Mexico</option> */}
											</select>
										</div>

										<div className='col-span-6'>
											<label
												htmlFor='street_address'
												className='block text-sm font-medium text-gray-700'>
												Street address
											</label>
											<input
												type='text'
												name='street_address'
												id='street_address'
												// value={user.address}
												// onChange={(e) =>
												// 	setUser({
												// 		...user,
												// 		address:
												// 			e.target.value,
												// 	})
												// }
												autoComplete='street-address'
												className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-2'
												style={{
													borderWidth: "0.5px",
													height: "1.8rem",
												}}
											/>
										</div>

										<div className='col-span-6 sm:col-span-6 lg:col-span-2'>
											<label
												htmlFor='city'
												className='block text-sm font-medium text-gray-700'>
												City
											</label>
											<input
												type='text'
												name='city'
												id='city'
												className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-2'
												style={{
													borderWidth: "0.5px",
													height: "1.8rem",
												}}
											/>
										</div>

										<div className='col-span-6 sm:col-span-3 lg:col-span-2'>
											<label
												htmlFor='state'
												className='block text-sm font-medium text-gray-700'>
												State / Province
											</label>
											<input
												type='text'
												name='state'
												id='state'
												className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-2'
												style={{
													borderWidth: "0.5px",
													height: "1.8rem",
												}}
											/>
										</div>

										<div className='col-span-6 sm:col-span-3 lg:col-span-2'>
											<label
												htmlFor='postal_code'
												className='block text-sm font-medium text-gray-700'>
												ZIP / Postal
											</label>
											<input
												type='text'
												name='postal_code'
												id='postal_code'
												autoComplete='postal-code'
												className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-2'
												style={{
													borderWidth: "0.5px",
													height: "1.8rem",
												}}
											/>
										</div>
									</div>
								</div>
								<div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
									<button
										type='submit'
										className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
										Create
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>

			<div className='hidden sm:block' aria-hidden='true'>
				<div className='py-5'>
					<div className='border-t border-gray-200' />
				</div>
			</div>
		</>
	);
};

export default SignUp;
