// import React from 'react';
import ReactDOM from "react-dom/client"
import App from "./App"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { MessageContextProvider } from "./MessageContext"
import { LoginContextProvider } from "./LoginContext"
import { BrowserRouter as Router } from "react-router-dom"
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
   <Router>
      <LoginContextProvider>
         <MessageContextProvider>
            <QueryClientProvider client={queryClient}>
               <App client={queryClient} />
            </QueryClientProvider>
         </MessageContextProvider>
      </LoginContextProvider>
   </Router>
)
