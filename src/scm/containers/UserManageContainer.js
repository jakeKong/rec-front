import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../modules/UserModule";
import { UserGrid, UserSearch, UserRegister, /*UserUpdate*/ } from "../index";

import '@vaadin/vaadin-ordered-layout';
import '@vaadin/vaadin-button';

class UserManageContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: {
        email: null,
        name: null,
        roleCode: null
      },
      user: {
        email: null,
        name: null,
        tellNo: null,
        address: null,
        addressNo: null,
        birthDt: null,
        createdUser: null,
        assignedRoles: null,
      },
      selectList: [],
      popupOpened: false
    }
    this.popupOpenStateEvent = this.popupOpenStateEvent.bind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {
    const { userList } = this.props;
    const { search } = this.state;
    // 사용자 목록이 존재하지 않을 경우 목록조회 API서비스 호출
    if (!userList || userList === undefined || userList.isEmpty()) {
      this.getUserList(search);
    }

    const { selectList } = this.state;
    const deleteUsers = this.deleteUsers;

    const btnSelectDelete = document.querySelector('#btnSelectDelete');
    btnSelectDelete.innerHTML = '선택삭제';
    btnSelectDelete.addEventListener('click', function() {
      if (selectList.length > 0) {
        const check = window.confirm('선택한 항목을 삭제 하시겠습니까?');
        if (check === true) {
          deleteUsers(selectList, search);
        }
      } else {
        const nfNotfoundSelectColumn = document.createElement('vaadin-notification');
        nfNotfoundSelectColumn.renderer = function(root) {
          root.textContent = '선택된 항목이 존재하지 않습니다.'
        }
        document.body.appendChild(nfNotfoundSelectColumn);
        nfNotfoundSelectColumn.position = 'middle';
        nfNotfoundSelectColumn.duration = 2000;
        nfNotfoundSelectColumn.opened = true;
      }
    });

    const popupOpenStateEvent = this.popupOpenStateEvent;
    const btnRegister = document.querySelector('#btnRegister');
    btnRegister.innerHTML = '등록';
    btnRegister.addEventListener('click', function() {
      popupOpenStateEvent();
    });
  }

  // 사용자 값 초기화
  resetUser() {
    this.setState({user: {
      email: null,
      name: null,
      tellNo: null,
      address: null,
      addressNo: null,
      birthDt: null,
      createdUser: null,
      assignedRoles: null,
    }})
  }

  searchCallback = async (dataSearchChild) => {
    this.setState({search: dataSearchChild});

    const { search } = this.state;
    this.getUserList(search);
    // state.search 값 초기화
    this.setState({search: {
      email: null,
      name: null,
      roleCode: null
    }});
  }  

  popupClose = async (dataClickChild) => {
    this.setState({popupOpened: dataClickChild});
    this.setState({user: {
      email: null,
      name: null,
      tellNo: null,
      address: null,
      addressNo: null,
      birthDt: null,
      createdUser: null,
      assignedRoles: null,
    }});
  }

  userDtoCallback = async (userDtoChild) => {
    this.setState({user : userDtoChild});
    this.popupOpenStateEvent();
  }

  popupOpenStateEvent() {
    this.setState({popupOpened: true});
  }

  // 사용자 목록 조회 호출
  getUserList = async (search) => {
    const { UserModule } = this.props;
    try {
      await UserModule.getUserList(search)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  // 그리드의 체크박스 선택 시 선택한 컬럼의 값을 선택목록에 저장
  selectCallback = async (select) => {
    const { selectList } = this.state;
    selectList.push(select.email)
    this.setState({selectList})
  }

  // 그리드의 체크박스 선택 취소 했을때 선택목록에 저장되어있는 값 중 선택취소한 컬럼의 값을 찾아 목록에서 제거
  deselectCallback = async (select) => {
    const { selectList } = this.state;
    const itemToFind = selectList.find(function(item) {
      // return item.userSid === selectDto.userSid
      return item === select.email
    });
    const idx = selectList.indexOf(itemToFind);
    if (idx > -1) selectList.splice(idx, 1)
    this.setState({selectList})
  }

  // 사용자 등록 요청
  addCallback = async (userChild) => {
    this.setState({user: userChild})
    const { user, search } = this.state;
    this.addUser(user, search);
    this.resetUser();
  }

  // 사용자 수정 요청
  updateCallback = async (userChild) => {
    this.setState({user: userChild})
    const { email } = this.props;
    const { user, search } = this.state;
    this.updateUser(email, user, search);
    this.resetUser();
  }

  // 사용자 단일항목 삭제 요청
  deleteCallback = async (email) => {
    const { search } = this.state;
    this.deleteUser(email, search);
    this.resetUser();
  }

  // 사용자 등록 API 호출 이벤트
  addUser = async (user, search) => {
    const { UserModule } = this.props;
    try {
      await UserModule.addUser(user, search)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  // 사용자 수정 API 호출 이벤트
  updateUser = async (email, user, search) => {
    const { UserModule } = this.props;
    try {
      await UserModule.updateUser(email, user, search)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  // 사용자 단일항목 삭제 API 호출 이벤트
  deleteUser = async (email, search) => {
    const { UserModule } = this.props;
    try {
      await UserModule.deleteUser(email, search)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  // 사용자 선택삭제 API 호출 이벤트
  deleteUsers = async (list, search) => {
    const { UserModule } = this.props;
    try {
      await UserModule.deleteUsers(list, search)
    } catch (e) {
      console.log("error log : " + e);
    }
    const { selectList } = this.state;
    selectList.splice(0, selectList.length)
    this.setState({selectList});
  }

  render() {
    const { user, popupOpened } = this.state;
    const { userList, pending, error, success, role } = this.props;
    return (
      <Fragment>
        <div>
          <div className="div-search">
            <UserSearch searchCallback={ this.searchCallback } />
          </div>
          <div className="div-main">
            { pending && "Loading..." }
            { error && <h1>Server Error!</h1> }
            { success && <UserGrid userList={ userList } userDtoCallback={ this.userDtoCallback } detailCallback={ this.detailCallback } role={ role } selectCallback={ this.selectCallback } deselectCallback={ this.deselectCallback }  registerCallback={ this.registerCallback } />}
          </div>
          <div className="div-sub-main">
            <vaadin-button id="btnSelectDelete" theme="error" />
            <vaadin-button id="btnRegister" />
          </div>
          <UserRegister addCallback={ this.addCallback } updateCallback={ this.updateCallback } user={ user } popupOpened={ popupOpened } popupClose={ this.popupClose } />
        </div>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    userList: state.user.userList,
    pending: state.user.pending,
    error: state.user.error,
    success: state.user.success,
    // complete: state.user.complete,

    // 임시 설정
    role: 'ROLE_ADMIN',
    email: 'admin@test.com'
  }),
  dispatch => ({
    UserModule: bindActionCreators(userActions, dispatch)
  })
)(UserManageContainer);