//显示时间
var h=0,m=0,s=0;
var showtime=document.getElementById("showtime");
var da=new Date();

function timegoes(){
	var str="";
	da=new Date();
	h=da.getHours();
	m=da.getMinutes();
	s=da.getSeconds();
	if(h<10 && h>=0) {str="0"+h+":";}
	else {str+=""+h+":";}
	if(m>=0 && m<10) {str+="0"+m+":";}
	else {str+=""+m+":";}
	if(s>=0 && s<10){str+="0"+s;}
	else {str+=""+s+"";}
	showtime.innerHTML=str;
}
setInterval("timegoes()",1000);


var gamestate=0;  //游戏状态
var rnum=0;  //要猜的数字
var count=0;  //猜的次数
var nnum=document.getElementById("newnum");  //要猜的数的数字框
var rnuml=0,rnumr=100;  //要猜的数字范围界限
var cresult="";
var inputvalue=document.getElementById("inputvalue");  //用户输入框
var showresult=document.getElementById("showresult");  //用户输入显示框
var sure=document.getElementById("sure");
var giveup=document.getElementById("giveup");
var newgame=document.getElementById("newgame");
var inputinform=document.getElementById("inputinform");
var numrange=document.getElementById("numrange");
var countshow=document.getElementById("countshow");

//生成要猜的数字 Math.random()
function createNum() {
rnum=parseInt(100*Math.random());
nnum.innerHTML="?";
alert("新的数字已生成");
window.console.log(rnum);
}

//初始化游戏
function gameini() {
gamestate=0;
rnum=0;
count=0;
inputvalue.value="";
rnuml=0;
rnumr=100;
sure.innerHTML="开始游戏";
showresult.innerHTML="请输入数字";
numrange.innerHTML="取值范围：0 - 100";
countshow.innerHTML="已用次数："+0;
inputinform.style.display="none";
numrange.style.display="none";
inputvalue.style.display="none";
newgame.style.display="none";
giveup.style.display="none";
}

//游戏开始
function gamestart(){
gamestate=1;
createNum();
sure.innerHTML="提交";
inputinform.style.display="block";
numrange.style.display="block";
inputvalue.style.display="block";
newgame.style.display="block";
giveup.style.display="block";
}

//游戏结束
function gameover(){
gamestate=0;
rnum=0;
window.confirm("恭喜回答正确！本次游戏使用次数为："+count);
gameini();
}

//终止游戏
function gamestop(){
gamestate=0;
rnum=0;
window.alert("放弃作答");
gameini();
}

//显示输入范围
function showrange(){
var str="取值范围："+rnuml + " - " + rnumr;
numrange.innerHTML=str;
}

//变更猜的次数
function changecount() {
count++;
countshow.innerHTML="已用次数："+count;
}

//主进程：显示验证结果及提示
function checkNum(){
var arr=0;
arr=inputvalue.value;

if(gamestate!=0){
	if(arr!="" && parseInt(arr)==arr && arr<rnumr && arr>rnuml){
		if(arr>rnum)
		{
			showresult.innerHTML=arr+"  过大";
			rnumr=arr;
			changecount();
			showrange();
		}
		else if(arr<rnum)
		{
			showresult.innerHTML=arr+"  过小";
			rnuml=arr;
			changecount();
			showrange();
		}
		else
		{
			showresult.innerHTML=arr+"  正确";
			changecount();
			gameover();
		}
	}
	else
	{
		alert("请输入推荐范围内的整数");
	}

	inputvalue.value="";
}
else
{
	gamestart();
}

}

function exit(){
gamestop();
}