<template>
    <div class="dash-notes">
        <my-note @reload="load" v-for='note in notes' 
            :id='note._id' :title='note.title' :content='note.content'
        >
        </my-note>
        <my-note type="empty"></my-note>
    </div>
</template>

<script>
import Note from '../shared/note/Note.vue'
import NoteService from '../../domain/note/NoteService.js'

export default {
    components: {
        'my-note': Note
    },

    data () {
        return {
            'notes': []
        }
    },
    
    created () {
        if (this.$store.getters.loggedIn) {
            this.service = new NoteService(this.$resource, this.$store.state.token)
            this.service
                .get_all()
                .then(res => this.notes = res, error => {
                    console.log(error)
                })
        } else {
            this.$router.push({name: 'login'})
        }
    },

    mounted () {
        this.$root.$on('reload', () => {
            this.service
                .get_all()
                .then(res => this.notes = res, error => {
                    console.log(error)
                })
        })
    },

    methods: {
        load() {
            console.log('voltou')
            this.service
                .get_all()
                .then(res => this.notes = res, error => {
                    console.log(error)
                })  
        }
    }
}
</script>
<style>
.dash-notes{
    margin: 0;
    display: inline-block;
    margin-left: 20%;
    vertical-align: top;
}
</style>