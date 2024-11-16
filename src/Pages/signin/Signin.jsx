import React, { useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import Login from "../login/Login";
import { API, Api } from "../../Api/Api";
import * as yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export default function Signin() {
  const [visible, setVisible] = useState(true);
  const [showlogin, setshowlogin] = useState(false);
  const [errorMsg, seterrorMsg] = useState(null);
  const [passType, setpassType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const toggleVisible = () => {
    setVisible(!visible);
  };
  const handelPassword = (e) => {
    setpassType((prevType) => (prevType === "password" ? "text" : "password"));
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  const handleShowlogin = () => {
    setshowlogin(true);
    setVisible(false);
  };

  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Name is required")
      .min(3, "Min name mast be 3 letters")
      .max(15, "Max name mast be 15 letter"),
    email: yup
      .string()
      .email("Write avalid email")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Minimum eight characters, at least one letter and one number"
      ),
    passwordConfirm: yup
      .string()
      .required("repassword is required")
      .oneOf([yup.ref("password")], "Password and repassword mast be same"),
  });

  async function sendDataTORegister(values) {
    let id;

    try {
      const options = {
        url: "https://ecommerce-dot-code.vercel.app/api/auth/signup",
        method: "POST",
        data: values,
      };

      id = toast.loading("waiting...");
      const { data } = await axios.request(options);
      toast.dismiss(id);
      toast.success("user created successfully");
      console.log(data);

      setTimeout(() => {
        if (data.token) {
          setshowlogin(true);
          setVisible(false);
        }
      }, 3000);
    } catch (error) {
      toast.dismiss(id);
      seterrorMsg(error.response.data.errors[0].msg);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      role: "user",
    },

    validationSchema,
    onSubmit: sendDataTORegister,
  });

  return (
    <>
      {visible ? (
        <section className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-10 min-h-screen text-center">
          <form
            onSubmit={formik.handleSubmit}
            className="w-[90%] md:w-[70%] lg:w-[40%] xl:w-1/3 bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 rounded-lg"
          >
            <h3 className="text-2xl font-bold ">Create an Account</h3>
            <p className="my-2 text-sm">Create a account to continue</p>
            <div className="my-4">
              <input
                onChange={formik.handleChange}
                value={formik.values.name}
                onBlur={formik.handleBlur}
                type="text"
                placeholder="Name"
                name="name"
                className="w-full border-2 p-2 rounded"
              />
              {formik.errors.name && formik.touched.name ? (
                <div className="text-red-600 mt-1 font-semibold">
                  * {formik.errors.name}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="my-4">
              <input
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                type="email"
                placeholder="Email"
                name="email"
                className="w-full border-2 p-2 rounded"
              />
              {formik.errors.email && formik.touched.email ? (
                <div className="text-red-600 mt-1 font-semibold">
                  * {formik.errors.email}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="mb-4 relative">
              <input
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                type={passType}
                placeholder="Password"
                name="password"
                className=" w-full border-2 p-2 rounded"
              />
              <button
                type="button"
                onClick={handelPassword}
                className="absolute top-1/2 right-2 -translate-y-1/2"
              >
                {passType === "password" ? (
                  <FaEye className="text-gray-500" />
                ) : (
                  <FaEyeSlash className="text-gray-500" />
                )}
              </button>
            </div>
            <div className="my-2">
              {formik.errors.password && formik.touched.password ? (
                <div className="text-red-600 mt-1 font-semibold">
                  * {formik.errors.password}
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="mb-4 relative">
              <input
                onChange={formik.handleChange}
                value={formik.values.passwordConfirm}
                onBlur={formik.handleBlur}
                type={confirmPasswordType}
                placeholder="Re-Password"
                name="passwordConfirm"
                className="w-full border-2 p-2 rounded"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute top-1/2 right-2 -translate-y-1/2"
              >
                {confirmPasswordType === "password" ? (
                  <FaEye className="text-gray-500" />
                ) : (
                  <FaEyeSlash className="text-gray-500" />
                )}
              </button>
            </div>
            {formik.errors.passwordConfirm && formik.touched.passwordConfirm ? (
              <div className="text-red-600 mt-1 font-semibold">
                * {formik.errors.passwordConfirm}
              </div>
            ) : (
              ""
            )}
            {errorMsg && (
              <p className="text-red-600 font-semibold my-1">{errorMsg}</p>
            )}
            <div className="">
              <button
                type="submit"
                className="bg-black text-white py-2 px-4 w-full mb-4 rounded"
              >
                sign up
              </button>

              <div>
                Already have an account?{" "}
                <button
                  type="button"
                  className="underline  text-gray-600 inline-block "
                  onClick={handleShowlogin}
                >
                  Login
                </button>
              </div>
            </div>
            <div
              className=" absolute top-[10%] left-[90%] -translate-x-1/2 -translate-y-1/2 p-10 rounded-lg"
              onClick={toggleVisible}
            >
              <HiOutlineXMark className="text-2xl font-bold cursor-pointer" />
            </div>
          </form>
        </section>
      ) : (
        ""
      )}

      {showlogin && <Login onSwitchToLogin={handleShowlogin} />}
    </>
  );
}