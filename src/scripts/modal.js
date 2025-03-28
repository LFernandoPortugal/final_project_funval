import { stays } from './stays.js';
import { getUniqueLocations, formatGuestText } from './utils.js';

export function initModal(filterCallback) {
    const modal = document.querySelector('#search-modal');
    const openModalBtn = document.querySelector('#open-modal');
    const closeModalBtn = document.querySelector('#close-modal');
    const desktopSearchButton = document.querySelector('#desktop-search-button');
    
    // Elementos para contar huéspedes
    const adultsCount = document.querySelector('.adults-count');
    const childrenCount = document.querySelector('.children-count');
    const increaseAdults = document.querySelector('.increase-adults');
    const decreaseAdults = document.querySelector('.decrease-adults');
    const increaseChildren = document.querySelector('.increase-children');
    const decreaseChildren = document.querySelector('.decrease-children');
    const totalGuestsDisplay = document.querySelector('#total-guests-display');
    
    // Placeholders para mostrar la selección
    const locationPlaceholder = document.querySelector('#location-placeholder');
    const guestsPlaceholder = document.querySelector('#guests-placeholder');

    // Elementos para la búsqueda de ubicación
    const locationInput = document.querySelector('#location-input');
    const locationResults = document.querySelector('#location-results');
    const uniqueLocations = getUniqueLocations(stays);

    // Variables
    let selectedLocation = '';
    let adults = 0;
    let children = 0;
    
    // Abrir modal
    openModalBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });
    
    // Cerrar modal
    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('bg-black')) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
    
    // Manejar contadores de huéspedes
    increaseAdults.addEventListener('click', () => {
        adults++;
        updateGuests();
    });
    
    decreaseAdults.addEventListener('click', () => {
        if (adults > 0) adults--;
        updateGuests();
    });
    
    increaseChildren.addEventListener('click', () => {
        children++;
        updateGuests();
    });
    
    decreaseChildren.addEventListener('click', () => {
        if (children > 0) children--;
        updateGuests();
    });
    
    function updateGuests() {
        adultsCount.textContent = adults;
        childrenCount.textContent = children;
        
        // Habilitar/deshabilitar botones de disminución
        decreaseAdults.disabled = adults === 0;
        decreaseChildren.disabled = children === 0;
        
        // Actualizar display y placeholder
        const guestsText = formatGuestText(adults, children);
        totalGuestsDisplay.value = guestsText;
        guestsPlaceholder.textContent = guestsText;
    }
    
    // Manejar selección de ubicación    
    function renderLocationOptions(filter = '') {
        locationResults.innerHTML = uniqueLocations
            .filter(location => location.toLowerCase().includes(filter.toLowerCase()))
            .map(location => `
                <div class="location-option flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>${location}</span>
                </div>
            `).join('');
        
        setupLocationSelection();
    }

    function setupLocationSelection() {
        const locationOptions = document.querySelectorAll('.location-option');
        
        locationOptions.forEach(option => {
            option.addEventListener('click', () => {
                selectedLocation = option.querySelector('span').textContent;
                locationPlaceholder.textContent = selectedLocation;
                locationInput.value = selectedLocation;
                
                // Resaltar la opción seleccionada
                locationOptions.forEach(opt => {
                    opt.classList.remove('bg-gray-100', 'font-medium');
                });
                option.classList.add('bg-gray-100', 'font-medium');
            });
        });
    }

    // Mostrar resultados al escribir
    locationInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value;
        
        if (searchTerm.length > 0) {
            renderLocationOptions(searchTerm);
            locationResults.classList.remove('hidden');
        } else {
            locationResults.classList.add('hidden');
        }
    });

    // Inicializar sin resultados visibles
    renderLocationOptions();
    locationResults.classList.add('hidden');

    // Función para realizar la búsqueda
    function performSearch() {
        const filters = {
            location: selectedLocation,
            adults: adults,
            children: children
        };
        
        // Llamar a la función de callback con los filtros
        if (typeof filterCallback === 'function') {
            filterCallback(filters);
        }
        
        closeModal();
    }
    
    desktopSearchButton.addEventListener('click', performSearch);
    
    // Permitir búsqueda con Enter en el input de ubicación
    document.querySelector('#location-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

}