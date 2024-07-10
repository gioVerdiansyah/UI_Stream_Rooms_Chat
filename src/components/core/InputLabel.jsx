import InputComponent from "./Input";

export default function InputLabelComponent({
  type = "text",
  labelName,
  name,
  placeholder = "Type Here",
  labelClassName,
  inputClassName,
  onChangeEvent,
  defaultValue = "",
}) {
  return (
    <>
      <label
        htmlFor={name}
        className={labelClassName}
      >
        {labelName}
      </label>
      <InputComponent
        className={inputClassName}
        type={type}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChangeEvent}
      />
    </>
  );
}
