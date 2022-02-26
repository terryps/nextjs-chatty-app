import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";

const FriendList = ({ userId }) => {
    const [friendList, setFriendList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:3000/api/friends/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({userId: userId}),
        }).then(response => {
            if(response.ok) {
                return response.json();
            }
            throw response.json();
        }).then(data => {
            setFriendList(data.friendsData);
        }).catch(err => {
            setError(true);
        }).finally(() => 
            setLoading(false)
        );
    }, []);

    if(error) {
        return (
            <div>
                <span>Couldn't load friends list.</span>
            </div>
        )
    }

    else if(loading) {
        return (<></>);
    }

    else {
        return (
            <div className="scroll-y">
                <ul>
                {
                    friendList.map(friend => 
                        <li key={friend.id} className="flex-row lst-btn friend-lst-item trns-all" onClick={()=>router.push(`/${friend.username}`)}>
                            <div className="lst-avatar"><span></span></div>
                            <div className="flex-col lst-prof">
                                <h3 className="ellipsis">{friend.username}</h3>
                                <p className="ellipsis">{friend.fullname}</p>
                                <span className="ellipsis">{friend.about}</span>
                            </div>
                        </li>
                    )
                }
                </ul>
            </div>
        );
    }
}

export default connect(state => state)(FriendList);