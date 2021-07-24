var screen=document.getElementById("screen");
var show="0"; //后台数字
var condition=true; //控制输入溢出状态的变量
var max=Math.pow(10,16); //最大值
var temp; //控制输入溢出临时变量
var timestate=false; //显示时间状态
var tInt; //定时获取时间
var numA=0;
var numB=0; //运算数字
var numC=0; //结算数字
var signnum=0; //运算符号选择
var subsign=false; //负数状态
var mem="0"; //记忆
var continuestate=false; //连续计算状态
//初始化
function inition(){
show="0";
condition=true;
timestate=false;
screen.innerHTML=show;
numA=0;
numB=0;
numC=0;
}
//检查显示数字的长度及大小
function checkshow(num){
var ch=String(num);
var len=Number(num);
if(len>=max) return false;
if(ch.length>17) return false;
return true;
}
//数字键
function number(input){
checkConState();
if(timestate) {closeTime();inition();}
condition=checkshow();
if(condition)
{
	if(show!="0")
	{
		temp=screen.innerHTML+""+input;
		condition=checkshow(temp);
		if(condition) show=temp;
	}
	else if(input===".") show="0.";
	else show=input;
}
screen.innerHTML=show;
}
//定义时间参数
var str="";
var h=0,m=0,s=0;
var da=new Date();
function timegoes(){
str="";
da=new Date();
h=da.getHours();
m=da.getMinutes();
s=da.getSeconds();
if(h<10 && h>=0) {str="0"+h+":";}
else {str+=""+h+":";}
if(m>=0 && m<10) {str+="0"+m+":";}
else {str+=""+m+":";}
if(s>=0 && s<10) {str+="0"+s;}
else {str+=""+s+"";}
screen.innerHTML=str;
}
//时间键
function showTime(){
	if(!timestate){
	timestate=true;
	timegoes();
	tInt=setInterval("timegoes()",1000);}
}
//关闭时间并将屏幕置零
function closeTime(){
	timestate=false;
	clearInterval(tInt);
	screen.innerHTML=0;
}
//CE键
function clearScreen(){
	closeTime();
	show="0";
	condition=true;
	screen.innerHTML=show;
}
//AC键
function allClear(){
	closeTime();
	inition();
}
//输入负数
function minusOp(mnum){
if(subsign)
{	subsign=false;
	return -mnum;}
return mnum;
}
//加法键
function add(){if(!timestate){
if(continuestate) deal();
numA=Number(screen.innerHTML);
numA=minusOp(numA);
show="0";
signnum=1;
}
}
//减法键
function sub(){
if(!timestate){
if(continuestate) deal();
if(Number(screen.innerHTML)!=0){
numA=Number(screen.innerHTML);
numA=minusOp(numA);
show="0";
signnum=2;}
else subsign=true;
}
}
//乘法键
function multi(){
if(!timestate){
if(continuestate) deal();
numA=Number(screen.innerHTML);
numA=minusOp(numA);
show="0";
signnum=3;
}
}
//除法键
function div(){
if(!timestate){
if(continuestate) deal();
numA=Number(screen.innerHTML);
numA=minusOp(numA);
show="0";
signnum=4;
}
}
//判断是否是连续计算状态
function checkConState(){
	if(signnum!=0) continuestate=true;
}
//运算处理
function deal(){
numB=Number(screen.innerHTML);
numB=minusOp(numB);
switch(signnum){
case 0:numC=numB;screen.innerHTML=numC;break;
case 1:numC=numA+numB;if(numC<max) screen.innerHTML=""+numC+"";else screen.innerHTML="Error";signnum=0;continuestate=false;break;
case 2:numC=numA-numB;if(numC>-max) screen.innerHTML=""+numC+"";else screen.innerHTML="Error";signnum=0;continuestate=false;break;
case 3:numC=numA*numB;if(numC<max) screen.innerHTML=""+numC+"";else screen.innerHTML="Error";signnum=0;continuestate=false;break;
case 4:numC=numA/numB;if(numC<max) screen.innerHTML=""+numC+"";else screen.innerHTML="Error";signnum=0;continuestate=false;break;
case 5:numC=Math.pow(numA,numB);if(numC<max) screen.innerHTML=""+numC+"";else screen.innerHTML="Error";signnum=0;continuestate=false;break;
case 6:numC=Math.pow(numA,1/numB);if(numC<max) screen.innerHTML=""+numC+"";else screen.innerHTML="Error";signnum=0;continuestate=false;break;
}
}
//等于键
function caculation(){
if(!timestate){
deal();
show="0";
}
}
//Show Memory
function showMem(){
	if(timestate) closeTime();
	if(mem!=="0")
	screen.innerHTML=mem;
	else
	screen.innerHTML="0";
}
//Add Memory
function addMem(){
	if(!timestate){
	caculation();
	mem=numC;}
}
//Clear Memory
function clearMem(){
	mem="0";
}
//Back键
function backNum(){
if(!timestate){
  var barr="";
  temp=String(screen.innerHTML);
  if(temp.length>1)
  {
	for(var i=0;i<temp.length-1;i++)
	{
		barr+=temp[i];
	}
	show=barr+"";
  }
  else show=0;
screen.innerHTML=show;
}
}
//开方键
function unpow(){
if(!timestate){
caculation();
numA=Number(screen.innerHTML);
numA=minusOp(numA);
show="0";
signnum=6;
}
}
//次方键
function pow(){
if(!timestate){
caculation();
numA=Number(screen.innerHTML);
numA=minusOp(numA);
show="0";
signnum=5;
}
}