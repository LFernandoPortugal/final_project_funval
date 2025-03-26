// src/scripts/modal.js

export function initModal() {
    const modal = document.querySelector('#search-modal');
    const openModalBtn = document.querySelector('#open-modal');
    const closeModalBtn = document.querySelector('#close-modal');
    const searchButton = document.querySelector('#search-button');
    
    // Elementos para contar huéspedes
    const adultsCount = document.querySelector('.adults-count');
    const childrenCount = document.querySelector('.children-count');
    const increaseAdults = document.querySelector('.increase-adults');
    const decreaseAdults = document.querySelector('.decrease-adults');
    const increaseChildren = document.querySelector('.increase-children');
    const decreaseChildren = document.querySelector('.decrease-children');
    
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
        if (e.target === modal) {
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
        
        // Actualizar placeholder
        const totalGuests = adults + children;
        guestsPlaceholder.textContent = totalGuests > 0 ? `${totalGuests} guest${totalGuests !== 1 ? 's' : ''}` : 'Add guests';
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
            
            // Aquí podrías cargar resultados específicos para la ubicación seleccionada
        });
    });
    
    // Manejar búsqueda
    searchButton.addEventListener('click', () => {
        // Aquí implementarías la lógica de búsqueda
        console.log('Searching for:', {
            location: selectedLocation,
            adults,
            children
        });
        closeModal();
    });
}