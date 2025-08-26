import Link from "next/link";
import React from "react";

type propTypes = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  size?: "default" | "icon";
  type?: "button" | "submit" | "reset";
  href?: string;
  onClick?: () => void;
  additionalClasses?: string;
  disabled?: boolean;
};
const Button = ({
  children,
  variant = "primary",
  size = "default",
  type = "button",
  href,
  onClick,
  additionalClasses,
  disabled = false,
}: propTypes) => {
  const classNames = `text-base font-semibold flex items-center gap-1.5 justify-center cursor-pointer mb-2 ${
    size === "icon" ? "p-2" : "py-2 px-4"
  } ${
    variant === "danger"
      ? "bg-background border-2 focus:outline-2 focus:outline-dashed border-slack-red text-slack-red"
      : variant === "secondary"
      ? "bg-background border-2 focus:outline-2 focus:outline-dashed border-slack-purple text-slack-purple"
      : "bg-slack-purple/90 text-white hover:bg-slack-purple border-2 focus:outline-2 focus:outline-dashed border-slack-purple disabled:bg-gray-400 disabled:cursor-not-allowed disabled:border-gray-400 disabled:focus:outline-none"
  } ${additionalClasses}`;

  if (href) {
    return (
      <Link href={href} className={classNames}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classNames}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
