export const AddFriendModal = ({ userInfo, handleAdd, handleClose }) => {
    return (
        <div className="flex-col modal-wrapper">
            <div className="flex-col modal-profile">
                <span className="modal-img"></span>
                <p>{userInfo.fullname}</p>
                <p>{userInfo.username}</p>
            </div>
            <button className="modal-btn" onClick={handleAdd}><h3>add</h3></button>
            <button className="modal-btn" onClick={handleClose}><h3>cancel</h3></button>
        </div>
    );
}

export const MessageModal = ({children, type, handleClose}) => {
    return (
        <div className="flex-col modal-wrapper">
            <div>
                <h2>{type}</h2>
                <p>{children}</p>
            </div>
            <button onClick={handleClose}><h3>OK</h3></button>
        </div>
    );
}

const BackDrop = () => {
    return <div className="backdrop"></div>;
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