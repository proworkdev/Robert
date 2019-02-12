import React, { Component } from "react";
import Regex from "../utilities/Regex";
import { connect } from "react-redux";
import { logout, getuserData, imageUpload } from "../redux/user/actions";
import SearchInput, { createFilter } from "react-search-input";
import _ from "underscore";
const KEYS_TO_FILTERS = ["firstname", "lastname", "designation"];

class Dashborad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      emailError: "",
      phoneError: "",
      nameError: "",
      searchTerm: "",
      dataShow: {},
      role: "",
      imageUrl: ""
    };
  }

  // move the user to login button after slogout
  componentWillReceiveProps(nextProps) {
    if (!nextProps.user.isLoggedIn) {
      this.props.history.push("./login");
    }
    if (nextProps.user.userDetails !== null) {
      this.setState({ data: nextProps.user.getUserDetails.data });
    }
    this.setState({
      profilePhoto: this.props.user.userDetails.data
        ? this.props.user.userDetails.data.profImage
        : ""
    });
  }

  // to get user data
  UNSAFE_componentWillMount() {
    console.log(this.props);
    this.props.getuserData(this.props.user.userDetails.data.token);
  }

  // function on Edit of data
  onEdit = event => {
    let context = this;
    event.preventDefault();
  };

  // function onlog out button
  logout = event => {
    let context = this;
    event.preventDefault();
    this.props.logout();
  };
  //searching function
  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }

  _handleImageChange = e => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    let context = this;
    if (!file.name) {
      console.log("FILe name not found ", file);
      return;
    }
    let ext = file.name.split(".").pop();
    let exts = ["jpg", "png", "bmp", "jpeg", "gif"];
    if (!_.contains(exts, ext)) {
      context.setState({
        open: true,
        msg: "Invalid Image Format ",
        msgType: "Error.",
        msgStatus: false
      });
      return;
    }
    console.log("file", file);
    this.props.imageUpload(
      this.props.user.userDetails.data.token,
      file,
      function(res) {
        context.setState({ profilePhoto: res.data.imageUrl });
      }
    );
  };
  // render function
  render() {
    let data = "http://".concat(this.state.profilePhoto).toString();
    let context = this;
    const filteredData = this.state.data.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
    );
    return (
      <div>
        <div className="main-panel">
          <div className="left-section">
            <div className="user-details">
              <div className="user-image">
                <img src={data} resize-mode={"contain"} />
              </div>
              <div className="user-name">
                {this.props.user.userDetails
                  ? this.props.user.userDetails.data.firstname
                  : ""}{" "}
                {this.props.user.userDetails
                  ? this.props.user.userDetails.data.lastname
                  : ""}
              </div>
              <div className="user-post">
                {this.props.user.userDetails
                  ? this.props.user.userDetails.data.designation
                  : ""}
              </div>
              <div className="edit-btn">
                <a
                  href="javascript:void(0);"
                  data-toggle="modal"
                  data-target="#edit-profile"
                  onClick={() =>
                    this.setState({
                      dataShow: this.props.user.userDetails
                        ? this.props.user.userDetails.data
                        : {},
                      role: "admin"
                    })
                  }
                >
                  Edit
                </a>
              </div>
            </div>
          </div>
          <div className="body-panel">
            <div className="top-header">
              <div className="left-action">
                <ul>
                  <li>
                    <a href="javascript:void(0);" className="menu-btn">
                      <i className="fa fa-bars" aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </div>
              <div class="right-action">
                <form ref="form" onSubmit={event => context.logout(event)}>
                  <button type="submit">LogOut</button>
                </form>
              </div>
            </div>
            <div className="inner-panel">
              <div className="search-bar">
                <SearchInput
                  className="search-bar-input"
                  onChange={term => this.searchUpdated(term)}
                />

                <a
                  href="javascript:void(0);"
                  onClick={() => this.searchUpdated(this.state.searchTerm)}
                >
                  Search
                </a>
              </div>
              <div className="card-section">
                {filteredData.map((data, index) => {
                  return (
                    <li
                      data-toggle="modal"
                      data-target="#edit-profile"
                      onClick={() =>
                        this.setState({ dataShow: data, role: "user" })
                      }
                    >
                      <div className="card-box">
                        <div className="card-user-image">
                          <img src="images/user.jpg" />
                        </div>
                        <div className="card-user-name">
                          <div className="user-name">
                            {data.firstname} {data.lastname}
                          </div>
                          <div className="user-post">{data.designation}</div>
                          <div className="user-post">+{data.phone}</div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* modal open  */}
        <div
          class="modal fade"
          id="edit-profile"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div
            class="modal-dialog modal-dialog-centered popup-modal edit-details"
            role="document"
          >
            <div class="modal-content">
              <div class="modal-header">
                <div class="modal-title" id="exampleModalLongTitle">
                  {this.state.role == "admin"
                    ? "Edit Your Details"
                    : "User Detail"}
                </div>
                <a class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </a>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                    <div class="user-image">
                      <div class="user-pic">
                        <img
                          src={
                            this.state.role == "admin"
                              ? data
                              : "images/user.jpg"
                          }
                        />
                      </div>
                    </div>
                    {this.state.role == "admin" && (
                      <input
                        type="file"
                        onChange={e => this._handleImageChange(e)}
                      />
                    )}
                  </div>
                  <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                    <form
                      onSubmit={event => context.onEdit(event)}
                      ref="loginForm"
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
                                // onChange={() => context.setState({ nameError: "" })}
                                editable={false}
                                value={
                                  this.state.dataShow.firstname
                                    ? this.state.dataShow.firstname
                                    : ""
                                }
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
                                editable={false}
                                value={
                                  this.state.dataShow.email
                                    ? this.state.dataShow.email
                                    : ""
                                }
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
                                editable={false}
                                value={
                                  this.state.dataShow.phone
                                    ? this.state.dataShow.phone
                                    : ""
                                }
                              />
                            </div>
                          </div>
                          <div style={{ color: "red", fontSize: 12 }}>
                            {this.state.phoneError}
                          </div>
                          {this.state.role == "admin" && (
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
      </div>
    );
  }
}

const mapDispatchToProps = {
  logout,
  getuserData,
  imageUpload
};

const mapStateToProps = state => ({
  user: state.user
});

// used to connect dashboard with redux
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashborad);
