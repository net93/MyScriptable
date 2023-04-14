// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: cyan; icon-glyph: yin-yang;

// importModule
let module = importModule('Lunar');
let date = new Date();
let d = date.getDate();
let m = date.getMonth() + 1;
let y = date.getFullYear();
let lunar = module.lunar(date);
let day = module.dayOfWeek(date);
let canchi = module.canchi(date);
let mLunar = ['Giêng', 'Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy', 'Tám', 'Chín', 'Mười', 'Một', 'Chạp'];

// create WidgetDate
let w = new ListWidget();

// add main stack
let mainStack = w.addStack();

let leftStack = mainStack.addStack();
leftStack.layoutVertically();
leftStack.size = new Size(160, 350);
// leftStack.borderWidth = 1;
// leftStack.cornerRadius = 20;
leftStack.backgroundColor = new Color('006789', 0.2)
let rightStack = mainStack.addStack();
rightStack.layoutVertically();
rightStack.size = new Size(190,350);
rightStack.backgroundColor = new Color('006789', 0.21)
// rightStack.borderWidth = 1;
// rightStack.cornerRadius = 20;

// add left child stack
let leftChild1 = leftStack.addStack();
leftChild1.size = new Size(160, 160)
let txtLeft1 = leftChild1.addText(lunar.substr(8,2))
txtLeft1.font = new Font('cochin-Regular', 120)

let leftChild2 = leftStack.addStack();
leftChild2.size = new Size(160, 20)
let txtLeft2 = leftChild2.addText('Tháng '+mLunar[parseInt(lunar.substr(5,2))-1]+' ('+ lunar.substr(5,2)+ ')');

let leftChild3 = leftStack.addStack();
leftChild3.size = new Size(160, 25)
let txtLeft3 = leftChild3.addText(canchi[1]);


let leftChild4 = leftStack.addStack();
leftChild4.size = new Size(160, 25)
let txtLeft4 = leftChild4.addText(canchi[2]);

let leftChild5 = leftStack.addStack();
leftChild5.size = new Size(160, 25)
let dD = canchi[3];
let txtLeft5 = leftChild5.addText(dD)


let leftChild6 = leftStack.addStack();
leftChild6.layoutVertically();
let leftChild61 = leftChild6.addStack();
leftChild61.size = new Size(160, 20);
let leftChild62 = leftChild6.addStack();
leftChild62.size = new Size(160, 30)
let txtLeft61 = leftChild61.addText(canchi[0]);
let txtLeft62 = leftChild62.addText('('+lunar.substr(0,4)+')');

let leftChild7 = leftStack.addStack();
leftChild7.size = new Size(160, 30);



// right child stack
let rightChild1 = rightStack.addStack();
rightChild1.size = new Size(190, 100);
rightChild1.setPadding(0, 80, 0, 0)
let x = parseInt(lunar.substr(8, 2));
let rChild1 = rightChild1.addStack();
let img2 = x<=15 ? await moonUp(x) : moonDown(x)
let imgStar = await loadImage('https://raw.githubusercontent.com/net93/MyScriptable/main/lunar/starM.png');
rChild1.size = new Size(80, 80);
rChild1.addImage(img2)
rightChild1.backgroundImage = imgStar;
rightChild1.backgroundColor = Color.black();
rightChild1.cornerRadius = 10;
rChild1.setPadding(10, 0, 0, 20)


let rightChild2 = rightStack.addStack();
rightChild2.size = new Size(190, 57)
let txtRight2 = rightChild2.addText(day)
txtRight2.font = new Font('ChalkboardSE-Regular',40);

let rightChild3 = rightStack.addStack();
rightChild3.size = new Size(190, 50)
let txtRight3 = rightChild3.addText(date.getDate()+'/' +(date.getMonth()+1)+'/' +date.getFullYear());
txtRight3.font = new Font('ChalkboardSE',40);
let rightChild4 = rightStack.addStack();
rightChild4.size = new Size(190, 80)
let img4 = await loadImage(`https://raw.githubusercontent.com/net93/MyScriptable/main/lunar/${canchi[4]}.png`);
rightChild4.addImage(img4);
let rightChild5 = rightStack.addStack();
rightChild5.size = new Size(190, 40)


w.presentLarge()
Script.setWidget(w)
Script.complete();

function loadImage(url) {
    let request = new Request(url)
    return request.loadImage()
}
async function moonUp(d){
  let canvas = new DrawContext()
  canvas.opaque = 0
  let a = 2500, b= 2500
  canvas.size = new Size(a, b)
  let img1 = await loadImage('https://raw.githubusercontent.com/net93/MyScriptable/main/lunar/Moon.png')
  canvas.drawImageInRect(img1, new Rect(250, 250, a-500, b-500))
  let path2 = new Path()
  let c = a+150-d*187
  path2.move(new Point(a/2, 250))
  path2.addCurve(new Point(a/2, b-250), new Point(-150, 250), new Point(-150, b-250))
  path2.addCurve(new Point(a/2, 250), new Point(c, b-250), new Point(c, 250))
  canvas.setFillColor(new Color('000000', 0.9))
  canvas.addPath(path2)
  canvas.fillPath()
  return canvas.getImage()
}

async function moonDown(d){
  let canvas = new DrawContext()
  canvas.opaque = 0
  let a = 2500, b= 2500
  canvas.size = new Size(a, b)
  let img1 = await loadImage('https://raw.githubusercontent.com/net93/MyScriptable/main/lunar/Moon.png')
  canvas.drawImageInRect(img1, new Rect(250, 250, a-500, b-500))
  let path2 = new Path()
  d = (d-15)%15
  let c = 2800-d*200-150
  path2.move(new Point(a/2, 250))
  path2.addCurve(new Point(a/2, b-250), new Point(a+150, 250), new Point(a+150, b-250))
  path2.addCurve(new Point(a/2, 250), new Point(c, b-250), new Point(c, 250))
  canvas.setFillColor(new Color('000000', 0.9))
  canvas.addPath(path2)
  canvas.fillPath()
  return canvas.getImage()
}
