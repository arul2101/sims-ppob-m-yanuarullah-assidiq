import { useQuery } from "@tanstack/react-query";
import { getBanner } from "@/services/apiAuth";
import { useCookies } from "next-client-cookies";

export function useBanner() {
  const cookies = useCookies();
  const { data: banner, isPending, error } = useQuery({
    queryKey: ["banner"],
    queryFn: () => getBanner(cookies.get('session') as string)
  })

  return {
    banner,
    isPending,
    error
  }
}