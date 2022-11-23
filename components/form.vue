<template>
    <v-row >
        <v-form ref="form" class="quiz_form" lazy-validation @input="enableButton">
            <v-container v-for="(field, index) in fields" fluid>
                <p class="quiz_form question">{{ `${index + 1}. ${field.question}` }}</p>
                <v-checkbox v-for="option in field.options"  class="quiz_form answer" v-model="field.value"
                    :label="option.displayName ? option.displayName : option"
                    :value="option.value ? option.value : option" :rules="rules" />
            </v-container>

            <v-btn :disabled="!valid" @click="submitForm">
                Submit
            </v-btn>

            <v-btn color="error" class="mr-4" @click="reset">
                Reset Form
            </v-btn>
        </v-form>
    </v-row>
</template>

<script>
export default {
    props: ['fields'],
    data: () => ({
        valid: false,
        rules: [
            v => !!v || 'Select option'
        ]
    }),

    methods: {
        enableButton(){
            this.valid = true;
            this.fields.forEach(element => {
                if(element.value == (null || undefined) ){
                    return this.valid = false;
                }
            });
        },
        submitForm() {
            this.$refs.form.validate();
            this.valid == true ? this.$emit('quizSummary', this.fields) : null
        },
        reset() {
            this.$refs.form.reset()
        }
    },
}
</script>