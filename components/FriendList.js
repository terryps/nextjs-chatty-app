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
        fetch("http://localhost:3000/api/friends", {
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
            <ul>
                {
                    friendList.map(friend => 
                        <li key={friend.id} onClick={()=>router.push(`/${friend.username}`)}>
                            <div></div>
                            <div>
                                <div><h3>{friend.username}</h3></div>
                                <div><p>{friend.fullname}</p></div>
                                <div><span>{friend.about}</span></div>
                            </div>
                        </li>
                    )
                }
            </ul>
        );
    }
}

export default connect(state => state)(FriendList);