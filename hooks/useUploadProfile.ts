import { useMutation } from "@tanstack/react-query";
import { uploadFile as uploadImageApi } from "@/services/apiAuth";
import type { RequestUpdate } from "@/services/apiAuth";
import { useCookies } from "next-client-cookies";

export function useUploadProfile() {
  const cookies = useCookies();

  const { mutate: uploadImage, isPending, error, data } = useMutation({
    mutationFn: (fd: any) => uploadImageApi(cookies.get('session') as string, fd),
  });

  return {
    uploadImage,
    isPending,
    error,
    data
  };
}
