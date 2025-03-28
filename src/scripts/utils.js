// src/scripts/utils.js

/**
 * Filtra los stays por ubicación y número de huéspedes
 * @param {Array} stays - Array de stays a filtrar
 * @param {string} location - Ubicación en formato "Ciudad, País"
 * @param {number} adults - Número de adultos
 * @param {number} children - Número de niños
 * @returns {Array} - Stays filtrados
 */
export function filterStays(stays, location, adults, children) {
    let filtered = [...stays];
    const totalGuests = adults + children;

    // Filtrar por ubicación si se ha seleccionado
    if (location) {
        filtered = filtered.filter(stay => 
            `${stay.city}, ${stay.country}` === location
        );
    }

    // Filtrar por huéspedes si hay al menos 1
    if (totalGuests > 0) {
        filtered = filtered.filter(stay => 
            stay.maxGuests >= totalGuests
        );
    }

    return filtered;
}

/**
 * Formatea el texto de huéspedes
 * @param {number} adults - Número de adultos
 * @param {number} children - Número de niños
 * @returns {string} - Texto formateado
 */
export function formatGuestText(adults, children) {
    const total = adults + children;
    if (total === 0) return 'Add guests';
    return `${total} guest${total !== 1 ? 's' : ''}`;
}

/**
 * Actualiza el contador de stays en el header
 * @param {number} count - Número de stays
 * @param {boolean} isFiltered - Indica si hay filtros aplicados
 */
export function updateStaysCount(count, isFiltered = false) {
    const countElement = document.querySelector('#stays-container + div span');
    const mainCountStays = document.querySelector('#stays-count');
    
    if (countElement) {
        countElement.textContent = isFiltered ? `${count} stays` : `${count}+ stays`;
    }
    
    if (mainCountStays) {
        mainCountStays.textContent = isFiltered ? `${count} stays` : `${count - 2}+ stays`;
    }
}
/**
 * Obtiene ciudades únicas de los stays
 * @param {Array} stays - Array de stays
 * @returns {Array} - Array de strings en formato "Ciudad, País"
 */
export function getUniqueLocations(stays) {
    const locations = new Set();
    stays.forEach(stay => {
        locations.add(`${stay.city}, ${stay.country}`);
    });
    return Array.from(locations);
}