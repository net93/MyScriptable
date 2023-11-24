// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: magic;


let date = new Date()


function jdDay(date){
  let Y, M, D, timezone, A, B
  Y = date.getFullYear()
  M = date.getMonth()
  D = date.getDate()
  B = 0
  if(M==1||M==2){
    Y = Y-1
    M = M+12
  }
  if(!isJulianDate()){
    A = Math.floor(Y/100)
    B = 2-A + Math.floor(A/4)
  }
  
}