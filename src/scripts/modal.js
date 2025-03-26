// src/scripts/modal.js

export function initModal() {
    const modal = document.querySelector('#search-modal');
    const openModalBtn = document.querySelector('#open-modal');
    const closeModalBtn = document.querySelector('#close-modal');
    const mobileSearchButton = document.querySelector('#mobile-search-button');
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
    
    // Variables de estado
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
        const totalGuests = adults + children;
        const guestsText = totalGuests === 0 ? 'Add guests' : `${totalGuests} guest${totalGuests !== 1 ? 's' : ''}`;
        
        totalGuestsDisplay.value = guestsText;
        guestsPlaceholder.textContent = guestsText;
    }
    
    // Manejar selección de ubicación
    const locationOptions = document.querySelectorAll('.location-option');
    locationOptions.forEach(option => {
        option.addEventListener('click', () => {
            selectedLocation = option.querySelector('span').textContent;
            locationPlaceholder.textContent = selectedLocation;
            
            // Resaltar la opción seleccionada
            locationOptions.forEach(opt => opt.classList.remove('bg-gray-100', 'font-medium'));
            option.classList.add('bg-gray-100', 'font-medium');
        });
    });
    
    // Función para realizar la búsqueda
    function performSearch() {
        console.log('Searching for:', {
            location: selectedLocation,
            adults,
            children
        });
        closeModal();
        
        
    }
    
    // Manejar búsqueda 
    mobileSearchButton.addEventListener('click', performSearch);
    desktopSearchButton.addEventListener('click', performSearch);
}