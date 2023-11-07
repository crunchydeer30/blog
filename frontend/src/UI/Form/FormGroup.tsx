interface FormGroupProps {
  children: React.ReactNode;
  classes?: string[];
}


const FormGroup = (props: FormGroupProps) => {
  const classNames = [
    'flex',
    'flex-col',
    'gap-2'
  ];
  
  if (props.classes?.length) {
    classNames.push(...props.classes);
  }

  return (
    <fieldset className={classNames.join(' ')}>
      {props.children}
    </fieldset>
  )
}

export default FormGroup