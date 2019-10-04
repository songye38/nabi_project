from flask import Flask,render_template, request, redirect,jsonify
import sys
app = Flask(__name__)

#===============================================================================================회원가입
 #회원가입 관련 API part   
@app.route('/register',methods=['POST','GET'])
def register():
    if request.method =='GET':
        return { "result": "success", "value": "회원가입 페이지를 렌더링해서 보여줌"}
    else :
        data = request.json
        return { "result": "success", "value": data}

#===============================================================================================로그인
 #로그인 관련 API part 
@app.route('/login',methods=['POST','GET'])
def login():
    if request.method =='GET':
        return { "result": "success", "value": "로그인 할 수 있는 페이지를 렌더링해서 보여줌"}
    else :
        data = request.json
        return { "result": "success", "value": data}
    
#===============================================================================================비밀번호 찾기 기능
@app.route('/findPwd/<_mode>',methods=['POST','GET'])
def findPwd(_mode):
    if request.method =='GET':
        if _mode =='input':
            return { "result": "success", "value": "비밀번호를 찾기 위해 이메일을 입력할 수 있는 페이지 렌더링"}
        elif _mode == 'authentication':
            return { "result": "success", "value": '사용자가 입력한 이메일 주소로 인증코드를 보내고 이 인증코드를 입력할 수 있는 페이지를 렌더링함'}
        elif _mode =='reset':
            return { "result": "success", "value": '인증코드까지 확인을 거쳤다면 실제로 비밀번호를 다시 설정할 수 있는 페이지 렌더링'}
    else :
        if _mode =='input':
            data = request.json
            return { "result": "success", "value": data}
        elif _mode =='authentication':
            return { "result": "success", "value": '인증코드를 입력할 수 있는 페이지에서 실제로 입력한 인증코드를 데이터베이스로 전송함'}
        elif _mode =='reset':
            return { "result": "success", "value": '사용자가 입력한 새로운 비밀번호를 서버로 전송하고 다시 로그인을 할 수 있도록 페이지 리로드해줌'}

#===============================================================================================메인탭
@app.route('/main/<_userId>',methods=['GET'])
def main(_userId):
    result = {"userId": _userId}
    return { "result": "success", "value": result}


#===============================================================================================검색탭
#검색어를 통해 검색하거나 분야별로 선택해서 원하는 비대위 검색하기 
@app.route('/comSearch/<_keyword>',methods=['GET'])
def comShow(_keyword):
    result = {"keyworkd": _keyword}
    return { "result": "success", "value": resu}
    
@app.route('/comSearch',methods=['POST'])
def comSearch():
        data = request.json
        return { "result": "success", "value": data}

#===============================================================================================개별 비대위 페이지
#개별 비대위 페이지 API part
#진행중인 행동들, 대화 보여주기
@app.route('/<_comNo>/onGoing/<_order>',methods=['GET'])
def comOnGoing(_comNo,_order):
    result = {"committeeNo": _comNo, "order ": _order}
    return { "result": "success", "value": result}

#내가 참여했던 행동들, 대화 보여주기 -> 내가 과거에 참여한 것들의 목록만 알기 위해서 나의 id가 필요함
@app.route('/<_comNo>/participate/<_userId>/<_order>',methods=['GET'])
def comParticipate(_comNo,_order,_userId):
    result = {"committeeNo": _comNo, "order": _order}
    return { "result": "success", "value": result}

#내가 참여하진 않았지만 비대위에서 과거에 진행했었던 것들 목록 보여주기 
@app.route('/<_comNo>/archive/<_order>',methods=['GET'])
def comArchive(_comNo,_order):
    result = {"committeeNo": _comNo, "order": _order}
    return { "result": "success", "value": result}

#확인할 수 있는 정보 목록 보여주기 
@app.route('/<_comNo>/info/<_order>',methods=['GET'])
def comInfo(_comNo,_order):
    result = {"committeeNo": _comNo, "order": _order}
    return { "result": "success", "value": result}


#===============================================================================================온라인 행동 관련

@app.route('/on/listup/<_comNo>',methods=['GET'])
def onListup(_comNo):
    return { "result": "success", "value": "return online action list"}

@app.route('/on/read/<_comNo>/<_id>',methods=['GET'])
def onRead(_comNo,_id):
    result = {"committeeNo": _comNo, "articleNo": _id}
    return { "result": "success", "value": result}

#===============================================================================================오프라인 행동 관련

@app.route('/off/listup/<_comNo>',methods=['GET'])
def offListup(_comNo):
    result = {"committeeNo": _comNo}
    return { "result": "success", "value": result}

@app.route('/off/read/<_comNo>/<_id>',methods=['GET'])
def offRead(_comNo,_id):
    result = {"committeeNo": _comNo, "articleNo": _id}
    return { "result": "success", "value": result}

@app.route('/off/write/<_comNo>/<_id>',methods=['POST'])
def offWrite(_comNo,_id):
        data = request.json
        return { "result": "success", "value": data}

@app.route('/off/delete/<_comNo>/<_id>',methods=['DELETE'])
def offDelete(_comNo,_id):
    data = request.json
    return { "result": "success", "value": data}
#===============================================================================================대화하기 관련

@app.route('/talk/listup/<_comNo>',methods=['GET'])
def talkListup(_comNo):
    result = {"committeeNo": _comNo}
    return { "result": "success", "value": result}

@app.route('/talk/read/<_comNo>/<_id>',methods=['GET'])
def talkRead(_comNo,_id):
    result = {"committeeNo": _comNo,"articleId":_id}
    return { "result": "success", "value": result}

@app.route('/talk/write/<_comNo>/<_id>',methods=['POST'])
def talkWrite(_comNo,_id):
    data = request.json
    return { "result": "success", "value": data}

@app.route('/talk/update/<_comNo>/<_id>',methods=['PUT'])
def talkUpdate(_comNo,_id):
    data = request.json
    return { "result": "success", "value": data}

@app.route('/talk/delete/<_comNo>/<_id>',methods=['DELETE'])
def talkDelete(_comNo,_id):
    data = request.json
    return { "result": "success", "value": data}


#===============================================================================================자료공유 관련
@app.route('/share/listup/<_comNo>',methods=['GET'])
def shareListup(_comNo):
    result = {"committeeNo": _comNo}
    return { "result": "success", "value": result}

@app.route('/share/read/<_comNo>/<_id>',methods=['GET'])
def shareRead(_comNo,_id):
    result = {"committeeNo": _comNo,"articleId":_id}
    return { "result": "success", "value": result}

@app.route('/share/write/<_comNo>/<_id>',methods=['POST'])
def shareWrite(_comNo,_id):
    data = request.json
    return { "result": "success", "value": data}

@app.route('/share/update/<_comNo>/<_id>',methods=['PUT'])
def shareUpdate(_comNo,_id):
    data = request.json
    return { "result": "success", "value": data}

@app.route('/share/delete/<_comNo>/<_id>',methods=['DELETE'])
def shareDelete(_comNo,_id):
    data = request.json
    return { "result": "success", "value": data}

#===============================================================================================포인트 관련
@app.route('/point/<_userId>/<_mode>',methods=['GET'])
def checkPoint(_userId,_mode):
    if _mode == 'rank':
        return { "result": "success", "value": '나의 순위를 볼 수 있는 페이지 렌더링'}
    elif _mode =='history':
        return { "result": "success", "value": '포인트 이력 내역을 확인할 수 있는 페이지 렌더링'}
    elif _mode =='standard':
        return { "result": "success", "value": '기준과 각각의 점수를 확인할 수 있는 페이지 렌더링'}

#===============================================================================================기록탭
#검색어를 통해 검색하거나 항목별로 내가 지금까지 어떤 활동들을 하였는지 모아볼 수 있음
@app.route('/actSearch/<_keyword>',methods=['GET'])
def actShow(_keyword):
    return { "result": "success", "value": "어떤 키워드도 입력하지 않았다면 기본적으로 내가 지금까지 했던 모든 활동들을 보여줌"}

@app.route('/actSearch',methods=['POST'])
def actSearch():
    data = request.json
    return { "result": "success", "value": data}

#==============================================================================================설정탭
#프로필 사진 바꾸기
@app.route('/setting/profile',methods=['POST','GET'])
def changePic():
    if request.method =='GET':
        return { "result": "success", "value": '기본이미지로 바꾸기 / 앨범에서 선택 / 사진 찍기와 같은 옵션창을 띄움'}
    else :
        data = request.json
        return { "result": "success", "value": data}


#비밀번호 바꾸기
@app.route('/setting/pwd/<_mode>',methods=['POST','GET'])
def changePwd(_mode):
    if request.method =='GET':
        if _mode =='confirm':
            return { "result": "success", "value": '비밀번호 재확인을 할 수 있는 페이지 렌더링'}
        elif _mode =='reset':
            return { "result": "success", "value": '비밀번호를 바꿀 수 있는 페이지 렌더링'}
    else :
        if _mode =='confirm':
            data = request.json
            return { "result": "success", "value": data}
        
        elif _mode =='reset':
            data = request.json
            return { "result": "success", "value": data}


#닉네임 수정
@app.route('/setting/nickname',methods=['POST','GET'])
def changeNickname():
    if request.method =='GET':
        return { "result": "success", "value": '닉네임을 바꿀 수 있는 페이지 렌더링'}
    else :
        data = request.json
        return { "result": "success", "value": data}


#건의 불편신고
@app.route('/setting/suggest',methods=['GET','POST'])
def suggest():
    if request.method =='GET':
        return { "result": "success", "value": "건의 불편 사항을 남길 수 있는 페이지를 렌더링해서 보여줌"}
    else :
        data = request.json
        return { "result": "success", "value": data}


#탈퇴하기 -> 데이터베이스에 저장 필요
@app.route('/setting/withdraw',methods=['POST','GET'])
def withdraw():
    if request.method =='GET':
        return { "result": "success", "value": "정말 탈퇴할 것인지를 묻는 페이지를 렌더링함"}
    else :
        data = request.json
        return { "result": "success", "value": data}

#앱 정보 읽기 기능
#앱 정보에는 총 4가지가 있는데 각각을 숫자로 구분해서 읽을 수 있도록 해주기 
@app.route('/setting/info/<_no>',methods=['GET'])
def readInfo(_no):
    return { "result": "success", "value": "숫자에 따라서 특정 앱의 정보를 읽을 수 있음"}

#푸시 설정
@app.route('/setting/push/<_mode>',methods=['GET'])
def push(_mode):
    result = {"choice":_mode}
    return { "result": "success", "value": result}


#===============================================================================================서버 실행 부분 
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000,debug=True)


