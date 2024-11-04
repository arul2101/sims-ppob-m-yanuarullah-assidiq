import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/apiAuth";
import { useCookies } from "next-client-cookies";

export function useUser() {
  const cookies = useCookies();
  const { data: user, isPending, error } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(cookies.get('session') as string)
  })

  return {
    user,
    isPending,
    error
  }
}
