// Load fonts
require("Font4x8Numeric").add(Graphics);
// position on screen
const X = 180, Y = 90;
//Screen Interaction Variables

var LeftClickedCount  = 0 ;
var RightClickedCount = 0 ;
var LeftSwipedCount = 0 ;
var RightSwipedCount = 0 ;
var Btn1PressCount = 0 ;
var Btn2PressCount = 0 ;
var Btn3PressCount = 0 ;

function draw() {
  // work out how to display the current time
  var d = new Date();
  var h = d.getHours(), m = d.getMinutes();
  var time = (" "+h).substr(-2) + "-" + ("0"+m).substr(-2);
  // Reset the state of the graphics library
  g.reset();
  // draw the current time (4x size 7 segment)
  g.setFont("4x8Numeric",6);
  g.setColor("#A0FF33");
  g.setFontAlign(1,1); // align right bottom
  g.drawString(time, X, Y ,true/*clear background*/);
  
  
  //******************** For the date****************************
  g.setFont("6x8");
  g.setFontAlign(0,3); // align center bottom
  var datestr= "  "+require("locale").date(d)+"  ";
  g.drawString(datestr,g.getWidth()/2,Y+15,true);
  //***********Screen Interaction Area */
  
  g.drawCircleAA(45, 150, 20);
  g.drawCircleAA(95, 150, 20);
  g.drawCircleAA(145, 150, 20);
  g.drawCircleAA(70, 194, 20);
  g.drawCircleAA(195, 150, 20);
  g.drawCircleAA(120, 194, 20);
  g.drawCircleAA(170, 194, 20);
  
  g.drawString(LeftClickedCount,46,152,true);
  g.drawString(RightClickedCount,96,152,true);
  g.drawString(LeftSwipedCount,146,152,true);
  g.drawString(RightSwipedCount,196,152,true);
  g.drawString(Btn1PressCount,71,196,true);
  g.drawString(Btn2PressCount,121,196,true);
  g.drawString(Btn3PressCount,171,196,true);
  
  g.setColor("#FF5733");
  g.drawString("LC",46,164,true);
  g.drawString("RC",96,164,true);
  g.drawString("LS",146,164,true);
  g.drawString("RS",196,164,true);
  g.drawString("Bt1C",71,208,true);
  g.drawString("Bt2C",121,208,true);
  g.drawString("Bt3C",171,208,true);
  
  //********************* For Second logic**********************
  // draw the seconds (2x size 7 segment)
  
  g.setFont("4x8Numeric",4);
  g.setColor("#FEFEFE");
  g.drawString(("0"+d.getSeconds()).substr(-2), X+30, Y,true /*clear background*/);
  
}

// Clear the screen once, at startup
g.clear();
// draw immediately at first
draw();
var secondInterval = setInterval(draw, 1000);

  setWatch(() => {
  Btn1PressCount= Btn1PressCount+1;
  }, BTN1, {repeat: true});
  
  setWatch(() => {
     Btn2PressCount= Btn2PressCount+1;
  }, BTN2, {repeat: true, edge: "falling"});
  
  setWatch(() => {
   Btn3PressCount= Btn3PressCount+1;
  }, BTN3, {repeat: true});
  


  Bangle.on('swipe', (sDir) => {
  if (sDir==1) {
  LeftSwipedCount +=1;
  } else {
  RightSwipedCount +=1;
  }
  });
  
  
  Bangle.on('touch', (sDir) => {
  if (sDir==1) {
  LeftClickedCount += 1;
  } else {
  RightClickedCount +=1 ;
  }
  });







// Stop updates when LCD is off, restart when on
Bangle.on('lcdPower',on=>{
  if (secondInterval) clearInterval(secondInterval);
  secondInterval = undefined;
  if (on) {
    secondInterval = setInterval(draw, 1000);
    draw(); // draw immediately
  }
});
// Show launcher when middle button pressed
//Bangle.setUI("clock");
// Load widgets
Bangle.loadWidgets();
Bangle.drawWidgets();

