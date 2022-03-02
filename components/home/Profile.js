import { connect } from "react-redux";
import Link from "next/link";
import Image from "next/image";

const Profile = ({ userInfo }) => {
    return (
        <div className="flex-row prof">
            <div className="avatar m-wd-78">
                <Image src={`/static/avatars/${userInfo.avatarUrl}.png`} width={54} height={54}/>
            </div>

            <div className="flex-col">
                <div className="prof-top">
                    <h2 className="ellipsis">{userInfo.username}</h2>
                    <Link href="/accounts/edit">
                        <a className="prof-edit trns-all">
                            edit profile
                        </a>
                    </Link>
                </div>

                <div className="prof-bottom">
                    <h3>{userInfo.fullname}</h3>
                    <span>{userInfo.about}</span>
                </div>
            </div>
        </div>
    );
}

export default connect(state => ({ userInfo: state.userInfo }))(Profile);