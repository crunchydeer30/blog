interface InputLabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  classes?: string[];
}

const InputLabel = (props: InputLabelProps) => {
  const classNames = ['block'];

  if (props.classes) classNames.push(...props.classes);

  return (
    <label htmlFor={props.htmlFor} className={classNames?.join(' ')}>
      {props.children}
    </label>
  );
};

export default InputLabel;
