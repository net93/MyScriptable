// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: green; icon-glyph: magic;
let file = FileManager
let cloud = file.iCloud()
let data = cloud.read('/private/var/mobile/Library/Mobile Documents/iCloud~dk~simonbs~Scriptable/Documents/Test.txt')
data = data.toRawString()
let keywords = 'click|ads-preload|ad-floating-left|ad-floating-right|adsCatFish|top-banner'
let regx = new RegExp(keywords, 'g')
let body = data.replace(regx, "")

//Pasteboard.copy(data)

