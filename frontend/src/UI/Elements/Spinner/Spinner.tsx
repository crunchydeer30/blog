interface ISpinnerProps {
  classes?: string[];
  icon?: string;
}

const Spinner = (props: ISpinnerProps) => {
  const classNames = ['animate-spin', 'w-8', 'h-8'];

  if (props.classes) classNames.push(...props.classes);

  return (
    <div className="flex items-center justify-center py-6">
      <svg className={classNames.join(' ')}>
        <use
          href={`/icons/sprite.svg#icon-${props.icon ? props.icon : 'spinner'}`}
        />
      </svg>
    </div>
  );
};

export default Spinner;
