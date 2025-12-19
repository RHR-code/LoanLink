import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import SocialLogin from "./SocialLogin";
import useAxiosInstance from "../../Hooks/useAxiosInstance";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [showPass, setShowPass] = useState(false);
  const { loading, user, setUser, userRegister, updateUserProfile } = useAuth();
  const AxiosInstance = useAxiosInstance();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleRegister = (data) => {
    const profileImage = data.photo[0];
    console.log(data);

    userRegister(data.email, data.password)
      .then((res) => {
        console.log(res.user);
        const formData = new FormData();
        formData.append("image", profileImage);
        const Image_Api_Url = `https://api.imgbb.com/1/upload?&key=${
          import.meta.env.VITE_Image_Host_Api
        }`;

        axios.post(Image_Api_Url, formData).then((res) => {
          console.log("after image upload", res.data);
          const userProfile = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };
          // ADDING USER TO DATABASE
          const userInfo = {
            name: data.name,
            email: data.email,
            photoURL: res.data.data.url,
            role: data.role,
          };
          setUser({ ...res.user, photoURL: res.data.data.url });
          AxiosInstance.post("/users", userInfo).then((res) => {
            console.log("user", res.data);
          });
          updateUserProfile(userProfile)
            .then((res) => {
              console.log(res.data);
            })
            .catch((error) => {
              console.log(error.code);
            });
        });
        navigate(state ? state : "/");
        toast.success("Successfully Registered!");
      })
      .catch((error) => {
        toast.error(error.code);
      });
  };
  return (
    <div className="mx-5 lg:max-w-3/4 lg:mx-auto bg-base-200 p-5 lg:p-10 my-5 rounded-2xl ">
      <h1 className="font-extrabold text-[42px] text-primary">
        Create an Account
      </h1>
      <p className="text-base font-medium py-5">Register with LoanLink</p>
      <form onSubmit={handleSubmit(handleRegister)}>
        <fieldset className="fieldset">
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input w-full"
            placeholder="Your Name"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500">name is required</p>
          )}
          <label className="label">Upload Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input file-input-primary"
            placeholder="Your Photo"
          />
          {errors.photo?.type === "required" && (
            <p className="text-red-500">photo is required</p>
          )}
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
          <label className="label">Select Your Role</label>
          <select
            // onChange={(e) => setRole(e.target.value)}
            // defaultValue="Pick a Role"
            {...register("role", { required: true })}
            className="select w-full"
          >
            {/* <option value="">Filter By Role</option>
          <option value="Admin">Admin</option> */}
            <option value="User">User</option>
            <option value="Manager">Manager</option>
          </select>
          {errors.role?.type === "required" && (
            <p className="text-red-500">Role is required</p>
          )}
          <label className="label">Password</label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              {...register("password", {
                required: true,
                minLength: 6,
                pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
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
            <p className="text-red-500">password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              Password must be more than 6 character or more
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-500">
              The password should have at least one uppercase , one lowercase
              and one digit
            </p>
          )}

          <button className="btn btn-primary mt-4 w-full  ">Register</button>
          <SocialLogin />
          <div>
            <p>
              Already have an account?
              <Link
                state={state}
                to="/login"
                className="text-blue-500 underline"
              >
                Login
              </Link>
            </p>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
