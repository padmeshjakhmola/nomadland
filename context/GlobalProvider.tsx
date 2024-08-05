"use client";

import { GlobalContextType, GlobalProviderProps, Post } from "@/types";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";

const GlobalContext = createContext<GlobalContextType | null>(null);
export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [post, setPost] = useState<Post[]>([]);
  const [sharedDataButton, setSharedDataButton] = useState<boolean>(true);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL as string, {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("Connected to the backend");
    });

    socket.on("new_post", (posts) => {
      //   console.log("Created post...", posts);
      setPost(posts);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected");
    });

    setSocket(socket);

    return () => {
      socket.disconnect();
      console.log("User_disconnected");
    };
  }, []);

  const contextValue = {
    isLoading,
    socket,
    post,
    setPost,
    sharedDataButton,
    setSharedDataButton,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
