import React ,{useState} from 'react'

const App = () => {
  const [commands, setCommands] = useState(true)
  const [response, setResponse] = useState("")
  const [texts, setTexts] = useState('')
  const [isListening, setIsListening] = useState(false)

  const speak = (abc, callback)=>{
    const utterance = new SpeechSynthesisUtterance(abc)
    window.speechSynthesis.speak(utterance)

    utterance.onend = ()=>{
      if(callback) callback()
    }
  }

  const handleCommands = (command) =>{
    if(command.includes("open whatsapp")){
      const message = "Opening Whatsapp"
      setResponse(message)
      speak(message)
      window.open("https://www.whattsapp.com","_blank")
    }
    else if(command.includes("open Instagram")){
      const message = "Opening Instagram"
      setResponse(message)
      speak(message)
      window.open("https://www.instagram.com/","_blank")
    }
    else if(command.includes("open YouTube")){
      const message = "Opening YouTube"
      setResponse(message)
      speak(message)
      window.open("https://www.youtube.com","_blank")
    }
    else if(command.includes("open Twitter")){
      const message = "Opening Twitter"
      setResponse(message)
      speak(message)
      window.open("https://www.twitter.com","_blank")
    }
    else{
      const message = `Searching google for...${command}`
      setResponse(message)
      window.open(`https://www.google.com/search?q=${encodeURIComponent(command)}`)
    }

  }

  const startListening = () =>{
    if(!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)){
      const message = "Speech Recognition does'nt support on this browser"
      setResponse(message)
      alert(message)
      return;
    }
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)
    recognition.lang = "en-US"
    recognition.onresult = (event)=>{
      const text = event.results[0][0].transcript.toLowerCase()
      setTexts(text)
      handleCommands(text)

      setTimeout(()=>{
        setIsListening(false)
      })
    }
    setIsListening(true);
    recognition.start()
  }

  const handleClick = ()=>{
    speak('Listening... Please give me a command', ()=>{
      startListening()
    })
  }
  return (
    <div className='w-screen h-screen bgimg flex flex-col gap-6 items-center justify-center'>
      <a href="https://github.com/tofikbagwangithub/AI-voice-assistance.git" target="_blank"><h1 className='text-6xl font-extrabold text-green-50 mb-6'>AI Voice Assistant</h1></a>
      <p className='text-md font-semibold text-white'>
        {commands?"Please give me a command": "Processing Your Commands"}
      </p>
      <button onClick={handleClick} className='px-6 py-2 bg-gray-400 rounded-lg text-black'>{isListening? "Listening..." : "Start Listening"}</button>
      <div className='bg-white p-5 shadow-lg h-auto rounded-xl space-y-5'> 
        <h2 className='text-xl'><span className='text-green-600'>Recognization Speech</span>:<br/>{texts}</h2>
        <h4 className='text-xl'><span className='text-orange-500'>Response</span>:<br/>{response}</h4>
      </div>
    </div>
  )
}

export default App