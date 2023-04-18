// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: yellow; icon-glyph: magic;

await reverse()
async function reverse(inputString){
  let a = new Alert()
  a.title = 'Đảo chuỗi'
  a.message = "Nhập chuỗi muốn đảo"
  a.addTextField("input string here")
  a.addAction("OK")
  a.addCancelAction("Huỷ")
  let output = ""
  let action = await a.presentAlert()
  if(action == 0){
    let input = a.textFieldValue(0)
    let len = input.length
    for( let i = len-1; i>=0; i--){
      output = output+input[i]
    }
    Pasteboard.copy(output)
  }
  console.log(typeof(output))
  return output
}

