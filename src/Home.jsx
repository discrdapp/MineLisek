import { useState } from 'react'
import Button from './Button'
import Logo from './Logo'
import accessibility from './assets/Accessibility.webp'
import language from './assets/language.png'
import { Link } from 'react-router-dom';
import { useApp } from './AppProvider'

function Home() {
  const {playSound, isPL, imie, setImie} = useApp()
  
    function wyjdz(e) {
        e.target.classList.add('animacja')
        setTimeout(() => {
            e.target.classList.remove('animacja')
        }, 500)
    }

    function ludzik(e) {
      playSound('fnafparty.mp3')
      e.target.classList.add('krecsie')
      setTimeout(() => {
        e.target.classList.remove('krecsie')
      }, 200);
    }

    let [nazywanie, setNazywanie] = useState(false)

    function handleNazywanie(e) {
      setImie(e.target.value)
      setNazywanie(false)
    }

    function handleNazywanieKeyDown(e) {
      if (e.key == 'Enter') {
        handleNazywanie(e)
      }
    }

  return (
    <>
    <div className='logoWrapper d-flex justify-content-center align-items-center flex-column'>
      <Logo/> 
    </div>

      <div className='container-lg d-flex justify-content-center align-items-center flex-column'>
        <Link to="/mobki" className="a-none a-wieksze"><Button name={isPL ? "Mobki" : "Mobs"} width={100} height={50}/></Link>
        {
          !nazywanie ? (<Button name={imie == null ? (isPL ? "Jak sie nazywasz?" : "What's your name?") : (isPL ? "Witaj, " : "Welcome, ") + imie + "!"} width={50} height={50} onClick={() => {setNazywanie(true)}}/>) : (<input className='searchInput nazywanieInput' autoFocus onBlur={handleNazywanie} onKeyDown={(e) => {handleNazywanieKeyDown(e)}}></input>)
        }
        
        <Button name="???" width={50} height={50} disabled={true}/>

        <div className='buttonWrapper w-100' >
          <Link to='/jezyk' className='a-none'><button className="iconButton" onClick={() => {playSound('button.mp3')}}><img src={language} alt="Icon"/></button></Link>
          <Link to="/opcje" className="a-none a-mniejsze"><Button name={isPL ? "Opcje" : "Options"} width={100} height={50}/></Link>
          <div className='wyjdzZeStrony' onClick={wyjdz}><Button name={isPL ? "Wyjdz ze strony" : "Leave this page"} width={100} height={50} sound="gate_close.mp3"/></div>
          <button className="iconButton" onClick={ludzik}><img src={accessibility} alt="Icon"/></button>
        </div>

        <div className='lewyDolny'>MineLisek 1.0.0</div>
        <div className='prawyDolny'>Copyright LISEK ©. Nie dystrybutuj!</div>
      </div>
    </>
  )
}

export default Home
