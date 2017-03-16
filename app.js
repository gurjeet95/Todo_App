const ls = localStorage
for (let i = 0; i < ls.length; i++) {
  let key = ls.key(i)
  let obj = JSON.parse(ls.getItem(key))
  if (obj != null) {
    const ol = document.querySelector('ol')
    const li = document.createElement('li')
    const remove = document.createElement('button')
    remove.innerHTML = "delete"
    remove.setAttribute("id", key)
    li.textContent = obj.content
    li.setAttribute('class', obj.class)
    li.setAttribute('id', key)
    li.appendChild(remove)
    ol.appendChild(li)
    remove.addEventListener('click', removeitem)
    li.addEventListener('click', unchecked)
  }
}

const btn = document.getElementById('addTodo')
btn.addEventListener('click', add)

function add() {
  const text = document.getElementById('addTodoItem').value
  const ol = document.querySelector('ol')
  const li = document.createElement('li')
  const remove = document.createElement('button')
  remove.innerHTML = "delete"
  li.textContent = text
  let text1 = {
    'class': 'unchecked',
    'content': text
  }
  let key = storeadd(text1)
  remove.setAttribute('id', key)
  li.setAttribute('class', 'unchecked')
  li.setAttribute('id', key)
  li.appendChild(remove)
  ol.appendChild(li)
  document.getElementById('addTodoItem').value = ""
  remove.addEventListener('click', removeitem)
  li.addEventListener('click', unchecked)
}

function storeadd(item) {
  let keyposition = ls.length
  if (keyposition == 0) {
    ls.setItem(keyposition, JSON.stringify(item))
    return keyposition
  } else {
    let key = Number(ls.key(keyposition - 1))
    key = key + 1
    ls.setItem(key, JSON.stringify(item))
    return key
  }
}


function removeitem() {
  let id = this.getAttribute('id')
  let item = this.parentNode
  let parent = item.parentNode
  parent.removeChild(item)
  ls.removeItem(id)
}

function unchecked() {
  let id = this.getAttribute('id')
  if (this.className == "unchecked") {
    this.className = "checked"
    update(id, "checked")
  } else {
    this.className = "unchecked"
    update(id, "unchecked")
  }
}

function update(item, classname) {
  let obj = JSON.parse(ls.getItem(item))
  let class1 = classname
  let text1 = {
    'class': class1,
    'content': obj.content
  }
  ls.setItem(item, JSON.stringify(text1))
}