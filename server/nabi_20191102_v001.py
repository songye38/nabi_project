from flask import Flask,render_template, request, redirect,jsonify
import sys
import pymongo
import hashlib
import datetime
import json
from bson import json_util
from bson.objectid import ObjectId
from pymongo import MongoClient
app = Flask(__name__)

#===============================================================================================mysql 연결
client = MongoClient(host= '54.180.119.118', port =53766)
db = client.nabiDB
#===============================================================================================회원가입
 #회원가입 관련 API part   
@app.route('/register',methods=['POST'])
def register():
	data = request.json
	#데이터 자체가 들어오지 않았으면 에러 표시 
	if data['email']=='':
		return {"result":"fail","value":data,"message":"이메일이 입력되지 않았습니다."}
	elif data["pwd"]=='':
		return {"result":"fail","value":data,"message":"비밀번호가 입력되지 않았습니다."}
	elif data['name']=='':
		return {"result":"fail","value":data,"message":"닉네임을 입력하지 않았습니다."}
	
	
	#같은 이메일 주소를 가진 사람이 이미 있다면 다른 이메일을 사용하라는 에러 메세지 표시 
	result_len = db.user.count_documents({"email": data['email']})
	if result_len >0:
		return { "result": "fail", "value":data,"message":"이미 계정이 존재합니다."}
	#같은 이메일 주소를 가진 사람이 없을 경우에만 데이터베이스에 저장
	else :
		data["pwd"] = hashlib.sha1(data["pwd"].encode()).hexdigest()
		db.user.insert_one({"email":data["email"],"pwd":data["pwd"],"name":data["name"],"pic":"Null","date":datetime.datetime.utcnow(),"status ":1,"push":1})
		return {"result":"success","value":data,"message":"저장 성공."}

# #===============================================================================================로그인
#  #로그인 관련 API part 
@app.route('/login',methods=['POST'])
def login():
	#user_status="0"이라면 로그인할 수 없음 -> 탈퇴하였으니까
	data = request.json
	if data["email"] =='':
		return {"result":"fail","value":data,"message":"이메일을 입력하지 않았습니다."}
	elif data['pwd']=='':
		return {"result":"fail","value":data,"message":"비밀번호를 입력하지 않았습니다."}
	
	data['pwd'] = hashlib.sha1(data["pwd"].encode()).hexdigest()
	result_len = db.user.count_documents({"email": data['email'],"pwd":data['pwd']})
	if  result_len!=0:
			return { "result": "success", "value": data,"message":"로그인하였습니다."}
	else :
		return { "result": "fail", "value": data,"message":"이메일,비밀번호 중 일치하지 않는 것이 있습니다."}
		
    
# #===============================================================================================비밀번호 찾기 기능
# @app.route('/findPwd',methods=['POST'])
# def findPwd():
# 	data = request.json
# 	if data['email']=="":
# 		return { "result": "fail", "value": data,"message":"이메일을 입력하지 않았습니다."}
# 	curs = mysql.cursor()
# 	if data["mode"] =='input':
# 		search_query = 'select user_email from user where user_email='+'"'+data["email"]+'"'
# 		curs.execute(search_query)
# 		search_result = curs.fetchall()
# 		if len(search_result) !=0:
# 			return { "result": "success", "value": data,"message":"임시 비밀번호가 발급되었습니다."}
#             #임시 비밀번호 생성
#             #데이터베이스에 저장하기
#             #사용자에게 메일로 임시 비밀번호 알려주기 
# 		else:
# 			return { "result": "fail", "value": data,"message":"검색한 이메일이 데이터베이스에 없습니다."}

# #===============================================================================================메인탭
@app.route('/main/<_userId>',methods=['GET'])
def main(_userId):
    results = db.comm.find({"userList.user_id": ObjectId(_userId)})
    json_docs = []
    for doc in results:
        json_doc = json.dumps(doc,default=json_util.default)
        o = json.loads(json_doc)
        json_docs.append(o)
    return { "result": "success", "value": json_docs,"message":"성공적으로 조회하였습니다."}
# 	#관리자가 웹에 쓴 글을 바로 푸쉬 알람으로 사용자의 메인으로 보내주기 

# #===============================================================================================검색탭 & 비대위 가입하기 
#검색어를 통해 검색하거나 분야별로 선택해서 원하는 비대위 검색하기 
@app.route('/comSearch/<_keyword>',methods=['GET'])
def comShow(_keyword):
    if _keyword =='all':
        results = db.comm.find()
        json_docs = []
        for doc in results:
            json_doc = json.dumps(doc, default=json_util.default)
            o = json.loads(json_doc)
            json_docs.append(o)
        return { "result": "success", "value": json_docs,"message":"성공적으로 조회하였습니다."}
    else:
        results = db.comm.find({ "$or": [{"name": {"$regex":_keyword,"$options":"i"}}, {"category": {"$regex":_keyword ,"$options":"i"}}]})
        json_docs = []
        for doc in results:
            json_doc = json.dumps(doc, default=json_util.default)
            o = json.loads(json_doc)
            json_docs.append(o)
        return { "result": "success", "value": json_docs,"message":"성공적으로 조회하였습니다."}
    
@app.route('/searchJoinStatus/<_comId>/<_userId>',methods = ['GET'])
def joinStatusSearch(_comId,_userId):
    result_len = db.comm.count_documents({ "$and": [{"_id": ObjectId(_comId)},{"userList.user_id": ObjectId(_userId)}]})
    return { "result": "success", "value":result_len,"message":"성공적으로 조회하였습니다."}
    
    
@app.route('/search/<_comId>',methods=['GET'])
def comSearch(_comId):
        results = db.comm.find({"_id":ObjectId(_comId)})
        json_docs = []
        for doc in results:
            json_doc = json.dumps(doc, default=json_util.default)
            o = json.loads(json_doc)
            json_docs.append(o)
        return { "result": "success", "value": json_docs,"message":"성공적으로 조회하였습니다."}

@app.route('/comJoin',methods=['POST'])
def comJoin():
    data = request.json
    if data['user_status'] ==0:
        db.comm.update_one({"_id" : ObjectId(data['comm_id'])},{"$push":{"userList":{"user_id":ObjectId(data['user_id']),"date": datetime.datetime.utcnow(),}}})
        db.point.update_one({"user_id" : ObjectId(data['user_id'])},{"$push":{"pointList":{"comm_id" : ObjectId(data['comm_id']),"comm_name" : data['comm_name'],"comm_pic" : data['comm_pic'],"action_id" : data['comm_id'],"type" : 'join_comm',"date" : datetime.datetime.utcnow()}}})
        db.point.update_one({"user_id" : ObjectId(data['user_id'])},{ "$inc": { "score": +10}})
        return { "result": "success", "value": "success","message":"성공적으로 조회하였습니다."}
    else :
        db.comm.update_one({ "_id": ObjectId(data['comm_id'])},{ "$pull": { "userList": { "user_id": ObjectId(data['user_id'])}}});
        db.point.update_one({"user_id" : ObjectId(data['user_id'])},{"$push":{"pointList":{"comm_id" : ObjectId(data['comm_id']),"comm_name" : data['comm_name'],"comm_pic" : data['comm_pic'],"action_id" : data['comm_id'],"type" : 'del_comm',"date" : datetime.datetime.utcnow()}}})
        db.point.update_one({"user_id" : ObjectId(data['user_id'])},{ "$inc": { "score": -10}})
        return { "result": "success", "value": data,"message":"성공적으로 비대위를 탈퇴하였습니다."}
            
@app.route('/categorySearch',methods=['GET'])
def categorySearch():
    results = db.comm.distinct( "category")
    json_docs =[]
    for doc in results:
        json_doc = json.dumps(doc,default=json_util.default)
        o = json.loads(json_doc)
        json_docs.append(o)
    return { "result": "success", "value": json_docs,"message":"성공적으로 조회하였습니다."}
    
		
    
# #===============================================================================================개별 비대위 페이지
#개별 비대위 페이지 API part
#진행중인 행동들, 대화 보여주기
@app.route('/<_comId>/onGoing',methods=['GET'])
def comOnGoing(_comId):	
    offAction_results = db.offAction.find({ "$and": [{"comm_id": ObjectId(_comId)}, {"status": 1 }]})
    onAction_results = db.onAction.find({ "$and": [{"comm_id": ObjectId(_comId)}, {"status": 1 }]})
    talk_results = db.talk.find({ "$and": [{"comm_id": ObjectId(_comId)}, {"status": 1 }]})
    share_results = db.share.find({ "$and": [{"comm_id": ObjectId(_comId)}, {"status": 1 }]})
    json_docs = []
    for doc in offAction_results:
        json_doc = json.dumps(doc, default=json_util.default)
        o = json.loads(json_doc)
        json_docs.append(o)
    for doc in onAction_results:
        json_doc = json.dumps(doc, default=json_util.default)
        o = json.loads(json_doc)
        json_docs.append(o)
    for doc in talk_results:
        json_doc = json.dumps(doc, default=json_util.default)
        o = json.loads(json_doc)
        json_docs.append(o)
    for doc in share_results:
        json_doc = json.dumps(doc, default=json_util.default)
        o = json.loads(json_doc)
        json_docs.append(o)
    return { "result": "success", "value": json_docs,"message":"성공적으로 조회하였습니다."}

# 내가 참여했던 목록들만 보여주기 
@app.route('/<_comId>/participate/<_userId>',methods=['GET'])
def comParticipate(_comId,_userId):
    offAction_results = db.offAction.find({ "$and": [{"comm_id": ObjectId(_comId)},{ "userList.user_id": ObjectId(_userId)}]})
    onAction_results = db.onAction.find({ "$and": [{"comm_id": ObjectId(_comId)},{ "userList.user_id" : ObjectId(_userId)}]})
    talk_results = db.talk.find({ "$and": [{"comm_id": ObjectId(_comId)},{ "userList.user_id": ObjectId(_userId)}]})
    share_results = db.share.find({ "$and": [{"comm_id": ObjectId(_comId)},{ "userList.user_id": ObjectId(_userId)}]})
    json_docs = []
    for doc in offAction_results:
        json_doc = json.dumps(doc, default=json_util.default)
        o = json.loads(json_doc)
        json_docs.append(o)
    for doc in onAction_results:
        json_doc = json.dumps(doc, default=json_util.default)
        o = json.loads(json_doc)
        json_docs.append(o)
    for doc in talk_results:
        json_doc = json.dumps(doc, default=json_util.default)
        o = json.loads(json_doc)
        json_docs.append(o)
    for doc in share_results:
        json_doc = json.dumps(doc, default=json_util.default)
        o = json.loads(json_doc)
        json_docs.append(o)
    return { "result": "success", "value": json_docs,"message":"성공적으로 조회하였습니다."}


# #내가 참여하진 않았지만 비대위에서 과거에 진행했었던 것들 목록 보여주기 
@app.route('/<_comId>/archive/<_userId>',methods=['GET'])
def comArchive(_comId,_userId):
    offAction_results = db.offAction.find({ "$and": [{"comm_id": ObjectId(_comId)}, {"status": 0 },{ "userList.user_id" : {"$ne": ObjectId(_userId)}}]})
    onAction_results = db.onAction.find({ "$and": [{"comm_id": ObjectId(_comId)}, {"status": 0 },{ "userList.user_id" : {"$ne": ObjectId(_userId)}}]})
    talk_results = db.talk.find({ "$and": [{"comm_id": ObjectId(_comId)}, {"status": 0 },{ "userList.user_id" : {"$ne": ObjectId(_userId)}}]})
    share_results = db.share.find({ "$and": [{"comm_id": ObjectId(_comId)}, {"status": 0 },{ "userList.user_id" : {"$ne": ObjectId(_userId)}}]})
    json_docs = []
    for doc in offAction_results:
        json_doc = json.dumps(doc, default=json_util.default)
        o = json.loads(json_doc)
        json_docs.append(o)
    for doc in onAction_results:
        json_doc = json.dumps(doc, default=json_util.default)
        o = json.loads(json_doc)
        json_docs.append(o)
    for doc in talk_results:
        json_doc = json.dumps(doc, default=json_util.default)
        o = json.loads(json_doc)
        json_docs.append(o)
    for doc in share_results:
        json_doc = json.dumps(doc, default=json_util.default)
        o = json.loads(json_doc)
        json_docs.append(o)
    return { "result": "success", "value": json_docs,"message":"성공적으로 조회하였습니다."}

# #확인할 수 있는 정보 목록 보여주기 
# @app.route('/<_comNo>/info/<_order>',methods=['GET'])
# def comInfo(_comNo,_order):
#     result = {"committeeNo": _comNo, "order": _order}
#     return { "result": "success", "value": result,"message":"성공적으로 조회하였습니다."}


# #===============================================================================================온라인 행동 관련

@app.route('/on/listup/<_comId>',methods=['GET'])
def onListup(_comId):
    results = db.onAction.find({"comm_id": ObjectId(_comId)})
    json_docs = []
    for doc in results:
        json_doc = json.dumps(doc, default=json_util.default)
        o = json.loads(json_doc)
        json_docs.append(o)
    return { "result": "success", "value": json_docs,"message":"성공적으로 조회하였습니다."}

@app.route('/on/read/<_comId>/<_id>',methods=['GET'])
def onRead(_comId,_id):
    results = db.onAction.find({"comm_id": ObjectId(_comId),"_id":ObjectId(_id)})
    json_docs = []
    for doc in results:
        json_doc = json.dumps(doc, default=json_util.default)
        o = json.loads(json_doc)
        json_docs.append(o)
    return { "result": "success", "value": json_docs,"message":"성공적으로 조회하였습니다."}

# #===============================================================================================오프라인 행동 관련

@app.route('/off/listup/<_comId>',methods=['GET'])
def offListup(_comId):
    results = db.offAction.find({"comm_id": ObjectId(_comId)})
    json_docs = []
    for doc in results:
        json_doc = json.dumps(doc, default=json_util.default)
        o = json.loads(json_doc)
        json_docs.append(o)
    return { "result": "success", "value": json_docs,"message":"성공적으로 조회하였습니다."}

@app.route('/off/read/<_comId>/<_id>',methods=['GET'])
def offRead(_comId,_id):
    results = db.offAction.find({"comm_id": ObjectId(_comId),"_id":ObjectId(_id)})
    json_docs = []
    for doc in results:
        json_doc = json.dumps(doc, default=json_util.default)
        o = json.loads(json_doc)
        json_docs.append(o)
    return { "result": "success", "value": json_docs,"message":"성공적으로 조회하였습니다."}

@app.route('/off/write',methods=['POST'])
def offWrite():
    data = request.json
    result_len = db.offAction.count_documents({"userList.user_id": ObjectId(data['user_id'])})
    if result_len !=0 :
        return { "result": "fail", "value": "fail","message":"이미 참여하였습니다."}
    else :
        db.offAction.update_one({"_id" : ObjectId(data['offaction_id'])},{"$push":{"userList":{
			 "user_id":ObjectId(data['user_id']),
			 "date": datetime.datetime.utcnow(),
		   }}})
        db.point.update_one({"user_id" : ObjectId(data['user_id'])},{"$push":{"pointList":{"comm_id" : ObjectId(data['comm_id']),"comm_name" : data['comm_name'],"comm_pic" : data['comm_pic'],"action_id" : data['offaction_id'],"type" : 'join_off',"date" : datetime.datetime.utcnow()}}})
        db.point.update_one({"user_id" : ObjectId(data['user_id'])},{ "$inc": { "score": +5}})
        return { "result": "success", "value": data,"message":"성공적으로 데이터베이스에 저장하였습니다."}

@app.route('/off/update',methods=['PUT'])
def offUpdate():
    data = request.json
    db.offAction.update_one({ "_id": ObjectId(data["offaction_id"])},{ "$pull": { "userList": {"user_id": ObjectId(data["user_id"])}}});
    db.point.update_one({"user_id" : ObjectId(data['user_id'])},{"$push":{"pointList":{"comm_id" : ObjectId(data['comm_id']),"comm_name" : data['comm_name'],"comm_pic" : data['comm_pic'],"action_id" : data['offaction_id'],"type" : 'del_off',"date" : datetime.datetime.utcnow()}}})
    db.point.update_one({"user_id" : ObjectId(data['user_id'])},{ "$inc": { "score": -5}})
    return { "result": "success", "value": "success","message":"성공적으로 수정하였습니다."}
	
	
# #===============================================================================================대화하기 관련

@app.route('/talk/listup/<_comId>',methods=['GET'])
def talkListup(_comId):
    results = db.talk.find({"comm_id": ObjectId(_comId)})
    json_docs = []
    for doc in results:
        json_doc = json.dumps(doc, default=json_util.default)
        o = json.loads(json_doc)
        json_docs.append(o)
    return { "result": "success", "value": json_docs,"message":"성공적으로 조회하였습니다."}

@app.route('/talk/read/<_comId>/<_id>',methods=['GET'])
def talkRead(_comId,_id):
    isUserListExist = db.talk.count_documents({"comm_id": ObjectId(_comId),"_id":ObjectId(_id),"userList": { "$exists": "true" }})
    if isUserListExist==1:
        results= db.talk.aggregate([
        { "$match": {"_id" : ObjectId(_id)}},
        { "$unwind": "$userList" },
        { "$match": {"comm_id": ObjectId(_comId)}},
        { "$sort": {"userList.date": -1}}
        ])
    else:
        results= db.talk.aggregate([
        { "$match": {"_id" : ObjectId(_id)}},
        { "$match": {"comm_id": ObjectId(_comId)}},
        ])
        
    #아직 아무도 댓글을 안달아서 userList가 없을수도 있음  -> 이럴경우 에러체크 하기 다른 방식으로 데이터 뿌려주기 
    json_docs = []
    for doc in results:
        json_doc = json.dumps(doc, default=json_util.default)
        o = json.loads(json_doc)
        json_docs.append(o)
    return { "result": "success", "value": json_docs,"message":"성공적으로 조회하였습니다."}


@app.route('/talk/write',methods=['POST'])
def talkWrite():
    data = request.json
    if data['content']=='':
        return {"result":"fail","value":data,"message":"내용이 입력되지 않았습니다."}
    db.talk.update_one({"_id" : ObjectId(data['talk_id'])},{"$push":{"userList":{"user_id":ObjectId(data['user_id']),"content" : data['content'],"date": datetime.datetime.utcnow(),
		   }}})
    #commentStatus값이 0이라면 1로 수정하기 이미 1이라면 수정 필요없음
    db.talk.update_one({"_id" : ObjectId(data['talk_id'])},{ "$set": {"commentStatus":1}})
    db.point.update_one({"user_id" : ObjectId(data['user_id'])},{"$push":{"pointList":{"comm_id" : ObjectId(data['comm_id']),"comm_name" : data['comm_name'],"comm_pic" : data['comm_pic'],"action_id" : data['talk_id'],"type" : 'join_talk',"date" : datetime.datetime.utcnow()}}})
    db.point.update_one({"user_id" : ObjectId(data['user_id'])},{ "$inc": { "score": +3}})
    return { "result": "success", "value": data,"message":"성공적으로 데이터베이스에 저장하였습니다."}


@app.route('/talk/update',methods=['PUT'])
def talkUpdate():
    data = request.json
    if data['content']=='':
        return {"result":"fail","value":data,"message":"내용이 입력되지 않았습니다."}
    db.talk.update_one({"_id":ObjectId(data['talk_id']),"userList.user_id": ObjectId(data['user_id'])}, { "$set": {"userList.$.content": data['content'],"userList.$.date":datetime.datetime.utcnow()}})
    db.point.update_one({"user_id" : ObjectId(data['user_id'])},{"$push":{"pointList":{"comm_id" : ObjectId(data['comm_id']),"comm_name" : data['comm_name'],"comm_pic" : data['comm_pic'],"action_id" : data['talk_id'],"type" : 'edit_talk',"date" : datetime.datetime.utcnow()}}})
    return {"result":"success","value":data,"message":"내용이 정상적으로 수정되었습니다."}

@app.route('/talk/delete',methods=['DELETE'])
def talkDelete():
    data = request.json
    db.talk.update_one({ "_id": ObjectId(data['talk_id'])},{ "$pull": { "userList": { "user_id": ObjectId(data['user_id'])}}});
    db.point.update_one({"user_id" : ObjectId(data['user_id'])},{"$push":{"pointList":{"comm_id" : ObjectId(data['comm_id']),"comm_name" : data['comm_name'],"comm_pic" : data['comm_pic'],"action_id" : data['talk_id'],"type" : 'del_talk',"date" : datetime.datetime.utcnow()}}})
    db.point.update_one({"user_id" : ObjectId(data['user_id'])},{ "$inc": { "score": -3}})
    return {"result":"success","value":data,"message":"내용이 정상적으로 삭제되었습니다.."}

	
@app.route('/talk/like/<_talkId>/<_talkUser_Id>/<_userId>',methods=['GET'])
def talkLike(_talkId,_talkUser_Id,_userId):
    result_len = db.heart.count_documents({"user_id":_userId})
    if result_len ==0:
        db.heart.insert({"user_id" : ObjectId(_userId)},{"heartList":{"action_id" : ObjectId(_talkId),"target_user_id":ObjectId(_talkUser_Id),"status" : 1,"date" :datetime.datetime.utcnow()}})
        return {"result":"success","value":data,"message":"하트가 등록되었습니다."}
    else:
        db.heart.update_one({"user_id" : ObjectId(_userId)},{"$push":{"heartList":{"action_id" : ObjectId(_talkId),"target_user_id":ObjectId(_talkUser_Id),"status" : 1,"date" :datetime.datetime.utcnow()}}})
        return {"result":"success","value":data,"message":"하트가 등록되었습니다."}
        

# #===============================================================================================자료공유 관련
@app.route('/share/listup/<_comId>',methods=['GET'])
def shareListup(_comId):
    results = db.share.find({"comm_id": ObjectId(_comId)})
    json_docs = []
    for doc in results:
        json_doc = json.dumps(doc, default=json_util.default)
        o = json.loads(json_doc)
        json_docs.append(o)
    return { "result": "success", "value": json_docs,"message":"성공적으로 조회하였습니다."}

@app.route('/share/read/<_comId>/<_id>',methods=['GET'])
def shareRead(_comId,_id):
    isUserListExist = db.share.count_documents({"comm_id": ObjectId(_comId),"_id":ObjectId(_id),"userList": { "$exists": "true" }})
    if isUserListExist==1:
        results= db.share.aggregate([
        { "$match": {"_id" : ObjectId(_id)}},
        { "$unwind": "$userList" },
        { "$match": {"comm_id": ObjectId(_comId)}},
        { "$sort": {"userList.date": -1}}
        ])
    else:
        results= db.share.aggregate([
        { "$match": {"_id" : ObjectId(_id)}},
        { "$match": {"comm_id": ObjectId(_comId)}},
        ])
    #results = db.share.find({"comm_id": ObjectId(_comId),"_id":ObjectId(_id)})
    json_docs = []
    for doc in results:
        json_doc = json.dumps(doc, default=json_util.default)
        o = json.loads(json_doc)
        json_docs.append(o)
    return { "result": "success", "value": json_docs,"message":"성공적으로 조회하였습니다."}

@app.route('/share/write',methods=['POST'])
def shareWrite():
    data = request.json
    if data['content']=='':
        return {"result":"fail","value":data,"message":"내용이 입력되지 않았습니다."}	
    db.share.update_one({"_id" : ObjectId(data['share_id'])},{"$push":{"userList":{
			 "user_id":ObjectId(data['user_id']),
			 "content" : data['content'],
		     "img1" : data['img1'],
			 "img2" : data['img2'],
		     "img3" : data['img3'],
			 "date": datetime.datetime.utcnow(),
		   }}})
    db.share.update_one({"_id" : ObjectId(data['share_id'])},{ "$set": {"commentStatus":1}})
    db.point.update_one({"user_id" : ObjectId(data['user_id'])},{"$push":{"pointList":{"comm_id" : ObjectId(data['comm_id']),"comm_name" : data['comm_name'],"comm_pic" : data['comm_pic'],"action_id" : data['share_id'],"type" : 'join_share',"date" : datetime.datetime.utcnow()}}})
    db.point.update_one({"user_id" : ObjectId(data['user_id'])},{ "$inc": { "score": +3}})
    return { "result": "success", "value": data,"message":"성공적으로 데이터베이스에 저장하였습니다."}

@app.route('/share/update',methods=['PUT'])
def shareUpdate():
    data = request.json
    if data['content']=='':
        return {"result":"fail","value":data,"message":"내용이 입력되지 않았습니다."}
    db.share.update_one({"_id":ObjectId(data['share_id']),"userList.user_id": ObjectId(data['user_id'])}, { "$set": {
		"userList.$.content": data['content'],
		"userList.$.img1" : data['img1'],
		"userList.$.img2" : data['img2'],
		"userList.$.img3" : data['img3'],
		"userList.$.date":datetime.datetime.utcnow(),}})
    db.point.update_one({"user_id" : ObjectId(data['user_id'])},{"$push":{"pointList":{"comm_id" : ObjectId(data['comm_id']),"comm_name" : data['comm_name'],"comm_pic" : data['comm_pic'],"action_id" : data['share_id'],"type" : 'edit_share',"date" : datetime.datetime.utcnow()}}})
    return {"result":"success","value":data,"message":"내용이 정상적으로 수정되었습니다."}

@app.route('/share/delete',methods=['DELETE'])
def shareDelete():
    data = request.json
    db.share.update_one({ "_id": ObjectId(data['share_id'])},{ "$pull": { "userList": { "user_id": ObjectId(data['user_id'])}}});
    db.point.update_one({"user_id" : ObjectId(data['user_id'])},{"$push":{"pointList":{"comm_id" : ObjectId(data['comm_id']),"comm_name" : data['comm_name'],"comm_pic" : data['comm_pic'],"action_id" : data['share_id'],"type" : 'del_share',"date" : datetime.datetime.utcnow()}}})
    db.point.update_one({"user_id" : ObjectId(data['user_id'])},{ "$inc": { "score": -3}})
    return {"result":"success","value":data,"message":"내용이 정상적으로 삭제되었습니다.."}
	
# @app.route('/share/like/<_shareNo>/<_shareUser_no>/<_userNo>',methods=['GET'])
# def shareLike(_shareNo,_shareUser_no,_userNo):
# 	curs = mysql.cursor()
# 	first_search_query = 'select * from shareHeart where shareHeart_shareUser_no=%s and shareHeart_share_no=%s and shareHeart_user_no=%s'
# 	curs.execute(first_search_query,(_shareUser_no,_shareNo,_userNo))
# 	#처음 좋아요를 누르는 경우 -> 처음 좋아요를 누른 경우 아직 데이터베이스에 저장되어있지 않기 때문에 fetchall의 결과가 0임
# 	if(len(curs.fetchall()))==0:
# 		try:
# 			insert_query = "INSERT INTO `shareHeart` (`shareHeart_shareUser_no`, `shareHeart_user_no`, `shareHeart_share_no`,`shareHeart_status`,`shareHeart_date`) VALUES (%s,%s,%s,%s,now())"
# 			curs.execute(insert_query,(_shareUser_no,_userNo,_shareNo,"1"))
# 			mysql.commit()
# 		except (MySQLdb.Error, MySQLdb.Warning) as e:
# 			print(e)
# 		finally:
# 			curs.close()
# 			return { "result": "success", "value": "Hello","message":"성공적으로 저장하였습니다."}
# 	#한번 하트를 눌러서 저장을 한 경우 fetchall의 결과가 0이 아님 
# 	else :
# 		search_query = "select shareHeart_status from shareHeart where shareHeart_shareUser_no=%s and shareHeart_user_no=%s and shareHeart_share_no=%s "
# 		curs.execute(search_query,(_shareUser_no,_userNo,_shareNo))
# 		search_result = curs.fetchall()
# 		try :
# 			update_query = "UPDATE shareHeart SET shareHeart_status = %s ,shareHeart_date =now() WHERE shareHeart_shareUser_no=%s and shareHeart_user_no=%s and shareHeart_share_no=%s"
# 			status = "0" if search_result[0][0]=="1" else "1"
# 			curs.execute(update_query,(status,_shareUser_no,_userNo,_shareNo))
# 			mysql.commit()
# 		except (MySQLdb.Error, MySQLdb.Warning) as e:
# 			print(e)
# 		finally:
# 			curs.close()
# 			return { "result": "success", "value": status,"message":"하트 정보를 수정하였습니다."}
			
# #===============================================================================================포인트 관련
@app.route('/point/<_mode>/<_userId>',methods=['GET'])
def checkPoint(_userId,_mode):
    if _mode == 'rank':
        results = db.point.find({"user_id": ObjectId(_userId)})
        json_docs = []
        for doc in results:
            json_doc = json.dumps(doc, default=json_util.default)
            o = json.loads(json_doc)
            json_docs.append(o)
        return { "result": "success", "value": json_docs,"message":"성공적으로 조회하였습니다."}
    elif _mode =='history':
        results = db.point.find({"user_id": ObjectId(_userId)})
        json_docs = []
        for doc in results:
            json_doc = json.dumps(doc, default=json_util.default)
            o = json.loads(json_doc)
            json_docs.append(o)
        return { "result": "success", "value": json_docs,"message":"성공적으로 조회하였습니다."}
    elif _mode =='standard':
        return { "result": "success", "value": '기준과 각각의 점수를 확인할 수 있는 페이지 렌더링',"message":"성공적으로 조회하였습니다."}


# #===============================================================================================기록탭
#검색어를 통해 검색하거나 항목별로 내가 지금까지 어떤 활동들을 하였는지 모아볼 수 있음
@app.route('/actSearch/<_comId>/<_type>/<_date>/<_userId>',methods=['GET'])
def actShow(_comId,_type,_date,_userId):
    #results =db.point.find({"user_id":ObjectId(_userId)})
    results= db.point.aggregate([
    { "$match": {
        "user_id" : ObjectId(_userId)
    }},
    { "$unwind": "$pointList" },

    # { "$match": {
    #     "pointList.type": 'join_comm'
    # }},
    { "$sort": {
        "pointList.date": -1
    }}
    ])
    json_docs = []
    for doc in results:
        json_doc = json.dumps(doc, default=json_util.default)
        o = json.loads(json_doc)
        json_docs.append(o)
    if _comId !='all':
        output_dict = [x for x in json_docs[0]['pointList'] if x['comm_id']['$oid'] == _comId]
    else :
        output_dict = json_docs
    return { "result": "success", "value":output_dict,"message":"성공적으로 조회하였습니다."}


# #==============================================================================================프로필 사진 바꾸기 
#프로필 사진 바꾸기
@app.route('/setting/profile',methods=['POST'])
def changePic():
    data = request.json
    db.user.update_one({"_id":ObjectId(data['user_id'])},{"$set":{"pic": data['pic']}})
    return { "result": "success", "value":data,"message":"성공적으로 프로필을 수정하였습니다."}
	
# #==============================================================================================비밀번호 수정
@app.route('/setting/pwd',methods=['POST'])
def changePwd():
    data = request.json
    if data['user_pwd']=='':
        return {"result":"fail","value":data,"message":"비밀번호를 입력하지 않았습니다."}
    data['user_pwd'] = hashlib.sha1(data["user_pwd"].encode()).hexdigest()
    if data['mode'] =='confirm':
        result_len = db.user.count_documents({"_id": ObjectId(data['user_id']),"pwd":data['user_pwd']})
        if  result_len!=0:
                return { "result": "success", "value": data,"message":"성공적으로 확인되었습니다."}
        else :
            return { "result": "fail", "value": data,"message":"이메일,비밀번호 중 일치하지 않는 것이 있습니다."}
    elif data['mode']=='reset':
        db.user.update({"_id":ObjectId(data['user_id'])},{"$set":{"pwd": data['user_pwd']}})
        return { "result": "success", "value": data,"message":"성공적으로 비밀번호를 수정하였습니다."}
		

# #==============================================================================================닉네임 수정
@app.route('/setting/nickname',methods=['PUT'])
def changeNickname():
    data = request.json
    if data['user_name'] =='':
        return { "result": "fail", "value": data,"message":"이름을 입력하지 않았습니다."}
    db.user.update({"_id":ObjectId(data['user_id'])},{"$set":{"name": data['user_name']}})
    return { "result": "success", "value": data,"message":"성공적으로 닉네임을 수정하였습니다."}


# #==============================================================================================건의사항 제출
@app.route('/setting/suggest',methods=['POST'])
def suggest():
    data = request.json
    db.suggest.insert({ "user_id" : ObjectId(data['user_id']), "content" : data['content'], "date" : datetime.datetime.utcnow()})
    return { "result": "success", "value": data,"message":"성공적으로 데이터베이스에 저장하였습니다."}

# #==============================================================================================탈퇴하기
# #탈퇴하면 데이터베이스를 어떻게 처리해주어야 할까?
@app.route('/setting/withdraw',methods=['POST'])
def withdraw():
    data = request.json
    db.user.update({"_id":ObjectId(data['user_id'])},{"$set":{"status": data['user_status']}})
    return { "result": "success", "value": data,"message":"성공적으로 탈퇴하였습니다."}

# #==============================================================================================앱 정보 읽기
# #앱 정보에는 총 4가지가 있는데 각각을 숫자로 구분해서 읽을 수 있도록 해주기 
# #꼭 데이터베이스에 저장해야 될까?
# @app.route('/setting/info/<_no>',methods=['GET'])
# def readInfo(_no):
#     return { "result": "success", "value": "숫자에 따라서 특정 앱의 정보를 읽을 수 있음","message":"성공적으로 조회하였습니다."}

# #==============================================================================================푸시 설정
@app.route('/setting/push',methods=['PUT'])
def push():
    data = request.json
    db.user.update({"_id":ObjectId(data['user_id'])},{"$set":{"push": data['user_push']}})
    return { "result": "success", "value": data,"message":"성공적으로 수정하였습니다."}
	
#===============================================================================================서버 실행 부분 
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000,debug=True)