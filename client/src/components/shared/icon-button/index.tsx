export default function IconButton({
  children,
  className,
  ...pestProps
}: React.ComponentProps<"button">) {
  return (
    <button className={`btn ${className}`} {...pestProps}>
      {children}
    </button>
  );
}
