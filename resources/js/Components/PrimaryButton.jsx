export default function PrimaryButton({ className, children, ...props }) {
    return (
        <button
            className={
                "bg-cyan-500 text-white inline-flex items-center px-4 py-2 justify-between gap-2 rounded-md font-semibold text-xs" +
                className
            }
            {...props}
        >
            {children}
        </button>
    );
}
