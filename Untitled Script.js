// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: magic;
let date 
let solar = importModule("Lunar.min")

let a = new Alert()
a.title = "Lunar <=> Solar"
a.addAction("Solar2Lunar")
a.addCancelAction("Lunar2Solar")
let c = await a.present()
if( c == -1){
	let a1 = new Alert()
	a1.title = "Nhập ngày tháng năm Âm lịch"
	a1.addTextField("YYYY-MM-DD")
	a1.addAction("Không")
	a1.addCancelAction("Nhuận")
	let kq1 = await a1.present()
	let lunarLeap = kq1 == -1 ? 1:0
	let arrSolar = solar.lunar2Solar(new Date(a1.textFieldValue(0)), lunarLeap)
	date = new Date(arrSolar)	
}else{
	let a1 = new Alert()
	a1.title = "Nhập ngày tháng năm Dương lịch"
	a1.addTextField("YYYY-MM-DD")
	a1.addAction("OK")
	let kq1 = await a1.present()
	date = a1.textFieldValue(0) =='' ? new Date() : new Date(a1.textFieldValue(0))
}



