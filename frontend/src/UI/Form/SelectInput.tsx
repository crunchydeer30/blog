interface SelectInputProps {
  children: React.ReactNode;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  classes?: string[];
}

const SelectInput = (props: SelectInputProps) => {
  const classNames = [
    'bg-white',
    'border',
    'border-lightgray',
    'text-primary',
    'text-lg',
    'rounded-lg',
    'w-full',
    'py-3',
    'px-2',
  ];

  if (props.classes) classNames.push(...props.classes);

  return (
    <select
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      className={classNames.join(' ')}
    ></select>
  );
};

export default SelectInput;
