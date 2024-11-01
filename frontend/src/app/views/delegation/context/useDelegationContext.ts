import { useContext } from "react";
import DelegationContext from "./DelegationContext";


const useDelegationContext = () => {
    const context = useContext(DelegationContext)
    if (context === undefined) {
        throw new Error('useDelegationContext  must be used within a DelegationContextProvider');
      }
      return context;
}

export default useDelegationContext