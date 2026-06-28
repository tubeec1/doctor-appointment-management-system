const PrimaryButton = ({
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
        bg-blue-600
        px-5
        py-2.5
        text-sm
        font-semibold
        text-white
        transition-all
        duration-300
        hover:bg-blue-700
        active:scale-95
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
