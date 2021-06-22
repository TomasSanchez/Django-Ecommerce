import { SyntheticEvent, useEffect } from "react";
import { useState } from "react";

//
const Login = ({ csrf, token }: any) => {
	// console.log("desde login:", token);
	const [csrfToken, setCsrfToken] = useState("asd");
	const [user, setUser] = useState({
		email: "",
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
		// FIX
		setCsrfToken(
			document.cookie
				?.split(";")
				?.find((element) => element.includes("csrftoken"))
				?.split("=")[1]
		);
		console.log(
			document.cookie
				?.split(";")
				?.find((element) => element.includes("csrftoken"))
				?.split("=")[1]
		);
	};

	useEffect(() => {
		get_csrf();
	}, []);

	console.log(csrfToken);

	// useEffect(() => {
	// fetch("http://localhost:8000/api/users/get_csrf", {
	// 	// credentials: "include",
	// })
	// 	.then((res) => {
	// 		let csrfToken: any = res.headers.get("X-CSRFToken");
	// 		setCsrfToken(csrfToken);
	// 	})
	// 	.catch((err) => {
	// 		console.error(err);
	// 	});
	// }, []);
	// setCsrfToken(token);

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();
		fetch("http://localhost:8000/api/users/login", {
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": csrfToken,
			},
			method: "POST",
			credentials: "include",
			body: JSON.stringify({
				email: user.email,
				password: user.password,
			}),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Connecting problem");
				}
			})
			.then((data) => {
				console.log(data);
				//   send('TOGGLE')
				// Router.push('/dashboard');
			})
			.catch((err) => {
				console.log(err);
				//   setError("Username or password Incorrect");
			});
	};

	return (
		<div className='min-h-screen flex justify-center px-4 sm:px-6 lg:px-8'>
			<div className='max-w-md w-full space-y-8 mt-24'>
				<div>
					<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
						Sign in to your account
					</h2>
				</div>
				<form
					className='mt-8 space-y-6'
					action='#'
					method='POST'
					onSubmit={handleSubmit}>
					<input type='hidden' name='remember' defaultValue='true' />
					<div className='rounded-md shadow-sm -space-y-px'>
						<div>
							<label htmlFor='email-address' className='sr-only'>
								Email address
							</label>
							<input
								id='email-address'
								name='email'
								type='email'
								value={user.email}
								onChange={(e) =>
									setUser({
										...user,
										email: e.target.value,
									})
								}
								autoComplete='email'
								required
								className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
								placeholder='Email address'
							/>
						</div>
						<div>
							<label htmlFor='password' className='sr-only'>
								Password
							</label>
							<input
								id='password'
								name='password'
								type='password'
								value={user.password}
								onChange={(e) =>
									setUser({
										...user,
										password: e.target.value,
									})
								}
								autoComplete='current-password'
								required
								className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
								placeholder='Password'
							/>
						</div>
					</div>

					<div className='flex items-center justify-between'>
						<div className='flex items-center'>
							<input
								id='remember_me'
								name='remember_me'
								type='checkbox'
								className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
							/>
							<label
								htmlFor='remember_me'
								className='ml-2 block text-sm text-gray-900'>
								Remember me
							</label>
						</div>

						<div className='text-sm'>
							<a
								href='#'
								className='font-medium text-indigo-600 hover:text-indigo-500'>
								Forgot your password?
							</a>
						</div>
					</div>

					<div>
						<button
							type='submit'
							className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
							<span className='absolute left-0 inset-y-0 flex items-center pl-3'></span>
							Sign in
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

// export async function getServerSideProps() {
// 	const res = await fetch("http://localhost:8000/api/users/get_csrf", {
// 		credentials: "include",
// 	});
// 	const token = res.headers.get("X-CSRFToken");
// 	const csrf = await res.json();
// 	console.log("token desde serverSideProps:", token);

// 	if (!csrf) {
// 		return {
// 			notFound: true,
// 		};
// 	}

// 	return {
// 		props: { csrf, token }, // will be passed to the page component as props
// 	};
// }

export default Login;

// fetch("http://127.0.0.1:8000/api/users/get_csrf", {
// 			credentials: "include",
// 		})
// 			.then((res) => {
// 				let csrfToken = res.headers.get("X-CSRFToken");
// 				setCsrfToken(csrfToken);
// 			})
// 			.catch((error) => console.error(error));
// 		console.log("this ran first");
