import React from "react";
const LeftSideBar = ({userDetails , showUserDetailsModal, data}) => (
<div className="left-section">
    <div className="user-details">
        <div className="user-image">
            <img src={data} alt="user img" resize-mode={"contain"} height="100%"/>
        </div>
        <div className="user-name">
            {userDetails && userDetails.data ? `${userDetails.data.firstname} ${userDetails.data.lastname}` : ""}
        </div>
        <div className="user-post">
            {userDetails && userDetails.data ? userDetails.data.designation : ""}
        </div>
        <div className="edit-btn">
            <button
                data-toggle="modal"
                data-target="#edit-profile"
                onClick={() => showUserDetailsModal(userDetails)}
            >
            Edit
            </button>
        </div>
    </div>
</div>);
export default LeftSideBar;