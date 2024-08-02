import { useState } from "react";
import { useGetFolderQuery } from "../../../services/folderAPISlice";
import useFolderExplorerActions from "../../../hooks/useFolderExplorerActions";
import { FolderDataInterface } from "../../../models/folder-models";
import { UploadedDocumentInterface } from "../../../models/folder-models";

const FolderL = () => {

//     const { data: folder_data} = useGetFolderQuery()

//     const [currentPath, setCurrentPath] = useState<string[]>([]); 
//     const [forwardStack, setForwardStack] = useState<string[]>([]);
//     const [selectedItem, setSelectedItem] = useState<string | null>(null); 

//     const [openStates, setOpenStates] = useState<boolean[]>([]);
//     const [openPdfs, setOpenPdfs] = useState<boolean>(false);
//     const [viewMode, setViewMode] = useState<'grid' | 'list'>("grid")

//      const getCurrentFolder = (): FolderDataInterface | undefined => {
//     let current: FolderDataInterface | undefined = folder_data;
//     for (const id of currentPath) {
//         if(!current || ! current.subfolder){
//             return undefined
//         }
//       const nextFolder = current.subfolder?.find(item => item.folder_name === id) as FolderDataInterface
//       if (nextFolder) {
//         current = nextFolder;
//       } else {
//         break;
//       }
//     }
//     return current;
//   };

//   const handleItemClick = (item: FolderDataInterface | UploadedDocumentInterface) => {
//     if ('subfolder' in item) {
//       setCurrentPath([...currentPath, item.folder_name]);
//       console.log('handleItemClick - currentPath:', currentPath);
//     }
//     setSelectedItem('folder_identifier' in item ? item.folder_name : item.uploaded_document_name);
//   };

//   // const handleBackClick = () => {
//   //   if (currentPath.length > 0) {
//   //     setCurrentPath(currentPath.slice(0, -1));
//   //     setSelectedItem(null);
//   //   }
//   // };

//   const handleBackClick = () => {
//     if (currentPath.length > 0) {
//       const lastFolder = currentPath[currentPath.length - 1];
//       setForwardStack([...forwardStack, lastFolder]);
//       setCurrentPath(currentPath.slice(0, -1));
//       setSelectedItem(null);
//     }
//   };

//   const handleForwardClick = () => {
//     if (forwardStack.length > 0) {
//       const nextPath = forwardStack.pop();
//       if (nextPath !== undefined) {
//         setCurrentPath([...currentPath, nextPath]);
//         setSelectedItem(null);
//       }
//     }
//   };

//   const getBreadcrumbs = () => {
//     let breadcrumbs = [folder_data];
//     let current = folder_data;
//     for (const folder_name of currentPath) {
//       const nextFolder = current.subfolder?.find(folder => folder.folder_name === folder_name);
//       if (nextFolder) {
//         breadcrumbs.push(nextFolder);
//         current = nextFolder;
//       } else {
//         break;
//       }
//     }
    
     
//     const renderBreadcrumbs = () => {
//       const breadcrumbs = getBreadcrumbs();
//       console.log(breadcrumbs)
//       return (
//         <div className="flex space-x-2">
//           {breadcrumbs.map((item, index) => (
//             <span key={index}>
//               <span 
//                 onClick={() => setCurrentPath(currentPath.slice(0, index))}
//                 style={{ cursor: 'pointer', color: 'blue' }}
//               >
//                 {item.folder_name}
//               </span>
//               {index < breadcrumbs.length - 1 && ' > '} 
//             </span>
//           ))}
//         </div>
//       );
//     };


//     const toggleItem = (index: number) => {
//         setOpenStates((prevState) => {
//           const updatedStates = [...prevState];
//           updatedStates[index] = !updatedStates[index];
//           return updatedStates;
//         });
//       };
  return (
    <div> test</div>
  )
}

export default FolderL