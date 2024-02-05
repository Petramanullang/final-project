import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export const inputStyle = () => {
  return "peer h-full w-full rounded-md border border-white lg:border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-white lg:text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-white lg:placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-white lg:placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-white lg:focus:border-blue-400 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-white lg:disabled:bg-blue-gray-50";
};

export const labelStyle = () => {
  return "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-white lg:text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-white lg:before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-white lg:after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-white lg:peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white lg:peer-focus:text-blue-400 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-white lg:peer-focus:before:!border-blue-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-white lg:peer-focus:after:!border-blue-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 peer-active:bg-white";
};

export const buttonStyle = () => {
  return "mt-6 block w-1/2 mx-auto select-none rounded-lg bg-gradient-to-tr from-blue-500 to-blue-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md transition-all active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none";
};

const apiUrl = process.env.NEXT_PUBLIC_API as string;
const apiKey = process.env.NEXT_PUBLIC_API_TOKEN as string;

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setpasswordRepeat] = useState("");
  const [role, setRole] = useState("");
  // const [picture, setPicture] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (password.length < 6 || passwordRepeat.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (password !== passwordRepeat) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/register`,
        { email, password, passwordRepeat, name, role, profilePicture, phone },
        {
          headers: {
            apiKey: `${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );
      router.push("/login");
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

  const handlePictureChange = (e: any) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  return (
    <>
      <div className="bg-auth-image bg-cover h-[150vh] lg:h-auto brightness-95 lg:bg-none">
        <div className="h-screen flex">
          {/* Login Image */}
          <div className="hidden lg:flex w-1/2 bg-auth-image bg-cover justify-around pt-20 z-10">
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

          {/* Register Form */}
          <div className="bg-transparent flex mx-auto w-5/6 lg:w-1/2 justify-center items-center mt-64 lg:mt-0">
            <form className="mt-8 mb-10 w-[600px] " onSubmit={handleSubmit}>
              <img
                alt="logo"
                src="/img/plane.png"
                width={500}
                height={500}
                style={{ width: "200px", height: "auto" }}
                className="hidden lg:block absolute top-16 right-0 z-20"
              />
              <h1 className="text-5xl font-bold text-white lg:text-blue-400 text-center mb-10">
                REGISTER
              </h1>
              <div className="mb-4 grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="relative h-11 w-full min-w-[200px]">
                  <input
                    type="email"
                    className={inputStyle()}
                    placeholder=" "
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className={labelStyle()}>Email</label>
                </div>
                <div className="relative h-11 w-full min-w-[200px]">
                  <input
                    type="text"
                    className={inputStyle()}
                    placeholder=" "
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label className={labelStyle()}>Name</label>
                </div>
                <div className="relative h-11 w-full min-w-[200px]">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="on"
                    className={inputStyle()}
                    placeholder=" "
                  />
                  <label className={labelStyle()}>Password</label>
                  <div
                    className="absolute right-3 top-3 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <EyeSlashIcon className="h-6 w-6 text-blue-400" />
                    ) : (
                      <EyeIcon className="h-6 w-6 text-blue-400" />
                    )}
                  </div>
                </div>
                <div className="relative h-11 w-full min-w-[200px]">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setpasswordRepeat(e.target.value)}
                    autoComplete="on"
                    className={inputStyle()}
                    placeholder=" "
                  />
                  <label className={labelStyle()}>Password Repeat</label>
                  <div
                    className="absolute right-3 top-3 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <EyeSlashIcon className="h-6 w-6 text-blue-400" />
                    ) : (
                      <EyeIcon className="h-6 w-6 text-blue-400" />
                    )}
                  </div>
                </div>
                <div className="relative h-11 w-full min-w-[200px]">
                  <input
                    type=""
                    className={inputStyle()}
                    placeholder=" "
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <label className={labelStyle()}>Role</label>
                </div>
                <div className="relative h-11 w-full min-w-[200px]">
                  <input
                    type="text"
                    className={inputStyle()}
                    placeholder=" "
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <label className={labelStyle()}>Phone Number</label>
                </div>
                <div className="relative h-11 w-full min-w-[200px]">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePictureChange}
                  />
                </div>
              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <button
                className={buttonStyle()}
                type="submit"
                data-ripple-light="true">
                Register
              </button>
              <p className="mt-4 block text-center font-sans text-base font-normal leading-relaxed text-white lg:text-gray-700 antialiased">
                Already have an account?
                <Link
                  className="font-semibold text-blue-400 transition-colors hover:text-blue-600"
                  href="../login">
                  Sign In
                </Link>
              </p>
            </form>

            <img
              alt="logo"
              src="/img/building1.png"
              width={200}
              height={200}
              className="hidden lg:block absolute bottom-0 left-[42rem] w-56"
            />
            <img
              alt="logo"
              src="/img/building2.png"
              width={200}
              height={200}
              style={{ width: "200px", height: "auto" }}
              className="hidden lg:block absolute bottom-0 right-0 z-10"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
