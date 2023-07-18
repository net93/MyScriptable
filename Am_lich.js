// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: cyan; icon-glyph: yin-yang;

// importModule
let module = importModule('Lunar/Lunar');
// input date
let date
if(config.runsInWidget){
   date = new Date()
}else{   
  let alert = new Alert()  
  alert.title = 'Enter the date in the box'
  alert.message = 'Format YYYY-MM-DD'
  alert.addAction('OK')
  alert.addCancelAction('Cancel')
  alert.addTextField('YYYY-MM-DD')
  await alert.presentAlert()
  let i1 = alert.textFieldValue(0)
  if(i1==''){date = new Date()}else{date = new Date(`${i1}`)}
}

let d = date.getDate();
let m = date.getMonth() + 1;
let y = date.getFullYear();
let lunar = module.lunar(date);
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

let leftStack = mainStack.addStack();
leftStack.layoutVertically();
leftStack.size = new Size(40*a/100, b);
// leftStack.borderWidth = 1;
// leftStack.cornerRadius = 20;
leftStack.backgroundColor = new Color('006789', 0.2)
let rightStack = mainStack.addStack();
rightStack.layoutVertically();
rightStack.size = new Size(60*a/100, b);
rightStack.backgroundColor = new Color('006789', 0.21)
// rightStack.borderWidth = 1;
// rightStack.cornerRadius = 20;

// add left child stack
let leftChild1 = leftStack.addStack();
leftChild1.size = new Size(40*a/100, 40*a/100)
let txtLeft1 = leftChild1.addText(lunar.substr(8,2))
txtLeft1.font = new Font('cochin-Regular', 33*a/100)

let leftChild2 = leftStack.addStack();
leftChild2.size = new Size(40*a/100, 20)
let txtLeft2 = leftChild2.addText('Tháng '+mLunar[parseInt(lunar.substr(5,2))-1]+' ('+ lunar.substr(5,2)+ ')');

let leftChild3 = leftStack.addStack();
leftChild3.size = new Size(40*a/100, 25)
let txtLeft3 = leftChild3.addText(canchi[1]);


let leftChild4 = leftStack.addStack();
leftChild4.size = new Size(40*a/100, 25)
let txtLeft4 = leftChild4.addText(canchi[2]);

let leftChild5 = leftStack.addStack();
leftChild5.size = new Size(40*a/100, 25)
let dD = canchi[3];
let txtLeft5 = leftChild5.addText(dD)


let leftChild6 = leftStack.addStack();
leftChild6.layoutVertically();
let leftChild61 = leftChild6.addStack();
leftChild61.size = new Size(40*a/100, 20);
let leftChild62 = leftChild6.addStack();
leftChild62.size = new Size(40*a/100, 30)
let txtLeft61 = leftChild61.addText(canchi[0]);
let txtLeft62 = leftChild62.addText('('+lunar.substr(0,4)+')');

let leftChild7 = leftStack.addStack();
leftChild7.size = new Size(40*a/100, 30);



// right child stack
let rightChild1 = rightStack.addStack();
rightChild1.size = new Size(60*a/100, 100);
rightChild1.setPadding(0, 80, 0, 0)
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
rChild1.setPadding(10, 0, 0, 20)


let rightChild2 = rightStack.addStack();
rightChild2.size = new Size(60*a/100, 57)
let txtRight2 = rightChild2.addText(day)
txtRight2.font = new Font('ChalkboardSE-Regular',40);

let rightChild3 = rightStack.addStack();
rightChild3.size = new Size(60*a/100, 50)
let txtRight3 = rightChild3.addText(date.getDate()+'/' +(date.getMonth()+1)+'/' +date.getFullYear());
txtRight3.font = new Font('ChalkboardSE',40);
let rightChild4 = rightStack.addStack();
rightChild4.size = new Size(60*a/100, 80)
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