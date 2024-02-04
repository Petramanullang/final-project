export const Arrow = ({ customStyle, onClick }: any) => {
  return (
    <div className="w-full flex justify-end">
      <button
        onClick={onClick}
        className={`focus:outline-none focus:ring-2 ring-offset-2 focus:ring-gray-600 hover:opacity-75 justify-end flex items-center cursor-pointer rounded-full bg-black p-3 size-fit ${customStyle}`}>
        <svg
          className=" text-white"
          xmlns="http://www.w3.org/2000/svg"
          width={15}
          height={15}
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
