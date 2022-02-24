import Image from "next/image";
import { connect } from "react-redux";

const Profile = ({ userInfo }) => {
    return (
        <div>
            {/* <div><Image /></div> */}

            <div>
                <div>
                    <h2>{userInfo.username}</h2>
                    <button>Edit Profile</button>
                </div>

                <div>
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