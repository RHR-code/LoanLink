import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import SocialLogin from "./SocialLogin";

const Register = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { loading, userRegister, updateUserProfile } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleRegister = (data) => {
    const profileImage = data.photo[0];
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
    <div className="max-w-3/4 mx-auto bg-base-200 p-10 my-5 rounded-2xl ">
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
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
            })}
            className="input w-full"
            placeholder="Password"
          />
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
