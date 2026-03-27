import { initSatellite } from "@junobuild/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

BigInt.prototype.toJSON = function () { 
  return this.toString();
};

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

const queryClient = new QueryClient();

// Wrap everything in an async function to initialize Juno first
const init = async () => {
  await initSatellite();

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
  );
};

// Fire it up!
init();
