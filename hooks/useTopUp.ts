import { useMutation } from "@tanstack/react-query";
import { topup as topupApi } from "@/services/apiAuth";
import { useCookies } from "next-client-cookies";

export function useTopUp() {
  const cookies = useCookies();

  const { mutate: topup, isPending, error, data } = useMutation({
    mutationFn: (request: { top_up_amount: number }) => topupApi(cookies.get('session') as string, request),
  });

  return {
    topup,
    isPending,
    error,
    data
  };
}
