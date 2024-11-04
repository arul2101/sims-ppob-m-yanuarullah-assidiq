import { useMutation } from "@tanstack/react-query";
import { transaction as transactionApi } from "@/services/apiAuth";
import { useCookies } from "next-client-cookies";

export function useTransaction() {
  const cookies = useCookies();

  const { mutate: transaction, isPending, error, data } = useMutation({
    mutationFn: (type: string) => transactionApi(cookies.get('session') as string, type),
  });

  return {
    transaction,
    isPending,
    error,
    data
  };
}
