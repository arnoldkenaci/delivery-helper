import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchLocations,
  postLocation,
  updateLocation,
  Location,
} from "@/api/apiService";

// ✅ Fetch all locations (GET)
export const useFetchLocations = () => {
  return useQuery<Location[], Error>({
    queryKey: ["locations"],
    queryFn: fetchLocations,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};

// ✅ Post a new location (POST)
export const usePostLocation = () => {
  const queryClient = useQueryClient();

  return useMutation(postLocation, {
    onSuccess: () => {
      queryClient.invalidateQueries(["locations"]); // Refetch locations after adding a new one
    },
  });
};

// ✅ Update an existing location (PUT)
export const useUpdateLocation = () => {
  const queryClient = useQueryClient();

  return useMutation(updateLocation, {
    onSuccess: () => {
      queryClient.invalidateQueries(["locations"]); // Refetch locations after updating
    },
  });
};
