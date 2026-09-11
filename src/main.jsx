import './setupErrorReporting.js' // MUST stay the first import — registers global error handlers before any other module is evaluated
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

// 1. Create a persistent query client instance
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Prevents aggressive background re-fetching when switching browser tabs
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
      {/* 2. Wrap your app component tree */}
      <QueryClientProvider client={queryClient}>
          <App />
      </QueryClientProvider>
  </StrictMode>,
)
