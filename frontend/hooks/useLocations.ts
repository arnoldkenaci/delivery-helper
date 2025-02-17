import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchLocations,
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

