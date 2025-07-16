'use client'
import { useMutation, useQuery } from "@tanstack/react-query";
import { client } from "@/components/userClient";
import { toast } from "react-toastify";

type SuccessResponse = { success: boolean; message?: string };

export function useMyMutate<T extends SuccessResponse>(queryKey: string, queryFn: () => Promise<T>, closeDialog: React.Dispatch<React.SetStateAction<boolean>>) {
  return useMutation<T>({
    mutationFn: queryFn,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data?.message);
        client.invalidateQueries({ queryKey: [queryKey]})
        closeDialog(false)
         return
      }
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      toast.error("Error posting data.");
    },
  });
}

export function useMyQuery<T>(
  queryKey: string,
  queryFn: () => Promise<T>
) {
  return useQuery<T>({
    queryKey: [queryKey],
    queryFn,
  });
}
