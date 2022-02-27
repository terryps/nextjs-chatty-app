import Image from "next/image";

export const AddFriendModal = ({ userInfo, handleAdd, handleClose }) => {
    return (
        <div className="flex-col modal-wrapper">
            <div className="flex-col modal-content">
                <Image className="modal-img" src="/static/avatars/1.png" width={48} height={48} />
                <h3>{userInfo.username}</h3>
                <p>{userInfo.fullname}</p>
            </div>
            <button className="modal-btn ok-btn" onClick={handleAdd}><h3>add</h3></button>
            <button className="modal-btn cancel-btn" onClick={handleClose}><h3>cancel</h3></button>
        </div>
    );
}

export const MessageModal = ({children, type, handleClose}) => {
    return (
        <div className="flex-col modal-wrapper">
            <div className="modal-content">
                <h3>{type}</h3>
                <p>{children}</p>
            </div>
            <button className="modal-btn ok-btn" onClick={handleClose}><h3>OK</h3></button>
        </div>
    );
}

const BackDrop = ({onClick}) => {
    return <div onClick={onClick} className="backdrop"></div>;
  }

export const Modal = ({ children, modalIsOpen, handleClose }) => {
    if(!modalIsOpen) {
        return (<></>);
    }

    return (
        <>
            <div className="modal-container">
                { children }
            </div>
            <BackDrop onClick={handleClose} />
        </>
    );
}