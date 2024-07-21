import React from 'react'
import FileExplorer from '../document-management/folders/FileExplorer'

type FileSystemItem = {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileSystemItem[];
};

const fileSystem: FileSystemItem = {
  id: 'root',
  name: 'Root',
  type: 'folder',
  children: [
    {
      id: 'docs',
      name: 'Documents',
      type: 'folder',
      children: [
        { id: 'doc1', name: 'document1.txt', type: 'file' },
        { 
          id: 'projects',
          name: 'Projects',
          type: 'folder',
          children: [
            { 
              id: 'project1',
              name: 'Project 1',
              type: 'folder',
              children: [
                { id: 'file1', name: 'file1.js', type: 'file' },
                { id: 'file2', name: 'file2.js', type: 'file' }
              ]
            },
            { id: 'project2', name: 'Project 2', type: 'folder', children: [] }
          ]
        }
      ],
    },
    // ... other folders and files
  ],
};

const DashboardMain2 = () => {
  return (
    <div>
       <FileExplorer rootFolder={fileSystem} />
    </div>
  )
}

export default DashboardMain2
