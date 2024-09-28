interface InputProps extends React.ComponentProps<"input"> {
  label: string;
}

export default function Input({ label, name, ...restProps }: InputProps) {
  return (
    <div className="form-group my-4">
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} className="form-control" {...restProps} />
    </div>
  );
}
