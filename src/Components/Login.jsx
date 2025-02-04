// Import necessary dependencies and assets
import { useState, useMemo } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { axiosClient } from "../services/axiosClient";
import LoginVideo from "../assets/videos/LoginVideo.mp4";
import hide from "../assets/images/hide.png";
import show from "../assets/images/show.png";
import logo from "../assets/images/deerlogo.png";
import EndPoints from "../services/EndPoints";
import Spinner from "../Components/Spinner";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setAuthData } from "../store/AppAuthSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ishide, setIsHide] = useState(true);
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    userInput: Yup.string()
      .required("Email is required")
      .test("userInput", "Invalid email address", (value) =>
        Yup.string().email().isValidSync(value)
      ),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      userInput: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setLoading(true);
        const endpoint = EndPoints.SUPERADMIN_LOGIN;

        const response = await axiosClient.post(endpoint, {
          email: values.userInput,
          password: values.password,
        });
        const { result } = response;

        if (response?.statusCode === 200) {
          localStorage.setItem("access_token", result?.accessToken);
          dispatch(setAuthData(result?.accessToken));
          toast.success("Login successful");
          resetForm();
          navigate("/");
        }
      } catch (e) {
        toast.error(e);
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen py-20 bg-[#fafafa] relative">
      <video
        className="fixed top-0 left-0 h-[700px] w-[720px] bg-[#fafafa] bg-blend-multiply object-cover"
        autoPlay
        loop
        muted
        src={LoginVideo}
        type="video/mp4"
      />
      <div className="flex flex-col lg:flex-row mx-auto overflow-hidden absolute top-1/2 left-[52%] transform -translate-y-1/2 right-0 z-10 w-[420px] h-[460px] bg-[#93a3b6]/15 backdrop-filter: blur(25px) rounded-3xl">
        <form onSubmit={formik.handleSubmit} className="w-full h-full">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#93a3b6]/10 bg-opacity-50 z-30">
              <Spinner />
            </div>
          )}
          <div className="text-[#0F4189] w-full px-[42px] py-4 justify-center">
            <h2 className="flex text-3xl mb-4 justify-center">
              <Link to="/" className="flex items-center">
                <img src={logo} alt="logo" className="size-12" />
              </Link>
            </h2>
            <h2 className="font-bold text-[24px]">Login</h2>
            <div className="mt-6 border-b border-[#686868]/60 w-full">
              <input
                className="py-1 px-2 w-full bg-transparent text-[#040320] placeholder-[#686868]/50 focus:outline-none"
                type="text"
                name="userInput"
                placeholder="Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userInput}
              />
            </div>
            {formik.touched.userInput && formik.errors.userInput && (
              <div className="text-red-500 text-xs">
                {formik.errors.userInput}
              </div>
            )}
            <div className="mt-6 relative border-b border-[#686868]/60 w-full">
              <input
                className="py-1 px-2 w-full bg-transparent text-[#040320] placeholder-[#686868]/50 focus:outline-none"
                type={ishide ? "password" : "text"}
                name="password"
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <img
                src={ishide ? hide : show}
                onClick={() => setIsHide(!ishide)}
                alt={ishide ? "Show Password" : "Hide Password"}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 cursor-pointer"
                style={{
                  filter:
                    "invert(41%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(90%) contrast(85%)",
                }}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-xs">
                  {formik.errors.password}
                </div>
              )}
            </div>
            <div className="text-white text-end text-sm mt-6">
              <Link to="/forgot-password" className="text-[#040320]/70">
                Forgot password?
              </Link>
            </div>
            <div className="mt-6">
              <button
                className="w-full py-1.5 text-center bg-[#0F4189] text-white font-poppins-bold rounded-lg disabled:opacity-50"
                type="submit"
                disabled={formik.isSubmitting}
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
}

export default Login;
