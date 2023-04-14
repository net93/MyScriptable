// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: yellow; icon-glyph: magic;
let w = new ListWidget()
let img = await loadImage("1")
w.addImage(img)
w.presentLarge()
Script.complete()
async function loadImage(imageName){
  let icld = FileManager.iCloud()
  let p = `/private/var/mobile/Library/Mobile Documents/iCloud~dk~simonbs~Scriptable/Documents/Lunar/${imageName}.png`
  let image = icld.readImage(p)
  return image
}