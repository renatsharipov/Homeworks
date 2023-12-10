<template>
	<div class="todo-container">
		<div class="todo-wrapper">
			<div class="title-wrapper">
				<p class="title">ToDo List</p>
			</div>
			<div class="filter-wrapper">
				<button @click="filterImportantTasks">Показать важные задачи</button>
			</div>
			<form class="create-wrapper">
				<input
					v-model="creatingToDo"
					class="create-input"
					type="text"
					placeholder="Название задачи"
				/>
				<input
					v-model.number="priority"
					class="create-input"
					type="number"
					placeholder="Приоритет задачи"
					min="1"
				/>
				<button class="create-button" @click.prevent="handleSendTodo">
					Завести задачу
				</button>
			</form>
			<div class="notification" v-if="notification">{{ notification }}</div>
			<div class="task-list-wrapper">
				<div
					v-for="(todoItem, index) in filteredTodoList"
					:key="index"
					class="todo-list-element"
				>
					<div class="element-content">
						<input v-model="todoItem.status" type="checkbox" />
						<p
							v-if="!todoItem.isEditing"
							:class="{ 'completed-task': todoItem.status }"
						>
							{{ todoItem.name }} - {{ todoItem.priority }}
						</p>
						<input
							v-else
							ref="editingInput"
							v-model="todoItem.isEditingValue"
							:index="index"
							type="text"
						/>
					</div>
					<div v-if="!todoItem.isEditing" class="element-buttons">
						<button @click.prevent="handleEditToDo(todoItem)">
							Редактировать
						</button>
						<button @click.prevent="handleDeleteToDo(todoItem)">Удалить</button>
					</div>
					<div v-else class="element-buttons">
						<button @click.prevent="handleSaveEdited(todoItem)">
							Сохранить
						</button>
						<button @click.prevent="handleStopEdit(todoItem)">Отменить</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const creatingToDo = ref('')
const priority = ref<number | undefined>(undefined)

const notification = ref<string>('')
const showAllTasks = ref(true)

const filterImportantTasks = () => {
	showAllTasks.value = !showAllTasks.value
}

const filteredTodoList = computed(() => {
	if (showAllTasks.value) {
		return todoList.value
	} else {
		return todoList.value.filter(
			todo => todo.priority === 'Очень важно' || todo.priority === 'Важно'
		)
	}
})

const showNotification = (message: string) => {
	notification.value = message
	setTimeout(() => {
		notification.value = ''
	}, 3000)
}

const handleSendTodo = () => {
	let priorityText = ''
	switch (priority.value) {
		case 1:
			priorityText = 'Очень важно'
			break
		case 2:
			priorityText = 'Важно'
			break
		case 3:
			priorityText = 'Не очень важно'
			break
		default:
			priorityText = 'Не задано'
	}

	const newTask = {
		status: false,
		name: creatingToDo.value,
		isEditing: false,
		priority: priorityText,
	}

	todoList.value.push(newTask)
	sortTodoListByPriority()
	showNotification('Задача успешно создана!')
}

const handleDeleteToDo = (todoItem: IToDoItem) => {
	const todoToDelete = todoList.value.indexOf(todoItem)
	if (todoToDelete !== -1) {
		todoList.value.splice(todoToDelete, 1)
		showNotification('Задача удалена!')
	}
}

const handleEditToDo = (todoItem: IToDoItem) => {
	const todoToEditIndex = todoList.value.indexOf(todoItem)
	todoList.value[todoToEditIndex].isEditing = true
	todoList.value[todoToEditIndex].isEditingValue =
		todoList.value[todoToEditIndex].name
}

const handleStopEdit = (todoItem: IToDoItem) => {
	const todoEditingIndex = todoList.value.indexOf(todoItem)
	todoList.value[todoEditingIndex].isEditing = false
}

const handleSaveEdited = (todoItem: IToDoItem) => {
	const todoToSaveIndex = todoList.value.indexOf(todoItem)
	todoList.value[todoToSaveIndex].isEditing = false

	// Обновляем текст задачи
	todoList.value[todoToSaveIndex].name =
		todoList.value[todoToSaveIndex].isEditingValue

	showNotification('Задача успешно сохранена!')
}

const sortTodoListByPriority = () => {
	todoList.value.sort((a, b) => {
		const priorityMap: Record<string, number> = {
			'Очень важно': 1,
			Важно: 2,
			'Не очень важно': 3,
		}
		return priorityMap[a.priority] - priorityMap[b.priority]
	})
}

interface IToDoItem {
	status: boolean
	name: string
	isEditing: boolean
	isEditingValue?: string
	priority: string
}

const todoList = ref<IToDoItem[]>([
	{
		status: false,
		name: 'Название 1',
		isEditing: false,
		priority: 'Очень важно',
	},
])
</script>

<style lang="scss" scoped>
.todo-container {
	width: 100vw;
	height: 100vh;
	background-color: white;
	align-items: center;
	display: flex;
	justify-content: center;
}

.todo-wrapper {
	width: 500px;
	height: 800px;
	border: 1px black solid;
	padding: 0 20px;
	background-color: #242424;
}

.notification {
	background-color: #ffffff;
	color: #000000;
	padding: 2px 10px;
	border-radius: 5px;
	flex-direction: column;
	margin: 20px;
	font-size: 20px;
}

.filter-wrapper {
	margin-bottom: 20px;
	button {
		padding: 8px 10px;
		color: black;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}
}

.title {
	color: rgb(255, 255, 255);
	font-size: 24px;
	font-weight: 700;
}

.create-wrapper {
	display: flex;
	align-items: center;
	gap: 10px;

	.create-button {
		padding: 4px 8px;
	}

	.create-input {
		height: 24px;
	}
}

.task-list-wrapper {
	margin: 20px 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
}

.todo-list-element {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	background-color: rgb(79, 79, 79);
	border-radius: 8px;
	padding: 0 10px;

	.element-content {
		display: flex;
		align-items: center;
		gap: 10px;

		p {
			margin: 6px 0;
		}
	}

	.element-buttons {
		display: flex;
		align-items: center;
		gap: 10px;

		button {
			padding: 3px 6px;
			font-size: 14px;
		}
	}
}

.completed-task {
	text-decoration: line-through;
}
</style>
