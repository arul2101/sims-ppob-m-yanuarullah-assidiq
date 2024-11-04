import { useQuery } from "@tanstack/react-query";
import { getServices } from "@/services/apiAuth";
import { useCookies } from "next-client-cookies";

export function useServices() {
  const cookies = useCookies();
  const { data: services, isPending, error } = useQuery({
    queryKey: ["services"],
    queryFn: () => getServices(cookies.get('session') as string)
  })

  return {
    services,
    isPending,
    error
  }
}