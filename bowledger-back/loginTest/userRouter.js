var sqlQueryFunctions = require('./sqlQueryFunctions');

//암호화 모듈 불러오기
const crypto = require('crypto');

//암호화를 이용하기 위한 class
class sha256_Class {
  constructor() {
    this.hash = crypto.createHash('sha256');
  }

  setHash(inputString) {
    console.log('setHash');
    this.hash.update(inputString);
  }

  getHash() {
    console.log('getHash');
    return this.hash.digest('hex');
  }
}

//로그인을 확인하는 함수
function userLogin(req, res) {
  console.log(req.body);
  var user_id = req.body.id || req.query.id;
  var user_pwd = req.body.password || req.query.password;

  if (req.session.user) {
    res.json({ user: req.session.user });
  } else if (user_id == undefined || user_id == null) {
    res.status(400).json({ message: 'id가 입력되지 않았습니다.' });
  } else if (user_pwd == undefined || user_pwd == null) {
    res.status(400).json({ message: 'password가 입력되지 않았습니다.' });
  } else {
    var test = new sha256_Class();
    test.setHash(user_pwd);
    var crypto_user_pwd = test.getHash();

    sqlQueryFunctions.authUser(user_id, crypto_user_pwd, function(
      err,
      DBConnection,
      docs,
      errorMessage,
      result
    ) {
      console.log('login에서 authUser function 호출');
      if (err) {
        res.status(500).json({ message: 'login error' + errorMessage });
        //throw err;
      } else if (!DBConnection) {
        res.status(400).json({ message: 'Database가 연결되어 있지 않습니다.' });
      } else if (docs) {
        console.dir('function의 docs:' + docs);

        //Session 저장
        req.session.user = {
          id: user_id,
          //pwd: user_pwd,
          authorized: true
        };

        req.session.save(function() {
          console.log('session:', req.session);
          res.json({ user: req.session.user });
        });
      } else {
        console.dir('function의 docs:' + docs);

        res.status(500).json({ message: 'login error: ' + errorMessage });
      }
    });
  }
}

//유저를 추가하는 함수
function userAddList(req, res) {
  var add_user_id = req.body.id || req.query.id;
  var add_user_pwd = req.body.password || req.query.password;
  var add_user_name = req.body.name || req.query.name;
  var add_user_dept = req.body.dept || req.query.dept;
  var add_user_duty = req.body.duty || req.query.duty;
  var add_user_tel = req.body.tel || req.query.tel;
  var add_user_hp = req.body.hp || req.query.hp;
  var add_user_fax = req.body.fax || req.query.fax;
  var add_user_req_ymd = req.body.req_ymd || req.query.req_ymd;
  var add_user_reg_ymd = req.body.reg_ymd || req.query.reg_ymd;
  var add_user_del_yn = req.body.del_yn || req.query.del_yn;
  var add_orgcd = req.body.orgcd || req.query.orgcd;
  var add_admin_yn = 'N'; //관리자가 아닌 회원으로 가입한다고 보자
  var add_crypto_user_pwd;
  var add_admin_perm = 'W'; //관리자가 아닌 회원은 처음에는 승인 대기 상태이다.

  console.log('요청 파라미터: ');
  console.log(
    add_user_id +
      ':' +
      add_user_pwd +
      ':' +
      add_user_name +
      ':' +
      add_user_dept +
      ':' +
      add_user_duty +
      ':' +
      add_user_tel +
      ':' +
      add_user_hp +
      ':' +
      add_user_fax +
      ':' +
      add_user_req_ymd +
      ':' +
      add_user_reg_ymd +
      ':' +
      add_user_del_yn +
      ':' +
      add_orgcd +
      ':' +
      add_admin_yn
  );

  if (add_user_id == undefined || add_user_id == null) {
    res.status(400).json({ message: 'id가 입력되지 않았습니다.' });
  } else if (add_user_pwd == undefined || add_user_pwd == null) {
    res.status(400).json({ message: 'password가 입력되지 않았습니다.' });
  } else if (add_user_name == undefined || add_user_name == null) {
    res.status(400).json({ message: 'name이 입력되지 않았습니다.' });
  } else {
    var test = new sha256_Class();
    test.setHash(add_user_pwd);
    add_crypto_user_pwd = test.getHash();

    sqlQueryFunctions.addUser(
      add_user_id,
      add_user_pwd,
      add_user_name,
      add_user_dept,
      add_user_duty,
      add_user_tel,
      add_user_hp,
      add_user_fax,
      add_user_req_ymd,
      add_user_reg_ymd,
      add_user_del_yn,
      add_orgcd,
      add_admin_yn,
      add_crypto_user_pwd,
      add_admin_perm,
      function(err, DBConnection, docs, result) {
        console.log('addUser에서 addUser function 호출');

        if (err) {
          res
            .status(500)
            .json({ message: '회원 등록중에 에러가 발생했습니다.' });
        } else if (!DBConnection) {
          res
            .status(400)
            .json({ message: 'Database가 연결되어 있지 않습니다.' });
        } else if (docs) {
          console.dir('function의 docs:' + docs);
          res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
          res.write('<h1>등록 성공</h1>');
          res.write("<a href='/process/loginCheck'>돌아가기</a>");
          res.end();
        } else {
          console.dir('function의 docs:' + docs);
          res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
          res.write('<h1>등록 실패</h1>');
          res.write("<a href='/process/loginCheck'>돌아가기</a>");
          res.end();
        }
      }
    );
  }
}

//유저 정보를 불러내는 함수
function userAllListSelect(req, res) {
  sqlQueryFunctions.userList(function(err, DBConnection, docs, result) {
    console.log('userList에서 userList function 호출');

    if (err) {
      res
        .status(500)
        .json({ message: '회원 정보를 불러내는 중에 에러가 발생했습니다.' });
    } else if (!DBConnection) {
      res.status(400).json({ message: 'Database가 연결되어 있지 않습니다.' });
    } else if (docs) {
      console.dir('function의 docs:' + docs);
      res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
      res.write('<h1>불러내기 성공<h1>');
      for (i = 0; i < result.rows.length; i++) {
        res.write('<h3>');
        res.write('user [' + i + ']:');
        res.write('id: ' + result.rows[i].user_id + ' ');
        res.write('pwd: ' + result.rows[i].user_pwd + ' ');
        res.write('name: ' + result.rows[i].user_name + ' ');
        res.write('dept: ' + result.rows[i].user_dept + ' ');
        res.write('duty: ' + result.rows[i].user_duty + ' ');
        res.write('tel: ' + result.rows[i].user_tel + ' ');
        res.write('hp: ' + result.rows[i].user_hp + ' ');
        res.write('fax: ' + result.rows[i].user_fax + ' ');
        res.write('req_ymd: ' + result.rows[i].user_req_ymd + ' ');
        res.write('reg_ymd: ' + result.rows[i].user_reg_ymd + ' ');
        res.write('del_yn: ' + result.rows[i].user_del_yn + ' ');
        res.write('orgcd: ' + result.rows[i].orgcd + ' ');
        res.write('admin_yn: ' + result.rows[i].admin_yn + ' ');
        res.write('crypto_pwd:' + result.rows[i].crypto_user_pwd + ' ');
        res.write('admin_perm: ' + result.rows[i].admin_perm + ' ');
        res.write('</h3><br>');
      }
      res.write("<a href='/process/loginCheck'>돌아가기</a>");
      res.end();
    } else {
      console.dir('function의 docs:' + docs);
      res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
      res.write('<h1>불러내기 실패<h1>');
      res.write("<a href='/process/loginCheck'>돌아가기</a>");
      res.end();
    }
  });
}

//승인 신청자목록을 보여주는 페이지를 만드는 함수
function userPermissionPageMake(req, res) {
  sqlQueryFunctions.userListPermission(function(
    err,
    DBConnection,
    docs,
    errorMessage,
    result
  ) {
    if (err) {
      res
        .status(500)
        .json({ message: '회원 정보를 불러내는 중에 에러가 발생했습니다.' });
    } else if (!DBConnection) {
      res.status(400).json({ message: 'Database가 연결되어 있지 않습니다.' });
    } else if (docs) {
      console.dir('function의 docs:' + docs);

      //정보 보내기
      var context = { result: result.rows };
      //console.log('context::', context);
      return res.status(200).json(context);
    } else {
      console.dir('function의 docs:' + docs);

      res
        .status(500)
        .json({ message: '일반회원 가입 신청자 불러내기 실패' + errorMessage });
    }
  });
}

//유저를 승인할 지 거부할지 정하는 함수
function userPermission(req, res) {
  console.log(req.body)
  var user_id = req.body.user_id || req.query.user_id;
  var permission = req.body.permission || req.query.permission;
  var refuse = req.body.refuse || req.query.refuse;

  var user_id_array = [];
  // 유저를 1명 선택하면 user_id가 string으로 들어온다.
  // 그러나 유저를 2명이상 선택하면 user_id가 string을 원소로
  // 가지는 Array가 된다.
  if (typeof user_id == 'string') {
    user_id_array.push(user_id);
  } else {
    user_id_array = user_id.slice();
  }

  sqlQueryFunctions.userPermissionUpdate(
    user_id_array,
    permission,
    refuse,
    function(err, DBConnection, docs, errorMessage, result) {
      console.log('userPermission에서 userPermissionUpdate 호출');

      if (err) {
        res.status(500).json({
          message: '일반회원 승인을 처리하는 중에 에러가 발생했습니다.'
        });
      } else if (!DBConnection) {
        res.status(400).json({ message: 'Database가 연결되어 있지 않습니다.' });
      } else if (docs) {
        console.dir('function의 docs:' + docs);
        // res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        // res.write('<h1>일반회원 승인 처리 성공</h1>');
        // res.write("<a href='/process/userPermissionPage'>돌아가기</a>");
        // res.end();
        res.status(200).json({ message: '일반회원 승인 처리 성공' });
      } else {
        console.dir('function의 docs:' + docs);
        // res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        // res.write('<h1>일반회원 승인 처리 실패</h1>');
        // res.write("<a href='/process/userPermissionPage'>돌아가기</a>");
        // res.end();
        res
          .status(500)
          .json({ message: '일반회원 승인 처리 실패' + errorMessage });
      }
    }
  );
}

module.exports.userLogin = userLogin;
module.exports.userAddList = userAddList;
module.exports.userAllListSelect = userAllListSelect;
module.exports.userPermissionPageMake = userPermissionPageMake;
module.exports.userPermission = userPermission;
