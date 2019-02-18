import React, { Component } from "react";
import { connect } from "react-redux";
import { logout, getuserData, imageUpload } from "../redux/user/actions";
import SearchInput, { createFilter } from "react-search-input";
import _ from "underscore";
import Modal from "../components/modal";
import LeftSideBar from "../components/LeftSideBar"
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
    const { user } = nextProps;
    if (!user.isLoggedIn) {
      this.props.history.push("./login");
    }
    if (user.userDetails) {
      this.setState({ data: user.getUserDetails.data });
    }
    this.setState({
      profilePhoto: user.userDetails && user.userDetails.data ? user.userDetails.data.profImage : ""
    });
  }

  // to get user data
  componentDidMount() {
    const { getuserData } = this.props;
    getuserData(this.props.user.userDetails.data.token);
  }

  // function on Edit of data
  onEdit = event => {
    event.preventDefault();
  };

  // function onlog out button
  logout = event => {
    event.preventDefault();
    this.props.logout();
  };

  //searching function
  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }

  _handleImageChange = e => {
    e.preventDefault();
    let file = e.target.files[0];
    if (!file.name) {
      console.log("File name not found ", file);
      return;
    }
    let ext = file.name.split(".").pop();
    let exts = ["jpg", "png", "bmp", "jpeg", "gif"];
    if (!_.contains(exts, ext)) {
      this.setState({
        open: true,
        msg: "Invalid Image Format ",
        msgType: "Error.",
        msgStatus: false
      });
      return;
    }
    this.props.imageUpload(
      this.props.user.userDetails.data.token,
      file,
      (res) => {
        this.setState({ profilePhoto: res.data.imageUrl });
      }
    );
  };

  showUserDetailsModal = (userDetails) => {
    this.setState({
      dataShow: userDetails
        ? userDetails.data
        : {},
      role: "admin"
    })
  }
  // render function
  render() {
    let data = this.state.profilePhoto ? "http://".concat(this.state.profilePhoto).toString() : 'images/Rex-fav.png';
    const filteredData = this.state.data.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
    const { role, firstname, dataShow, phoneError } = this.state;
    const { user: { userDetails } } = this.props;
    return (
      <div>
        <div className="main-panel">
          <LeftSideBar
            userDetails={userDetails}
            showUserDetailsModal={this.showUserDetailsModal}
            data={data}
          />
          <div className="body-panel">
            <div className="top-header">
              <div className="left-action">
                <ul>
                  <li>
                    <button className="menu-btn">
                      <i className="fa fa-bars" aria-hidden="true" />
                    </button>
                  </li>
                </ul>
              </div>
              <div className="right-action">
                <form onSubmit={event => this.logout(event)}>
                  <button type="submit">Log Out</button>
                </form>
              </div>
            </div>
            <div className="inner-panel">
              <div className="search-bar">
                <SearchInput
                  className="search-bar-input"
                  onChange={term => this.searchUpdated(term)}
                />
                <button
                  onClick={() => this.searchUpdated(this.state.searchTerm)}
                >
                  Search
                </button>
              </div>
              <div className="card-section">
                {filteredData.map((data) => {
                  return (
                    <li
                      data-toggle="modal"
                      data-target="#edit-profile"
                      onClick={() =>
                        this.setState({ dataShow: data, role: "user" })
                      }
                      key={data.phone}
                    >
                      <div className="card-box">
                        <div className="card-user-image">
                          <img src="images/user.jpg" alt="user img" />
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
        {/* modal for user detail */}
        <Modal
          role={role}
          data={data}
          handleImageChange={this._handleImageChange}
          onEdit={this.onEdit}
          firstname={firstname}
          dataShow={dataShow}
          phoneError={phoneError}
          />
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
