import { HtmlHTMLAttributes, ReactNode } from "react";

interface IButton extends HtmlHTMLAttributes<HTMLButtonElement>{
    className: string,
    children: ReactNode,
    width?: "w-full" | "w-fit"
}

const Button = ({className, children, width = "w-full", ...rest}: IButton) => {
    return (
<button className={`${className} rounded-md ${width} text-white transition`} {...rest}>{children}</button>
    );
}

export default Button;
