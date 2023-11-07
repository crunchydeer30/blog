import { useState } from "react";
import { Link } from "react-router-dom";

import useSignUp from "../hooks/useSignUp";
import FormGroup from "../../../UI/Form/FormGroup";
import Button from "../../../UI/Elements/Button/Button";
import Input from "../../../UI/Form/Input";
import InputLabel from "../../../UI/Form/InputLabel";

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');

  const signUp = useSignUp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmation) return;
    signUp({ username, email, password });
  };

  return (
    <form className="flex-[0_1_400px] flex flex-col gap-6">
      <h1 className="mb-2 text-center text-3xl font-semibold">Sign Up</h1>
      <FormGroup>
        <InputLabel htmlFor="username" classes={['text-lg text-secondary']}>
          Username
        </InputLabel>
        <Input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={setUsername}
          minLength={5}
        />
      </FormGroup>

      <FormGroup>
        <InputLabel htmlFor="email" classes={['text-lg text-secondary']}>
          Email
        </InputLabel>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={setEmail}
          minLength={1}
        />
      </FormGroup>

      <FormGroup>
        <InputLabel htmlFor="password" classes={['text-lg text-secondary']}>
          Password
        </InputLabel>
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={setPassword}
          minLength={5}
        />
      </FormGroup>

      <FormGroup>
        <InputLabel htmlFor="confirmation" classes={['text-lg text-secondary']}>
          Confirm Password
        </InputLabel>
        <Input
          type="password"
          name="confirmation"
          placeholder="Confirmation"
          value={confirmation}
          onChange={setConfirmation}
          minLength={5}
        />
      </FormGroup>

      <Button type="submit" onClick={handleSubmit}>
        Sign Up
      </Button>

      <p className="text-secondary text-center text-lg mt-6">
        Already have an account? <br />{' '}
        <Link to="/signin" className="text-primary font-bold">
          Sign In
        </Link>
      </p>
    </form>
  );
};

export default SignUpForm;
