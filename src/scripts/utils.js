/**
 * Módulo de funciones utilitarias.
 * Este archivo contiene funciones auxiliares que serán utilizadas y llamadas
 * desde el archivo principal para realizar varias operaciones.
 */
// src/scripts/utils.js
// src/scripts/utils.js

export function formatGuestText(adults, children) {
    const total = adults + children;
    if (total === 0) return 'Add guests';
    return `${total} guest${total !== 1 ? 's' : ''}`;
}

export function filterStaysByLocation(stays, location) {
    if (!location) return stays;
    return stays.filter(stay => `${stay.city}, ${stay.country}` === location);
}

export function filterStaysByGuests(stays, adults, children) {
    const totalGuests = adults + children;
    if (totalGuests === 0) return stays;
    return stays.filter(stay => stay.maxGuests >= totalGuests);
}