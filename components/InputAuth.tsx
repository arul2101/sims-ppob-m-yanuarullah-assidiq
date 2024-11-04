import React, { ComponentPropsWithoutRef, FC } from "react";

type InputAuthProps = ComponentPropsWithoutRef<"input"> & {
  // type?: React.HTMLInputTypeAttribute;
  // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactNode;
  state: string;
  // placeholder: string;
  // rest: React.InputHTMLAttributes<HTMLInputElement>;
};

const InputAuth: FC<InputAuthProps> = ({
  // type,
  // onChange,
  state,
  icon,
  // placeholder,
  ...props
}) => {
  return (
    <>
      <input
        // type={type}
        // className="w-full h-[42px] focus:outline-none border border-[#b3b3b1] rounded-sm py-2 pl-9 placeholder:text-[.8rem] focus:text-[.8rem] text-[.8rem]"
        // placeholder={placeholder}
        // onChange={onChange}
        // value={state}
        {...props}
      />
      <div
        className={`${
          state != "" ? "text-black" : "text-[#b3b3b1]"
        } absolute top-3.5 left-3`}
      >
        {icon}
      </div>
    </>
  );
};

export default InputAuth;
