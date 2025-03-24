/**
 * Aquí estará la lógica principal de la aplicación.
 * Este bloque de código contiene la funcionalidad principal
 * que define el comportamiento del programa.
 */
import { stays } from './stays.js';

document.addEventListener('DOMContentLoaded', () => {
    const staysContainer = document.querySelector('#stays-container');
    const template = document.querySelector('#stay-card-template');
    
    stays.forEach(stay => {
        const card = template.content.cloneNode(true);
        
        // Llenar los datos
        card.querySelector('img').src = stay.photo;
        card.querySelector('img').alt = stay.title;
        
        if (stay.superHost) {
            card.querySelector('.superhost-badge').classList.remove('hidden');
        }
        
        // Construir el texto del tipo de propiedad
        let typeText = stay.type;
        if (stay.beds) {
            typeText += ` · ${stay.beds} ${stay.beds > 1 ? 'beds' : 'bed'}`;
        }
        card.querySelector('.stay-type').textContent = typeText;
        
        card.querySelector('.stay-title').textContent = stay.title;
        card.querySelector('.stay-rating').textContent = stay.rating;
        
        staysContainer.appendChild(card);
    });
});