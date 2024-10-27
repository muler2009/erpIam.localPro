import React from 'react'
import { FolderDataInterface } from '../../../models/folder-models';
import useFolderExplorerActions from '../../../hooks/useFolderExplorerActions';

interface BreadcrumbsProps {
  folder_data: FolderDataInterface;
}
const FileExplorerIndicator = ({ folder_data }: BreadcrumbsProps) => {
  const { currentPath, setCurrentPath } = useFolderExplorerActions(folder_data);

  const getBreadcrumbs = () => {
    let breadcrumbs = [folder_data];
    let current = folder_data;
    for (const id of currentPath) {
      const nextFolder = current.subfolder?.find(folder => folder.folder_identifier === id);
      if (nextFolder) {
        breadcrumbs.push(nextFolder);
        current = nextFolder;
      } else {
        break;
      }
    }
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  console.log('currentPath:', currentPath);
  console.log('breadcrumbs:', breadcrumbs);
  console.log('folder_data:', folder_data);

  return (
    <div className="breadcrumbs">
      {breadcrumbs.map((item, index) => (
        <span key={item.folder_identifier}>
          <span 
            onClick={() => setCurrentPath(currentPath.slice(0, index))}
            style={{ cursor: 'pointer', color: 'blue' }}
          >
            {item.folder_name}
          </span>
          {index < breadcrumbs.length - 1 && " > "}
        </span>
      ))}
    </div>
  );
};


export default FileExplorerIndicator