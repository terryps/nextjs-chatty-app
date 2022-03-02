import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const FriendList = () => {
    const [friendList, setFriendList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    
    const fetcher = async () => {
        setLoading(true);
        fetch("http://localhost:3000/api/friends/")
        .then(response => {
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
    };

    useEffect(() => {
        fetcher();
    }, []);

    if(error) {
        return (
            <div className="error">
                <button onClick={fetcher}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </button>
                <span>Couldn't load friends list.</span>
            </div>
        )
    }

    else if(loading) {
        return (
            <div className="loading">
                <span></span>
                <span></span>
                <span></span>
            </div>
        );
    }

    else {
        return (
            <div className="scroll-y">
                <ul>
                {
                    friendList.map(friend => 
                        <li key={friend.id} className="lst-item friend-lst-item trns-all">
                            <Link href={`/${friend.username}`}>
                                <a className="flex-row">
                                    <div className="avatar m-wd-72">
                                        <Image src={`/static/avatars/${friend.avatarUrl}.png`} width={48} height={48} />
                                    </div>
                                    <div className="lst-prof">
                                        <h3 className="ellipsis">{friend.username}</h3>
                                        <p className="ellipsis">{friend.fullname}</p>
                                        <span className="ellipsis">{friend.about}</span>
                                    </div>
                                </a>
                            </Link>
                        </li>
                    )
                }
                </ul>
            </div>
        );
    }
}

export default React.memo(FriendList);