import { useContext } from "react";
import RoleContext from "./RoleContext";

export const useRoleContextProps = () => {
    const context = useContext(RoleContext);
    if (context === undefined) {
      throw new Error('useCreateUserAccountContext must be used within a CreateUserAccountProvider');
    }
    return context;
  };

export default useRoleContextProps