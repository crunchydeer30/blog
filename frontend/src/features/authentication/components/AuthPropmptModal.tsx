import StatelessModal from '../../../UI/Elements/Modal/StatelessModal';
import LinkButton from '../../../UI/Elements/Button/LinkButton';
import { ButtonStyle } from '../../../UI/Elements/Button/types';
import { useNavigate } from 'react-router-dom';

const AuthPropmptModal = () => {
  const navigate = useNavigate();

  return (
    <StatelessModal>
      <section className="flex flex-col gap-8 sm:max-w-[350px]">
        <div className="flex justify-center w-full">
          <img src="/icons/logo.png" alt="logo" />
        </div>
        <h1 className="text-center font-semibold text-3xl">
          Sign In to continue
        </h1>
        <p className="text-center text-lg">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </p>
        <section className="flex flex-col gap-4 mt-8">
          <LinkButton link="/signin" classes={['!rounded-3xl']}>Sign In</LinkButton>
          <LinkButton link="/signup" classes={['!rounded-3xl']} style={ButtonStyle.SECONDARY}>
            Sign Up
          </LinkButton>
          <button
            onClick={() => navigate(-1)}
            className="text-secondary font-semibold transition hover:text-primary"
          >
            Go Back
          </button>
        </section>
      </section>
    </StatelessModal>
  );
};

export default AuthPropmptModal;
