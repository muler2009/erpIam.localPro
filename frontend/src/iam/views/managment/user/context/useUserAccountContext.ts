import { useContext } from "react";
import UserAccountContext from "./UserAccountContext";

export const useUserAccountContext = () => {
    const context = useContext(UserAccountContext);
    if (context === undefined) {
      throw new Error('useCreateUserAccountContext must be used within a CreateUserAccountProvider');
    }
    return context;
  };