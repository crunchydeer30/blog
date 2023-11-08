import LinkButton from "../../../UI/Elements/Button/LinkButton"

interface AuthPromptProps {
  children: React.ReactNode,
  classes?: string[],
}

const AuthPrompt = (props: AuthPromptProps) => {
  const classNames = [
    'flex',
    'flex-col',
    'gap-4',
    'max-w-[400px]',
    'mx-auto',
    'jusitfy-center',
    'items-center'
  ];

  if (props.classes) classNames.push(...props.classes);

  return (
    <section className={classNames.join(' ')}>
      {props.children}
      <LinkButton link="/signin" classes={['text-sm', '!w-fit']}>Sign In</LinkButton>
    </section>
  )
}

export default AuthPrompt