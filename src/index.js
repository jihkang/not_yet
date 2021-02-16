// <⚠️ DONT DELETE THIS ⚠️>
import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const textContainer = document.querySelector(".js-input"),
  textInput = textContainer.querySelector("input");

var lists = [];
var done_lists = [];

function delData(e) {
  alert("remove");
  var target = e.target;
  var parent = target.parentNode;

  lists.removeChild(parent);
  const clear = lists.filter(function (toDo) {
    return toDo.id !== parseInt(parent.id);
  });
  console.log(clear);
  lists = clear;
  saveData();
  console.log(parent);
}

function doneData(e) {
  var target = e.target;
  var parent = target.parentNode;
  var child = parent.childNodes;

  console.log(child);
  console.log(child.length);
  console.log(child[0].nodeName);
  for (let i = 0; i < child.length; i++) {
    //console.log(child.nodeName);
    if (child[i].nodeName === "SPAN") {
      console.log("FIND");
      console.log(child[i]);
    }
  }
  var newId = done_lists.length + 1;
  var Obj = {
    id: newId,
    text: child.text
  };
  done_lists.push(Obj);
}

function saveData(target) {
  localStorage.setItem(target, JSON.stringify(lists));
}

function paint(text) {
  const delBtn = document.createElement("button");
  const doneBtn = document.createElement("button");
  const span = document.createElement("span");

  console.log(text);
  doneBtn.innerText = "◟(๑•͈ᴗ•͈)◞";
  delBtn.innerText = "(ꐦ°꒫°)";
  span.innerText = text;

  const h4 = document.createElement("h4");
  h4.appendChild(span);
  h4.appendChild(delBtn);
  h4.appendChild(doneBtn);

  const res = document.querySelector(".js-list");
  delBtn.addEventListener("click", delData);
  doneBtn.addEventListener("click", doneData);
  res.appendChild(h4);

  const newId = lists.length + 1;
  const Obj = {
    text: text,
    id: newId
  };

  lists.push(Obj);
  saveData("lists");
}

function loadData() {
  const listData = localStorage.getItem("lists");

  if (listData !== null) {
    const parseData = JSON.parse(listData);

    parseData.forEach(function (TODO) {
      paint(TODO.text);
    });
  }
}

function handleSubmit(e) {
  e.preventDefault();
  //console.log(this.value);
  paint(textInput.value);
  textInput.value = "";
}

loadData();
textContainer.addEventListener("submit", handleSubmit);
