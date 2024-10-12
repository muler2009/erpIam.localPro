// Helper function to find the label based on the path
export const findLabelByPath = (menuItems: any[], currentPath: string): string | undefined => {
    for (const item of menuItems) {
      // Check if it's the current path
      if (currentPath.includes(item.path)) {
        return item.label;
      }
      // If it has children, search within them
      if (item.children) {
        const childLabel = findLabelByPath(item.children, currentPath);
        if (childLabel) return childLabel;
      }
    }
    return undefined;
  };