//const database = require('./database');
const pgservice = require('../app/persistence/postgreSQL/db/pgservice');

//사용자를 인증하는 함수
var authUser = function(user_id, crypto_user_pwd, callback) {
  console.log('authUser function calling');

  Result_user_id(user_id, function(
    err,
    DBConnection,
    result_check_id,
    result1
  ) {
    if (err) {
      callback(
        err,
        DBConnection,
        null,
        'id 확인 중에 error가 발생했습니다.',
        null
      );
    } else if (!DBConnection) {
      callback(
        null,
        DBConnection,
        null,
        'Dababase가 연결되어 있지 않습니다.',
        null
      );
    } else if (result_check_id) {
      console.log('id가 일치합니다.');
      Result_user_pwd(user_id, crypto_user_pwd, function(
        err,
        DBConnection,
        result_check_pwd,
        result2
      ) {
        if (err) {
          callback(
            err,
            DBConnection,
            null,
            'password 확인 중에 error가 발생했습니다.',
            null
          );
        } else if (!DBConnection) {
          callback(
            null,
            DBConnection,
            null,
            'Dababase가 연결되어 있지 않습니다.',
            null
          );
        } else if (result_check_pwd) {
          console.log('password가 일치합니다.');

          callback(null, DBConnection, true, 'password가 일치합니다.', result2);
        } else {
          console.log('password가 틀림니다.');

          callback(null, DBConnection, false, 'password가 틀림니다.', null);
        }
      });
    } else {
      console.log('id가 틀림니다.');
      callback(null, DBConnection, false, 'id가 틀림니다.', null);
    }
  });
};

//id가 맞는지 확인하는 함수
function Result_user_id(user_id, callback) {
  console.log('user_id 확인 함수 시작');
  //지금은 관리자만 로그인이 가능하게 해 놓았다.
  const sql_read_user_id = {
    text:
      "SELECT user_id FROM public.members WHERE user_id=$1 AND admin_yn='Y'",
    values: [user_id]
  };

  pgservice.sql(sql_read_user_id, function(err, DBConnection, result) {
    console.log('err:' + err);
    console.log('DBConnection:' + DBConnection);
    console.log('res:' + result);

    if (err) {
      console.log(err);
      callback(err, DBConnection, false, null);
    } else if (!DBConnection) {
      callback(null, DBConnection, null, null);
    } else if (result.rows[0] == undefined || result.rows[0] == null) {
      console.log('읽어들인 id 값이 없습니다.');
      callback(null, DBConnection, false, null);
    } else {
      if (user_id == result.rows[0].user_id) {
        console.log('user_id = res_id.rows[0].user_id');
        callback(null, DBConnection, true, result);
      } else {
        console.log('user_id != res_id.rows[0].user_id');
        callback(null, DBConnection, false, null);
      }
    }
  });
}

//password가 맞는지 확인하는 함수
function Result_user_pwd(user_id, crypto_user_pwd, callback) {
  console.log('user_pwd 확인 함수 시작'); //실제로는 crypto_user_pwd를 읽어들인다.
  const sql_read_user_pwd = {
    text: 'SELECT crypto_user_pwd FROM public.members WHERE user_id=$1',
    values: [user_id]
  };

  pgservice.sql(sql_read_user_pwd, function(err, DBConnection, result) {
    console.log('err:' + err);
    console.log('DBConnection:' + DBConnection);
    console.log('res:' + result);

    if (err) {
      console.log(err);
      callback(err, DBConnection, false, null);
    } else if (!DBConnection) {
      callback(null, DBConnection, null, null);
    } else if (result.rows[0] == undefined || result.rows[0] == null) {
      console.log('읽어들인 password 값이 없습니다.');
      callback(null, DBConnection, false, null);
    } else {
      if (crypto_user_pwd == result.rows[0].crypto_user_pwd) {
        console.log('user_pwd = result.rows[0].user_pwd');
        callback(null, DBConnection, true, result);
      } else {
        console.log('user_pwd != result.rows[0].user_pwd');
        callback(null, DBConnection, false, null);
      }
    }
  });
}

//User를 추가하는 함수
function addUser(
  user_id,
  user_pwd,
  user_name,
  user_dept,
  user_duty,
  user_tel,
  user_hp,
  user_fax,
  user_req_ymd,
  user_reg_ymd,
  user_del_yn,
  orgcd,
  admin_yn,
  crypto_user_pwd,
  admin_perm,
  callback
) {
  //지금은 user_admin_yn = 'N'으로 고정해 놓았다.
  //지금은 admin_perm = 'W'으로 고정해 놓았다.
  const sql_insert_user = {
    text:
      'INSERT INTO public.members(user_id, user_pwd, user_name,' +
      'user_dept, user_duty, user_tel, user_hp, user_fax, user_req_ymd, user_reg_ymd,' +
      'user_del_yn, orgcd, admin_yn, crypto_user_pwd, admin_perm)' +
      'VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)',
    values: [
      user_id,
      user_pwd,
      user_name,
      user_dept,
      user_duty,
      user_tel,
      user_hp,
      user_fax,
      user_req_ymd,
      user_reg_ymd,
      user_del_yn,
      orgcd,
      admin_yn,
      crypto_user_pwd,
      admin_perm
    ]
  };

  pgservice.sql(sql_insert_user, function(err, DBConnection, result) {
    console.log('err:' + err);
    console.log('DBConnection:' + DBConnection);
    console.log('res:' + result);

    if (err) {
      console.log(err);
      callback(err, DBConnection, false, null);
    } else if (!DBConnection) {
      callback(null, DBConnection, null, null);
    } else if (result == undefined || err == true) {
      //등록이 실패하나 성공하나 err가 null 이다
      //반면 res는 undefined / [object Object] 이다
      console.log('err:' + err);
      callback(err, DBConnection, false, null);
    } else {
      console.log('insert success');

      callback(null, DBConnection, true, result);
    }
  });
}

//userList 를 불러내는 함수
function userList(callback) {
  const sql_select_user = {
    text: 'SELECT * FROM public.members'
  };

  pgservice.sql(sql_select_user, function(err, DBConnection, result) {
    console.log('err:' + err);
    console.log('DBConnection:' + DBConnection);
    console.log('res:' + result);

    if (err) {
      console.log(err);
      callback(err, DBConnection, false, null);
    } else if (!DBConnection) {
      callback(null, DBConnection, null, null);
    } else if (err == true || result == undefined) {
      console.log('query error');
      console.log(err);
      callback(err, DBConnection, false, null);
    } else {
      console.log('query success');

      callback(null, DBConnection, true, result);
    }
  });
}

//adminPermission에서 userList 를 불러내는 함수
function userListPermission(callback) {
  //callback(err, DBConnection ,docs,errorMessage, result)

  const sql_select_user = {
    text:
      "SELECT user_id, user_name, user_req_ymd, admin_perm FROM public.members WHERE admin_yn='N' ORDER BY user_req_ymd ASC"
  };

  pgservice.sql(sql_select_user, function(err, DBConnection, result) {
    console.log('err:' + err);
    console.log('DBConnection:' + DBConnection);
    console.log('res:' + result);

    if (err) {
      console.log(err);
      callback(
        err,
        DBConnection,
        false,
        '일반회원 확인 중 에러가 발생했습니다.',
        null
      );
    } else if (!DBConnection) {
      callback(
        null,
        DBConnection,
        null,
        'Database에 연결되어있지 않습니다.',
        null
      );
    } else if (err == true || result == undefined) {
      console.log('query error');
      console.log(err);
      callback(err, DBConnection, false, 'query에 문제가 있습니다.', null);
    } else {
      console.log('query success');

      callback(
        null,
        DBConnection,
        true,
        '일반회원 목록을 불러냈습니다.',
        result
      );
    }
  });
}

//userPermissionUpdate 을 불러내는 함수
function userPermissionUpdate(user_id_array, permission, refuse, callback) {
  //callback(err, DBConnection, docs, errorMessage, result)

  var set;

  if (permission != undefined) {
    set = 'Y';
  } else {
    set = 'N';
  }

  var valuesArray = [set];
  var textSQL = 'UPDATE public.members SET admin_perm = $1 WHERE user_id IN (';
  var inputString = '';

  for (var i = 0; i < user_id_array.length; i++) {
    valuesArray.push(user_id_array[i]);
  }
  for (var i = 0; i < user_id_array.length - 1; i++) {
    inputString = inputString + '$' + (i + 2) + ',';
  }
  inputString = inputString + '$' + (user_id_array.length + 1);
  textSQL = textSQL + inputString + ')';

  console.log(textSQL);
  console.log(valuesArray);

  const sql_admin_perm = {
    text: textSQL,
    values: valuesArray
  };

  pgservice.sql(sql_admin_perm, function(err, DBConnection, result) {
    console.log('err:' + err);
    console.log('DBConnection:' + DBConnection);
    console.log('res:' + result);

    if (err) {
      console.log(err);

      callback(
        err,
        DBConnection,
        false,
        '일반회원 확인 중 에러가 발생했습니다.',
        null
      );
    } else if (!DBConnection) {
      callback(
        null,
        DBConnection,
        null,
        'Database에 연결되어있지 않습니다.',
        null
      );
    } else if (err) {
      console.log('query error');
      console.log(err);
      callback(err, DBConnection, false, 'query에 문제가 있습니다.', null);
    } else {
      console.log('query success');

      callback(
        null,
        DBConnection,
        true,
        '일반회원 목록을 불러냈습니다.',
        result
      );
    }
  });
}

module.exports.authUser = authUser;
module.exports.Result_user_id = Result_user_id;
module.exports.Result_user_pwd = Result_user_pwd;
module.exports.addUser = addUser;
module.exports.userList = userList;
module.exports.userListPermission = userListPermission;
module.exports.userPermissionUpdate = userPermissionUpdate;
