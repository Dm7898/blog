function Button({ children, className = "", type = "button", ...props }) {
  return (
    <button className={`px-2 py-2 ${className}`} type={type} {...props}>
      {children}
    </button>
  );
}

export default Button;