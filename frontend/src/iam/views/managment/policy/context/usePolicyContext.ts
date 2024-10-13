import { useContext } from "react";
import PolicyContext from "./PolicyContext";

export const usePolicyContext = () => {
    const context = useContext(PolicyContext);
    if (context === undefined) {
      throw new Error('useCreateUserAccountContext must be used within a CreateUserAccountProvider');
    }
    return context;
  };