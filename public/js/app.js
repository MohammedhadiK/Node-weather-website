

const weatherForm = document.querySelector('form')
const searchInput =document.querySelector('input') 
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (e) =>{
    
    e.preventDefault()

    const location = searchInput.value
    
    messageOne.textContent ='Loading...'
    messageTwo.textContent =''
    
    fetch('http://localhost:4000/weather?address=' + location).then( (response) =>{
    response.json().then( (data) =>{
        if(data.error){
            messageOne.textContent=data.error
        }else{
            
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
            
        }
    })
})
   
})