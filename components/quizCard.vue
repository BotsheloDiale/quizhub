<template>
    <v-card
      :loading="loading"
      class="mx-auto my-12"
      max-width="374"
    >
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>
      <v-parallax v-if="!disabled" height="300" src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg" />
      <v-parallax v-else height="300" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg" />
      
      <v-card-title>{{title}}</v-card-title>
  
      <v-card-text>
        <v-row
          align="center"
          class="mx-0"
        >
          <v-rating
            :value="rating"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>
  
          <div class="grey--text ms-4">
            {{rating}}
          </div>
        </v-row>
  
        <div class="my-4 text-subtitle-1">
          € • {{cost}}
        </div>
  
        <div>{{description}}</div>
      </v-card-text>
  
      <v-divider class="mx-4"></v-divider>
  
      <v-card-actions>
        <v-btn
          v-if="!disabled"
          text
          v-bind="axtion.attrs"
          v-on="axtion.on"
          color="grey"
          @click="startQuiz(quizID)"
        >
          {{buttonName? buttonName : 'Start quiz'}}
        </v-btn>
        <v-btn
          v-else
          text
          disabled
          color="grey"
          @click="startQuiz(quizID)"
        >
          Coming Soon
        </v-btn>
      </v-card-actions>
    </v-card>
  </template>

  <script>
  //import
  export default {
    props: [
      'cost',
      'axtion',
      'disabled',
      'description',
      'imageSource',
      'title',
      'rating',
      'quizID',
      'buttonName'
    ],
    data: () => ({
      loading: false,
      selection: 1,
    }),

    methods: {
      startQuiz (id) {
        this.loading = true
        setTimeout(() => (
          this.loading = false,
          this.$emit('openQuiz', id)
        ), 2000)
      },
    },
  }
</script>