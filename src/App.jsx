import React, { useCallback, useEffect, useState,useRef } from 'react'

function App() {
    const [length, setLength] = useState(8)
    const [numberAllowed, setNumberAllowed] = useState(false);
    const [charAllowed, setCharAllowed] = useState(false);
    const [password, setPassword] = useState("");

    const passwordRef = useRef(null)

    const passwordGenerator = useCallback(()=>{
      let pass="";
      let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      if(numberAllowed) {
        str += "1234567890";
      }
      if(charAllowed){
        str += "!@#$%^&*_-=+{}[]~`";
      }

      for(let i=1; i <= length; i++){
        let char = Math.floor(Math.random()*str.length + 1)
        pass += str.charAt(char);
      }
      setPassword(pass)

    },[length, numberAllowed, charAllowed,setPassword])
    useEffect(()=>{ passwordGenerator()},[length,numberAllowed,charAllowed,passwordGenerator])

    const copyPasswordToClipboard = useCallback(()=>{
        passwordRef.current?.select();
        window.navigator.clipboard.writeText(password)
    },[password])

  return (
    <div className='h-screen w-full flex justify-center'>
    <div className='text-2xl text-orange-500 h-1/3 w-[60%] bg-blue-950 rounded-lg text-center my-10 gap-y-4 px-2 py-4'>
      <h1 className='text-4xl my-4 font-bold'>Password Generator</h1>
      <div className='my-4 w-5/6 m-auto '>
      <input className='py-2 px-2 rounded-tl-xl rounded-bl-xl' type="text" placeholder='Password' value={password} readOnly ref={passwordRef}/>
        <span className='bg-orange-500 text-blue-950 rounded-tr-xl rounded-br-xl px-1 py-2 font-bold shrink-0 cursor-pointer' onClick={copyPasswordToClipboard}>Copy</span>
      </div>
      <div className='my-4 mx-2'>
        <input type="range"  min={6} max={50} value={length} readOnly onChange={(e)=>{setLength(e.target.value)}}/>
        <label className='px-4 cursor-pointer' htmlFor="">Length: {length}</label>
        <input type="checkbox" name="" id="numberAllowed" readOnly defaultChecked={numberAllowed} onChange={()=>{
          setNumberAllowed((prev)=>!prev)
        }}/>
        <label className='px-4 cursor-pointer' htmlFor="">Numbers</label>
        <input type="checkbox" name="" id="numberAllowed" defaultChecked={charAllowed} onChange={()=>{
          setCharAllowed((prev)=>!prev)
        }} />
        <label className='px-4 cursor-pointer' htmlFor="">Characters</label>
      </div>
    </div>
    </div>
  )
}

export default App