import { successToastify } from "../styling/customToasitfy";


export const copyToClipboard = (text) => {
   
    console.log('coppied', text)
    var textField = document.createElement('textarea')
    textField.innerText = text
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    successToastify("Copied to clipboard!")
    textField.remove()
  };

export const likeCounter = () => {

  }