<template>
  <div class="flashcards">
    <div
      @click="handleClick"
      v-bind:style="{backgroundColor: colorFront, color: colorTextFront}"
      v-show="isQuestion"
      class="animated flipInX flashcard"
    >
      <div class="card-header" style="padding-bottom: 15px;">{{headerFront}}</div>
      <div class="card-content center">
        <p v-bind:style="{fontSize: textSizeFront,fontWeight: 'bold'}">{{front}}</p>
        <img v-if="imgFront!=''" :src="imgFront" width="200" height="200">
      </div>
      <div class="card-footer">{{footerFront}}</div>
    </div>
    <div
      @click="handleClick"
      v-bind:style="{backgroundColor: colorBack, color: colorTextBack}"
      v-show="!isQuestion"
      class="animated flipInX flashcard"
    >
      <div class="card-header" style="padding-bottom: 15px;">{{headerBack}}</div>
      <div class="card-content center">
        <p v-bind:style="{fontSize: textSizeBack, fontWeight: 'bold'}">{{back}}</p>
        <img v-if="imgBack!=''" :src="imgBack" width="200" height="200">
      </div>
      <div class="card-footer">{{footerBack}}</div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    handleClick: function(event) {
      this.$emit("click");
    }
  },
  props: {
    isQuestion: {
      type: Boolean,
      default: true
    },
    imgFront: {
      type: String,
      default: ""
    },
    imgBack: {
      type: String,
      default: ""
    },
    front: {
      type: String,
      default: ""
    },
    back: {
      type: String,
      default: ""
    },
    textSizeFront: {
      type: String,
      default: "2em"
    },
    textSizeBack: {
      type: String,
      default: "2em"
    },
    colorTextFront: {
      type: String,
      default: "black"
    },
    colorTextBack: {
      type: String,
      default: "white"
    },
    colorFront: {
      type: String,
      default: "white"
    },
    colorBack: {
      type: String,
      default: "#dda7fe"
    },
    headerFront: {
      type: String,
      default: "Translate this phrase"
    },
    headerBack: {
      type: String,
      default: "Answer"
    },
    footerFront: {
      type: String,
      default: "Click to show answer"
    },
    footerBack: {
      type: String,
      default: "Click to show Front"
    }
  }
};
</script>
<style scoped>
.flashcards {
  max-width: 500px;
  margin: 0 auto;
}

.center {
  text-align: center;
}

.flashcard {
  cursor: pointer;
  border-radius: 10px;
  margin: 20px;
  padding: 25px;
  text-align: center;
  border:1px solid rgba(0,0,0,0.3);
}

.flashcard::before {
  border-radius: 10px;
  /* Position the pseudo-element. */
  content: " ";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  /* Create the box shadow at expanded size. */
  box-shadow: 0 0px 7px rgba(0, 0, 0, 0.4);
  /* Hidden by default. */
  opacity: 0;
  transition: opacity 500ms;
}

.flashcard:hover::before {
  /* Show the pseudo-element on hover. */
  opacity: 1;
}

.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}

@keyframes flipInX {
  from {
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    animation-timing-function: ease-in;
    opacity: 0;
  }
  40% {
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    animation-timing-function: ease-in;
  }
  60% {
    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    opacity: 1;
  }
  80% {
    transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
  }
  to {
    transform: perspective(400px);
  }
}

.flipInX {
  backface-visibility: visible !important;
  animation-name: flipInX;
}
</style>
