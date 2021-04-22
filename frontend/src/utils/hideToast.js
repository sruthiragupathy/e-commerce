export const hideToast = () => {
    setTimeout(() => {
        dispatch({type:"TOGGLE_TOAST",payload:"", value: false});
      }, 1000)
}