import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "@/services/apiAuth";

export function useLogin() {
  const { mutate: login, isPending, error, data } = useMutation({
    mutationFn: loginApi
  });

  return {
    data,
    login,
    isPending,
    error,
  };
}
