// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: magic;
var PI = Math.PI
var date = new Date('1967-03-28');
let canchi = can_chi(date);


//-----------------------------
module.exports.lunar = (date,timeZone) => {return solarToLunar(date, timeZone) }
module.exports.dayOfWeek = (date) =>{return dayOfWeek(date)};
module.exports.canchi = (date) =>{return can_chi(date)}

function INT(value){ return Math.floor(value)}

function jdFromDate(dd,mm,yy){
  var a, y, m, jd;
  a = INT((14 - mm) / 12);
  y = yy+4800-a;
  m = mm+12*a-3;
  jd = dd + INT((153*m+2)/5) + 365*y + INT(y/4) - INT(y/100) + INT(y/400) - 32045;
  if (jd < 2299161) {
  	jd = dd + INT((153*m+2)/5) + 365*y + INT(y/4) - 32083;
  }
  return jd;
}

function dayOfWeek(date){
  let dd, mm, yy;
  dd = date.getDate();
  mm = date.getMonth() + 1;
  yy =  date.getFullYear();
  let jd = jdFromDate(dd, mm, yy);
  let arr = ['Chủ Nhật', 'Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy']
  let day = (1+jd)%7 == 0 ? arr[(1+jd)%7] : 'Thứ ' + arr[(1+jd)%7];
  return day;
}

function can_chi(date){
  
  let lunar = solarToLunar(date);
  let y = parseInt(lunar.substr(0, 4));
  let m = parseInt(lunar.substr(5, 2));
  let d = parseInt(lunar.substr(8, 2));
  let dd, mm, yy;
  dd = date.getDate();
  mm = date.getMonth() + 1;
  yy =  date.getFullYear();
  let jd = jdFromDate(dd, mm, yy);
  let Y, M, D, H;
  let can = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
  let chi = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tị', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
  Y = can[(y+6)%10] +' '+ chi[(y+8)%12];
  M = can[(y*12+m+3)%10] +' '+ chi[(m+1)%12];
  D = can[(jd+9)%10] +' '+ chi[(jd+1)%12];
  H = can[(2*jd-2)%10] +' '+ chi[0]
  return ['Năm '+Y, 'Tháng '+M, 'Ngày '+D, 'Giờ '+ H, (jd+1)%12]
}


function jdToDate(jd){
  var a, b, c, d, e, m, day, month, year;
  if(jd > 2299160) { // After 5/10/1582, Gregorian calendar
  	a = jd + 32044;
  	b = INT((4*a+3)/146097);
  	c = a - INT((b*146097)/4);
  }else {
    b = 0;
  	c = jd + 32082;
  }
  d = INT((4*c+3)/1461);
  e = c - INT((1461*d)/4);
  m = INT((5*e+2)/153);
  day = e - INT((153*m+2)/5) + 1;
  month = m + 3 - 12*INT(m/10);
  year = b*100 + d - 4800 + INT(m/10);
  return new Array(day, month, year);
}

function getNewMoonDay(k, timeZone){
  var T, T2, T3, dr, Jd1, M, Mpr, F, C1, deltat, JdNew;
  T = k/1236.85; // Time in Julian centuries from 1900 January 0.5
  T2 = T * T;
  T3 = T2 * T;
  dr = PI/180;
  Jd1 = 2415020.75933 + 29.53058868*k + 0.0001178*T2 - 0.000000155*T3;
  Jd1 = Jd1 + 0.00033*Math.sin((166.56 + 132.87*T - 0.009173*T2)*dr); // Mean new moon
  M = 359.2242 + 29.10535608*k - 0.0000333*T2 - 0.00000347*T3; // Sun's mean anomaly
  Mpr = 306.0253 + 385.81691806*k + 0.0107306*T2 + 0.00001236*T3; // Moon's mean anomaly
  F = 21.2964 + 390.67050646*k - 0.0016528*T2 - 0.00000239*T3; // Moon's argument of latitude
  C1=(0.1734 - 0.000393*T)*Math.sin(M*dr) + 0.0021*Math.sin(2*dr*M);
  C1 = C1 - 0.4068*Math.sin(Mpr*dr) + 0.0161*Math.sin(dr*2*Mpr);
  C1 = C1 - 0.0004*Math.sin(dr*3*Mpr);
  C1 = C1 + 0.0104*Math.sin(dr*2*F) - 0.0051*Math.sin(dr*(M+Mpr));
  C1 = C1 - 0.0074*Math.sin(dr*(M-Mpr)) + 0.0004*Math.sin(dr*(2*F+M));
  C1 = C1 - 0.0004*Math.sin(dr*(2*F-M)) - 0.0006*Math.sin(dr*(2*F+Mpr));
  C1 = C1 + 0.0010*Math.sin(dr*(2*F-Mpr)) + 0.0005*Math.sin(dr*(2*Mpr+M));
  if (T < -11) {
  	deltat= 0.001 + 0.000839*T + 0.0002261*T2 - 0.00000845*T3 - 0.000000081*T*T3;
  } else {
  	deltat= -0.000278 + 0.000265*T + 0.000262*T2;
  };
  JdNew = Jd1 + C1 - deltat;
  return INT(JdNew + 0.5 + timeZone/24);
}

// get Sun longitude
function getSunLongitude(jdn, timeZone){
  var T, T2, dr, M, L0, DL, L;
  T = (jdn - 2451545.5 - timeZone/24) / 36525; // Time in Julian centuries from 2000-01-01 12:00:00 GMT
  T2 = T*T;
  dr = PI/180; // degree to radian
  M = 357.52910 + 35999.05030*T - 0.0001559*T2 - 0.00000048*T*T2; // mean anomaly, degree
  L0 = 280.46645 + 36000.76983*T + 0.0003032*T2; // mean longitude, degree
  DL = (1.914600 - 0.004817*T - 0.000014*T2)*Math.sin(dr*M);
  DL = DL + (0.019993 - 0.000101*T)*Math.sin(dr*2*M) + 0.000290*Math.sin(dr*3*M);
  L = L0 + DL; // true longitude, degree
  L = L*dr;
  L = L - PI*2*(INT(L/(PI*2))); // Normalize to (0, 2*PI)
  return INT(L / PI * 6);
}

// get month 11 of Lunar
function getLunarMonth11(yy, timeZone){
  var k, off, nm, sunLong;
  off = jdFromDate(31, 12, yy) - 2415021;
  k = INT(off / 29.530588853);
  nm = getNewMoonDay(k, timeZone);
  sunLong = getSunLongitude(nm, timeZone); // sun longitude at local midnight
  if (sunLong >= 9) {
  	nm = getNewMoonDay(k-1, timeZone);
  }
  return nm;
}

// get Leap month offset
function getLeapMonthOffset(a11, timeZone){
  var k, last, arc, i;
  k = INT((a11 - 2415021.076998695) / 29.530588853 + 0.5);
  last = 0;
  i = 1; // We start with the month following lunar month 11
  arc = getSunLongitude(getNewMoonDay(k+i, timeZone), timeZone);
  do {
  	last = arc;
  	i++;
  	arc = getSunLongitude(getNewMoonDay(k+i, timeZone), timeZone);
  } while (arc != last && i < 14);
  return i-1;
}

// convert solar to lunar
function solarToLunar(date, timezone){
  let timeZone = timezone ?? (date.getTimezoneOffset()/(-60));
  var k, dd, mm, yy, dayNumber, monthStart, a11, b11, lunarDay, lunarMonth, lunarYear, lunarLeap;
  dd = date.getDate();
  mm = date.getMonth() + 1;
  yy =  date.getFullYear();
  dayNumber = jdFromDate(dd, mm, yy);
  k = INT((dayNumber - 2415021.076998695) / 29.530588853);
  monthStart = getNewMoonDay(k+1, timeZone);
  if (monthStart > dayNumber) {
  	monthStart = getNewMoonDay(k, timeZone);
  }
  a11 = getLunarMonth11(yy, timeZone);
  b11 = a11;
  if (a11 >= monthStart) {
  	lunarYear = yy;
  	a11 = getLunarMonth11(yy-1, timeZone);
  } else {
  	lunarYear = yy+1;
  	b11 = getLunarMonth11(yy+1, timeZone);
  }
  lunarDay = dayNumber-monthStart+1;
  diff = INT((monthStart - a11)/29);
  lunarLeap = 0;
  lunarMonth = diff+11;
  if (b11 - a11 > 365) {
  	leapMonthDiff = getLeapMonthOffset(a11, timeZone);
  	if (diff >= leapMonthDiff) {
  		lunarMonth = diff + 10;
  		if (diff == leapMonthDiff) {
  			lunarLeap = 1;
  		}
  	}
  }
  if (lunarMonth > 12) {
  	lunarMonth = lunarMonth - 12;
  }
  if (lunarMonth >= 11 && diff < 4) {
  	lunarYear -= 1;
  }
  
  // return Date format
  lunarDay = lunarDay < 10 ? '0' + lunarDay : lunarDay;
  lunarMonth = lunarMonth < 10 ? '0' + lunarMonth : lunarMonth;
  let lunar = lunarYear + '-' + lunarMonth + '-' + lunarDay;
  return lunar
}


// convert lunar to solar
function lunarToSolar(lunarDay, lunarMonth, lunarYear, lunarLeap, timeZone){
  var k, a11, b11, off, leapOff, leapMonth, monthStart;
  if (lunarMonth < 11) {
  	a11 = getLunarMonth11(lunarYear-1, timeZone);
  	b11 = getLunarMonth11(lunarYear, timeZone);
  } else {
  	a11 = getLunarMonth11(lunarYear, timeZone);
  	b11 = getLunarMonth11(lunarYear+1, timeZone);
  }
  off = lunarMonth - 11;
  if (off < 0) {
  	off += 12;
  }
  if (b11 - a11 > 365) {
  	leapOff = getLeapMonthOffset(a11, timeZone);
  	leapMonth = leapOff - 2;
  	if (leapMonth < 0) {
  		leapMonth += 12;
  	}
  	if (lunarLeap != 0 && lunarMonth != leapMonth) {
  		return new Array(0, 0, 0);
  	} else if (lunarLeap != 0 || off >= leapOff) {
  		off += 1;
  	}
  }
  k = INT(0.5 + (a11 - 2415021.076998695) / 29.530588853);
  monthStart = getNewMoonDay(k+off, timeZone);
  return jdToDate(monthStart+lunarDay-1);
}

