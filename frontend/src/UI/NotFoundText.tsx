interface NotFoundTextProps {
  children: React.ReactNode;
  classes?: string[];
}

const NotFoundText = (props: NotFoundTextProps) => {
  const classNames = ['text-secondary', 'text-xl'];
  if (props.classes) classNames.push(...props.classes);

  return <p className={classNames.join(' ')}>{props.children}</p>;
};

export default NotFoundText;
