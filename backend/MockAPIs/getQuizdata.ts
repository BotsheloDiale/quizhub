

import sampleQuiz from '~/backend/Repository/quiz.json';
import quizList from '~/backend/Repository/quizes.json';
import quizMemo from '~/backend/Repository/quizMemo.json';

const previousScores : number[] = [23, 45, 90, 88, 100, 69, 69, 70];

export function getQuizList() {
    return quizList;
}

export function getSingleQuiz(quizId?: string) {
    return sampleQuiz;
}

function calculateRank(score: number) {
    let bested = previousScores.filter(x => x < score);
    return bested.length / previousScores.length * 100;
}

export function getQuizResults(answers: any, quizId?: string) {

    let correctAnswers = 0
    quizMemo.forEach((x: { id: string; value: string | number | boolean; }) => {
        const result = answers.find((input: { id: string; value: string | boolean | number; }) => input.id === x.id && input.value === x.value)
        if (result != (undefined || null))
            correctAnswers++;
    });
    const average = correctAnswers / answers.length * 100;
    return {
        correctAnswers,
        score: Math.round(average * 100) / 100,
        rank: `You are better than ${calculateRank(average)}% of all quizers.`
    }
}