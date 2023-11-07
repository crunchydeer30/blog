import { ButtonStyle } from "./types";
import { buttonStyles as styles } from "./buttonStyles";

interface IButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  classes?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (() => void )| ((e: any) => void);
  style?: ButtonStyle;
}

const Button = (props: IButtonProps) => {
  const classNames = styles(props.style);

  if (props.classes) classNames.push(...props.classes);

  return (
    <button
      onClick={props?.onClick}
      className={classNames.join(' ')}
      type={props?.type || 'button'}
    >
      {props.children}
    </button>
  );
};



export default Button;
