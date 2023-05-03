const cards = document.querySelector('.cards')


class Card {
    
    constructor(){
        this.card = document.createElement('div')
        this.cardText = document.createElement('p')
        this.cardProfessor = document.createElement('p')
        this.cardDescription = document.createElement('p')

    }

    buildCard(course){
        this.card.appendChild(this.cardText)
        this.card.appendChild(this.cardProfessor)
        this.card.appendChild(this.cardDescription)

        this.cardText.textContent = course.courseName
        this.cardProfessor.textContent = course.professor
        this.cardDescription.textContent = course.description 
    }

}

async function loadCards(){
    console.log('cargando cursos...')
    await fetch("../cursos.JSON")
    .then( response => response.json() )
    .then( result => 
            result.courses.forEach( course => {
            const card = new Card()
            card.buildCard(course)
            cards.append(card.card)
        }))
}


loadCards()