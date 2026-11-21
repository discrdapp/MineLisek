import randomTexts from './assets/splashes.json'

function RandomText() {
    const randomIndex = Math.floor(Math.random() * randomTexts.length);

  return (
    <div className='randomText'>
        {randomTexts[randomIndex]}
    </div>
  )
}

export default RandomText