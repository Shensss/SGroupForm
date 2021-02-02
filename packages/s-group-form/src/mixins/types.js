export default {
    data() {
        return {}
    },
    props: {
        value: String | Number,
        config: Object,
        mapper: Object
    },
    computed: {
        model: {
            set(val) {
                this.$emit('input', val)
            },
            get() {
                return this.value
            }
        }
    },
    methods: {
        change(value) {
            if (this.config.change) {
                this.$emit('change', value)
            }
        },
        focus() {
            if (this.config.focus) {
                this.$emit('change', this.value)
            }
        },
        blur() {
            if (this.config.blur) {
                this.$emit('change', this.value)
            }
        }
    }
}
