const variantClasses = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

function Button({ children, onClick, variant = "primary", className = "", ...props }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded font-medium transition ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
