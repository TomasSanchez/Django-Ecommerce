import { Children, useEffect, useState } from "react";
import { createContext, useReducer } from "react";
import Cookies from "../ui/js-cookie/src/js.cookie";

// type InitialStateType = {
// 	isAuthenticated: boolean;
// };

// type actionType = { type: "LOGIN" } | { type: "LOGOUT" };

// const initialState = {
// 	isAuthenticated: false,
// };

// const reducer = (state: InitialStateType, action: actionType) => {
// 	switch (action.type) {
// 		case "LOGIN":
// 			return {
// 				...state,
// 				isAuthenticated: true,
// 			};
// 		case "LOGOUT":
// 			Cookies.remove();
// 			return {
// 				...state,
// 				isAuthenticated: false,
// 			};
// 		default:
// 			return state;
// 	}
// };

type AuthProps = {
	isLogedIn: boolean;
	setIsLogedIn: (value: boolean) => void;
	//  updateLogin : (value: boolean) => void;
};

export const ContextAuth = createContext<AuthProps>({
	isLogedIn: false,
	setIsLogedIn: (value: boolean) => {},
	// updateLogin: (value: boolean) => {},
});

const AuthContext = ({ children }: any) => {
	// const [{ isAuthenticated }, dispatch] = useReducer(reducer, initialState);
	const [isLogedIn, setIsLogedIn] = useState(false);

	const updateLogin = (value: boolean) => {
		setIsLogedIn(value);
	};

	const AuthContextValues = {
		isLogedIn,
		setIsLogedIn,
		//  updateLogin
	};

	const get_current_user_or_log_out = async () => {
		const response = await fetch("http://localhost:8000/api/users/me", {
			headers: {
				"Content-Type": "application/json",
				// "X-CSRFToken": csrfToken,
			},
			credentials: "include",
		});
		const jsRes = await response.json();
		if (jsRes[0] !== "AnonymousUser") {
			setIsLogedIn(true);
		}
	};
	useEffect(() => {
		get_current_user_or_log_out();
	}, []);
	return (
		<ContextAuth.Provider value={AuthContextValues}>
			{children}
		</ContextAuth.Provider>
	);
};

export default AuthContext;
