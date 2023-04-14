// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: purple; icon-glyph: magic;

let w = new ListWidget()
let stack = w.addStack()
let a = FileManager.iCloud()
a.downloadFileFromiCloud('moon.png')

//Script.setWidget(w)
w.presentSmall()
Script.complete()