interface ITextAreaProps {
  placeholder?: string;
  name: string;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  classes?: string[];
  cols?: number;
  rows?: number;
}

const TextArea = (props: ITextAreaProps) => {
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
    <textarea
      cols={props.cols}
      rows={props.rows}
      name={props.name}
      id={props.name}
      placeholder={props.placeholder || ''}
      className={classNames.join(' ')}
      defaultValue={props.value}
      onChange={(e) => props.onChange(e.target.value)}
    >
    </textarea>
  );
};

export default TextArea;
