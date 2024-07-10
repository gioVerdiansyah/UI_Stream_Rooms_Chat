import { twMerge } from "tailwind-merge";

export default function InputComponent({
  type = "text",
  name,
  placeholder = "Type Here",
  className,
  defaultValue,
  ...props
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      id={name}
      value={defaultValue}
      className={twMerge(
        "input rounded-lg input-bordered w-full px-10",
        className
      )}
      {...props}
    />
  );
}
