const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRang");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "black";
const CONVAS_SIZE = 700;

canvas.width = CONVAS_SIZE; // 컨버스 가로값
canvas.height = CONVAS_SIZE; // 건버스 세로값

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CONVAS_SIZE, CONVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR; // 선 기본 색상
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; // 선 굵기

let painting = false; // 그리기를 하지 않을때의 변수 선언
let filling = false;

function stopPainting() {
  painting = false;
}
// 마우스가 컨버스 밖으로 나갔을 때 그리기 종료

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    // 클릭하지 않으면
    //console.log("creating path in ", x, y);
    ctx.beginPath(); // 새로운 경로를 생성
    ctx.moveTo(x, y); // x, y 좌표로 움직인다
  } else {
    // 클릭하면 Path는 만들지 않고
    //console.log("creating line in ", x, y);
    ctx.lineTo(x, y); // x, y 좌료에 라인을 만든다
    ctx.stroke(); // 선을 생성
  }
}
// 마우스를 움직일때 X,Y 좌표를 찾음

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerHTML = "Fill";
  } else {
    filling = true;
    mode.innerHTML = "Paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CONVAS_SIZE, CONVAS_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault(); // 마우스 우클릭 금지
}

function handleSaveClick() {
  const image = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJs[]";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
  //mousemove : 요소에서 마우스가 움직였을 때 발생
  //mousedown : 요소에서 마우스 버튼을 눌렀을때 발생
  //mouseup : 요소에서 마우스 버튼을 떼었을 때 발생
  //mouseleave : 요소에서 마우스 버튼을 나갔을 때 발생
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
