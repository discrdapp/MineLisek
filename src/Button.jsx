import './style.css'
import { useApp } from './AppProvider';

function Button(props) {
  const { playSound } = useApp()

  return (
    <button className={"przyciskMenu " + (props.disabled ? "disabled" : "")} style={{width: props.width + "%", height: props.height + "px"} } disabled={props.disabled} onClick={() => {
      if (!props.disabled) {
        props.onClick?.();
        playSound(props.sound ? props.sound : 'button.mp3');
      }
    }}>
      {props.name}
    </button>
  )
}

export default Button