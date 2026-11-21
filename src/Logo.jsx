import logo from './assets/mineLisek.png'
import RandomText from './RandomText'

function Logo() {
  return (
    <div className="logo">
        <img src={logo} alt="logo" />
        <RandomText/>
    </div>
  )
}

export default Logo