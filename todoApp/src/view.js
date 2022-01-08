import { createELement, EventEmitter } from './helper.js'

class View extends EventEmitter {
    constructor() {
        super()
        this.form = document.getElementById('todo-form')
        this.input = document.getElementById('add-input')
        this.list = document.getElementById('todo-list')

        // this.form.addEventListener('submit', handleAdd.bind(this))
        this.form.addEventListener('submit', this.handleAdd.bind(this))
    }

    createElement(todo) {
        const checkbox = createELement('input', { type: 'checkbox', className: 'checkbox', checked: todo.copmleted ? 'checked' : '' })
        const label = createELement('input', { className: 'title' }, todo.title)
        const editInput = createELement('input', { type: 'text', className: 'textfield' })
        const editButton = createELement('button', { className: 'edit' }, "edit")
        const deleteButton = createELement('button', { className: 'delete' }, "delete")
        const item = createELement('li', { className: `todo-item ${todo.copmleted ? 'completed' : ''}`, 'data-id': todo.id }, checkbox, label, editInput, editButton, deleteButton)

        return this.addEventListeners(item)

    }

    addEventListeners(listItem) {
        const checkbox = listItem.querySelector('.checkbox')
        const editButton = listItem.querySelector('button.edit')
        const deleteButton = listItem.querySelector('button.delete')

        checkbox.addEventListener('change', this.handleToggle.bind(this))
        editButton.addEventListener('click', this.handleEdit.bind(this))
        deleteButton.addEventListener('click', this.handleDelete.bind(this))

        return listItem
    }

    handleAdd(event) {
        event.preventDefault()

        if (!this.input.value) return alert('you need to write something...')

        const value = this.input.value

        this.emit('add', value)
    }

    handleToggle({ target }) {
        const listItem = target.parentNode
        const id = listItem.getAttribute('data-id')
        const completed = target.checked

        this.emit('toggle', { id, completed })
    }

    handleEdit({ target }) {
        const listItem = target.parentNode
        const id = listItem.getAttribute('data-id')
        const label = listItem.querySelector('.title')
        const input = listItem.querySelector('.textfield')
        const editButton = listItem.querySelector('button.edit')
        const title = input.value
        const isEditing = listItem.classList.contains('editing')

        if (isEditing) {
            this.emit('edit', { id, title })
        } else {
            input.value = label.textContent
            editButton.textContent = 'save'
            listItem.classList.add('editing')
        }
    }

    handleDelete({ target }) {
        const listItem = target.parentNode
        const id = listItem.getAttribute('data-id')

        this.emit('delete', id)

    }

    findListItem(id) {
        return this.list.querySelector(`[data-id="${id}"]`)
    }

    addItem(todo) {
        const listItem = this.createElement(todo)

        this.input.value = ''
        this.list.appendChild(listItem)
    }

    toggleItem(todo) {
        const listItem = this.findListItem(todo.id)
        const checkbox = listItem.querySelector('.checkbox')

        checkbox.checked = todo.completed

        if (todo.copmleted) {
            listItem.classList.add('completed')
        } else {
            listItem.classList.remove('completed')
        }
    }

    editItem(todo) {
        const listItem = this.findListItem(todo.id)
        const label = listItem.querySelector('.title')
        const input = listItem.querySelector('.textfield')
        const editButton = listItem.querySelector('button.edit')

        label.textContent = todo.title
        editButton.textContent = 'edit'
        listItem.classList.remove('editing')
        // input.value = label.value
    }

    removeItem(id) {
        const listItem = this.findListItem(todo.id)

        this.list.removeChild(listItem)
    }

}
export default View