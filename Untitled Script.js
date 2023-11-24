// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: magic;

let date = new Date(2001,2,21)

log(JulianDay(date))
log(SunLongitude(date))

function JulianDay(date){
	let year, month, day, hour, min, sec, msec, timezone
	year = date.getFullYear()
	month = date.getMonth()+1
	day = date.getDate()
	hour = date.getHours()
	min = date.getMinutes()
	sec = date.getSeconds()
	msec = date.getMilliseconds()
	timezone = date.getTimezoneOffset()/(-60)

	let a, y, m, JDN, JD
	a = Math.floor((14-month)/12)
	y = year + 4800 - a
	m = month + 12*a - 3
	
	JDN = day + Math.floor((153*m + 2)/5) + 365*y + Math.floor(y/4) - Math.floor(y/100) + Math.floor(y/400) - 32045
	
	JD = JDN + (hour-12)/24 + min/1440 + (sec + msec/1000)/86400 - timezone/24

 	jdn = Math.floor((1461*(year + 4800 + Math.floor((month - 14)/12))/4) + Math.floor((366*(month - 2 - 12*Math.floor((month - 14)/12)))/12) - Math.floor((3*Math.floor((year + 4900 + Math.floor((month - 14)/12))/100)))/4) + day - 32075	
	jd = jdn + (hour-12)/24 + min/1440 + (sec + msec/1000)/86400 - timezone/24
	return JD //+'|'+ JD
}

function Get360(value){return (value%360)>360||(value%360)<0 ? value += 360 : value%360} // get angle 0 to 360

function Rad(value){return value*Math.PI/180} //convert deg to rad

function SunLongitude(date){
	let n, L, g, lambda, beta, e, alpha, delta, R
	let JD = JulianDay(date)
// 	The number day since J2000.0
	n = JD + 2451545.0
// 	The mean longitude of the Sun	
	L = Rad(280.460) + n*Rad(0.9856474)
	L = Get360(L)
// 	The mean anomaly of the Sun
	g = Rad(357.528) + n*Rad(0.9856003)
	g= Get360(g)
// 	the ecliptic longitude of the Sun
	lambda = L + Rad(1.1915)*Math.sin(g) + Rad(0.020)*Math.sin(2*g)
	return Get360(lambda*180/Math.PI)
// 	 The distance of the Sun from the Earth
	R = 1.000014 - 0.1671*Math.cos(g) -0.00014*Math.cos(2*g)	
// 	Obliquity of the ecliptic
	e = Rad(23.439279444444445) - Rad(0.013010213611111111)*n - Rad(5.0861111111111115e-8)*Math.pow(n,2) + Rad(5.565e-7)*Math.pow(n,3) - Rad(0.0015999999999999999e-7)*Math.pow(n,4) - Rad(0.0012055555555555554e-8)*Math.pow(n,5)
	
	
	alpha = Math.atan2(Math.cos(e)*Math.sin(lambda), Math.cos(lambda))
	Get360(alpha*180/Math.PI)
}
