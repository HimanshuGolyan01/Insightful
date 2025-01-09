import axios from "axios";
import { useState } from "react";
import Modal from './Modal'; 
import UpdatePost from './UpdatePost'; 

interface EllipsePopProps {
    postId: string;
    onPostDeleted: (id: string) => void;
    setOpenIndex: (index: number | null) => void;
}

const EllipsePop = ({ postId, onPostDeleted, setOpenIndex }: EllipsePopProps) => {
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const onDeleteHandler = async () => {
        try {
            await axios.delete("https://backend.golyanhimanshu.workers.dev/api/v1/blog/delete-blog", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("jwt"),
                },
                data: {
                    id: postId
                },
            });
            onPostDeleted(postId);
        } catch (error) {
            console.log(error);
        }
    };

    const openUpdateModal = () => {
        setShowUpdateModal(true);
    };

    const closeUpdateModal = () => {
        setShowUpdateModal(false);
        setOpenIndex(null);
    };

    return (
        <div className="flex justify-center items-center">
         
            <div className="flex flex-col p-6 bg-gray-200 shadow-xl rounded-2xl w-[300px] space-y-4">
               
                <div
                    className="px-4 py-3 bg-gray-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition-all cursor-pointer"
                    onClick={openUpdateModal}
                >
                    Update Post
                </div>
                
                <div
                    className="px-4 py-3 bg-gray-800 text-white text-lg font-semibold rounded-lg hover:bg-red-600 transition-all cursor-pointer"
                    onClick={onDeleteHandler}
                >
                    Delete Post
                </div>
            </div>

           
            <Modal isOpen={showUpdateModal} onClose={closeUpdateModal}>
                <UpdatePost postId={postId} onClose={closeUpdateModal} />
            </Modal>
        </div>
    );
};

export default EllipsePop;
