//时间模块运行
setInterval(function(){
	var h=0,m=0,s=0;
	var da=new Date();
	var str="";
	h=da.getHours();
	m=da.getMinutes();
	s=da.getSeconds();
	if(h<10 && h>=0) {str="0"+h+":";}
	else {str+=""+h+":";}
	if(m>=0 && m<10) {str+="0"+m+":";}
	else {str+=""+m+":";}
	if(s>=0 && s<10){str+="0"+s;}
	else {str+=""+s+"";}
	failte_aside_showtime.innerHTML=str;
},1000);