import { MenuItemInterface } from "./side-bar-interface";

export const menus: MenuItemInterface[] = [
    {
      label: "Dashboard",
      path: "/dms",
      children: [
        {
          label: "Overview",
          path: "dashboard"
        },
        {
          label: "Recent Activities",
          path: "activities"
        }
      ]
    },
    {
      label: "Document Management",
      path: "profile",
      children: [
        {
          label: "Document Library",
          path: "document-library",
          children: [
            {
              label: "Upload Document",
              path: "upload"
            },
            {
              label: "Shared Document",
              path: "upload"
            }
          ]
          
        },
        {
          label: "Upload Document",
          path: "upload"
        },
        {
          label: "Shared Document",
          path: "upload"
        }
      ]
    },
    {
      label: "Search",
      path: "search",
      children: [
        {
          label: "basic search",
          path: "basic-search"
        },
        {
          label: "Advanced search",
          path: "advanced-search"
        }

      ]
    },
    {
      label: "Work Flow",
      path: "work-flow",
      children: [
        {
          label: "Pending Approvals",
          path: "pending-approvals"
        },
        {
           label: "Requested Approvals",
          path: "requested-approvals"
        }
      ]
    }
          
  ];
  
  export default menus;