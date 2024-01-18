import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

const inputStyle = () => {
  return "peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50";
};

const labelStyle = () => {
  return "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500";
};

const apiUrl = process.env.NEXT_PUBLIC_API_REGISTER as string;
const apiKey = process.env.NEXT_PUBLIC_API_TOKEN as string;

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setpasswordRepeat] = useState("");
  const [role, setRole] = useState("");
  const [picture, setPicture] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // if (password.length < 6 || passwordRepeat.length < 6) {
    //   setError("Password must be at least 6 characters long");
    //   return;
    // }

    if (password !== passwordRepeat) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        apiUrl,
        { email, password, passwordRepeat, name, role, picture, phone },
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

  return (
    <>
      <div>
        <div className="h-screen md:flex">
          <div className="relative overflow-hidden md:flex w-full bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
            <div>
              <h1 className="text-white font-bold text-4xl font-sans">
                GoFinance
              </h1>
              <p className="text-white mt-1">
                The most popular peer to peer lending at SEA
              </p>
            </div>
            <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
            <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
            <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
            <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
          </div>
          <div className="flex md:w-full justify-center items-center bg-white">
            <form className="mt-8 mb-2 w-[600px]" onSubmit={handleSubmit}>
              <div className="mb-4 grid grid-cols-2 gap-5">
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
                    type="password"
                    className={inputStyle()}
                    placeholder=" "
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className={labelStyle()}>Password</label>
                </div>
                <div className="relative h-11 w-full min-w-[200px]">
                  <input
                    type="password"
                    className={inputStyle()}
                    placeholder=" "
                    onChange={(e) => setpasswordRepeat(e.target.value)}
                  />
                  <label className={labelStyle()}>Password Repeat</label>
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
                    type="url"
                    className={inputStyle()}
                    placeholder=" "
                    onChange={(e) => setPicture(e.target.value)}
                  />
                  <label className={labelStyle()}>Profile Picture</label>
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
              </div>
              <div className="inline-flex items-center">
                <label
                  className="relative -ml-2.5 flex cursor-pointer items-center rounded-full p-3"
                  htmlFor="checkbox"
                  data-ripple-dark="true">
                  <input
                    type="checkbox"
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:bg-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
                    id="checkbox"
                  />
                  <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth={1}>
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </label>
                <label
                  className="mt-px cursor-pointer select-none font-light text-gray-700"
                  htmlFor="checkbox">
                  <p className="flex items-center font-sans text-sm font-normal leading-normal text-gray-700 antialiased">
                    I agree the
                    <Link
                      className="font-semibold transition-colors hover:text-pink-500"
                      href="#">
                      &nbsp;Terms and Conditions
                    </Link>
                  </p>
                </label>
              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <button
                className="mt-6 block w-full select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="submit"
                data-ripple-light="true">
                Register
              </button>
              <p className="mt-4 block text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                Already have an account?
                <Link
                  className="font-semibold text-pink-500 transition-colors hover:text-blue-700"
                  href="../login">
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
