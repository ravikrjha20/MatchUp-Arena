import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useAuthStore from "./store/useAuthStore";
import router from "./Router";
// Tanstack Query client setup
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 5 * 10, // 50 seconds
    },
  },
});

const App = () => {
  const { checkAuth, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
