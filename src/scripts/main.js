// src/scripts/main.js

import { stays } from './stays.js';
import { initModal } from './modal.js';
import { filterStays, updateStaysCount } from './utils.js';

// Variables de estado global
let currentStays = [...stays];
let currentFilters = {
    location: '',
    adults: 0,
    children: 0
};

// Inicializar el modal y pasarle la función de filtrado
initModal(applyFilters);

// Función para crear una tarjeta de alojamiento
function createStayCard(stay) {
    const card = document.createElement('article');
    card.className = 'stay-card hover:shadow-lg transition-shadow duration-300';

    card.innerHTML = `
        <img class="w-full h-64 object-cover rounded-xl mb-4" src="${stay.photo}" alt="${stay.title}">
        <div class="flex justify-between items-start">
            <div class="flex flex-col">
                <div class="flex items-center gap-2">
                    ${stay.superHost ? '<span class="text-xs font-bold border border-gray-800 rounded-full px-2 py-1">SUPERHOST</span>' : ''}
                    <span class="text-gray-500 text-sm">${formatStayType(stay)}</span>
                </div>
                <h3 class="text-gray-800 font-semibold mt-1">${stay.title}</h3>
            </div>
            <div class="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span class="text-gray-800 text-sm">${stay.rating}</span>
            </div>
        </div>
    `;

    return card;
}

// Función auxiliar para formatear el tipo de propiedad
function formatStayType(stay) {
    let typeText = stay.type;
    if (stay.beds) {
        typeText += ` · ${stay.beds} ${stay.beds > 1 ? 'beds' : 'bed'}`;
    }
    return typeText;
}

// Función principal para renderizar los stays
function renderStays(staysToRender) {
    const staysContainer = document.querySelector('#stays-container');
    staysContainer.innerHTML = ''; // Limpiar contenedor

    if (staysToRender.length === 0) {
        staysContainer.innerHTML = `
            <div class="col-span-full text-center py-10">
                <p class="text-gray-500">No stays found matching your criteria.</p>
            </div>
        `;
        return;
    }

    staysToRender.forEach(stay => {
        const card = createStayCard(stay);
        staysContainer.appendChild(card);
    });

    // Actualizar el contador
    updateStaysCount(staysToRender.length);
}

// Función para aplicar filtros
function applyFilters(filters) {
    currentFilters = { ...filters };
    currentStays = filterStays(stays, filters.location, filters.adults, filters.children);
    renderStays(currentStays);
    
    // Determinar si hay filtros activos
    const isFiltered = filters.location || filters.adults > 0 || filters.children > 0;
    updateStaysCount(currentStays.length, isFiltered);
    
    // Actualizar el título con la ubicación si existe
    const locationTitle = document.querySelector('main h2');
    if (filters.location) {
        const [city] = filters.location.split(',');
        locationTitle.textContent = `Stays in ${city}`;
    } else {
        locationTitle.textContent = 'Stays in Finland';
    }
}

// Renderizar todos los stays al cargar la página
applyFilters(currentFilters);