import { useMutation } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "@/services/apiAuth";
import type { RequestUpdate } from "@/services/apiAuth";
import { useCookies } from "next-client-cookies";

export function useUpdateUser() {
  const cookies = useCookies();

  const { mutate: updateUser, isPending, error, data } = useMutation({
    mutationFn: (request: RequestUpdate) => updateUserApi(cookies.get('session') as string, request),
  });

  return {
    updateUser,
    isPending,
    error,
    data
  };
}
