import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import apiAuth from "../api/apiAuth";
import { SignUpCredentials } from "../types";
import useSignIn from "./useSignIn";
import { errorToats } from "../../../utils";

const useSignUp = () => {
  const signInMutation = useSignIn({redirect: false});
  const navigate = useNavigate();

  const {mutate: signUp} = useMutation({
    mutationFn: async (credentails: SignUpCredentials) => {
      await apiAuth.signUp(credentails);
      signInMutation({username: credentails.username, password: credentails.password});
      navigate('/profile/edit');
    },
    onSuccess: () => {
      toast.success('Account created');
      toast.success('Please edit your profile');
    },
    onError: (e) => {
      errorToats(e);
    }
  })

  return signUp;
}

export default useSignUp;