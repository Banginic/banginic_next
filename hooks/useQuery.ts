"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { client } from "@/components/userClient";
import { toast } from "react-toastify";
import { ApiResponse } from '@/models/types'


export function useMyMutate<T extends ApiResponse>(
  queryKey: string,
  queryFn: () => Promise<T>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  clearForm?: () => void,
) {
  return useMutation<T>({
    mutationFn: queryFn,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data?.message);
        client.invalidateQueries({ queryKey: [queryKey] });
        if( clearForm){
          clearForm()
        }
        return;
      }
     setError(data?.error)
      
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      toast.error("Error posting data.");
    },
  });
}

export function useMyQuery<T>(queryKey: string, queryFn: () => Promise<T>) {
  return useQuery<T>({
    queryKey: [queryKey],
    queryFn,
  });
}
