// どういう動きにするのか一連の流れを考えながら作ることが大事

//チェックマークとゴミ箱マークのアイコン
let removeIcon = '<i class="far fa-trash-alt fa-lg"></i>';
let doneIcon = '<i class="far fa-check-circle fa-lg"></i>';
let data = {
    task: [],
    done: []
};

// 保存するための箱
// 保存されたデータを取得することができる
// ローカルストレージは自分で好きな名前をつけて保存できる
// localStorage.setItem('todoList',保存したいデータ);配列になる

//もしデータが保存されていれば
if (localStorage.getItem('todoList')){

  // もし保存されてなかったらここに保存するよ！っていう指定
  data = JSON.parse(localStorage.getItem('todoList'));
}
console.log(data);

document.getElementById('add').addEventListener('click', function(){
  let value = document.getElementById('task').value
  addTask(value);

  // もしここにデータすら入ってなかったらストレージにも保存されない
  // ちゃんとデータが格納されているかconsole.logで確認（デバック）することが大事

  // console.log(data.task);
});

// --------------関数---------------
// クリックした時に上のif文の配列にデータを保存できるようにする関数
function addTask (value){
  addTaskToDoM(value);
  // 一旦タスクの中をからにする
  document.getElementById('task').value = ' ';
  data.task.push(value);
  dataObjectUpdated();
}

// タスクを足すためにhtmlタグの追加
function addTaskToDoM(text, isDone){
  let list;

  if (isDone) {
  list = document.getElementById('done');
  } else{
  list = document.getElementById('not-yet');
  }

  let task = document.createElement('li');
  // todoの内容欄
  task.textContent = text;
// ゴミ箱と完了マークのdiv
  let buttons = document.createElement('div');
  // 追加するボタンにクラスをつけたいのでクラスを追加
  buttons.classList.add('buttons');

  //削除ボタンを作成
  let remove = document.createElement('button');
  remove.classList.add('remove');
  remove.innerHTML = removeIcon;
  //削除ボタンをクリックした時の動作を追加
  remove.addEventListener('click', removeTask);

  //完了ボタンを作成
  let done = document.createElement('button');
  done.classList.add('done');
  done.innerHTML = doneIcon;

  //完了ボタンを押した時の動作を追加
  done.addEventListener('click', doneTask);

  //DOMの組み立て
  // 要素をここで作る
  buttons.appendChild(remove);
  buttons.appendChild(done);
  task.appendChild(buttons);

  //組み立てたDOMをインサート
  list.insertBefore(task, list.childNodes[0]);
  dataObjectUpdated();
}
//削除ボタンを押したとき
// わざと分けて書いてる分けて描かなかったら可読性が悪い
// 関数の中で変数は完結するから他の関数でも同じものを使う
function removeTask() {
  let task = this.parentNode.parentNode;
  let id = task.parentNode.id;//このidはnotyetを読み込んでいる
  let value = task.textContent;
  //ストレージから削除
  if (id === 'not-yet') {
    data.task.splice(data.task.indexOf(value), 1);
  } else {
    data.done.splice(data.done.indexOf(value), 1);
  }
  // console.log(data.task);
  //画面から削除
  task.remove();
  //ストレージから削除
  if (id === 'not-yet'){
    data.task.splice(data.task.indexOf(value),1);
  } else {
    data.done.splice(data.done.indexOf(value), 1);
  }
  dataObjectUpdated();

}

//完了ボタンを押したとき
function doneTask(){
  let task = this.parentNode.parentNode;
  let id = task.parentNode.id;
  if (id !== 'not-yet'){
    return;
    // 処理終了
  }
  let value = task.textContent;
  //完了一覧に追加
  // doneのidをとってtaskの子を追加
  let target = document.getElementById('done');
  target.insertBefore(task, target.childNodes[0]);
// タスクの値をタスクから消してdoneに追加
  data.task.splice(data.task.indexOf(value), 1);
  data.done.push(value);
  console.log(data);
  dataObjectUpdated();
}

// ローカルストレージに保存するコード
// 配列のままローカルストレージに保存できないから形式を変えて保存JSON.stringify(data)
// JSONの形で預けてjsの形に戻す
function dataObjectUpdated(){
  localStorage.setItem('todoList', JSON.stringify(data));

}
// console.log(localStorage.getItem(保存先の名前));
// console.log(localStorage.getItem('todoList'));
renderTodoList()
function renderTodoList() {
  // 関数にする必要はないけどカリキュラム上関数に慣れよう！ってことで書きましょう
  //未完了タスクを一覧で表示
  for(let value of data['task']){
    addTaskToDoM(value);//taskにリストをどんどん追加していく
  }
  for(let value of data.done){
    addTaskToDoM(value, true);//48行目のif文がtrueだったらってこと
  }

}

