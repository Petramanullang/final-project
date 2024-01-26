import React from "react";

export const Arrow = () => {
  return (
    <div className="w-full flex justify-end">
      <button className="focus:outline-none focus:ring-2 ring-offset-2 focus:ring-gray-600 hover:opacity-75 mt-4 justify-end flex items-center cursor-pointer rounded-full bg-black p-3">
        <svg
          className=" text-white"
          xmlns="http://www.w3.org/2000/svg"
          width={20}
          height={20}
          viewBox="0 0 20 18"
          fill="none">
          <path
            d="M11.7998 1L18.9998 8.53662L11.7998 16.0732"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1 8.53662H19"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

const index = () => {
  return (
    <div>
      <div id="blog" className="bg-gray-100 px-4 xl:px-4 py-14">
        <div className="mx-auto container">
          <span role="contentinfo">
            <h1
              tabIndex={0}
              className="focus:outline-none text-center text-3xl lg:text-5xl tracking-wider text-gray-900">
              Latest from our Blog
            </h1>
          </span>
          <div
            tabIndex={0}
            aria-label="Group of cards"
            className="focus:outline-none mt-12 lg:mt-24">

              
            <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8">
              <div
                tabIndex={0}
                className="focus:outline-none"
                aria-label="card 1">
                <img
                  role="img"
                  aria-label="code editor"
                  tabIndex={0}
                  className="focus:outline-none w-full"
                  src="https://cdn.tuk.dev/assets/components/111220/Blg-6/blog(1).png"
                  alt="code editor"
                />
                <div className="bg-white px-10 py-6 rounded-bl-3xl rounded-br-3xl">
                  <h1
                    tabIndex={0}
                    className="focus:outline-none text-4xl text-gray-900 font-semibold tracking-wider">
                    Transactions
                  </h1>
                  <Arrow />
                </div>
              </div>


              <div>
                <div className="grid sm:grid-cols-1  gap-8">
                  <div
                    tabIndex={0}
                    className="focus:outline-none bg-white rounded-xl"
                    aria-label="card 2">
                    <img
                      tabIndex={0}
                      role="img"
                      aria-label="gaming"
                      className="focus:outline-none h-56 object-cover w-full rounded-xl"
                      src="https://cdn.tuk.dev/assets/components/111220/Blg-6/blog(2).png"
                      alt="games"
                    />
                    <div className="bg-white px-3 lg:px-6 py-4 rounded-bl-3xl rounded-br-3xl">
                      <h1
                        tabIndex={0}
                        className="focus:outline-none text-lg text-gray-900 font-semibold tracking-wider">
                        Transactions
                      </h1>
                    </div>
                  </div>
                  <div
                    tabIndex={0}
                    className="focus:outline-none h-96"
                    aria-label="card 3">
                    <img
                      tabIndex={0}
                      role="img"
                      aria-label="gaming"
                      className="focus:outline-none w-full h-56 rounded-t-xl object-cover"
                      src="https://cdn.tuk.dev/assets/components/111220/Blg-6/blog(3).png"
                      alt="notes"
                    />

                    <div className="bg-white px-3 lg:px-6 py-4 rounded-bl-3xl rounded-br-3xl">
                      <h1
                        tabIndex={0}
                        className="focus:outline-none text-lg text-gray-900 font-semibold tracking-wider">
                        Transactions
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
