from flask import Flask,render_template, request, redirect,jsonify
import sys
import pymysql
import hashlib
import datetime
app = Flask(__name__)

#===============================================================================================mysql 연결
mysql = pymysql.connect(host='52.79.226.172',port = 53139, user='root', password='songyeS0308!!',db='nabiDB', charset='utf8')

#===============================================================================================회원가입
 #회원가입 관련 API part   
@app.route('/register',methods=['POST'])
def register():
	data = request.json
	if data['email']=='':
		return {"result":"fail","value":data,"message":"이메일이 입력되지 않았습니다."}
	elif data["pwd"]=='':
		return {"result":"fail","value":data,"message":"비밀번호가 입력되지 않았습니다."}
	elif data['name']=='':
		return {"result":"fail","value":data,"message":"닉네임을 입력하지 않았습니다."}
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
	#user_status="0"이라면 로그인할 수 없음 -> 탈퇴하였으니까
	data = request.json
	if data["email"] =='':
		return {"result":"fail","value":data,"message":"이메일을 입력하지 않았습니다."}
	elif data['pwd']=='':
		return {"result":"fail","value":data,"message":"비밀번호를 입력하지 않았습니다."}
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
	finally :
		curs.close()
		
    
#===============================================================================================비밀번호 찾기 기능
@app.route('/findPwd',methods=['POST'])
def findPwd():
	data = request.json
	if data['email']=="":
		return { "result": "fail", "value": data,"message":"이메일을 입력하지 않았습니다."}
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
	curs = mysql.cursor()
	search_query = "select * from commUser where commUser_user_no=%s"
	curs.execute(search_query,(_userId))
	search_result = curs.fetchall()
	return { "result": "success", "value": search_result,"message":"성공적으로 조회하였습니다."}
	#관리자가 웹에 쓴 글을 바로 푸쉬 알람으로 사용자의 메인으로 보내주기 


#===============================================================================================검색탭 & 비대위 가입하기 
#검색어를 통해 검색하거나 분야별로 선택해서 원하는 비대위 검색하기 
@app.route('/comSearch/<_keyword>',methods=['GET'])
def comShow(_keyword):
	curs = mysql.cursor()
	search_query = "select * from comm where (comm_category like '%"+_keyword+"%')" + "or (comm_name like '%"+_keyword+"%')"
	curs.execute(search_query)
	search_result = curs.fetchall()
	return { "result": "success", "value": search_result,"message":"성공적으로 조회하였습니다."}

@app.route('/comJoin',methods=['POST'])
def comJoin():
	data = request.json
	curs = mysql.cursor()
	try:
		sql = "INSERT INTO `commUser` (`commUser_user_no`, `commUser_comm_no`, `commUser_date`) VALUES (%s,%s,now())"
		curs.execute(sql, (data["user_no"],data["comm_no"]))
		update_query = "UPDATE pointUser SET point_score = point_score + 10 WHERE point_user_no=%s"
		curs.execute(update_query, (data["user_no"]))
		mysql.commit()
	except (MySQLdb.Error, MySQLdb.Warning) as e:
		print(e)
	finally:
		curs.close()
		return { "result": "success", "value": data,"message":"성공적으로 비대위에 가입되었습니다."}

#비대위 탈퇴
@app.route('/comJoinDel',methods=['DELETE'])
def comJoinDel():
	data = request.json
	if data['user_no'] ==''or data['comm_no']=='':
		return {"result":"fail","value":data,"message":'사용자 번호 / 비대위 번호가 입력되지 않았습니다.'}
	curs = mysql.cursor()
	try:
		sql = "DELETE FROM commUser WHERE commUser_user_no=%s and commUser_comm_no=%s"
		curs.execute(sql, (data["user_no"],data["comm_no"]))
		update_query = "UPDATE pointUser SET point_score = point_score - 10 WHERE point_user_no=%s"
		curs.execute(update_query, (data["user_no"]))
		mysql.commit()
	except (MySQLdb.Error, MySQLdb.Warning) as e:
		print(e)
	finally:
		curs.close()
		return { "result": "success", "value": data,"message":"성공적으로 비대위를 탈퇴하였습니다."}
		
    
#===============================================================================================개별 비대위 페이지
#개별 비대위 페이지 API part
#진행중인 행동들, 대화 보여주기
@app.route('/<_comNo>/onGoing/<_order>',methods=['GET'])
def comOnGoing(_comNo,_order):
	curs = mysql.cursor()
	off_search_query = "select off_no,off_type,off_title,off_start,off_end,off_date from offAction where off_status = 1 and off_comm_no=%s"
	curs.execute(off_search_query,(_comNo))
	off_result = list(curs.fetchall())
	result_list = []
	for i in range(len(off_result)):
		line = []
		for j in range(6):
			line.append(off_result[i][j])
		result_list.append(line)
		
	on_search_query = "select on_no,on_type,on_title,on_start,on_end,on_date from onAction where on_status=1 and comm_no=%s"
	print(on_search_query)
	curs.execute(on_search_query,(_comNo))
	on_result = list(curs.fetchall())
	for i in range(len(on_result)):
		line = []
		for j in range(6):
			line.append(on_result[i][j])
		result_list.append(line)
		
	talk_search_query = 'select talk_no,talk_title,talk_start,talk_end,talk_date from talk where talk_status=1 and talk_comm_no=%s'
	curs.execute(talk_search_query,(_comNo))
	talk_result = list(curs.fetchall())
	for i in range(len(talk_result)):
		line = []
		for j in range(5):
			line.append(talk_result[i][j])
		line.insert(1, "talk")
		result_list.append(line)
	
	share_search_query = 'select share_no,share_title,share_start,share_end,share_date from share where share_status=1 and share_comm_no=%s'
	curs.execute(share_search_query,(_comNo))
	share_result = list(curs.fetchall())
	for i in range(len(share_result)):
		line = []
		for j in range(5):
			line.append(share_result[i][j])
		line.insert(1,"share")
		result_list.append(line)	
	
	result_list.sort(key=lambda result_list: result_list[5],reverse=True)	
	return { "result": "success", "value": result_list,"message":"성공적으로 조회하였습니다."}

#내가 참여했던 행동들, 대화 보여주기 -> 내가 과거에 참여한 것들의 목록만 알기 위해서 나의 id가 필요함
@app.route('/<_comNo>/participate/<_userId>/<_order>',methods=['GET'])
def comParticipate(_comNo,_order,_userId):
	curs = mysql.cursor()
	off_search_query = "SELECT off.off_no,off.off_type,off.off_title,off.off_start,off.off_end,off.off_date FROM offAction AS off JOIN offActionUser as offUser ON off.off_no = offUser.onUser_on_no WHERE offUser.onUser_user_no IN (%s) and off.off_comm_no=%s and off.off_status=0"
	print(off_search_query)
	curs.execute(off_search_query,(_userId,_comNo))
	off_result = list(curs.fetchall())
	result_list = []
	for i in range(len(off_result)):
		line = []
		for j in range(6):
			line.append(off_result[i][j])
		result_list.append(line)
		
		
	talk_search_query = "SELECT talk.talk_no,talk.talk_title,talk.talk_start,talk.talk_end,talk.talk_date FROM talk JOIN talkUser as user ON talk.talk_no = user.talkUser_talk_no WHERE user.talkUser_user_no IN (%s) and talk.talk_comm_no=%s and talk.talk_status=0"
	curs.execute(talk_search_query,(_userId,_comNo))
	talk_result = list(curs.fetchall())
	for i in range(len(talk_result)):
		line = []
		for j in range(5):
			line.append(talk_result[i][j])
		line.insert(1, "talk")
		result_list.append(line)
	
	share_search_query = "SELECT share.share_no,share.share_title,share.share_start,share.share_end,share.share_date FROM share JOIN shareUser as user ON share.share_no = user.shareUser_share_no WHERE user.shareUser_user_no IN (%s) and share.share_comm_no=%s and share.share_status=0"
	curs.execute(share_search_query,(_userId,_comNo))
	share_result = list(curs.fetchall())
	for i in range(len(share_result)):
		line = []
		for j in range(5):
			line.append(share_result[i][j])
		line.insert(1,"share")
		result_list.append(line)	
	
	#result_list.sort(key=lambda result_list: result_list[5],reverse=True)	
	return { "result": "success", "value": result_list,"message":"성공적으로 조회하였습니다."}

#내가 참여하진 않았지만 비대위에서 과거에 진행했었던 것들 목록 보여주기 
@app.route('/<_comNo>/archive/<_userId>/<_order>',methods=['GET'])
def comArchive(_comNo,_userId,_order):
	curs = mysql.cursor()
	off_search_query = "SELECT off.off_no,off.off_type,off.off_title,off.off_start,off.off_end,off.off_date FROM offAction AS off JOIN offActionUser as offUser ON off.off_no = offUser.onUser_on_no WHERE offUser.onUser_user_no NOT IN (%s) and off.off_comm_no=%s and off.off_status=0"
	curs.execute(off_search_query,(_userId,_comNo))
	off_result = list(curs.fetchall())
	result_list = []
	for i in range(len(off_result)):
		line = []
		for j in range(6):
			line.append(off_result[i][j])
		result_list.append(line)
		
	on_search_query = "select on_no,on_type,on_title,on_start,on_end,on_date from onAction where on_status=0 and comm_no=%s"
	curs.execute(on_search_query,(_comNo))
	on_result = list(curs.fetchall())
	for i in range(len(on_result)):
		line = []
		for j in range(6):
			line.append(on_result[i][j])
		result_list.append(line)
		
	talk_search_query = "SELECT talk.talk_no,talk.talk_title,talk.talk_start,talk.talk_end,talk.talk_date FROM talk JOIN talkUser as user ON talk.talk_no = user.talkUser_talk_no WHERE user.talkUser_user_no NOT IN (%s) and talk.talk_comm_no=%s and talk.talk_status=0"
	curs.execute(talk_search_query,(_userId,_comNo))
	talk_result = list(curs.fetchall())
	for i in range(len(talk_result)):
		line = []
		for j in range(5):
			line.append(talk_result[i][j])
		line.insert(1, "talk")
		result_list.append(line)
	
	share_search_query = "SELECT share.share_no,share.share_title,share.share_start,share.share_end,share.share_date FROM share JOIN shareUser as user ON share.share_no = user.shareUser_share_no WHERE user.shareUser_user_no NOT IN (%s) and share.share_comm_no=%s and share.share_status=0"
	curs.execute(share_search_query,(_userId,_comNo))
	share_result = list(curs.fetchall())
	for i in range(len(share_result)):
		line = []
		for j in range(5):
			line.append(share_result[i][j])
		line.insert(1,"share")
		result_list.append(line)	
	
	#result_list.sort(key=lambda result_list: result_list[5],reverse=True)	
	return { "result": "success", "value": result_list,"message":"성공적으로 조회하였습니다."}

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
    fetch_result = curs.fetchall()
    return { "result": "success", "value":fetch_result,"message":"성공적으로 조회하였습니다."}

@app.route('/on/read/<_comNo>/<_id>',methods=['GET'])
def onRead(_comNo,_id):
	search_query = 'select * from onAction where comm_no='+_comNo+" and on_no="+_id
	curs = mysql.cursor()
	curs.execute(search_query)
	fetch_result = curs.fetchall()
	return { "result": "success", "value": fetch_result,"message":"성공적으로 조회하였습니다."}

#===============================================================================================오프라인 행동 관련

@app.route('/off/listup/<_comNo>',methods=['GET'])
def offListup(_comNo):
	search_query = 'select * from offAction where off_comm_no='+_comNo
	curs = mysql.cursor()
	curs.execute(search_query)
	fetch_result = curs.fetchall()
	return { "result": "success", "value": fetch_result,"message":"성공적으로 조회하였습니다."}

@app.route('/off/read/<_comNo>/<_id>',methods=['GET'])
def offRead(_comNo,_id):
	search_query = 'select * from offAction where off_comm_no='+_comNo+" and off_no="+_id
	curs = mysql.cursor()
	curs.execute(search_query)
	fetch_result = curs.fetchall()
	return { "result": "success", "value": fetch_result,"message":"성공적으로 조회하였습니다."}

@app.route('/off/write',methods=['POST'])
def offWrite():
	data = request.json
	if data['content']=='':
		return {"result":"fali","value":data,"message":"내용이 입력되지 않았습니다."}
	curs = mysql.cursor()
	try:
		sql = "INSERT INTO `offActionUser` (`onUser_user_no`, `onUser_on_no`, `onUser_comm_no`, `onUser_content`,`onUser_date`) VALUES (%s, %s,%s,%s,now())"
		curs.execute(sql,(data["user_no"],data["on_no"],data["comm_no"],data["content"]))
		update_query = "UPDATE pointUser SET point_score = point_score + 5 WHERE point_user_no=%s"
		curs.execute(update_query, (data["user_no"]))
		mysql.commit()
	except (MySQLdb.Error, MySQLdb.Warning) as e:
		print(e)
	finally:
		curs.close()
		return { "result": "success", "value": data,"message":"성공적으로 데이터베이스에 저장하였습니다."}

@app.route('/off/update',methods=['PUT'])
def offUpdate():
	data = request.json
	if data['content']=='':
		return {"result":"fail","value":data,"message":"내용이 입력되지 않았습니다."}
	curs = mysql.cursor()
	try:
		sql = "UPDATE offActionUser SET onUser_content=%s, onUser_date= now() WHERE onUser_no= %s"
		curs.execute(sql,(data["content"],data["onUser_no"]))
		if data['content'] =='1':
			update_query = "UPDATE pointUser SET point_score = point_score + 5 WHERE point_user_no=%s"
			curs.execute(update_query, (data["user_no"]))
		else :
			update_query = "UPDATE pointUser SET point_score = point_score - 5 WHERE point_user_no=%s"
			curs.execute(update_query, (data["user_no"]))
		mysql.commit()
	except (MySQLdb.Error, MySQLdb.Warning) as e:
		print(e)
	finally:
		curs.close()
		return { "result": "success", "value": data,"message":"성공적으로 수정하였습니다."}
	
#===============================================================================================대화하기 관련

@app.route('/talk/listup/<_comNo>',methods=['GET'])
def talkListup(_comNo):
	search_query = 'select * from talk where talk_comm_no='+_comNo
	curs = mysql.cursor()
	curs.execute(search_query)
	fetch_result = curs.fetchall()
	return { "result": "success", "value": fetch_result,"message":"성공적으로 조회하였습니다."}

@app.route('/talk/read/<_comNo>/<_id>',methods=['GET'])
def talkRead(_comNo,_id):
	search_query = 'select * from talk where talk_comm_no='+_comNo+" and talk_no="+_id
	curs = mysql.cursor()
	curs.execute(search_query)
	fetch_result = curs.fetchall()
	return { "result": "success", "value": fetch_result,"message":"성공적으로 조회하였습니다."}

@app.route('/talk/write',methods=['POST'])
def talkWrite():
	data = request.json
	if data['content']=='':
		return {"result":"fail","value":data,"message":"내용이 입력되지 않았습니다."}
	curs = mysql.cursor()
	try:
		sql = "INSERT INTO `talkUser` (`talkUser_user_no`, `talkUser_talk_no`, `talkUser_comm_no`, `talkUser_content`,`talkUser_date`) VALUES (%s, %s,%s,%s,now())"
		curs.execute(sql,(data["user_no"],data["talk_no"],data["comm_no"],data["content"]))
		update_query = "UPDATE pointUser SET point_score = point_score +3 WHERE point_user_no=%s"
		curs.execute(update_query, (data["user_no"]))
		mysql.commit()
	except (MySQLdb.Error, MySQLdb.Warning) as e:
		print(e)
	finally:
		curs.close()
		return { "result": "success", "value": data,"message":"성공적으로 데이터베이스에 저장하였습니다."}
@app.route('/talk/update',methods=['PUT'])
def talkUpdate():
	data = request.json
	if data['content']=='':
		return {"result":"fail","value":data,"message":"내용이 입력되지 않았습니다."}
	curs = mysql.cursor()
	try:
		sql = "UPDATE talkUser SET talkUser_content=%s, talkUser_date= now() WHERE talkUser_no= %s"
		curs.execute(sql,(data["content"],data["talkUser_no"]))
		mysql.commit()
	except (MySQLdb.Error, MySQLdb.Warning) as e:
		print(e)
	finally:
		curs.close()
		return { "result": "success", "value": data,"message":"성공적으로 수정하였습니다."}

@app.route('/talk/delete',methods=['DELETE'])
def talkDelete():
	data = request.json
	curs = mysql.cursor()
	try:
		sql = "DELETE FROM talkUser WHERE talkUser_no=%s"
		curs.execute(sql,(data["talkUser_no"]))
		update_query = "UPDATE pointUser SET point_score = point_score -3 WHERE point_user_no=%s"
		curs.execute(update_query, (data["user_no"]))
		mysql.commit()
	except (MySQLdb.Error, MySQLdb.Warning) as e:
		print(e)
	finally:
		curs.close()
		return { "result": "success", "value": data,"message":"성공적으로 삭제하였습니다."}


#===============================================================================================자료공유 관련
@app.route('/share/listup/<_comNo>',methods=['GET'])
def shareListup(_comNo):
	search_query = 'select * from share where share_comm_no='+_comNo
	curs = mysql.cursor()
	curs.execute(search_query)
	fetch_result = curs.fetchall()
	return { "result": "success", "value": fetch_result,"message":"성공적으로 조회하였습니다."}

@app.route('/share/read/<_comNo>/<_id>',methods=['GET'])
def shareRead(_comNo,_id):
	search_query = 'select * from share where share_comm_no='+_comNo+" and share_no="+_id
	curs = mysql.cursor()
	curs.execute(search_query)
	fetch_result = curs.fetchall()
	return { "result": "success", "value": fetch_result,"message":"성공적으로 조회하였습니다."}

@app.route('/share/write',methods=['POST'])
def shareWrite():
	data = request.json
	if data['content']=='':
		return {"result":"fail","value":data,"message":"내용이 입력되지 않았습니다."}
	elif data['shareUser_img_1']=='':
		return {"result":"fail","value":data,"message":"사진이 선택되지 않았습니다."}
	curs = mysql.cursor()
	try:
		sql = "INSERT INTO `shareUser` (`shareUser_user_no`, `shareUser_share_no`, `shareUser_comm_no`,`shareUser_content`,`shareUser_img_1`,`shareUser_img_2`,`shareUser_img_3`,`shareUser_date`) VALUES ( %s,%s,%s,%s,%s,%s,%s,now())"
		curs.execute(sql,(data["user_no"],data["share_no"],data["comm_no"],data['content'],data['shareUser_img_1'],data['shareUser_img_2'],data['shareUser_img_3']))
		update_query = "UPDATE pointUser SET point_score = point_score +3 WHERE point_user_no=%s"
		curs.execute(update_query, (data["user_no"]))
		mysql.commit()
	except (MySQLdb.Error, MySQLdb.Warning) as e:
		print(e)
	finally:
		curs.close()
		return { "result": "success", "value": data,"message":"성공적으로 데이터베이스에 저장하였습니다."}

@app.route('/share/update',methods=['PUT'])
def shareUpdate():
	data = request.json
	if data['content']=='':
		return {"result":"fail","value":data,"message":"내용이 입력되지 않았습니다."}
	curs = mysql.cursor()
	try:
		sql = "UPDATE shareUser SET shareUser_content=%s, shareUser_img_1=%s,shareUser_img_2=%s,shareUser_img_3=%s,shareUser_date= now() WHERE shareUser_no= %s"
		curs.execute(sql,(data['content'],data['shareUser_img_1'],data['shareUser_img_2'],data['shareUser_img_3'],data['shareUser_no']))
		mysql.commit()
	except (MySQLdb.Error, MySQLdb.Warning) as e:
		print(e)
	finally:
		curs.close()
		return { "result": "success", "value": data,"message":"성공적으로 수정하였습니다."}

@app.route('/share/delete',methods=['DELETE'])
def shareDelete():
	data = request.json
	curs = mysql.cursor()
	try:
		sql = "DELETE FROM shareUser WHERE shareUser_no=%s"
		curs.execute(sql,(data["shareUser_no"]))
		update_query = "UPDATE pointUser SET point_score = point_score -3 WHERE point_user_no=%s"
		curs.execute(update_query, (data["user_no"]))
		mysql.commit()
	except (MySQLdb.Error, MySQLdb.Warning) as e:
		print(e)
	finally:
		curs.close()
		return { "result": "success", "value": data,"message":"성공적으로 삭제하였습니다."}

#===============================================================================================포인트 관련
@app.route('/point/<_mode>/<_userId>',methods=['GET'])
def checkPoint(_userId,_mode):
	curs = mysql.cursor()
	if _mode == 'rank':
		search_query = 'select * from pointUser where point_user_no=%s'
		curs.execute(search_query,(_userId))
		search_result = curs.fetchall()
		return { "result": "success", "value": search_result,"message":"성공적으로 조회하였습니다."}
	elif _mode =='history':
		#자료공유 검색
		search_share = 'select shareUser_share_no,shareUser_comm_no,shareUser_date from shareUser where shareUser_user_no='+_userId
		curs.execute(search_share)
		share_result = list(curs.fetchall())
		result_list = []
		for i in range(len(share_result)):
			line = ["share"] 
			for j in range(3):
				line.append(share_result[i][j])
			result_list.append(line)
	
		#대화하기 검색
		search_talk = 'select talkUser_talk_no,talkUser_comm_no,talkUser_date from talkUser where talkUser_user_no='+_userId
		curs.execute(search_talk)
		talk_result = list(curs.fetchall())
		for i in range(len(talk_result)):
			line = ["talk"] 
			for j in range(3):
				line.append(talk_result[i][j])
			result_list.append(line)
		#비대위 가입 검색
		search_comm= 'select commUser_comm_no,commUser_date from commUser where commUser_user_no='+_userId
		curs.execute(search_comm)
		comm_result = list(curs.fetchall())
		for i in range(len(comm_result)):
			line = ["comm","null"] 
			for j in range(2):
				line.append(comm_result[i][j])
			result_list.append(line)
		#오프라인 참여 검색
		search_off = 'select onUser_on_no,onUser_comm_no,onUser_date from offActionUser where onUser_user_no='+_userId
		curs.execute(search_off)
		offAction_result = list(curs.fetchall())
		for i in range(len(offAction_result)):
			line = ["off"] 
			for j in range(3):
				line.append(offAction_result[i][j])
			result_list.append(line)
		result_list.sort(key=lambda result_list: result_list[3],reverse=True)
		return { "result": "success", "value": result_list,"message":"성공적으로 조회하였습니다."}
	elif _mode =='standard':
		return { "result": "success", "value": '기준과 각각의 점수를 확인할 수 있는 페이지 렌더링',"message":"성공적으로 조회하였습니다."}


#===============================================================================================기록탭
#검색어를 통해 검색하거나 항목별로 내가 지금까지 어떤 활동들을 하였는지 모아볼 수 있음
@app.route('/actSearch/<_comNo>/<_type>/<_date>/<_userId>',methods=['GET'])
def actShow(_comNo,_type,_date,_userId):
	curs = mysql.cursor()
	off_search_query = "SELECT off.off_no,off.off_type,off.off_comm_no,off.off_date FROM offAction AS off JOIN offActionUser as offUser ON off.off_no = offUser.onUser_on_no WHERE offUser.onUser_user_no IN (%s)"
	curs.execute(off_search_query,(_userId))
	off_result = list(curs.fetchall())
	result_list = []
	for i in range(len(off_result)):
		line = []
		for j in range(4):
			line.append(off_result[i][j])
		result_list.append(line)
		
	comm_search_query = "select commUser_no,commUser_comm_no,commUser_date from commUser where commUser_user_no=%s"
	curs.execute(comm_search_query,(_userId))
	comm_result = list(curs.fetchall())
	for i in range(len(comm_result)):
		line = []
		for j in range(3):
			line.append(comm_result[i][j])
		line.insert(1, "comm")
		result_list.append(line)

	talk_search_query = "SELECT talk.talk_no,talk.talk_comm_no,talk.talk_date FROM talk JOIN talkUser as user ON talk.talk_no = user.talkUser_talk_no WHERE user.talkUser_user_no IN (%s)"
	curs.execute(talk_search_query,(_userId))
	talk_result = list(curs.fetchall())
	for i in range(len(talk_result)):
	 	line = []
	 	for j in range(3):
	 		line.append(talk_result[i][j])
	 	line.insert(1, "talk")
	 	result_list.append(line)
		
	share_search_query = "SELECT share.share_no,share.share_comm_no,share.share_date FROM share JOIN shareUser as user ON share.share_no = user.shareUser_share_no WHERE user.shareUser_user_no IN (%s)"
	curs.execute(share_search_query,(_userId))
	share_result = list(curs.fetchall())
	for i in range(len(share_result)):
	 	line = []
	 	for j in range(3):
	 		line.append(share_result[i][j])
	 	line.insert(1,"share")
	 	result_list.append(line)	
	
	if _comNo !='all' or _type!='all' or _date !='all':
		new_list = []
		for i in range(len(result_list)):
			if result_list[i][2] == int(_comNo) or result_list[i][1] == _type or result_list[i][3] == _date:
				new_list.append(result_list[i])
					
	new_list = []				
	if _comNo !='all' and _type=='all' and _date=='all':
		for i in range(len(result_list)):
			if result_list[i][2] == int(_comNo):
				new_list.append(result_list[i])
	
	elif _comNo =='all' and _type!='all' and _date=='all':
		for i in range(len(result_list)):
			if result_list[i][1] == _date:
				new_list.append(result_list[i])
				
	elif _comNo =='all' and _type=='all' and _date!='all':
		for i in range(len(result_list)):
			if result_list[i][3] == _date:
				new_list.append(result_list[i])
				
	elif _comNo !='all' and _type!='all' and _date=='all':
		for i in range(len(result_list)):
			if result_list[i][2] == int(_comNo) and result_list[i][1] == _type:
				new_list.append(result_list[i])
				
	elif _comNo !='all' and _type=='all' and _date!='all':
		for i in range(len(result_list)):
			if result_list[i][2] == int(_comNo) and result_list[i][3] == _date:
				new_list.append(result_list[i])
				
	elif _comNo =='all' and _type!='all' and _date!='all':
		for i in range(len(result_list)):
			if result_list[i][1] == _type and result_list[i][3] == _date:
				new_list.append(result_list[i])
				
	elif _comNo !='all' and _type!='all' and _date!='all':
		for i in range(len(result_list)):
			if result_list[i][2] == int(_comNo) and result_list[i][1] == _type and result_list[i][3] ==_date:
				new_list.append(result_list[i])
		
	
	return { "result": "success", "value":new_list,"message":"성공적으로 조회하였습니다."}

#==============================================================================================프로필 사진 바꾸기 
#프로필 사진 바꾸기
@app.route('/setting/profile',methods=['POST'])
def changePic():
	data = request.json
	curs = mysql.cursor()
	try:
		update_query = "UPDATE user SET user_pic = %s WHERE user_no=%s"
		curs.execute(update_query, (data["user_pic"],data['user_no']))
		mysql.commit()
	except (MySQLdb.Error, MySQLdb.Warning) as e:
		print(e)
	finally:
		curs.close()
		return { "result": "success", "value": data,"message":"성공적으로 프로필 사진을 수정하였습니다."}
	

#==============================================================================================비밀번호 수정
@app.route('/setting/pwd',methods=['POST'])
def changePwd():
	data = request.json
	if data['user_pwd']=='':
		return {"result":"fail","value":data,"message":"비밀번호를 입력하지 않았습니다."}
	data['user_pwd'] = hashlib.sha1(data["user_pwd"].encode()).hexdigest()
	curs = mysql.cursor()
	if data['mode'] =='confirm':
		search_query = "select user_email from user where user_pwd=%s and user_no=%s"
		curs.execute(search_query,(data['user_pwd'],data['user_no']))
		login_result = curs.fetchall()
		if len(login_result) !=0:
			return { "result": "success", "value": data,"message":"비밀번호를 확인하였습니다.."}
		else :
			return { "result": "fail", "value": data,"message":"비밀번호가 일치하지 않습니다."}
	elif data['mode']=='reset':
		try:
			update_query = "UPDATE user SET user_pwd = %s WHERE user_no=%s"
			curs.execute(update_query, (data['user_pwd'],data["user_no"]))
			mysql.commit()
		except (MySQLdb.Error, MySQLdb.Warning) as e:
			print(e)
		finally:
			curs.close()
			return { "result": "success", "value": data,"message":"성공적으로 비밀번호를 수정하였습니다."}
		

#==============================================================================================닉네임 수정
@app.route('/setting/nickname',methods=['PUT'])
def changeNickname():
	data = request.json
	if data['user_name'] =='':
		return { "result": "fail", "value": data,"message":"이름을 입력하지 않았습니다."}
	curs = mysql.cursor()
	try:
		update_query = "UPDATE user SET user_name = %s WHERE user_no=%s"
		curs.execute(update_query, (data['user_name'],data["user_no"]))
		mysql.commit()
	except (MySQLdb.Error, MySQLdb.Warning) as e:
		print(e)
	finally:
		curs.close()
		return { "result": "success", "value": data,"message":"성공적으로 닉네임을 수정하였습니다."}


#==============================================================================================건의사항 제출
@app.route('/setting/suggest',methods=['POST'])
def suggest():
	data = request.json
	if data['content']=='':
		return { "result": "fail", "value": data,"message":"내용을 입력하지 않았습니다."}
	curs = mysql.cursor()
	try:
		insert_query = "INSERT INTO `proposal` (`pro_user_no`, `pro_content`, `pro_date`) VALUES (%s,%s,now())"
		curs.execute(insert_query,(data["user_no"],data["content"]))
		mysql.commit()
	except (MySQLdb.Error, MySQLdb.Warning) as e:
		print(e)
	finally:
		curs.close()
		return { "result": "success", "value": data,"message":"성공적으로 데이터베이스에 저장하였습니다."}

#==============================================================================================탈퇴하기
#탈퇴하면 데이터베이스를 어떻게 처리해주어야 할까?
@app.route('/setting/withdraw',methods=['POST'])
def withdraw():
	data = request.json
	curs = mysql.cursor()
	try:
		update_query = "UPDATE user SET user_status = %s WHERE user_no=%s"
		curs.execute(update_query, (data['user_status'],data["user_no"]))
		mysql.commit()
	except (MySQLdb.Error, MySQLdb.Warning) as e:
		print(e)
	finally:
		curs.close()
		return { "result": "success", "value": data,"message":"성공적으로 탈퇴하였습니다."}

#==============================================================================================앱 정보 읽기
#앱 정보에는 총 4가지가 있는데 각각을 숫자로 구분해서 읽을 수 있도록 해주기 
#꼭 데이터베이스에 저장해야 될까?
@app.route('/setting/info/<_no>',methods=['GET'])
def readInfo(_no):
    return { "result": "success", "value": "숫자에 따라서 특정 앱의 정보를 읽을 수 있음","message":"성공적으로 조회하였습니다."}

#==============================================================================================푸시 설정
@app.route('/setting/push',methods=['PUT'])
def push():
	data = request.json
	curs = mysql.cursor()
	try:
		update_query = "UPDATE user SET user_push = %s WHERE user_no=%s"
		curs.execute(update_query, (data['user_push'],data["user_no"]))
		mysql.commit()
	except (MySQLdb.Error, MySQLdb.Warning) as e:
		print(e)
	finally:
		curs.close()
		return { "result": "success", "value": data,"message":"성공적으로 수정하였습니다."}
	

#===============================================================================================서버 실행 부분 
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000,debug=True)