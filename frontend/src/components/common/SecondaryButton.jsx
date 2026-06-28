const SecondaryButton = ({
  children,
  type = "button",
  onClick,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        rounded-lg
        border
        border-blue-600
        bg-white
        px-5
        py-2.5
        text-sm
        font-semibold
        text-blue-600
        transition-all
        duration-300
        hover:bg-blue-600
        hover:text-white
        active:scale-95
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
