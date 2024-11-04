import { useMutation } from "@tanstack/react-query";
import { signup as signUpApi } from "@/services/apiAuth";

export function useSignUp() {
  const { mutate: signup, isPending, error, data } = useMutation({
    mutationFn: signUpApi,
  });

  return {
    signup,
    isPending,
    error,
    data
  };
}
