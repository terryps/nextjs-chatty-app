import Image from "next/image";
import { connect } from "react-redux";

const Profile = ({ userInfo }) => {
    return (
        <div className="flex-row prof">
            <div className="avatar">
                <span></span>
            </div>

            <div className="flex-col">
                <div className="flex-row prof-top">
                    <h2 className="ellipsis">{userInfo.username}</h2>
                    <button className="prof-edit trns-all">Edit Profile</button>
                </div>

                <div className="prof-bottom flex-col">
                    <h3>{userInfo.fullname}</h3>
                    <div>
                        <span>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default connect(state => state)(Profile);