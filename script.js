const image = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const music = document.querySelector('audio')
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration')
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')

const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight Disco Queen',
        artist: 'Jacinto Design'
    },
    {
        name: 'metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Metric/Jacinto Design'
    }
]

let isPlaying = false


// Play
function playSong() {
    isPlaying = true
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', 'Pause')
    music.play();
}

// pause
function pauseSong() {
    isPlaying = false
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'Play')
    music.pause();
}

// Play or Pause event listener
playBtn.addEventListener('click', () => {
    (isPlaying ? pauseSong() : playSong())
})

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current song
let songIndex = 0;

// previous song function
function prevSong() {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next song function
function nextSong() {
    songIndex++
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    loadSong(songs[songIndex]);
    playSong();
}

// On load - select first song
loadSong(songs[songIndex]);

function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement
        // Update progress bar
        const progressPercent = (currentTime / duration) * 100
        progress.style.width = `${progressPercent}%`
        // calculate display for duration
        const durationMinute = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);

        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`
        }

        if (durationSeconds) {
            durationEl.textContent = `${durationMinute}:${durationSeconds}`
        }

        // calculate display for currentTime
        const currentTimeMinute = Math.floor(currentTime / 60);
        let currentTimeSeconds = Math.floor(currentTime % 60);

        if (currentTimeSeconds < 10) {
            currentTimeSeconds = `0${currentTimeSeconds}`
        }
        currentTimeEl.textContent = `${currentTimeMinute}:${currentTimeSeconds}`
    }
}

function setProgressBar(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const { duration } = music
    music.currentTime = (clickX / width) * duration;
}


//event listener
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
music.addEventListener('timeupdate', updateProgressBar)
progressContainer.addEventListener('click', setProgressBar)
music.addEventListener('ended', nextSong)