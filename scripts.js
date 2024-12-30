const songData = [
  {
    name: 'Disturbing Mummy',
    artist: 'Off black',
    src: 'disturbing mummy.m4a'
  },
  {
    name: 'Happy Birthday',
    artist: 'Off black',
    src: 'happy birthday.m4a'
  },
  {
    name: 'Music Scale',
    artist: 'Off black',
    src: 'scale.m4a'
  },
  {
    name: 'Christmas Gbedu',
    artist: 'Off black',
    src: 'Christmas.m4a'
  },
  {
    name: 'MRandom Screams',
    artist: 'Off black',
    src: 'Random Screams.m4a'
  },
  
  
]

const container = document.querySelector('.container')
const songName = document.querySelector('.songName')
const songArtist = document.querySelector('.songArtist')
const cover = document.querySelector('.cover')
const playPauseBtn = document.querySelector('.play-pause')
const prevBtn = document.querySelector('.prevBtn')
const audio = document.querySelector('.audio')
const nextBtn = document.querySelector('.nextBtn')
const songProgress = document.querySelector('.songProgress')
const songTime = document.querySelector('.songTime')
const coverName = document.querySelector('.cover span:nth-child(2)')
const coverArtist = document.querySelector('.cover span:nth-child(1)')


let songIndex = 1
let lastSongIndex = songData.length - 1

window.addEventListener('load', ()=>{
  loadSong(songIndex)
}) 

const loadSong = (index)=> {
  coverName.textContent = songData[index].name
  coverArtist.textContent = songData[index].artist
  songName.textContent = songData[index].name
  songArtist.textContent = songData[index].artist
  audio.src = `music/${songData[index].src}`

}

const playSong = () => {
  container.classList.add('pause')
  playPauseBtn.firstElementChild.className = 'fa-solid fa-pause'
  audio.play()
  cover.classList.add('rotate')
}

const pauseSong = () => {
  container.classList.remove('pause')
  playPauseBtn.firstElementChild.className = 'fa-solid fa-play'
  audio.pause()
  cover.classList.remove('rotate')

}

playPauseBtn.addEventListener('click', () =>{
  if (container.classList.contains('pause')){
    pauseSong()
  }
  else{
    playSong()
  }
})

const prevSongPlay = () => {
  songIndex --
  if (songIndex < 0){
    songIndex = songData.length - 1
  }
  loadSong(songIndex)
  playSong()
}

const nextSongPlay = () => {
  songIndex ++
  if (songIndex > lastSongIndex){
    songIndex = 0
  }
  loadSong(songIndex)
  playSong()
}


prevBtn.addEventListener('click', () => {
  prevSongPlay()
})

nextBtn.addEventListener('click', () => {
  nextSongPlay()
})

audio.addEventListener('timeupdate', (e) => {
  const currentTime = e.target.currentTime
  const duration = e.target.duration
  let currentTimeWidth = (currentTime / duration) * 100
  songProgress.style.width = `${currentTimeWidth}%`
  
  let songCurrentTime = document.querySelector('.time span:nth-child(1)')
  let songDuration = document.querySelector('.time span:nth-child(2)')
  
  audio.addEventListener('loadeddata', ()=> {
    let audioDuration = audio.duration

    let totalMinutes = Math.floor(audioDuration/60)
    let totalSeconds = Math.floor(audioDuration%60)
    
    if (totalSeconds < 10){
      totalSeconds = `0${totalSeconds}`
    }
    songDuration.textContent = `${totalMinutes}:${totalSeconds}`

    

  })
  let currentMinuite = Math.floor(currentTime/60)
    let currentSeconds = Math.floor(currentTime%60)

    if (currentSeconds < 10){
      currentSeconds = `0${currentSeconds}`
    }
    songCurrentTime.textContent = `${currentMinuite}:${currentSeconds}`
})

songTime.addEventListener('click', (e)=>{
  let progressWidth = songTime.clientWidth
  let clickedOffsetX = e.offsetX

  let songDuration = audio.duration
  audio.currentTime = (clickedOffsetX / progressWidth)*songDuration

  playSong()
})

audio.addEventListener('ended', nextSongPlay);












