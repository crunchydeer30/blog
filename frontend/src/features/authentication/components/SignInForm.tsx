import { useState } from "react"
import { Link } from "react-router-dom"

import useSignIn from "../hooks/useSignIn"
import FormGroup from "../../../UI/Form/FormGroup"
import InputLabel from "../../../UI/Form/InputLabel"
import Input from "../../../UI/Form/Input"
import Button from "../../../UI/Elements/Button/Button"

const SignInForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const signIn = useSignIn({redirect: true});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    signIn({ username, password });
  };

  return (
    <form
        className="flex-[0_1_400px] flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-2 text-center text-3xl font-semibold">Sign In</h1>
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

        <Button type="submit" onClick={handleSubmit}>
          Sign In
        </Button>

        <p className="text-secondary text-center text-lg mt-6">
          Don't have an account? <br />{' '}
          <Link to="/signup" className="text-primary font-bold">
            Sign up
          </Link>
        </p>
      </form>
  )
}

export default SignInForm