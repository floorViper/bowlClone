var express = require('express');
var router = express.Router();
var userRouter = require('../../../loginTest/userRouter');

/* GET home page. */
router.route('/process/loginCheck').get(function(req, res) {
  console.log('/process/loginCheck calling');
  let logged;
  if (!req.session.user) {
    logged = false;
  } else {
    logged = true;
  }
  res.json({ ...req.session.user, authorized: logged });
});

//login router function
router.route('/process/login').post(function(req, res) {
  console.log('/process/login calling');
  //console.log(req);
  userRouter.userLogin(req, res);
});

//logout routing function
router.route('/process/logout').get(function(req, res) {
  console.log('/process/logout calling');

  if (req.session.user) {
    //login state
    console.log('logout');

    req.session.destroy(function(err) {
      if (err) {
        throw err;
      }
      req.session = null;
      console.log('cleared session', req.session);

      res.json({ user: null });
    });
  } else {
    //not login state
    console.log('not login state');
  }
});

//유저 추가 하기 처리하는 함수
router.route('/process/addUserPage').get(function(req, res) {
  console.log('/process/addUserPage calling');

  if (req.session.user) {
    console.log('로그인 상태입니다.');
    res.redirect('/htmlSection/addUser.html');
  } else {
    console.log('로그인 상태가 아닙니다.');
    res.redirect('/htmlSection/login.html');
  }
});

//User add function router
router.route('/process/addUser').post(function(req, res) {
  console.log('/process/addUser calling');

  userRouter.userAddList(req, res);
});

//유저 확인 하기 처리하는 함수
router.route('/process/userListPage').get(function(req, res) {
  console.log('/process/userListPage calling');

  if (req.session.user) {
    console.log('로그인 상태입니다.');
    res.redirect('/htmlSection/userList.html');
  } else {
    console.log('로그인 상태가 아닙니다.');
    res.redirect('/htmlSection/login.html');
  }
});

//User list function router
router.route('/process/userList').post(function(req, res) {
  console.log('/process/userList calling');

  userRouter.userAllListSelect(req, res);
});

//유저 승인 하기 처리하는 함수
router.route('/process/userPermissionPage').get(function(req, res){
    console.log('/process/userPermissionPage calling');

    if (req.session.user){
        console.log('로그인 상태입니다.');
        res.redirect('/process/userPermissionPage2');
    } else {
        console.log('로그인 상태가 아닙니다.');
        res.redirect('/public/login.html');
    };
});

//유저 승인 하기 처리하는 함수
router.route('/process/userPermissionPage2').get(function(req, res){
    console.log('/process/userPermissionPage2 calling');

    userRouter.userPermissionPageMake(req, res);
});

//user permission function router
router.route('/process/userPermission').post(function(req, res){
    console.log('/process/userPermission calling');

    userRouter.userPermission(req, res);
});

module.exports = router;
