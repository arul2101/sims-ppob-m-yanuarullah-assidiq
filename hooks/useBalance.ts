import { useQuery } from "@tanstack/react-query";
import { getBalance } from "@/services/apiAuth";
import { useCookies } from "next-client-cookies";

export function useBalance() {
  const cookies = useCookies();
  const { data: balance, isPending, error } = useQuery({
    queryKey: ["balance"],
    queryFn: () => getBalance(cookies.get('session') as string)
  })

  return {
    balance,
    isPending,
    error
  }
}