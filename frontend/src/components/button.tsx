import React from "react";

import Spinner from "../assets/icons/spinner";
import { cn } from "../utils/tailwind";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  outline?: boolean;
  loading?: boolean;
}

const Button: React.FC<Props> = ({
  outline = false,
  loading = false,
  disabled,
  children,
  className,
  ...rest
}) => {
  const classes = outline
    ? "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
    : "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2";

  return (
    <button
      {...rest}
      className={className ? cn(classes, className) : classes}
      disabled={disabled || loading}
    >
      {loading ? (
        <>
          <Spinner className='inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600' />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
