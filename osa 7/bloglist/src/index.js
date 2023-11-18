// import React from 'react';
import ReactDOM from "react-dom/client"
import App from "./App"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { MessageContextProvider } from "./MessageContext"
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
   <MessageContextProvider>
      <QueryClientProvider client={queryClient}>
         <App client={queryClient} />
      </QueryClientProvider>
   </MessageContextProvider>
)
