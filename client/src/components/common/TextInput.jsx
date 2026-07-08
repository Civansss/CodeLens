function TextInput({
  label,
  type,
  placeholder,
  value,
  onChange,
  children,
}) {
  return (
    <div className="mb-5">
      <label className="block mb-2 font-medium">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      />

      {children}
    </div>
  );
}

export default TextInput;