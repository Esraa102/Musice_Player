let trackName = document.querySelector(".song-name");
let trackArtist = document.querySelector(".artist-name");
let trackImg = document.querySelector(".song-track");
let track = document.querySelector("audio source");
let trackCurrent = document.querySelector("audio");

let prevBtn = document.querySelector(".prev-track");
let nextBtn = document.querySelector(".next-track");
let controlBtn = document.querySelector(".ctrl-div");

let seekSlider = document.querySelector("#seek-range");
let volumeSlider = document.querySelector("#volume-range");
let currentSongTime = document.querySelector(".current-time");
let totalTime = document.querySelector(".total-duration");

let trackIndex = 0;
let isPlaying = false;
let updateTime;

let TRACK_LIST = [
  {
    name: "Dimonds",
    artist: "Rihana",
    path: "media/02 - Diamonds.mp3",
    img: "media/Screenshot 2023-10-15 092818.png",
    bgColor: "#701fd1",
  },
  {
    name: "Silent Scream",
    artist: "Anna blue",
    path: "media/Anna Blue- Silent Scream (Official Music Video).mp3",
    img: "media/8713df43-74c2-4501-a4a5-b43e69281bdd.jpg",
    bgColor: "#c70cb0",
  },
  {
    name: "Rolling In The Deep",
    artist: "Adele",
    path: "media/Adele - Rolling in the Deep (Official Music Video).mp3",
    img: "media/Adele stuns with devastating new songs, tells Oprah, 'It's not my job to validate' body image — USA TODAY.jpg",
    bgColor: "#f44101",
  },
  {
    name: "Alone",
    artist: "Alan Walker",
    path: "media/Alan Walker - Alone (Lyrics).mp3",
    img: "media/On this board, you can see Alan Walker's new….jpg",
    bgColor: "#4073d5",
  },
  {
    name: "Lovely",
    artist: "Bili Eilish",
    path: "media/Billie Eilish, Khalid - lovely (Official Music Video).mp3",
    img: "media/HILLS.jpg",
    bgColor: "#cbc3d9",
  },
  {
    name: "Enemy",
    artist: "Imagine Dragons",
    path: "media/Enemy(PaglaSongs).mp3",
    img: "media/b60e66ec-47e9-4e41-8398-fcf1fdd7883e.jpg",
    bgColor: "#0588ff",
  },
  {
    name: "Unstoppable",
    artist: "Sia",
    path: "media/Sia - Unstoppable (Lyrics).mp3",
    img: "media/This Is Why Sia Always Covers Her Face.jpg",
    bgColor: "#f4f5f7",
  },
];

function loadTrack(trackIndex) {
  clearInterval(updateTime);
  resetValues();
  track.src = TRACK_LIST[trackIndex].path;
  trackCurrent.load();

  trackName.innerHTML = TRACK_LIST[trackIndex].name;
  trackArtist.innerHTML = TRACK_LIST[trackIndex].artist;
  trackImg.src = TRACK_LIST[trackIndex].img;
  // Update Timer
  updateTime = setInterval(updateSeek, 1000);
  track.addEventListener("ended", nextTrack);
  document
    .querySelector(":root")
    .style.setProperty("--main-color", `${TRACK_LIST[trackIndex].bgColor}`);
}

function resetValues() {
  currentSongTime.innerHTML = "00:00";
  totalTime.innerHTML = "00:00";
  seekSlider.value = 0;
}
function playPauseTrack() {
  if (!isPlaying) {
    playTrack();
  } else {
    pauseTrack();
  }
}
function playTrack() {
  //play the current track;
  trackCurrent.play();
  isPlaying = true;
  controlBtn.innerHTML = `<i class='fa-solid fa-pause'></i>`;
}
function pauseTrack() {
  trackCurrent.pause();
  isPlaying = false;
  controlBtn.innerHTML = `<i class='fa-solid fa-play'></i>`;
}

function nextTrack() {
  if (trackIndex < TRACK_LIST.length - 1) {
    trackIndex += 1;
  } else {
    trackIndex = 0;
  }
  loadTrack(trackIndex);
  playTrack();
}
function prevTrack() {
  if (trackIndex > 0) {
    trackIndex -= 1;
  } else trackIndex = TRACK_LIST.length - 1;
  loadTrack(trackIndex);
  playTrack();
}
// Update Range and Volume
function seekTo() {
  seek = trackCurrent.duration * (seekSlider.value / 100);
  trackCurrent.currentTime = seek;
  console.log(seek);
}
function setVolume() {
  trackCurrent.volume = volumeSlider.value / 100;
}

function updateSeek() {
  let seekPosition = 0;
  if (!isNaN(trackCurrent.duration)) {
    seekPosition = trackCurrent.currentTime * (100 / trackCurrent.duration);
    seekSlider.value = seekPosition;
  }
  let durationMins = Math.floor(trackCurrent.duration / 60);
  let durationSecs = Math.floor(trackCurrent.duration % 60);
  let currentMins = Math.floor(trackCurrent.currentTime / 60);
  let currentSecs = Math.floor(trackCurrent.currentTime % 60);

  if (durationMins < 10) {
    durationMins = "0" + durationMins;
  }
  if (durationSecs < 10) {
    durationSecs = "0" + durationSecs;
  }
  if (currentMins < 10) {
    currentMins = "0" + currentMins;
  }
  if (currentSecs < 10) {
    currentSecs = "0" + currentSecs;
  }
  currentSongTime.innerHTML = `${currentMins}:${currentSecs}`;
  totalTime.innerHTML = `${durationMins}:${durationSecs}`;
}

loadTrack(trackIndex);

/////////////////////////// End :) /////////////////////////////////////////
