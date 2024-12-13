import './ContextMenu.css';

import { useFolderContextMenuStore } from "../../../store/folderContextMenuStore";
import { useEditorSocketStore } from '../../../store/editorSocketStore';

export const FolderContextMenu = ({
    x,
    y,
    path
}) => {
    const { setIsOpen } = useFolderContextMenuStore();
    const { editorSocket } = useEditorSocketStore();

    function handleFolderDelete(e) {
        e.preventDefault();
        editorSocket.emit("deleteFolder", {
            pathToFileOrFolder: path
        });
    }

    function handleFolderRename(e) {
        e.preventDefault();
    }

    function handleCreateFile(e) {
        e.preventDefault();
        // going to use antd modal to make it
        const fileName = "";

        if (fileName) {
            console.log(`Creating file "${fileName}" in folder "${path}"`);
            editorSocket.emit("createFile", {
                pathToFileOrFolder: path
            });
        }
    }

    return (
        <div
            onMouseLeave={() => {
                console.log("Mouse left");
                setIsOpen(false);
            }}
            className='fileOrFolderContextOptionsWrapper'
            style={{
                left: x,
                top: y,
            }}
        >
            <button
                className='fileOrFolderContextButton'
                onClick={handleFolderDelete}
            >
                Delete Folder
            </button>
            <button
                className='fileOrFolderContextButton'
                onClick={handleFolderRename}
            >
                Rename Folder
            </button>
            <button
                className='fileOrFolderContextButton'
                onClick={handleCreateFile}
            >
                Create File
            </button>
        </div>
    );
}
