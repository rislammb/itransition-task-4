interface ButtonProps extends React.ComponentProps<"button"> {
  text: string;
}

export default function Button({ text, ...restProps }: ButtonProps) {
  return (
    <button className="btn btn-primary" {...restProps}>
      {text}
    </button>
  );
}
