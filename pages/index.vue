<template>
  <v-row>
    <v-dialog v-model="showDialog" persistent max-width="90vw">
      <template v-slot:activator="{ on, attrs }">
        <v-col v-for="(quiz, index) in quizList" cols="12" sm="6" md="4" lg="3" xl="2">
          <Card :cost="quiz.cost" :quizID="quiz.id" :title="quiz.title" :rating="quiz.rating"
            :description="quiz.description" :disabled="!quiz.active" @openQuiz="getQuiz"
            @input="activeQuizID = undefined" :axtion="{ attrs, on }" />
        </v-col>
      </template>
      <v-card v-if="quiz">
        <v-card-title>
          <span> {{ quiz.formHeading }}</span>
        </v-card-title>
        <v-card-title>
          <span><small>{{ quiz.formTitle }}</small></span><br />
        </v-card-title>
        <v-card-subtitle>{{ quiz.formDescription }}</v-card-subtitle>
        <v-card-text>
          <Form v-if="activeQuizID != undefined" :fields="quiz.fields" @quizSummary="generateFeedback" />
        </v-card-text>
      </v-card>
      <v-card v-else-if="summary">
        <v-card-title>
          <span> {{ summaryTitle }}</span>
        </v-card-title>
        <v-devider />
        <v-card-text>
          <p> <small>number of correct answered : </small> {{ summary.correctAnswers }}</p>
          <p> <small>score average of : </small> {{ summary.score }} %</p>
          <p> {{ summary.rank }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="showDialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-row>
</template>

<script>
import Form from '~/components/form';
import Card from '~/components/quizCard';
import { getSingleQuiz, getQuizList, getQuizResults } from '~/backend/MockAPIs/getQuizdata';

export default {
  name: "IndexPage",
  components: { Card, Form },
  data: () => ({
    quiz: undefined,
    summaryTitle: '',
    showDialog: false,
    summary: undefined,
    activeQuizID: undefined,
    quizList: getQuizList()
  }),
  methods: {
    getQuiz(id) {
      this.quiz = getSingleQuiz(id);
      this.activeQuizID = id;
      this.showDialog = true;
    },
    generateFeedback(userResponse) {
      this.summaryTitle = this.quiz.formHeading;
      this.quiz = this.activeQuizID = undefined;
      this.summary = getQuizResults(userResponse, this.activeQuizID);
      console.log(this.summary)
    }
  }
}
</script>
