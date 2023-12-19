// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: cyan; icon-glyph: yin-yang;

// importModule
let module = importModule('Lunar/Lunar.min');
// input date
let date
if(config.runsInWidget){
   date = new Date()
}else{   
let solar = importModule("Lunar/Lunar.min")

let a = new Alert()
a.title = "Âm lịch <=> Dương lịch"
a.addAction("Dương=>Âm")
a.addCancelAction("Âm=>Dương")
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
}

let d = date.getDate();
let m = date.getMonth() + 1;
let y = date.getFullYear();
let lunar = module.solar2Lunar(date);
let day = module.dayOfWeek(date);
let canchi = module.canchi(date);
let mLunar = ['Giêng', 'Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy', 'Tám', 'Chín', 'Mười', 'Một', 'Chạp'];

// read screen size
let device = Device
let screen = device.screenSize()
let a = screen.width*88/100
let b = screen.width*92/100

// create WidgetDate
let wLunar = new ListWidget();

// add main stack
let mainStack = wLunar.addStack();
mainStack.size = new Size(a, b-30)

let botS = wLunar.addStack();
botS.size = new Size(a, 30)
botS.backgroundColor = Color.black()	
botS.setPadding(0, 0, 3, 0)
let botTxt = botS.addText('Giờ Hoàng đạo: ' + canchi[5])
botTxt.font = new Font('cochin-Regular', 15)
botTxt.textColor = Color.white()

let leftStack = mainStack.addStack();
leftStack.layoutVertically();
leftStack.size = new Size(40*a/100, b);
leftStack.backgroundColor = Color.black()
let rightStack = mainStack.addStack();
rightStack.layoutVertically();
rightStack.size = new Size(60*a/100, b);
rightStack.backgroundColor = Color.black()

// add left child stack
let leftChild1 = leftStack.addStack();
leftChild1.size = new Size(40*a/100, 40*a/100)
let txtLeft1 = leftChild1.addText(lunar.substr(8,2))
txtLeft1.font = new Font('cochin-Regular', 33*a/100)
txtLeft1.textColor = Color.white()

let leftChild2 = leftStack.addStack();
leftChild2.size = new Size(40*a/100, 20)
let txtLeft2 = leftChild2.addText('Tháng '+mLunar[parseInt(lunar.substr(5,2))-1]+' ('+ lunar.substr(5,2)+ ')');
txtLeft2.textColor = Color.white()

let leftChild3 = leftStack.addStack();
leftChild3.size = new Size(40*a/100, 25)
let txtLeft3 = leftChild3.addText(canchi[1]);
txtLeft3.textColor = Color.white()

let leftChild4 = leftStack.addStack();
leftChild4.size = new Size(40*a/100, 25)
let txtLeft4 = leftChild4.addText(canchi[2]);
txtLeft4.textColor = Color.white()

let leftChild5 = leftStack.addStack();
leftChild5.size = new Size(40*a/100, 25)
let dD = canchi[3];
let txtLeft5 = leftChild5.addText(dD)
txtLeft5.textColor = Color.white()

let leftChild6 = leftStack.addStack();
leftChild6.layoutVertically();
let leftChild61 = leftChild6.addStack();
leftChild61.size = new Size(40*a/100, 20);
let leftChild62 = leftChild6.addStack();
leftChild62.size = new Size(40*a/100, 30)
let txtLeft61 = leftChild61.addText(canchi[0]);
txtLeft61.textColor = Color.white()
let txtLeft62 = leftChild62.addText('('+lunar.substr(0,4)+')');
txtLeft62.textColor = Color.white()

let leftChild7 = leftStack.addStack();
leftChild7.size = new Size(40*a/100, 30);



// right child stack
let rightChild1 = rightStack.addStack();
rightChild1.size = new Size(60*a/100, 90);
let x = parseInt(lunar.substr(8, 2));
let rChild1 = rightChild1.addStack();
x = x==30 ? 0 : x
let img2 = x<=15 ? await moonUp(x) : await moonDown(x)
let imgStar = await loadImage('starM');
rChild1.size = new Size(80, 80);
rChild1.addImage(img2)
rightChild1.backgroundImage = imgStar;
rightChild1.backgroundColor = Color.black();
rightChild1.cornerRadius = 10;
rChild1.setPadding(15, 0, 0, 15)


let rightChild2 = rightStack.addStack();
rightChild2.size = new Size(60*a/100, 57)
let txtRight2 = rightChild2.addText(day)
txtRight2.font = new Font('ChalkboardSE-Regular',40);
txtRight2.textColor = Color.white()
let rightChild3 = rightStack.addStack();
rightChild3.size = new Size(60*a/100, 50)
let txtRight3 = rightChild3.addText(date.getDate()+'/' +(date.getMonth()+1)+'/' +date.getFullYear());
txtRight3.font = new Font('ChalkboardSE',35);
txtRight3.textColor = Color.white()
let rightChild4 = rightStack.addStack();
rightChild4.size = new Size(60*a/100, 110)
let img4 = await loadImage(canchi[4]);
rightChild4.addImage(img4);

let rightChild5 = rightStack.addStack();
rightChild5.size = new Size(60*a/100, 40)

if(config.runsInWidget){
Script.setWidget(wLunar)
}else{wLunar.presentLarge()}

Script.complete();

async function loadImage(imageName){
  let icld = FileManager.iCloud()
  let p = `/private/var/mobile/Library/Mobile Documents/iCloud~dk~simonbs~Scriptable/Documents/Lunar/${imageName}.png`
  let image = icld.readImage(p)
  return image
}

async function moonUp(d){
    let canvas = new DrawContext()
    canvas.opaque = 0
    let a = 300, b= 300
    canvas.size = new Size(a, b)
    let img1 = await loadImage('Moon')
    canvas.drawImageInRect(img1, new Rect(0, 0, a, b))
    let path2 = new Path()
    let c = 350-d*400/15
    path2.move(new Point(a/2, 0))
    path2.addCurve(new Point(a/2, b), new Point(-50, 0), new Point(-50, b))
    path2.addCurve(new Point(a/2, 0), new Point(c, b), new Point(c, 0))
    canvas.setFillColor(new Color('000000', 0.9))
    canvas.addPath(path2)
    canvas.fillPath()
    return canvas.getImage()
}

async function moonDown(d){
    let canvas = new DrawContext()
    canvas.opaque = 0
    let a = 300, b= 300
    canvas.size = new Size(a, b)
    let img1 = await loadImage('Moon')
    canvas.drawImageInRect(img1, new Rect(0, 0, a, b))
    let path2 = new Path()
    d = (d-15)%15
    let c = 350-d*400/15
    path2.move(new Point(a/2, 0))
    path2.addCurve(new Point(a/2, b), new Point(a+50, 0), new Point(a+50, b))
    path2.addCurve(new Point(a/2, 0), new Point(c, b), new Point(c, 0))
    canvas.setFillColor(new Color('000000', 0.9))
    canvas.addPath(path2)
    canvas.fillPath()
    return canvas.getImage()
}