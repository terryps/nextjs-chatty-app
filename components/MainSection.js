import { useState } from "react";
import FriendList from "./FriendList";
import Request from "./Request";

const Controller = ({ handleChange }) => {
    return (
        <div onChange={handleChange}>
            <label>
                <input type="radio" name="section" value="friends" defaultChecked />
                friends
            </label>
            <label>
                <input type="radio" name="section" value="requests" />
                requests
            </label>
        </div>
    );
}

const MainSection = () => {
    const [selectedSection, setSelectedSection] = useState("friends");

    return (
        <section className="flex-col">
            <Controller handleChange={(e)=>setSelectedSection(e.target.value)} />
            {
                selectedSection==="friends" ?
                    <FriendList /> :
                    <Request />
            }
        </section>
    );
}

export default MainSection;