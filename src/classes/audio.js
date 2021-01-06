import { audioData } from "../../utils/retrieveData.js";
export default class Audio {
  constructor() {
    this.audio = document.getElementById("audio");
    this.type = "";
  }

  playAudio() {
    this.audio.src = audioData[this.type].src;
    this.audio.loop = audioData[this.type].loop;
    this.audio.play();
  }

  pauseAudio() {
    this.audio.pause();
  }
}
