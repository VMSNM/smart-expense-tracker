import { Link } from "react-router-dom";
import { useState } from "react";
import InputField from "../components/InputField";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/mutations/userMutation";
import toast from "react-hot-toast";

const LoginPage = () => {
	const [loginData, setLoginData] = useState({
		username: "",
		password: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setLoginData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const [login, {loading}] = useMutation(LOGIN, {
		refetchQueries: ["GetAuthUser"]
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!loginData.username || !loginData.password) return toast.error("Please fill in all fields");
		try {
			await login({ variables: { input: loginData } });
		} catch (error) {
			console.error("Error logging in:", error);
			toast.error(error.message);
		}
	};

	return (
		<div className='flex justify-center items-center h-screen'>
			<div className='flex rounded-lg overflow-hidden z-50 bg-gray-300'>
				<div className='w-full bg-gray-100 min-w-80 sm:min-w-96 flex items-center justify-center'>
					<div className='max-w-md w-full p-6'>
						<h1 className='text-3xl font-semibold mb-6 text-slate-700 text-center'>Login</h1>
						<h1 className='text-sm font-semibold mb-6 text-gray-500 text-center'>
							Welcome back! Log in to your account
						</h1>
						<form className='space-y-4' onSubmit={handleSubmit}>
							<InputField
								label='Username'
								id='username'
								name='username'
								value={loginData.username}
								onChange={handleChange}
							/>

							<InputField
								label='Password'
								id='password'
								name='password'
								type='password'
								value={loginData.password}
								onChange={handleChange}
							/>
							<div>
								<button
									type='submit'
									className='text-white font-bold w-full rounded px-4 py-2 bg-gradient-to-br from-slate-800 to-slate-600 hover:from-blue-700 hover:to-blue-500'
									disabled={loading}
								>
									{ loading ? 'Checking...' : 'Login' }
								</button>
							</div>
						</form>
						<div className='mt-4 text-sm text-gray-600 text-center'>
							<p>
								{"Don't"} have an account?{" "}
								<Link to='/signup' className='text-slate-700 hover:underline'>
									Sign Up
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default LoginPage;