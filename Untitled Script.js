// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: red; icon-glyph: magic;
// read screen size
let device = Device
let screen = device.screenSize()
let a = screen.width*88/100
let b = screen.width*92/100
//  input
let alert = new Alert()
alert.addAction('OK')
alert.addCancelAction('Cancel')
alert.addTextField('YYYY-MM-DD')
await alert.presentAlert()
let i1 = alert.textFieldValue(0)
console.log(i1)
// create WidgetDate
let wLunar = new ListWidget();





Script.complete()