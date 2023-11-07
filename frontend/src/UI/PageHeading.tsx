interface IPageHeadingProps {
  children: React.ReactNode;
  classes?: string[];
}

const PageHeading = (props: IPageHeadingProps) => {
  const classNames = ['text-3xl', 'mb-8'];
  if (props.classes) classNames.push(...props.classes);

  return <h1 className={classNames.join(' ')}>{props.children}</h1>;
};

export default PageHeading;
