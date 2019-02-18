import React from "react";
const Modal = ({role, data, handleImageChange, onEdit, dataShow, phoneError}) => (
        <div
          className="modal fade"
          id="edit-profile"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered popup-modal edit-details"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <div className="modal-title" id="exampleModalLongTitle">
                  {role === "admin"
                    ? "Edit Your Details"
                    : "User Detail"}
                </div>
                <a className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </a>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                    <div className="user-image">
                      <div className="user-pic">
                        <img
                          src={
                            role === "admin"
                              ? data
                              : "images/user.jpg"
                          }
                          alt="user img"
                        />
                      </div>
                    </div>
                    {role === "admin" && (
                      <input
                        type="file"
                        onChange={e => handleImageChange(e)}
                      />
                    )}
                  </div>
                  <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                    <form
                      onSubmit={event => onEdit(event)}
                    >
                      <div className="form">
                        <div className="input-group">
                          <div className="input-form">
                            <div className="label">Name</div>
                            <div className="input-field">
                              <input
                                type="text"
                                id="name"
                                className="form-control"
                                value={
                                    dataShow.firstname
                                    ? dataShow.firstname
                                    : ""
                                }
                                readOnly
                              />
                            </div>
                          </div>
                          <div className="input-form">
                            <div className="label">Email</div>
                            <div className="input-field">
                              <input
                                type="text"
                                id="email"
                                className="form-control"
                                value={
                                    dataShow && dataShow.email
                                    ? dataShow.email
                                    : ""
                                }
                                readOnly
                              />
                            </div>
                          </div>

                          <div className="input-form">
                            <div className="label">Phone</div>
                            <div className="input-field">
                              <input
                                type="text"
                                id="phone"
                                className="form-control"
                                value={
                                  dataShow && dataShow.phone
                                    ? dataShow.phone
                                    : ""
                                }
                                readOnly
                              />
                            </div>
                          </div>
                          <div style={{ color: "red", fontSize: 12 }}>
                            {phoneError}
                          </div>
                          {role === "admin" && (
                            <div
                              className="form-btn"
                              data-toggle="modal"
                              data-target="#edit-profile"
                            >
                              <button className="sub-btn">Submit</button>
                            </div>
                          )}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );

// used to connect dashboard with redux
export default Modal;
