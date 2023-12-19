// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: magic;
log(getSunPosition(21.4277, 107.3796))
function getSunPosition(latitude, longitude) {
const date = new Date();
const lw = date.getTimezoneOffset() * 60000;
const utc = date.getTime() + lw;
const jd = (utc / 86400000) + 2440587.5;
const jt = jd + (date.getTimezoneOffset() / 1440);
const t = (jt - 2451545) / 36525;
const m = 357.52910 + 35999.05030 * t - 0.0001559 * t * t - 0.00000048 * t * t * t;
const l = 280.46645 + 36000.76983 * t + 0.0003032 * t * t;
const e = 0.016708617 - 0.000042037 * t - 0.0000001236 * t * t;
const c = (1.914600 - 0.004817 * t - 0.000014 * t * t) * Math.sin(m * Math.PI / 180) + (0.019993 - 0.000101 * t) * Math.sin(2 * m * Math.PI / 180) + 0.000290 * Math.sin(3 * m * Math.PI / 180);
const oblecl = 23.4393 - 0.0000004 * t;
const ra = (l + c) * Math.PI / 180;
const dec = 0.006738 * Math.sin(oblecl * Math.PI / 180) - 0.399912 * Math.sin(m * Math.PI / 180) + 0.070257 * Math.sin(2 * m * Math.PI / 180) - 0.006758 * Math.sin(oblecl * Math.PI / 180) * Math.cos(m * Math.PI / 180) + 0.000907 * Math.sin(oblecl * Math.PI / 180) * Math.cos(2 * m * Math.PI / 180) - 0.002697 * Math.sin(3 * m * Math.PI / 180) + 0.00148 * Math.sin(2 * oblecl * Math.PI / 180);
const lst = (100.46 + 0.985647352 * jt) * Math.PI / 180;
const ha = lst - ra;
const x = Math.cos(dec) * Math.cos(ha);
const y = Math.cos(dec) * Math.sin(ha);
const z = Math.sin(dec);
const xhor = x * Math.cos(latitude * Math.PI / 180) - z * Math.sin(latitude * Math.PI / 180);
const yhor = y;
const zhor = x * Math.sin(latitude * Math.PI / 180) + z * Math.cos(latitude * Math.PI / 180);
const azimuth = Math.atan2(yhor, xhor) + Math.PI;
const altitude = Math.asin(zhor);
const longitude_correction = longitude * Math.PI / 180;
const azimuth_corrected = azimuth - longitude_correction;
const azimuth_final = azimuth_corrected * 180 / Math.PI;
const altitude_final = altitude * 180 / Math.PI;
return {
azimuth: azimuth_final,
altitude: altitude_final
};
}