// import React from 'react';
import ReactDOM from "react-dom/client"
import App from "./App"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { MessageContextProvider } from "./MessageContext"
import { LoginContextProvider } from "./LoginContext"
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
   <LoginContextProvider>
      <MessageContextProvider>
         <QueryClientProvider client={queryClient}>
            <App client={queryClient} />
         </QueryClientProvider>
      </MessageContextProvider>
   </LoginContextProvider>
)
