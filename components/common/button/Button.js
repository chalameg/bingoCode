const Button = ({
  disabled,
  onClick,
  buttonText,
  icon = "",
  className = "",
  reverse = false,
}) => {
  return (
    <button
      disabled={disabled}
      className={`${className} flex align-center justify-center ${
        reverse ? "reverse" : ""
      }`}
      onClick={onClick}
    >
      {buttonText} {icon}
    </button>
  );
};
export default Button;
