from flask import Flask,render_template, request, redirect,jsonify
import sys
import pymysql
import hashlib
import datetime
import string
import random
app = Flask(__name__)

#===============================================================================================mysql 연결
mysql = pymysql.connect(host='52.79.226.172',port = 53139, user='root', password='songyeS0308!!',db='nabiDB', charset='utf8')

# create table user (
# user_no INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
# user_email VARCHAR(30) NOT NULL,
# user_pwd VARCHAR(50) NOT NULL,
# user_name VARCHAR(10) NOT NULL,
# user_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
# ) CHARSET=utf8;

#비대위 테이블
# create table comm (
# comm_no  INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
# comm_name VARCHAR(50) NOT NULL,
# comm_count INT UNSIGNED NOT NULL,
# comm_date  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
# ) CHARSET=utf8;

#온라인 행동 관련 테이블
# create table onAction(
# on_no int unsigned not null auto_increment primary key,
# on_type varchar(10) not null,
# on_title varchar(100) not null,
# on_start date not null,
# on_end date not null,
# on_count int unsigned,
# on_video varchar(30),
# on_content varchar(500) not null,
# on_link varchar(30) not null,
# on_status int(1) unsigned not null,
# on_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE  CURRENT_TIMESTAMP,
# comm_no int(10) unsigned not null
# ) CHARSET = utf8;

# alter table onAction add constraint
#     -> comm_no foreign key(comm_no)
#     -> references comm(comm_no);

#===============================================================================================회원가입
 #회원가입 관련 API part   
@app.route('/register',methods=['POST'])
def register():
    data = request.json
    curs = mysql.cursor()
    search_query = "select user_email from user where user_email="+'"'+data["email"]+'"'
    curs.execute(search_query)
    rows = curs.fetchall()
    if len(rows) >0:
        return { "result": "fail", "value":data,"message":"이미 계정이 존재합니다."}
    else:
        data["pwd"] = hashlib.sha1(data["pwd"].encode()).hexdigest()
        try:
            sql = "INSERT INTO `user` (`user_email`, `user_pwd`, `user_name`, `user_date`) VALUES (%s, %s,%s,now())"
            curs.execute(sql, (data["email"],data["pwd"],data["name"]))
            mysql.commit()
        except (MySQLdb.Error, MySQLdb.Warning) as e:
            print(e)
        finally:
            curs.close()
            return { "result": "success", "value": data,"message":"성공적으로 데이터베이스에 저장하였습니다."}

#===============================================================================================로그인
 #로그인 관련 API part 
@app.route('/login',methods=['POST'])
def login():
    data = request.json
    curs = mysql.cursor()
    data['pwd'] = hashlib.sha1(data["pwd"].encode()).hexdigest()
    try:
        search_query = "select user_email, user_pwd from user where user_email="+'"'+data["email"]+'" and '+ "user_pwd = "+'"'+data['pwd']+'"'
        curs.execute(search_query)
        login_result = curs.fetchall()
        if len(login_result) !=0:
            return { "result": "success", "value": data,"message":"로그인하였습니다."}
        else :
            return { "result": "fail", "value": data,"message":"이메일,비밀번호 중 일치하지 않는 것이 있습니다."}
    except (MySQLdb.Error, MySQLdb.Warning) as e:
        print(e) 
    
#===============================================================================================비밀번호 찾기 기능
@app.route('/findPwd',methods=['POST'])
def findPwd():
    data = request.json
    curs = mysql.cursor()
    if data["mode"] =='input':
        search_query = 'select user_email from user where user_email='+'"'+data["email"]+'"'
        curs.execute(search_query)
        search_result = curs.fetchall()
        if len(search_result) !=0:
            return { "result": "success", "value": data,"message":"임시 비밀번호가 발급되었습니다."}
            #임시 비밀번호 생성
            #데이터베이스에 저장하기
            #사용자에게 메일로 임시 비밀번호 알려주기 
        else:
            return { "result": "fail", "value": data,"message":"검색한 이메일이 데이터베이스에 없습니다."}

#===============================================================================================메인탭
@app.route('/main/<_userId>',methods=['GET'])
def main(_userId):
    result = {"userId": _userId}
    return { "result": "success", "value": result,"message":"성공적으로 조회하였습니다."}


#===============================================================================================검색탭
#검색어를 통해 검색하거나 분야별로 선택해서 원하는 비대위 검색하기 
@app.route('/comSearch/<_keyword>',methods=['GET'])
def comShow(_keyword):
    result = {"keyworkd": _keyword}
    return { "result": "success", "value": result,"message":"성공적으로 조회하였습니다."}
    
@app.route('/comSearch',methods=['POST'])
def comSearch():
        data = request.json
        return { "result": "success", "value": data,"message":"성공적으로 데이터베이스에 저장하였습니다."}

#===============================================================================================개별 비대위 페이지
#개별 비대위 페이지 API part
#진행중인 행동들, 대화 보여주기
@app.route('/<_comNo>/onGoing/<_order>',methods=['GET'])
def comOnGoing(_comNo,_order):
    result = {"committeeNo": _comNo, "order ": _order}
    return { "result": "success", "value": result,"message":"성공적으로 조회하였습니다."}

#내가 참여했던 행동들, 대화 보여주기 -> 내가 과거에 참여한 것들의 목록만 알기 위해서 나의 id가 필요함
@app.route('/<_comNo>/participate/<_userId>/<_order>',methods=['GET'])
def comParticipate(_comNo,_order,_userId):
    result = {"committeeNo": _comNo, "order": _order}
    return { "result": "success", "value": result,"message":"성공적으로 조회하였습니다."}

#내가 참여하진 않았지만 비대위에서 과거에 진행했었던 것들 목록 보여주기 
@app.route('/<_comNo>/archive/<_order>',methods=['GET'])
def comArchive(_comNo,_order):
    result = {"committeeNo": _comNo, "order": _order}
    return { "result": "success", "value": result,"message":"성공적으로 조회하였습니다."}

#확인할 수 있는 정보 목록 보여주기 
@app.route('/<_comNo>/info/<_order>',methods=['GET'])
def comInfo(_comNo,_order):
    result = {"committeeNo": _comNo, "order": _order}
    return { "result": "success", "value": result,"message":"성공적으로 조회하였습니다."}


#===============================================================================================온라인 행동 관련

@app.route('/on/listup/<_comNo>',methods=['GET'])
def onListup(_comNo):
    search_query = 'select * from onAction where comm_no='+_comNo
    curs = mysql.cursor()
    curs.execute(search_query)
    result = curs.fetchall()
    return { "result": "success", "value":result,"message":"성공적으로 조회하였습니다."}

@app.route('/on/read/<_comNo>/<_id>',methods=['GET'])
def onRead(_comNo,_id):
    search_query = 'select * from onAction where comm_no='+_comNo+" and on_no="+_id
    curs = mysql.cursor()
    curs.execute(search_query)
    result = curs.fetchall()
    return { "result": "success", "value": result,"message":"성공적으로 조회하였습니다."}

#===============================================================================================오프라인 행동 관련

@app.route('/off/listup/<_comNo>',methods=['GET'])
def offListup(_comNo):
    result = {"committeeNo": _comNo}
    return { "result": "success", "value": result,"message":"성공적으로 조회하였습니다."}

@app.route('/off/read/<_comNo>/<_id>',methods=['GET'])
def offRead(_comNo,_id):
    result = {"committeeNo": _comNo, "articleNo": _id}
    return { "result": "success", "value": result,"message":"성공적으로 조회하였습니다."}

@app.route('/off/write',methods=['POST'])
def offWrite():
        data = request.json
        return { "result": "success", "value": data,"message":"성공적으로 데이터베이스에 저장하였습니다."}

@app.route('/off/delete',methods=['POST'])
def offDelete():
    data = request.json
    return { "result": "success", "value": data,"message":"성공적으로 데이터베이스에 저장하였습니다."}
#===============================================================================================대화하기 관련

@app.route('/talk/listup/<_comNo>',methods=['GET'])
def talkListup(_comNo):
    result = {"committeeNo": _comNo}
    return { "result": "success", "value": result,"message":"성공적으로 조회하였습니다."}

@app.route('/talk/read/<_comNo>/<_id>',methods=['GET'])
def talkRead(_comNo,_id):
    result = {"committeeNo": _comNo,"articleId":_id}
    return { "result": "success", "value": result,"message":"성공적으로 조회하였습니다."}

@app.route('/talk/write',methods=['POST'])
def talkWrite():
    data = request.json
    return { "result": "success", "value": data,"message":"성공적으로 데이터베이스에 저장하였습니다."}

@app.route('/talk/update',methods=['POST'])
def talkUpdate():
    data = request.json
    return { "result": "success", "value": data,"message":"성공적으로 데이터베이스에 저장하였습니다."}

@app.route('/talk/delete',methods=['POST'])
def talkDelete():
    data = request.json
    return { "result": "success", "value": data,"message":"성공적으로 데이터베이스에 저장하였습니다."}


#===============================================================================================자료공유 관련
@app.route('/share/listup/<_comNo>',methods=['GET'])
def shareListup(_comNo):
    result = {"committeeNo": _comNo}
    return { "result": "success", "value": result,"message":"성공적으로 조회하였습니다."}

@app.route('/share/read/<_comNo>/<_id>',methods=['GET'])
def shareRead(_comNo,_id):
    result = {"committeeNo": _comNo,"articleId":_id}
    return { "result": "success", "value": result,"message":"성공적으로 조회하였습니다."}

@app.route('/share/write',methods=['POST'])
def shareWrite():
    data = request.json
    return { "result": "success", "value": data,"message":"성공적으로 데이터베이스에 저장하였습니다."}

@app.route('/share/update',methods=['POST'])
def shareUpdate():
    data = request.json
    return { "result": "success", "value": data,"message":"성공적으로 데이터베이스에 저장하였습니다."}

@app.route('/share/delete',methods=['POST'])
def shareDelete():
    data = request.json
    return { "result": "success", "value": data,"message":"성공적으로 데이터베이스에 저장하였습니다."}

#===============================================================================================포인트 관련
@app.route('/point/<_userId>/<_mode>',methods=['GET'])
def checkPoint(_userId,_mode):
    if _mode == 'rank':
        return { "result": "success", "value": '나의 순위를 볼 수 있는 페이지 렌더링',"message":"성공적으로 조회하였습니다."}
    elif _mode =='history':
        return { "result": "success", "value": '포인트 이력 내역을 확인할 수 있는 페이지 렌더링',"message":"성공적으로 조회하였습니다."}
    elif _mode =='standard':
        return { "result": "success", "value": '기준과 각각의 점수를 확인할 수 있는 페이지 렌더링',"message":"성공적으로 조회하였습니다."}

#===============================================================================================기록탭
#검색어를 통해 검색하거나 항목별로 내가 지금까지 어떤 활동들을 하였는지 모아볼 수 있음
@app.route('/actSearch/<_keyword>',methods=['GET'])
def actShow(_keyword):
    return { "result": "success", "value": "어떤 키워드도 입력하지 않았다면 기본적으로 내가 지금까지 했던 모든 활동들을 보여줌","message":"성공적으로 조회하였습니다."}

#==============================================================================================설정탭
#프로필 사진 바꾸기
@app.route('/setting/profile',methods=['POST'])
def changePic():
    data = request.json
    return { "result": "success", "value": data,"message":"성공적으로 데이터베이스에 저장하였습니다."}


#비밀번호 바꾸기
@app.route('/setting/pwd',methods=['POST'])
def changePwd():
    data = request.json
    return { "result": "success", "value": data,"message":"성공적으로 데이터베이스에 저장하였습니다."}
    # if _mode =='confirm':
    #     data = request.json
    #     return { "result": "success", "value": data}

    # elif _mode =='reset':
    #     data = request.json
    #     return { "result": "success", "value": data}


#닉네임 수정
@app.route('/setting/nickname',methods=['POST'])
def changeNickname():
    data = request.json
    return { "result": "success", "value": data,"message":"성공적으로 데이터베이스에 저장하였습니다."}


#건의 불편신고
@app.route('/setting/suggest',methods=['POST'])
def suggest():
    data = request.json
    return { "result": "success", "value": data,"message":"성공적으로 데이터베이스에 저장하였습니다."}


#탈퇴하기 -> 데이터베이스에 저장 필요
@app.route('/setting/withdraw',methods=['POST'])
def withdraw():
    data = request.json
    return { "result": "success", "value": data,"message":"성공적으로 데이터베이스에 저장하였습니다."}

#앱 정보 읽기 기능
#앱 정보에는 총 4가지가 있는데 각각을 숫자로 구분해서 읽을 수 있도록 해주기 
@app.route('/setting/info/<_no>',methods=['GET'])
def readInfo(_no):
    return { "result": "success", "value": "숫자에 따라서 특정 앱의 정보를 읽을 수 있음","message":"성공적으로 조회하였습니다."}

#푸시 설정
@app.route('/setting/push/<_mode>',methods=['GET'])
def push(_mode):
    result = {"choice":_mode}
    return { "result": "success", "value": result,"message":"성공적으로 조회하였습니다."}

#===============================================================================================함수들 구현 부분
    
#===============================================================================================서버 실행 부분 
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000,debug=True)


