import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const apiUrl = process.env.NEXT_PUBLIC_API as string;
const apiKey = process.env.NEXT_PUBLIC_API_TOKEN as string;

export const inputStyle = () => {
  return "peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-400 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50";
};

export const labelStyle = () => {
  return "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-400 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500";
};

export const buttonStyle = () => {
  return "mt-6 block w-full select-none rounded-lg bg-gradient-to-tr from-blue-500 to-blue-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md transition-all active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none";
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/login`,
        { email, password },
        {
          headers: {
            apiKey: `${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );
      router.push("/");
      localStorage.setItem("accessToken", response.data.token);
      console.log(response.data);
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401) {
          setError("Invalid API KEY");
        } else {
          setError(
            error.response.data.message || "An unexpected error occurred"
          );
        }
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <>
      <div>
        <div className="h-screen flex">
          <div className="flex w-1/2 bg-auth-image bg-cover justify-around pt-20 z-10">
            <div className="flex flex-col items-center">
              <h1 className="text-white text-center font-bold text-4xl font-sans">
                DESTINITFY
              </h1>
              <p className="text-white text-center mt-1 w-3/4 font-cabinet-grotesk-bold">
                Travel is the only purchase that enriches you in ways beyond
                material wealth
              </p>
            </div>
          </div>

          {/* Login Form */}
          <div className="flex w-1/2 justify-center items-center bg-white">
            <form
              className="mt-8 mb-20 w-80 max-w-screen-lg sm:w-96"
              onSubmit={handleSubmit}>
              <div className="mb-4 flex flex-col gap-6">
                <Image
                  alt="logo"
                  src="/img/plane.png"
                  width={500}
                  height={500}
                  style={{ width: "200px", height: "auto" }}
                  className="absolute top-16 right-0 z-20"
                />
                <h1 className="text-5xl font-bold text-blue-400 text-center">
                  WELCOME
                </h1>
                <p className="text-sm text-gray-500 text-center">
                  Login with email
                </p>
                <div className="relative h-11 w-full min-w-[200px]">
                  <input
                    type="text"
                    value={email}
                    autoComplete="on"
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputStyle()}
                    placeholder=" "
                  />
                  <label className={labelStyle()}>Email</label>
                </div>
                <div className="relative h-11 w-full min-w-[200px]">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="on"
                    className={inputStyle()}
                    placeholder=" "
                  />
                  <label className={labelStyle()}>Password</label>
                </div>
              </div>
              <div className="flex justify-end items-center">
                <Link
                  href="#"
                  className="text-sm text-gray-500 hover:text-red-400">
                  Forgot Password?
                </Link>
              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <button
                className={buttonStyle()}
                type="submit"
                data-ripple-light="true">
                Login
              </button>
              <p className="mt-4 block text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                Dont have an account?
                <Link
                  className="font-semibold text-blue-400 transition-colors hover:text-blue-600"
                  href="../register">
                  Register here
                </Link>
              </p>
            </form>
            <Image
              alt="logo"
              src="/img/building1.png"
              width={200}
              height={200}
              className="absolute bottom-0 left-[42rem] w-56"
            />
            <Image
              alt="logo"
              src="/img/building2.png"
              width={200}
              height={200}
              style={{ width: "200px", height: "auto" }}
              className="absolute bottom-0 right-0 z-10"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
