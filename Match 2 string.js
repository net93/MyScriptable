// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: cyan; icon-glyph: magic;
let al = new Alert()
al.title = 'match 2 string'
al.addTextField('mẫu', '')
al.addTextField('chuỗi ss', '')
al.addAction('ok')
let a = await al.presentAlert()
let in1 = al.textFieldValue(0)
let in2 = al.textFieldValue(1)
if(in1.length == in2.length){
  let returnn = in2.includes(in1)
  console.log(returnn)
}