const audioContext = new AudioContext()

const NOTE_DETAILS = [
    { note: "C", key: "Z", frequency: 261.626 ,active: false},
    { note: "Db", key: "S", frequency: 277.183 ,active: false},
    { note: "D", key: "X", frequency: 293.665 ,active: false},
    { note: "Eb", key: "D", frequency: 311.127 ,active: false},
    { note: "E", key: "C", frequency: 329.628 ,active: false},
    { note: "F", key: "V", frequency: 349.228 ,active: false},
    { note: "Gb", key: "G", frequency: 369.994 ,active: false},
    { note: "G", key: "B", frequency: 391.995 ,active: false},
    { note: "Ab", key: "H", frequency: 415.305 ,active: false},
    { note: "A", key: "N", frequency: 440 ,active: false},
    { note: "Bb", key: "J", frequency: 466.164 ,active: false},
    { note: "B", key: "M", frequency: 493.883 ,active: false}
  ]








document.addEventListener("keydown", e=>{

    if(e.repeat) return

    const note = getNote(e.key)
    
    

    if(note == null) return

    note.active = true
    playNote()

})


document.addEventListener("keyup", e=>{

    
    const note = getNote(e.key)

    if(note == null) return

    note.active = false
    playNote()

})



function getNote(key){
  return NOTE_DETAILS.find( n => n.key === key.toUpperCase()) 
}




function playNote(){

  NOTE_DETAILS.forEach( n=>{

    const noteEle = document.querySelector(`div[data-note="${n.note}"]`)
    noteEle.classList.toggle("active", n.active)

    if(n.oscillator != null){
      n.oscillator.stop()
      n.oscillator.disconnect()
    }

  })


  const activeNotes = NOTE_DETAILS.filter(n => n.active)
  const gain = 1/activeNotes.length

  activeNotes.forEach(n => {
    startNote(n,gain)
  })

}

function startNote(noteDetail, gain) {
  const gainNode = audioContext.createGain()
  gainNode.gain.value = gain
  const oscillator = audioContext.createOscillator()
  oscillator.frequency.value = noteDetail.frequency
  oscillator.type = "sine"
  oscillator.connect(gainNode).connect(audioContext.destination)
  oscillator.start()
  noteDetail.oscillator = oscillator
}




