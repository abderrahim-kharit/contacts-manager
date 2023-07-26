export default function CancelButton({
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-4 py-2 border outline-none rounded-md font-semibold text-xs text-gray-800 uppercase tracking-widest ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
