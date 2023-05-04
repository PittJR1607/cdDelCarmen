import './css/app.css'
import { ref, onValue } from "firebase/database";
import { db } from './db.js'
import { getDateObject } from './helpers.js';

const cards = document.querySelector('.cards')

class Card {
    
    constructor(){
        this.card = document.createElement('div')
        this.cardAvailablePlaces = document.createElement('p')
        this.cardText = document.createElement('p')
        this.cardDescription = document.createElement('p')
        this.cardImgDiv = document.createElement('div')
        this.cardButton = document.createElement('button')
        this.cardAvailablePlacesSpan = document.createElement('span')
    }

    buildCard(course){

        this.card.appendChild(this.cardImgDiv)
        this.card.appendChild(this.cardText)
        this.card.appendChild(this.cardAvailablePlaces)
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

        this.cardAvailablePlacesSpan.textContent  = course.placesAvailable
        this.cardAvailablePlaces.textContent = "Lugares disponibles: " 
        this.cardAvailablePlacesSpan.style.fontWeight = "bold"
        this.cardAvailablePlaces.appendChild(this.cardAvailablePlacesSpan)

        this.cardDescription.textContent = course.description 
        this.cardDescription.className = "card-description"
        this.cardButton.className = "card-button"
        this.cardButton.textContent = "Ver detalles"
    }

}

if( cards ) {
    const coursesRef = ref(db, 'courses');
    onValue(coursesRef, (snapshot) => {
        const data = snapshot.val();
        while (cards.firstChild){
            cards.removeChild(cards.firstChild)
        }
        data.forEach( course => {
            const card = new Card()
            card.buildCard(course)
            cards.append(card.card)
        })
       
    });
}
