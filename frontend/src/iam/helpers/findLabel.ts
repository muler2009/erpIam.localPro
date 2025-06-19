// Helper function to find the label based on the path
// export const findLabelByPath = (menuItems: any[], currentPath: string): string | undefined => {
//     for (const item of menuItems) {
//       // Check if it's the current path
//       if (currentPath.includes(item.path)) {
//         return item.label;
//       }
//       // If it has children, search within them
//       if (item.children) {
//         const childLabel = findLabelByPath(item.children, currentPath);
//         if (childLabel) return childLabel;
//       }
//     }
//     return undefined;
//   };




export const findLabelByPath = ( menuItems: any[], currentPath: string, parentLabel = '' ): string | undefined => {
  for (const item of menuItems) {
    // Check if current item matches the path
    if (currentPath.includes(item.path)) {
      return parentLabel ? `${parentLabel} > ${item.label}` : item.label;
    }
    
    // If it has children, search within them
    if (item.children) {
      const childLabel = findLabelByPath(
        item.children,
        currentPath,
        item.label // Pass current item's label as parent
      );
      if (childLabel) return childLabel;
    }
  }
  return undefined;
};

interface MenuItem {
  path: string;
  label: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
}

interface Breadcrumb {
  label: string;
  path: string;
}

export const findBreadcrumbs = (
  items: MenuItem[],
  pathParts: string[],
  basePath: string = '',
  crumbs: Breadcrumb[] = []
): Breadcrumb[] | null => {
  // Try to find matching item at current level
  for (const item of items) {
    const fullPath = `${basePath}/${item.path}`.replace(/\/+/g, '/');
    const itemPathParts = fullPath.split('/').filter(Boolean);

    // Check if this item's path matches the beginning of our target path
    if (pathParts.length >= itemPathParts.length && 
        pathParts.slice(0, itemPathParts.length).every((part, i) => part === itemPathParts[i])) {
      
      const newCrumbs = [...crumbs, { label: item.label, path: fullPath }];
      
      // If we've matched the complete path or item has no children
      if (pathParts.length === itemPathParts.length || !item.children) {
        return newCrumbs;
      }
      
      // Otherwise search children
      const childCrumbs = findBreadcrumbs(
        item.children,
        pathParts.slice(itemPathParts.length),
        fullPath,
        newCrumbs
      );
      
      if (childCrumbs) return childCrumbs;
    }
  }
  return null;
};