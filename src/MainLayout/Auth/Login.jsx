import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";
import SocialLogin from "./SocialLogin";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const { loading, userLogin } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleLogin = (data) => {
    userLogin(data.email, data.password)
      .then(() => {
        navigate(state ? state : "/");
        toast.success("Successfully LoggedIn!");
      })
      .catch((error) => {
        toast.error(error.code);
      });
  };
  return (
    <div className="mx-5 lg:max-w-3/4 lg:mx-auto p-5 lg:p-10 rounded-2xl my-5 bg-base-200">
      <h1 className="font-extrabold text-[42px] text-primary">Welcome Back</h1>
      <p className="text-base font-medium py-5">Login with LoanLink</p>
      <form onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset">
          {/* email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input w-full"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is required</p>
          )}
          {/* password */}
          <label className="label">Password</label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              {...register("password", {
                required: true,
                minLength: 6,
              })}
              className="input w-full"
              placeholder="Password"
            />
            <div
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-2.5 z-10"
            >
              {showPass ? <FaRegEyeSlash size={20} /> : <FaEye size={20} />}
            </div>
          </div>
          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              Password must be 6 character or longer
            </p>
          )}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-primary mt-4 w-full">Login</button>
          <SocialLogin />
          <div>
            <p>
              New to LoanLink?
              <Link
                state={state}
                to="/register"
                className="text-blue-500 underline"
              >
                Register
              </Link>
            </p>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
