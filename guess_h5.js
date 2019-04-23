//获取菜单元素
var failte_li_list=document.getElementsByTagName("li");
var failte_li_start=failte_li_list[0];
var failte_li_restart=failte_li_list[1];
var failte_li_rank=failte_li_list[2];
var failte_li_quit=failte_li_list[3];

//获取各游戏界面
var failte_aside_showtime=document.getElementsByTagName("aside")[0];//游戏时间界面
var failte_section_sectionlist=document.getElementsByTagName("section");
var failte_section_display=failte_section_sectionlist[0];//游戏显示界面
var failte_int_mingnnum=0,failte_int_maxgnnum=100;  //要猜的数字范围界限

var failte_section_balance=failte_section_sectionlist[1];//游戏结算界面
var failte_int_gnnum="";//本次要猜的数字

var failte_section_interaction=failte_section_sectionlist[2];//游戏互动界面

var input=document.getElementsByTagName("input");
var failte_input_guessnum=input[0];
var failte_input_submit=input[1];


var div=document.getElementsByTagName("div")[0];
var gamestate=false;
//导航栏选择特效
for(var i=0;i<failte_li_list.length;i++){
	failte_li_list[i].onclick=function(){
		for(var m=0;m<failte_li_list.length;m++){
		failte_li_list[m].style.color="#ff5250";
	};
	this.style.color="#fff";
	}
}

(function failte_fun_main(){
	failte_fun_gameinit();
	failte_li_start.addEventListener("click",failte_fun_gamestart);
	failte_li_restart.addEventListener("click",failte_fun_gamestart);
	failte_li_rank.addEventListener("click",failte_fun_gameinit);
	failte_li_quit.addEventListener("click",failte_fun_gameexit);
	failte_input_submit.addEventListener("click",failte_fun_checknumber);
	failte_input_submit.value="提交";
	failte_section_display.style.color="blue";
	failte_section_display.style.lineHeight="150px";
	failte_section_balance.style.height="600px";
	failte_section_balance.style.lineHeight="600px";
})()

//生成0~100以内的int值    ps：Math.random()返回[0.0,1.0)之间的double值
function failte_fun_createNum() {
	while(!failte_int_gnnum){
		failte_int_gnnum=Number.parseInt(100*Math.random());
		window.console.log("已生成新的数值");
	}
}

//游戏初始化
function failte_fun_gameinit() {
	failte_section_display.style.display="none";
	failte_section_interaction.style.display="none";
	failte_section_balance.style.display="block";
	failte_section_balance.innerHTML="欢迎来到猜数字游戏";
	gamestate=false;
	failte_int_gnnum=0;
	failte_int_mingnnum=0,
	failte_int_maxgnnum=100;
	failte_input_guessnum.value=null;
	failte_section_display.innerHTML="Number:?"+"<br/>取值范围："+failte_int_mingnnum+"——"+failte_int_maxgnnum;
}

//输入错误提示栏
function failte_fun_alert(){
	if(gamestate){
	console.log("failte_check_1");
	div.style.display="block";
	var span1=document.createElement("span");
	var span1node=document.createTextNode("输入有误");
	span1.appendChild(span1node);
	var span2=document.createElement("span");
	var span2node=document.createTextNode("关闭");
	span2.appendChild(span2node);
	div.appendChild(span1);
	div.appendChild(span2);
	span1.setAttribute("class","span1");
	span2.setAttribute("class","span2");
	span2.addEventListener("click",function(){
	div.removeChild(span1);
	div.removeChild(span2);
	});	
	}
}

//游戏开始
function failte_fun_gamestart(){
	failte_fun_gameinit();
	failte_fun_createNum();
	gamestate=true;
	failte_section_display.style.display="block";
	failte_section_interaction.style.display="block";
	failte_section_balance.style.display="none";
}

function failte_fun_checknumber(){
	var guessnum=failte_input_guessnum.value;
	if(guessnum!=null && guessnum>0 && guessnum<100){
		if(guessnum==failte_int_gnnum){
			failte_section_interaction.style.display="none";
			failte_section_display.style.display="none";
			failte_section_balance.style.display="block";
			failte_section_balance.innerHTML="恭喜你猜对了！";
		}
		else{
			if(guessnum==failte_int_mingnnum || guessnum==failte_int_maxgnnum) failte_fun_alert();
			else if(guessnum>failte_int_gnnum) failte_int_maxgnnum=guessnum;
			else failte_int_mingnnum=guessnum;
			failte_section_display.innerHTML="Number:?"+"<br/>取值范围："+failte_int_mingnnum+"——"+failte_int_maxgnnum;
		}
	}
	else failte_fun_alert();
}

//游戏结束
function failte_fun_gameover(){

}

//游戏结束
function failte_fun_gamestop(){

}

//退出游戏
function failte_fun_gameexit(){
	failte_fun_gamestop();
	failte_section_interaction.style.display="none";
	failte_section_display.style.display="none";
	failte_section_balance.style.display="block";
	failte_section_balance.innerHTML="游戏已安全退出！";
	window.close();
}