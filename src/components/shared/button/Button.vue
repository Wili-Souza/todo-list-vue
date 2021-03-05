<template>
    <button @click="handleClick()" :class="`button ${btnStyle}`" :type="type">
        {{ text }}
    </button>
</template>

<script>
export default {
    props: ['type', 'text', 'btnStyle'],

    data () {
        return {
            'new_note_class': 'new-note-button',
            'show_form': false,
            'i_title': 'Title',
            'i_content': 'What do you have to do next?'
        }
    },

    methods: {
        handleClick() {
            this.$emit('click')
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap');
.button {
    font-family: 'Montserrat';
    font-size: 0.9rem;
    font-weight: bold;
    background: rgb(46, 125, 179);
    color: white;
    border-style: none;
    border-radius: 3px;
    margin: 0.5rem;
    height: 1.5rem;
    cursor: pointer;
}

.button:hover {
    background: rgb(38, 97, 136);
}

.button:focus {
    outline: none;
}

.button:active {
    background: black;
}

.big {
    font-size: 1.2rem;
    width: 50%;
    height: 2.4rem;
    border-radius: 10px;
}

.mid {
    font-size: 1rem;
    width: 13rem;
    height: 2.4rem;
    border-radius: 10px;
}

.success {
    background: rgb(48, 211, 26);
    color: white;
}

.success:hover {
    background: rgb(16, 151, 84);
}

.danger {
    background: rgb(211, 38, 26);
    color: white;
}

.danger:hover {
    background: rgb(170, 38, 26);
}

.account {
    background: rgb(255, 208, 0);
    color: black;
}

.account:hover {
    background: rgb(255, 180, 0);
}

</style>