import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import ViewportContextProvider from './context/viewportContext';
import { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ViewportContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster position="top-center" reverseOrder={false} />
        <RouterProvider router={router} />
      </ViewportContextProvider>
    </QueryClientProvider>
  );
};

export default App;
