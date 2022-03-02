import React, { useState } from "react";
import Profile from "./Profile";
import FriendList from "./FriendList";
import Request from "./Request";
import { MessageModal } from "components/modals/Modal";

const Controller = ({ option, handleChange }) => {
    return (
        <div className="controller" onChange={handleChange}>
            <label className={`${option==="friends" && "selected" } trns-all`}>
                <input type="radio" name="section" value="friends" defaultChecked />
                friends
            </label>
            <label className={`${option==="requests" && "selected" } trns-all`}>
                <input type="radio" name="section" value="requests" />
                requests
            </label>
        </div>
    );
}

const HomeSection = () => {
    const [selectedOption, setSelectedOption] = useState("friends");

    return (
        <div className="container">
            <Profile />
            <Controller
                option={selectedOption}
                handleChange={(e)=>setSelectedOption(e.target.value)}
            />
            { selectedOption==="friends" ? <FriendList /> : <Request /> }
            <MessageModal />
        </div>
    );
}

export default React.memo(HomeSection);