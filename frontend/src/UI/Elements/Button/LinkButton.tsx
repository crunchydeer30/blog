import { Link } from 'react-router-dom';
import { ButtonStyle } from './types';
import { buttonStyles as styles } from './buttonStyles';

interface ILinkButtonProps {
  children: React.ReactNode;
  link: string;
  classes?: string[];
  style?: ButtonStyle;
}

const LinkButton = (props: ILinkButtonProps) => {
  const classNames = styles(props.style);

  if (props.classes) classNames.push(...props.classes);

  return (
    <Link to={props.link} className={classNames.join(' ')}>
      {props.children}
    </Link>
  );
};



export default LinkButton;
