<template>
  <div id="app">
    <vue-plyr @player="setPlayer" :options="plyrOptions">
      <audio>
        <source :src="baseUrl + 'audio/' + audioFile" type="audio/mp3">
      </audio>
    </vue-plyr>
    <Flashcard :front="question" :back="answer" v-on:click="showReply" :isQuestion="isQuestion"/>
    <div class="answer" v-show="showButtons">
      <p>Did you get it right?</p>
      <button class="yes" v-on:click="nextQuestion(true)">
        <span>👍</span> Yes
      </button>
      <button class="no" v-on:click="nextQuestion(false)">
        <span>👎</span> No
      </button>
    </div>
  </div>
</template>

<script>
import Flashcard from "./components/Flashcard";
import Vue from "vue";
import VuePlyr from "vue-plyr";
import questions from "./assets/questions.json";
import shuffle from "./lib/shuffle.js";

let baseUrl = process.env.NODE_ENV === 'production'
      ? '/flashcards/'
      : '/'

let questionsQueue = shuffle(questions);
let nextQuestion = questionsQueue.shift();

Vue.use(VuePlyr);

export default {
  components: { Flashcard },
  props: {
    plyrOptions: {
      type: Object,
      default: function() {
        return { autoplay: true, controls: ["play", "volume", "mute"] };
      }
    }
  },
  data() {
    return {
      baseUrl,
      audioFile: nextQuestion.sound,
      question: nextQuestion.question,
      answer: nextQuestion.answer,
      isQuestion: true,
      showButtons: false,
      player: {}
    };
  },
  methods: {
    showReply: function() {
      if (this.isQuestion === true) {
        this.showButtons = true;
      }
      this.isQuestion = !this.isQuestion;
    },
    nextQuestion: function() {
      nextQuestion = questionsQueue.shift();
      this.setQuestion(nextQuestion);
      this.isQuestion = true;
      this.showButtons = false;
      this.player.restart();
    },
    setQuestion: function(question) {
      this.question = question.question;
      this.answer = question.answer;
      this.player.source = {
        type: "audio",
        title: nextQuestion.question,
        sources: [
          {
            src: baseUrl + "audio/" + nextQuestion.sound,
            type: "audio/mp3"
          }
        ]
      };
    },
    setPlayer(player) {
      this.player = player;
    }
  },
  create: function() {
    this.setQuestion(nextQuestion);
  },
  meta: {
    title: "Vue.js Flashcards"
  }
};
</script>

<style>
body {
  background: #effafe;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.plyr {
  margin: 0 auto;
  max-width: 0;
}

button::-moz-focus-inner {
  border: 0;
}

.answer button {
  border-radius: 300px;
  border-width: 4px;
  border-style: solid;
  width: 100px;
  height: 100px;
  font-size: 1.5rem;
  font-weight: bold;
  animation: grow 0.5s;
  animation-timing-function: cubic-bezier(0.17, 0.67, 0.26, 0.95);
}

.answer button.yes {
  background-color: #dafeaf;
  border-color: #bdf081;
  margin-right: 1rem;
}

.answer button.yes:hover {
  background-color: #bdf081;
}

.answer button.no {
  margin-left: 1rem;
  background-color: #fe9f9f;
  border-color: #fe7f7f;
}

.answer button.no:hover {
  background-color: #fe7f7f;
}

.answer button span {
  display: block;
}

@-webkit-keyframes grow {
  0% {
    -webkit-transform: scale(0);
    -moz-transform: scale(0);
    -o-transform: scale(0);
    -ms-transform: scale(0);
    transform: scale(0);
  }

  100% {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -o-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
  }
}
</style>
