import './css/app.css'
const cards = document.querySelector('.cards')

class Card {
    
    constructor(){
        this.card = document.createElement('div')
        this.cardText = document.createElement('p')
        this.cardDescription = document.createElement('p')
        this.cardImgDiv = document.createElement('div')
        this.cardButton = document.createElement('button')
    }

    buildCard(course){

        this.card.appendChild(this.cardImgDiv)
        this.card.appendChild(this.cardText)
        this.card.appendChild(this.cardDescription)
        this.card.appendChild(this.cardButton)
        this.card.className = "card"

        this.cardImgDiv.style.backgroundImage = `url(${course.imgUrl})`
        this.cardImgDiv.style.backgroundSize = "cover"
        this.cardImgDiv.style.backgroundRepeat = "no-repeat"
        this.cardImgDiv.style.backgroundPosition = "bottom"
        this.cardImgDiv.style.maxWidth = "100%"
        this.cardImgDiv.style.height = "20rem"

        this.cardText.textContent = "Actividad: " + course.courseName
        this.cardText.className = "card-text"

        this.cardDescription.textContent = course.description 
        this.cardDescription.className = "card-description"
        this.cardButton.className = "card-button"
        this.cardButton.textContent = "Ver detalles"
        
    }

}

async function loadCards(){
    await fetch("./cursos.JSON")
    .then( response => response.json() )
    .then( result => 
            result.courses.forEach( course => {
            const card = new Card()
            card.buildCard(course)
            cards.append(card.card)
        }))
}


loadCards()