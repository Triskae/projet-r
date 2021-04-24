import classNames from "classnames";

type ButtonProps = {
  [prop: string]: any
}

const Button = ({...props}: ButtonProps) => {
  const buttonClasses = classNames(
    'w-full items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
    props.className
  )

  return (
    <button
      type="submit"
      className={buttonClasses}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
