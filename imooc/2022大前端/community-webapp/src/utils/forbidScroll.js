export const forbidScroll = (elem) => {
  let flag = false

  elem.addEventListener('touchstart', (evt) => {
    if (elem.contains(evt.target)) {
      flag = true
    } else {
      flag = false
    }
  }, false)
  elem.addEventListener('touchmove', (evt) => {
    evt.prop = flag
  })
}

const handler = (evt) => {
  if (evt.prop) {
    evt.preventDefault()
  }
}

document.body.removeEventListener('touchmove', handler, { passive: false })
document.body.addEventListener('touchmove', handler, { passive: false })
