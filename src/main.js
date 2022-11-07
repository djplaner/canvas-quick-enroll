//import './CanvasQuickEnroll.css'
import CanvasQuickEnroll from './CanvasQuickEnroll.svelte'

// try & insert quick enrol button at the top of the course nav menu
const leftSide = document.getElementById('left-side')
if (leftSide) {
  leftSide.insertAdjacentHTML('afterbegin', '<div id="canvas-quick-enroll"></div>')
}

const app = new CanvasQuickEnroll({
  target: document.getElementById('canvas-quick-enroll')
})

export default app
