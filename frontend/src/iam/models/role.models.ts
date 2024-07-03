export interface CreateRoleI {
    title: string;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface RoleInterface {
    role_name: string;
    role_created_at?: string | undefined;
    role_modified_at?: string | undefined; 
    action?: unknown;
  }