// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: magic;

const getJulianDate = (date = new Date()) => {
  const time = date.getTime();
  const tzoffset = date.getTimezoneOffset()
  
  return (time / 86400000) - (tzoffset/1440) + 2440587.5;
}
const rad = Math.PI/180
const get360 = value => { return value%360<0 ? value = value%360 + 360 : value%360}


let date = new Date()


let J, M, C, v, p = 102.9373, e = 23.4393, L, lambda, alpha
J = getJulianDate(date)
let J2000 = 2451545
M = 357.5291 + 0.98560028*(J - J2000) // The Mean Anomaly
C = 1.9148*Math.sin(M*rad) + 0.02*Math.sin(2*M*rad) + 0.0003*Math.sin(3*M*rad) // The Equation of Center

v = M + C
L = M + p + 180 // The mean longitude of the Sun
lambda = L + C// the ecliptic longitude of the Sun
alpha = Math.atan2(Math.sin(lambda*rad)*Math.cos(e*rad), Math.cos(lambda*rad)) //the right ascension α
alpha = alpha/rad
log(get360(alpha))
