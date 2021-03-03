<template>
    <div :class='type==="empty" ? show_form ? "note note-form" : "note empty-note" : "note"'>
        <div v-if='type!=="empty"' class='icons'>
            <font-awesome-icon @click="show_edit_form" class='icon edit-icon' icon='edit'></font-awesome-icon>
            <font-awesome-icon @click="delete_note" class='icon trash-icon' icon='trash'></font-awesome-icon>
            
        </div>
        
        <div v-if='type==="empty"' :class='new_note_class'>
            <form @submit.prevent="save" v-if="show_form" class='form-content'>
                <input class="note-input-title" v-model="note.title" />
                <textarea class="note-input-content" v-model="note.content"></textarea>

                <form-button type="submit" class='float float-left' btnStyle="success" text="Create"></form-button>
                <form-button @click="show_create" type="button" class='float float-right' btnStyle="danger" text="Cancel"></form-button>
            </form>
            <span v-else @click="show_create">+</span>
        </div>
        <div v-else-if="show_update">
            <form @submit.prevent="update">
                <input class="note-input-title" v-model="note.title"/>
                <textarea class="note-input-content" v-model="note.content"></textarea>
                <form-button type="submit" class='float float-center' btnStyle="success" text="Save"></form-button>
            </form>
        </div>
        <div v-else>
            <h2>{{title}}</h2>
            <p>{{content}}</p>
        </div>
    </div>
</template>

<script>
import Button from '../button/Button.vue'
import NoteService from '../../../domain/note/NoteService.js'
import Note from '../../../domain/note/Note.js'

export default {
    components: {
        'form-button': Button
    },

    props: ['title', 'content', 'id', 'type'],

    created () {
        this.note.title = this.title || 'Title'
        this.note.content = this.content || 'What do you have to do next?'
        this.service = new NoteService(this.$resource)
    },

    data () {
        return {
            'new_note_class': 'new-note-button',
            'show_form': false,
            'show_update': false,
            note: new Note()
        }
    },

    methods: {
        show_create () {
            if (!this.show_form) {
                this.new_note = 'new-note-input'
                this.show_form = true
            } else {
                this.new_note = 'new-note-button'
                this.show_form = false
            }
        },

        show_edit_form () {
            this.show_update = !this.show_update
        },

        save () {
            this.service
                .add(this.note)
                .then(() => {
                    this.new_note = 'new-note-button'
                    this.show_form = false
                    this.note.title = 'Title'
                    this.note.content = 'What do you have to do next?'
                    this.$root.$emit('reload')
                })
        },

        update () {
            this.service
                .update(this.id.$oid, this.note)
                .then(() => {
                    this.show_edit_form()
                    this.$root.$emit('reload')
                })
        },

        delete_note () {
            this.service
                .remove(this.id.$oid)
                .then(() => {
                    this.$root.$emit('reload')
                })
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap');

p {
    word-break: break-all;
}

.note{
    font-family: 'Montserrat';
    position: relative;
    vertical-align: top;
    display: inline-block;
    margin: 1rem;
    padding: 1rem 2rem;
    width: 10rem;

    background: white;
    border-radius: 4px;
    box-shadow: 1px 1px 12px rgba(141, 141, 141, 0.5);
    transition: all .4s;
}

.empty-note{
    width: 3rem;
}

.icons{
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
}

.icon{
    font-size: 0.8rem;
    margin-left: 8px;
    transition: all .1s;
    cursor: pointer;
}

.trash-icon{
    color: rgba(255, 0, 0, 0.5);
}

.trash-icon:hover{
    color: rgba(255, 0, 0, 0.8);
}

.edit-icon{
    color: rgba(13, 75, 41, 0.5)
}

.edit-icon:hover{
    color: rgba(13, 75, 41, 0.8)
}

.new-note-button{
    height: 5rem;
    text-align: center;
}

.new-note-button span{
    height: 100%;
    display: inline-flex;
    align-items: center;

    font-weight: bold;
    font-size: 4rem;
    color: rgba(99, 99, 99, 0.3);
}

.new-note-button span:hover{
    font-size: 4.4rem;
    color: rgba(99, 99, 99, 0.6);
}

.note-form {
    position: relative;
    width: 10rem;
    height: 16rem;
    background: rgb(37, 41, 44);
    transition: all .4s;
}

input, textarea {
    width: 100%;
    font-family: 'Montserrat';
    border-style: none;
}

.note-form input, .note-form textarea {
    background: rgb(37, 41, 44);
    color: white;
}

input:focus, textarea:focus {
    outline: none;
}

.note-input-title {
    margin: 1.2rem 0;
    font-weight: bold;
    font-size: 1.5rem;
}

.note-input-content {
    height: 10rem;
    resize: none;
    font-size: 1rem;
}

.float {
    position: absolute;
}

.float-left {
    bottom: -1rem;
    left: 2rem;
}

.float-right {
    bottom: -1rem;
    right: 2rem;
}

.float-center {
    bottom: -1rem;
    left: 50%;
    transform: translateX(-60%)
}

</style>