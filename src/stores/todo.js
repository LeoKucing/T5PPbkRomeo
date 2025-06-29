    import { defineStore } from 'pinia'
    import { ref, computed } from 'vue'

    export const useTodoStore = defineStore('todo', () => {
    const todos = ref([])

    const addTodo = (text) => {
        todos.value.push({ id: Date.now(), text, done: false })
    }

    const removeTodo = (id) => {
        todos.value = todos.value.filter(todo => todo.id !== id)
    }

    const toggleDone = (id) => {
        const todo = todos.value.find(todo => todo.id === id)
        if (todo) todo.done = !todo.done
    }

    const remaining = computed(() => todos.value.filter(todo => !todo.done).length)

    return { todos, addTodo, removeTodo, toggleDone, remaining }
    })
