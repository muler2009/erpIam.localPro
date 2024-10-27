import React, { useState } from 'react';

type FileSystemItem = {
    id: string;
    name: string;
    type: 'file' | 'folder';
    children?: FileSystemItem[];
  };
  

interface FileExplorerProps {
  rootFolder: FileSystemItem;
}

const FileExplorer: React.FC<FileExplorerProps> = ({ rootFolder }) => {
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const getCurrentFolder = (): FileSystemItem => {
    let current = rootFolder;
    for (const id of currentPath) {
      current = current.children?.find(item => item.id === id) as FileSystemItem;
      if (!current) break;
    }
    return current;
  };

  const handleItemClick = (item: FileSystemItem) => {
    if (item.type === 'folder') {
      setCurrentPath([...currentPath, item.id]);
    }
    setSelectedItem(item.id);
  };

  const handleBackClick = () => {
    if (currentPath.length > 0) {
      setCurrentPath(currentPath.slice(0, -1));
      setSelectedItem(null);
    }
  };

  const renderBreadcrumbs = () => {
    let breadcrumbs = [rootFolder];
    let current = rootFolder;
    for (const id of currentPath) {
      current = current.children?.find(item => item.id === id) as FileSystemItem;
      if (current) breadcrumbs.push(current);
    }
    return (
      <div className="breadcrumbs">
        {breadcrumbs.map((item, index) => (
          <span key={item.id}>
            <span 
              onClick={() => setCurrentPath(currentPath.slice(0, index))}
              style={{cursor: 'pointer', color: 'blue'}}
            >
              {item.name}
            </span>
            {index < breadcrumbs.length - 1 && " > "}
          </span>
        ))}
      </div>
    );
  };

  const currentFolder = getCurrentFolder();

  console.log(currentPath)

  return (
    <div className="file-explorer" style={{ width: '300px', border: '1px solid #ccc' }}>
      <div className="toolbar" style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
        <button onClick={handleBackClick} disabled={currentPath.length === 0}>Back</button>
      </div>
      {renderBreadcrumbs()}
      <div className="file-list" style={{ height: '400px', overflowY: 'auto' }}>
        {currentFolder.children?.map(item => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item)}
            style={{
              padding: '5px 10px',
              cursor: 'pointer',
              backgroundColor: selectedItem === item.id ? '#e6f2ff' : 'transparent'
            }}
          >
            {item.type === 'folder' ? '📁' : '📄'} {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileExplorer