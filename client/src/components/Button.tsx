interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> =({
    children,
    onClick,
    variant = "primary",
}) => {
    const styles = variant === "primary"
    ? "bg-black text-white"
    : "border border-black text-black";

    return(
        <button
            onClick={onClick}
            className={`${styles} px-6 py-3 rounded-lg font-medium hover:opacity-90 transition`}
        >
            {children}
        </button>
    );
};

export default Button;