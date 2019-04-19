var topic = document.getElementById("topic_name"); //标题
var topic_flag = false;
var content = document.getElementById("topic_content"); //内容
var author = document.getElementById("author"); //作者
var phone = document.getElementById("phone"); //电话
var phone_flag = false;
var email = document.getElementById("email"); //邮箱
var email_flag = false;
var save = document.getElementById("saveBtn"); //保存按键
var checked = document.getElementById("checked"); //报错提示

var tab = document.getElementById("tab"); //表格
var detail = document.getElementById("detail"); //详细信息

save.onclick=function(){
    topic_flag=topic_check(topic.value);
    phone_flag = phone_check(phone.value);
    email_flag = email_check(email.value);
    console.log(topic_flag, phone_flag, email_flag);
    if (topic_flag && phone_flag && email_flag){
        checked.style.display = "none";
        var tr=document.createElement("tr");
        tr.innerHTML = '<td>007</td><td class="title">' + topic.value + '</td><td>' + content.value + '</td><td>' + new Date().toLocaleDateString() + '</td><td>' + author.value + '</td><td>' + phone.value + '</td><td>' + email.value + '</td><td name="option"><a name="detail" href="#">详细信息</a> <a class="delbtn" href="javascript:;">删除</a></td>';
        tab.appendChild(tr);
        topic.value = "";
        content.value = "";
        author.value = "";
        phone.value = "";
        email.value = "";
    }
    else {
        checked.style.display="inline";
    }
}

function topic_check(arg) {
    if(arguments.length!=0){
        var reg = /^[a-zA-Z][a-zA-Z0-9]{2,8}$/;
        return reg.test(arg);
    }
    return false;
}
function phone_check(arg) {
    if (arguments.length != 0) {
        var reg = /^1[3-9]\d{9}$/;
        return reg.test(arg);
    }
    return false;
}
function email_check(arg) {
    if (arguments.length != 0) {
        var reg = /^[a-zA-Z0-9][a-zA-Z0-9-_]+@[a-zA-Z0-9][a-zA-Z0-9-_]+\.([a-zA-Z0-9-_]{2,}|[a-zA-Z0-9-_]{2,}\.[a-zA-Z0-9-_]{2,})$/;
        return reg.test(arg);
    }
    return false;
}

tab.onclick=function(event){
    var e=event || window.event;
    var target=e.target ||e.srcElement;
    var temp="";
    var input=null;
    if (target.tagName == "TD" && target != target.parentNode.children[target.parentNode.children.length - 1]) {
        if(!input){
            temp = target.innerText.trim();
            target.innerHTML="<input type='text' value=''>";
            input=target.children[0];
            input.focus();
            input.value = temp.trim();
            input.onblur=function(){
                target.innerHTML=input.value.trim();
                input=null;
            }
        }
    }
    if (target.name == "detail") {
        detail.style.display="block";
        detail.style.left = e.clientX - e.offsetX + target.offsetWidth  + "px";
        detail.style.top = e.clientY - e.offsetY  + target.offsetHeight + "px";
        detail.innerText = target.parentNode.parentNode.children[2].innerText;
        console.log(target, target.offsetLeft , target.offsetWidth);
        e.stopPropagation?e.stopPropagation():e.cancelbubble=true;
    }
    if (target.className == "delbtn") {
        target.parentNode.parentNode.parentNode.removeChild(target.parentNode.parentNode);
    }
}
document.onclick=function(){
    detail.style.display = "none";
    detail.innerText="";
}