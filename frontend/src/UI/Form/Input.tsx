interface InputProps {
  type: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  value: string;
  name: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  classes?: string[];
  minLength?: number;
  maxLength?: number;
}

const Input = (props: InputProps) => {
  const classNames = [
    'block',
    'py-2',
    'px-4',
    'w-full',
    'border',
    'border-gray-300',
    'rounded-lg',
  ];

  if (props.classes) classNames.push(...props.classes);

  return (
    <input
      type={props.type}
      value={props.value}
      name={props.name}
      id={props.name}
      placeholder={props.placeholder || ''}
      className={classNames?.join(' ')}
      onChange={(e) => props.onChange(e.target.value)}
      minLength={props.minLength}
      maxLength={props.maxLength}
    />
  );
};

export default Input;
