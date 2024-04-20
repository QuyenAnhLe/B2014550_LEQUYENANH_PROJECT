<template>
    <div>
        <ul class="list-group">
        <li class="list-group-item" v-for="book in books" :key="book.id">
            {{ book.name }}
        </li>
        <li class="list-group-item" v-if="books.length === 0">No books found.</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "BookList",
        props: {
            books: {
            type: Array,
            default: () => [],
            },
        },
    };
</script>
  