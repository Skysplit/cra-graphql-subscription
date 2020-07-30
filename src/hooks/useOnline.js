import { useEvent } from "react-use";
import { useState } from "react";

export function useOnline() {
  const [isOnline, setOnline] = useState(navigator.onLine);
  const handleNetworkChange = () => setOnline(navigator.onLine);

  useEvent("online", handleNetworkChange);
  useEvent("offline", handleNetworkChange);

  return { isOnline, isOffline: !isOnline };
}
