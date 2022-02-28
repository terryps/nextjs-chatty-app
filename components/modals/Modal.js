import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
    hideMessageModal,
    hideAddFriendModal,
} from "redux/actions/modalActions";

export const EditModal = () => {
    return (
        <>
            <div className="">
                <form>
                    <label for="fullname">name</label>
                    <input type="text" id="fullname" name="fullname" value="fullname" maxLength={40} />

                    <label for="username">username</label>
                    <input type="text" id="username" name="username" value="username" maxLength={40} />

                    <label>
                        <textarea />
                    </label>
                </form>
            </div>
        </>
    );
}

export const AddFriendModal = ({ handleAdd }) => {
    const {open, userInfo} = useSelector(state=>state.addFriendModal);
    const dispatch = useDispatch();
    if(!open) { return <></>; }
    return (
        <>
            <div className="modal-container">
                <div className="flex-col modal-wrapper">
                    <div className="flex-col modal-content">
                        <Image className="modal-img" src="/static/avatars/1.png" width={48} height={48} />
                        <h3>{userInfo.username}</h3>
                        <p>{userInfo.fullname}</p>
                    </div>
                    <button
                        className="modal-btn ok-btn"
                        onClick={(e)=>{handleAdd(e);dispatch(hideAddFriendModal());}}
                    >
                            <h3>add</h3>
                    </button>
                    <button
                        className="modal-btn cancel-btn"
                        onClick={()=>dispatch(hideAddFriendModal())}
                    >
                        <h3>cancel</h3>
                    </button>
                </div>
            </div>
            <BackDrop onClick={()=>dispatch(hideAddFriendModal())} />
        </>
    );
}

export const MessageModal = () => {
    const messageModal = useSelector(state=>state.messageModal);
    const dispatch = useDispatch();

    if(!messageModal.open) {
        return (<></>);
    }

    return (
        <>
            <div className="modal-container">
                <div className="flex-col modal-wrapper">
                    <div className="modal-content">
                        <h3>{ messageModal.type }</h3>
                        <p>{ messageModal.content }</p>
                    </div>
                    <button className="modal-btn ok-btn" onClick={()=>dispatch(hideMessageModal())}>
                        <h3>OK</h3>
                    </button>
                </div>
            </div>
            <BackDrop onClick={()=>dispatch(hideMessageModal())} />
        </>
    );
}

const BackDrop = ({onClick}) => {
    return <div onClick={onClick} className="backdrop"></div>;
}