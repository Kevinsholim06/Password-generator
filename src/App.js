import './App.css';
import { useState } from 'react';
import {numbers,UpperCaseLetters,LowerCaseLetters,SpecialCharacters} from './characters'
import {toast, ToastContainer } from 'react-toastify'
import '/node_modules/react-toastify/dist/ReactToastify.css'
import { COPY_SUCCESS } from './message';

function App() {

  const[password,setpassword]=useState('')
  const[passwordLength,setPasswordLength]=useState(20)
  const[includeUppercase,setIncludeUppercase]=useState(false)
  const[includeLowercase,setIncludeLowercase]=useState(false)
  const[includeNumbers,setIncludeNumbers]=useState(false)
  const[includeSymbols,setIncludeSymbols]=useState(false)

  const handleGeneratePassword=(e)=>{

    if(!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols){
      notify('You must select atleast one option',true)
    }

    let characterList = ''
    if(includeLowercase){
      characterList=characterList + LowerCaseLetters
    }
    if(includeUppercase){
      characterList = characterList + UpperCaseLetters
    }
    if(includeNumbers){
      characterList = characterList + numbers
    }
    if(includeSymbols){
      characterList = characterList + SpecialCharacters
    }

    setpassword(createPassword(characterList))
  }

  const createPassword = (characterList)=>{
    let Password = ''
    const characterListLength = characterList.lenght

    for(let i=0; i<passwordLength;i++){
      const characterIndex = Math.round(Math.random() * characterListLength) 
      Password = Password + characterList.charAt(characterIndex)
    }
    return Password;
  }

  const copyToClipboard=()=>{
    const newTextArea = document.createElement('textarea')
    newTextArea.innerText = password
    document.body.appendChild(newTextArea)
    newTextArea.select()
    document.execCommand('copy')
    newTextArea.remove()
  }

  const notify =(message, hasError = false)=>{
    if(hasError){
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }else{
      toast(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
    
  }


  const handleCopyPassword = (e)=>{
    if(password== ''){
      notify('There is nothing to copy',true)
    }else{
      copyToClipboard()
    notify(COPY_SUCCESS)
    }
    
  }
  return (
    <div className="App">
      <div className="container">
        <div className="generator">
          <h1 className="generator_header">
            Password Generator
          </h1>
          <div className="generator_password">
            <h3>{password}</h3>
            <button onClick={handleCopyPassword} className="copy_btn">
              <i className="fas fa-clipboard"></i>
            </button>
          </div>
          <div className="form-group">
            <label htmlFor="password-length">Password length </label>
            <input defaultValue={passwordLength} onChange={(e)=>setPasswordLength(e.target.value)} type="number" name="password-length" id="password-length" max="20" min="4" />

          </div>
          <div className="form-group">
            <label htmlFor="uppercase-letters"> include uppercase letters </label>
            <input checked={includeUppercase} onChange={(e)=>setIncludeUppercase(e.target.value)} type="checkbox" name="uppercase-letters" id="password-srength"/>         
          </div>
          <div className="form-group">
            <label htmlFor="lowercase-letters"> include lowecase letters </label>
            <input checked={includeLowercase} onChange={(e)=>setIncludeLowercase(e.target.value)} type="checkbox" name="lowecase-letters" id="password-srength"/>            
          </div>
          <div className="form-group">
            <label htmlFor="numbers"> include numbers </label>
            <input checked={includeNumbers} onChange={(e)=>setIncludeNumbers(e.target.value)} type="checkbox" name="numbers" id="numbers" />            
          </div>
          <div className="form-group">
            <label htmlFor="symbols"> include symbols </label>
            <input checked={includeSymbols} onChange={(e)=>setIncludeSymbols(e.target.value)} type="checkbox" name="symbols" id="symbols"/>
          </div>
          <button onClick={handleGeneratePassword} className="generator_btn">Generate</button>
          <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
{/* Same as */}
<ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default App;
