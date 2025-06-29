    <template>
    <div :class="['app', { dark: isDark }]">
        <div class="container">
        <header>
            <h1>📝 MyTask</h1>
            <button @click="toggleDarkMode">
            {{ isDark ? '🌞' : '🌙' }}
            </button>
        </header>

        <div class="add-task">
            <input v-model="newTodo" @keyup.enter="addNewTodo" placeholder="Tulis tugas..." />
            <button @click="addNewTodo">Tambah</button>
        </div>

        <div class="filters">
            <button :class="{ active: filter === 'all' }" @click="filter = 'all'">Semua</button>
            <button :class="{ active: filter === 'done' }" @click="filter = 'done'">Selesai</button>
            <button :class="{ active: filter === 'undone' }" @click="filter = 'undone'">Belum</button>
        </div>

        <transition-group name="list" tag="ul" class="todo-list">
            <li v-for="todo in filteredTodos" :key="todo.id" :class="{ done: todo.done }">
            <div class="todo-item">
                <input type="checkbox" :checked="todo.done" @change="store.toggleDone(todo.id)" />
                <span>{{ todo.text }}</span>
            </div>
            <button @click="store.removeTodo(todo.id)">❌</button>
            </li>
        </transition-group>

        <p class="count">Tersisa: {{ store.remaining }} tugas</p>
        </div>
    </div>
    </template>

    <script setup>
    import { ref, computed } from 'vue'
    import { useTodoStore } from '../stores/todo'

    const store = useTodoStore()
    const newTodo = ref('')
    const filter = ref('all')
    const isDark = ref(false)

    const toggleDarkMode = () => {
    isDark.value = !isDark.value
    }

    const addNewTodo = () => {
    if (newTodo.value.trim() !== '') {
        store.addTodo(newTodo.value)
        newTodo.value = ''
    }
    }

    const filteredTodos = computed(() => {
    if (filter.value === 'all') return store.todos
    if (filter.value === 'done') return store.todos.filter(todo => todo.done)
    if (filter.value === 'undone') return store.todos.filter(todo => !todo.done)
    })
    </script>

    <style scoped>
    .app {
    min-height: 100vh;
    background: #f1f1f1;
    transition: background 0.3s;
    display: flex;
    justify-content: center;
    padding: 30px 16px;
    }

    .app.dark {
    background: #111;
    color: #eee;
    }

    .container {
    max-width: 500px;
    width: 100%;
    background: #fff;
    padding: 24px;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    transition: background 0.3s;
    }

    .app.dark .container {
    background: #1f1f1f;
    }

    header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    }

    h1 {
    font-size: 1.8rem;
    }

    .add-task {
    display: flex;
    margin-bottom: 20px;
    }

    .add-task input {
    flex: 1;
    padding: 12px;
    border-radius: 8px 0 0 8px;
    border: none;
    outline: none;
    }

    .add-task button {
    padding: 12px 18px;
    border: none;
    background: #4caf50;
    color: #fff;
    border-radius: 0 8px 8px 0;
    cursor: pointer;
    }

    .filters {
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
    flex-wrap: wrap;
    }

    .filters button {
    flex: 1;
    padding: 10px;
    border: none;
    background: #ccc;
    border-radius: 8px;
    cursor: pointer;
    }

    .filters button.active {
    background: #4caf50;
    color: #fff;
    }

    .todo-list {
    list-style: none;
    padding: 0;
    margin: 0;
    }

    .todo-item {
    display: flex;
    align-items: center;
    gap: 10px;
    }

    .todo-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px;
    margin: 10px 0;
    background: #f9f9f9;
    border-radius: 12px;
    transition: all 0.3s;
    }

    .app.dark .todo-list li {
    background: #2c2c2c;
    }

    .todo-list li.done {
    text-decoration: line-through;
    opacity: 0.6;
    }

    .todo-list li button {
    background: #f44336;
    border: none;
    color: #fff;
    padding: 8px 10px;
    border-radius: 6px;
    cursor: pointer;
    }

    .count {
    text-align: center;
    margin-top: 20px;
    font-weight: bold;
    }

    /* Animasi */
    .list-enter-active, .list-leave-active {
    transition: all 0.4s ease;
    }

    .list-enter-from {
    opacity: 0;
    transform: translateY(-20px);
    }

    .list-leave-to {
    opacity: 0;
    transform: translateY(20px);
    }

    /* Responsif */
    @media (max-width: 480px) {
    .container {
        padding: 20px;
    }

    h1 {
        font-size: 1.5rem;
    }

    .filters button {
        flex: 1 1 30%;
    }

    .add-task button {
        padding: 10px 14px;
    }
    }
    </style>
