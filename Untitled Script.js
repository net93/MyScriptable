// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: magic;

let d = new Date()
let a = d.getDate().toString()
let icloud = FileManager.iCloud()
icloud.readImage("Lunar/Moon.png")

let wLunar = new ListWidget()
// wLunar.addText(a)
wLunar.addImage()
wLunar.presentLarge()
Script.setWidget(wLunar)
Script.complete();












async function loadImage(url) {
    let request = new Request(url)
    return request.loadImage()
}
async function moonUp(d){
    let canvas = new DrawContext()
    canvas.opaque = 0
    let a = 300, b= 300
    canvas.size = new Size(a, b)
    let img1 = await loadImage('https://raw.githubusercontent.com/net93/MyScriptable/main/lunar/Moon.png')
    canvas.drawImageInRect(img1, new Rect(0, 0, a, b))
    let path1 = new Path()
    path1.move(new Point(a/2, 0))
    path1.addLine(new Point(a/2, b))
    path1.move(new Point(0, b/2))
    path1.addLine(new Point(a, b/2))
    path1.addEllipse(new Rect(0, 0, a, b))
    canvas.addPath(path1)
    canvas.strokePath()
    let path2 = new Path()
    d = d
    let c = 350-d*400/15
    path2.move(new Point(a/2, 0))
    path2.addCurve(new Point(a/2, b), new Point(-50, 0), new Point(-50, b))
    path2.addCurve(new Point(a/2, 0), new Point(c, b), new Point(c, 0))
    canvas.setFillColor(new Color('000000', 0.75))
    canvas.addPath(path2)
    canvas.fillPath()
    return canvas.getImage()
}

async function moonDown(d){
    let canvas = new DrawContext()
    canvas.opaque = 0
    let a = 300, b= 300
    canvas.size = new Size(a, b)
    let img1 = await loadImage('https://raw.githubusercontent.com/net93/MyScriptable/main/lunar/Moon.png')
    canvas.drawImageInRect(img1, new Rect(0, 0, a, b))
    let path1 = new Path()
    path1.move(new Point(a/2, 0))
    path1.addLine(new Point(a/2, b))
    path1.move(new Point(0, b/2))
    path1.addLine(new Point(a, b/2))
    path1.addEllipse(new Rect(0, 0, a, b))
    canvas.addPath(path1)
    canvas.strokePath()
    let path2 = new Path()
    d = (d - 15)%15
    let c = 350-d*400/15
    
    path2.move(new Point(a/2, 0))
    path2.addCurve(new Point(a/2, b), new Point(a+50, 0), new Point(a+50, b))
    path2.addCurve(new Point(a/2, 0), new Point(c, b), new Point(c, 0))
    canvas.setFillColor(new Color('000000', 0.75))
    canvas.addPath(path2)
    canvas.fillPath()
    return canvas.getImage()
}
