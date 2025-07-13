function Card({ title, children, className = "" }) {
  return (
    <div className={`bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 border dark:border-gray-700 
                  transition-all duration-300 ease-in-out transform hover:scale-[1.02] 
                  opacity-0 animate-fade-in ${className}`}>
      {title && <h2 className="text-lg font-semibold mb-2">{title}</h2>}
      {children}
    </div>
  );
}

export default Card;
