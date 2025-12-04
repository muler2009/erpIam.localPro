import React from 'react'
import * as PiIcons from 'react-icons/pi'
import  * as VscIcon from "react-icons/vsc";
import { FaRegPaste } from "react-icons/fa6";
import { MdDriveFileRenameOutline } from "react-icons/md";
import  * as LiIcons from "react-icons/lia";
import * as IoIcons from "react-icons/io";
import { FolderTabMenuInterface } from '../../models/folder-models';
import { SharedDocument } from '../../views/shared/sub-components';
import AllFileandFolderView from '../../views/document-management/folders/folder-mini-reusable-components/AllFileandFolderView';
import LibraryList from '../../views/document-management/LibraryList';
import AlllUploadedFiles  from '../../views/document-management/folders/file-uploads-component/AlllUploadedFiles';



export const folderOptions = [
    {
        label: "Open",
        icon: <>{PiIcons.PiAcorn({})}</>,
        abbreviation: "open_folder"
    },
    {
        label: "Create Folder",
        icon: <>{VscIcon.VscNewFolder({})}</>,
        abbreviation: "create_new_folder"
    },
    {
        label: "Copy",
        icon: <>{PiIcons.PiCopy({})}</>,
        abbreviation: "create_folder"
    },
    {
        label: "Paste",
        icon: <>{FaRegPaste({})}</>,
        abbreviation: "create_folder"
    },
    {
        label: "Rename",
        icon: <>{MdDriveFileRenameOutline({})}</>,
        abbreviation: "create_folder"
    }
]


export const folder_modal_top_menu = [
    {
        label: "New Folder",
        icon: <>{VscIcon.VscNewFolder({})}</>,
        identifier: "create_new_folder"
    },
    {
        label: "Copy",
        icon: <>{VscIcon.VscCopy({})}</>,
        identifier: "create_new_folder"
    },
    {
        label: "Cut",
        icon: <>{LiIcons.LiaCutSolid({})}</>,
        identifier: "cut"
    },
    {
        label: "Paste",
        icon: <>{LiIcons.LiaPasteSolid({})}</>,
        identifier: "paste"
    },
    {
        label: "Rename",
        icon: <>{MdDriveFileRenameOutline({})}</>,
        identifier: "create_folder"
    },
    {
        label: "Delete",
        icon: <>{LiIcons.LiaTrashAltSolid({})}</>,
        identifier: "delete"
    },
    {
        label: "Download",
        icon: <>{IoIcons.IoMdDownload({})}</>,
        identifier: "save"
    }
]


export const folder_tab_menu: FolderTabMenuInterface[] = [
    { 
      label: "All",
      tabContent: <AllFileandFolderView />,
      totalValues: 0,
      total: true
    },
    { 
        label: "Folders",
        tabContent: <LibraryList />,
        totalValues: 0,
        total: true
    },
    { 
        label: "Uploads",
        tabContent: <AlllUploadedFiles />,
        totalValues: 0,
        total: true
      },
      { 
        label: "Archived Document",
        tabContent: <h1>Test</h1>,
        totalValues: 0,
        total: true
      },
      { 
        label: "Shared",
        tabContent: <SharedDocument />,
        totalValues: 0,
        total: true
      }
] 