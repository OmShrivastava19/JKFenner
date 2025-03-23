/**
 * JK Fenner E-commerce Website
 * Main JavaScript file
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize product sliders if any
    initProductCarousels();
    
    // Vehicle Dropdown Dependency
    initVehicleDropdowns();
    
    // Chat Functionality
    initChatWidget();
    
    // AI Product Recommendations (simulated)
    simulateAIRecommendations();

    // Handle add to cart buttons
    initAddToCartButtons();
    
    // Initialize cyclic search text
    initSearchTextCycle();
    
    // Initialize country flag selector
    initCountryFlagSelector();
    
    // Initialize language selector
    initLanguageSelector();

    // Country selection for registration search
    const countryOptions = document.querySelectorAll('.country-option');
    const selectedCountryFlag = document.getElementById('selected-country-flag');
    const selectedCountryName = document.getElementById('selected-country-name');
    
    if (countryOptions && selectedCountryFlag && selectedCountryName) {
        countryOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                const country = this.dataset.country;
                const name = this.dataset.name;
                
                selectedCountryFlag.src = `https://flagcdn.com/w20/${country}.png`;
                selectedCountryName.textContent = name;
                
                // Update registration format hint based on country
                const plateFormat = document.querySelector('.plate-format');
                if (plateFormat) {
                    switch(country) {
                        case 'in':
                            plateFormat.textContent = 'Format: MH 01 AA 1234';
                            break;
                        case 'gb':
                            plateFormat.textContent = 'Format: AB12 CDE';
                            break;
                        case 'us':
                            plateFormat.textContent = 'Format: ABC-1234';
                            break;
                        case 'ae':
                            plateFormat.textContent = 'Format: A-12345';
                            break;
                        case 'jp':
                            plateFormat.textContent = 'Format: 品川 500 あ 12-34';
                            break;
                        case 'de':
                            plateFormat.textContent = 'Format: B-AB 1234';
                            break;
                        default:
                            plateFormat.textContent = 'Format: MH 01 AA 1234';
                    }
                }
            });
        });
    }
    
    // Vehicle make, model, and year dropdowns
    const vehicleMake = document.getElementById('vehicle-make');
    const vehicleModel = document.getElementById('vehicle-model');
    const vehicleYear = document.getElementById('vehicle-year');
    
    if (vehicleMake && vehicleModel && vehicleYear) {
        // Sample data - in a real implementation, this would come from an API
        const vehicleData = {
            maruti: {
                models: ['Swift', 'Dzire', 'Baleno', 'Vitara Brezza', 'Ertiga', 'Wagon R'],
                years: [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016]
            },
            tata: {
                models: ['Nexon', 'Harrier', 'Tiago', 'Altroz', 'Safari', 'Punch'],
                years: [2023, 2022, 2021, 2020, 2019, 2018, 2017]
            },
            hyundai: {
                models: ['Creta', 'Venue', 'i20', 'i10', 'Verna', 'Tucson', 'Alcazar'],
                years: [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015]
            },
            honda: {
                models: ['City', 'Amaze', 'Jazz', 'WR-V', 'CR-V'],
                years: [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016]
            },
            toyota: {
                models: ['Innova', 'Fortuner', 'Urban Cruiser', 'Glanza', 'Camry'],
                years: [2023, 2022, 2021, 2020, 2019, 2018, 2017]
            },
            mahindra: {
                models: ['XUV700', 'Thar', 'Scorpio', 'Bolero', 'XUV300', 'Marazzo'],
                years: [2023, 2022, 2021, 2020, 2019, 2018]
            },
            kia: {
                models: ['Seltos', 'Sonet', 'Carnival', 'Carens'],
                years: [2023, 2022, 2021, 2020, 2019]
            },
            mg: {
                models: ['Hector', 'Astor', 'ZS EV', 'Gloster'],
                years: [2023, 2022, 2021, 2020, 2019]
            },
            ford: {
                models: ['EcoSport', 'Figo', 'Aspire', 'Endeavour'],
                years: [2021, 2020, 2019, 2018, 2017, 2016, 2015]
            },
            volkswagen: {
                models: ['Polo', 'Vento', 'Taigun', 'T-Roc', 'Tiguan'],
                years: [2023, 2022, 2021, 2020, 2019, 2018, 2017]
            }
        };
        
        vehicleMake.addEventListener('change', function() {
            const make = this.value;
            
            // Reset model dropdown
            vehicleModel.innerHTML = '<option value="" selected disabled>Select Model</option>';
            vehicleModel.disabled = !make;
            
            // Reset year dropdown
            vehicleYear.innerHTML = '<option value="" selected disabled>Select Year</option>';
            vehicleYear.disabled = true;
            
            if (make && vehicleData[make]) {
                // Populate models
                vehicleData[make].models.forEach(model => {
                    const option = document.createElement('option');
                    option.value = model.toLowerCase().replace(/\s+/g, '-');
                    option.textContent = model;
                    vehicleModel.appendChild(option);
                });
            }
        });
        
        vehicleModel.addEventListener('change', function() {
            const make = vehicleMake.value;
            
            // Reset year dropdown
            vehicleYear.innerHTML = '<option value="" selected disabled>Select Year</option>';
            vehicleYear.disabled = !this.value;
            
            if (make && vehicleData[make]) {
                // Populate years
                vehicleData[make].years.forEach(year => {
                    const option = document.createElement('option');
                    option.value = year;
                    option.textContent = year;
                    vehicleYear.appendChild(option);
                });
            }
        });
    }
    
    // Registration input formatting
    const regNumberInput = document.getElementById('reg-number-input');
    
    if (regNumberInput) {
        regNumberInput.addEventListener('input', function() {
            // Convert to uppercase
            this.value = this.value.toUpperCase();
            
            // Apply formatting based on selected country
            const countryCode = selectedCountryName ? selectedCountryName.textContent : 'India';
            
            // Additional formatting logic could be added here
            // For example, auto-inserting spaces for Indian format: MH 01 AA 1234
        });
    }
});

/**
 * Initialize any product carousels
 */
function initProductCarousels() {
    // Can be implemented if adding carousels later
}

/**
 * Initialize the dependent dropdowns for vehicle selection
 */
function initVehicleDropdowns() {
    const makeSelect = document.querySelector('select:nth-of-type(1)');
    const modelSelect = document.querySelector('select:nth-of-type(2)');
    
    if (!makeSelect || !modelSelect) return;
    
    // Vehicle models by make (sample data)
    const modelsByMake = {
        'Maruti Suzuki': ['Swift', 'Baleno', 'Dzire', 'Ertiga', 'Brezza'],
        'Hyundai': ['i10', 'i20', 'Creta', 'Venue', 'Verna'],
        'Tata': ['Tiago', 'Nexon', 'Harrier', 'Safari', 'Altroz'],
        'Mahindra': ['XUV300', 'XUV700', 'Scorpio', 'Thar', 'Bolero'],
        'Honda': ['Amaze', 'City', 'WR-V', 'Jazz', 'Civic']
    };
    
    // When make changes, update models
    makeSelect.addEventListener('change', function() {
        const selectedMake = this.value;
        
        // Clear current options
        modelSelect.innerHTML = '<option selected>Select Model</option>';
        
        // Skip if "Select Make" is chosen
        if (selectedMake === 'Select Make') return;
        
        // Add new options based on selected make
        const models = modelsByMake[selectedMake] || [];
        models.forEach(model => {
            const option = document.createElement('option');
            option.textContent = model;
            option.value = model;
            modelSelect.appendChild(option);
        });
    });
}

/**
 * Initialize the chat widget functionality
 */
function initChatWidget() {
    const chatToggle = document.querySelector('.chat-toggle');
    const chatBox = document.querySelector('.chat-box');
    const closeBtn = document.querySelector('.chat-header .btn-close');
    const chatInput = document.querySelector('.chat-footer input');
    const sendBtn = document.querySelector('.chat-footer button');
    const chatBody = document.querySelector('.chat-body');
    
    if (!chatToggle || !chatBox) return;
    
    // Toggle chat box visibility
    chatToggle.addEventListener('click', function() {
        chatBox.classList.toggle('d-none');
    });
    
    // Close chat box
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            chatBox.classList.add('d-none');
        });
    }
    
    // Send message functionality
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message === '') return;
        
        // Add user message
        addMessage(message, 'user');
        chatInput.value = '';
        
        // Simulate AI response after a short delay
        setTimeout(() => {
            simulateAIResponse(message);
        }, 1000);
    }
    
    // Send button click
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }
    
    // Enter key press
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Add message to chat
    function addMessage(text, sender) {
        if (!chatBody) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = text;
        
        const timestamp = document.createElement('div');
        timestamp.className = 'timestamp';
        timestamp.textContent = 'Just now';
        
        messageDiv.appendChild(messageContent);
        messageDiv.appendChild(timestamp);
        
        chatBody.appendChild(messageDiv);
        
        // Scroll to bottom
        chatBody.scrollTop = chatBody.scrollHeight;
    }
    
    // Simulate AI response (basic rule-based responses)
    function simulateAIResponse(userMessage) {
        const userMessageLower = userMessage.toLowerCase();
        let response = '';
        
        // Simple pattern matching for common queries
        if (userMessageLower.includes('oil seal') || userMessageLower.includes('seals')) {
            response = "We have a wide range of oil seals for various automotive and industrial applications. Would you like me to recommend some based on your vehicle type?";
        } 
        else if (userMessageLower.includes('belt') || userMessageLower.includes('transmission')) {
            response = "JK Fenner offers premium power transmission belts for all major vehicle makes and models. Do you need help finding the right one for your application?";
        }
        else if (userMessageLower.includes('price') || userMessageLower.includes('cost')) {
            response = "Prices vary based on the specific product and your vehicle model. If you tell me which part you're looking for and your vehicle details, I can provide pricing information.";
        }
        else if (userMessageLower.includes('delivery') || userMessageLower.includes('shipping')) {
            response = "We offer nationwide delivery with standard delivery (3-5 business days) and express delivery (1-2 business days) options. Shipping is free for orders above ₹1,000.";
        }
        else if (userMessageLower.includes('warranty') || userMessageLower.includes('guarantee')) {
            response = "All JK Fenner products come with a standard 12-month warranty against manufacturing defects. Some premium products have extended warranty periods.";
        }
        else {
            response = "Thank you for your message. How can I assist you with finding the right JK Fenner products for your needs?";
        }
        
        addMessage(response, 'bot');
    }
}

/**
 * Simulate AI product recommendations
 */
function simulateAIRecommendations() {
    // This is a placeholder for actual AI recommendation logic
    // In a real implementation, this would interact with a backend service
    console.log('AI recommendations initialized');
    
    // For demonstration, we could randomly highlight different products as "recommended"
    // This could be expanded in the future with real recommendation algorithms
}

/**
 * Initialize Add to Cart functionality
 */
function initAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll('.btn-primary');
    
    addToCartButtons.forEach(button => {
        if (button.textContent.includes('Add to Cart')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get product details from parent card
                const card = button.closest('.product-card');
                if (!card) return;
                
                const productName = card.querySelector('.card-title').textContent;
                const productPrice = card.querySelector('.price').textContent;
                
                // Update cart count in header
                updateCartCount(1);
                
                // Show confirmation toast
                showToast(`${productName} added to your cart`);
            });
        }
    });
    
    // Helper function to update cart count
    function updateCartCount(increment) {
        const cartBadge = document.querySelector('.fa-shopping-cart + span');
        if (!cartBadge) return;
        
        let count = parseInt(cartBadge.textContent) || 0;
        count += increment;
        cartBadge.textContent = count;
        
        // Show the badge if it was previously empty
        if (count > 0) {
            cartBadge.classList.remove('d-none');
        }
    }
    
    // Helper function to show toast notification
    function showToast(message) {
        // Check if toast container exists, create if not
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
            document.body.appendChild(toastContainer);
        }
        
        // Create toast element
        const toastEl = document.createElement('div');
        toastEl.className = 'toast align-items-center text-white bg-primary border-0';
        toastEl.setAttribute('role', 'alert');
        toastEl.setAttribute('aria-live', 'assertive');
        toastEl.setAttribute('aria-atomic', 'true');
        
        const toastBody = `
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        `;
        
        toastEl.innerHTML = toastBody;
        toastContainer.appendChild(toastEl);
        
        // Initialize and show toast
        const toast = new bootstrap.Toast(toastEl, {
            autohide: true,
            delay: 3000
        });
        toast.show();
        
        // Remove toast after it's hidden
        toastEl.addEventListener('hidden.bs.toast', function() {
            toastEl.remove();
        });
    }
}

/**
 * Initialize the cyclic search text for the search box
 */
function initSearchTextCycle() {
    const searchTextElement = document.getElementById('searchTextCycle');
    if (!searchTextElement) return;
    
    const searchTexts = ['parts', 'products', 'brands'];
    let currentIndex = 0;
    
    // Change the text every 2 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % searchTexts.length;
        
        // Fade out
        searchTextElement.style.opacity = 0;
        
        // Change text and fade in after a short delay
        setTimeout(() => {
            searchTextElement.textContent = searchTexts[currentIndex];
            searchTextElement.style.opacity = 1;
        }, 200);
    }, 2000);
    
    // Add initial CSS transition
    searchTextElement.style.transition = 'opacity 0.2s ease-in-out';
}

/**
 * Initialize the country flag selector for the vehicle search
 */
function initCountryFlagSelector() {
    const flagContainer = document.getElementById('country-flag-container');
    const selectedFlag = document.getElementById('selected-flag');
    const dropdownItems = document.querySelectorAll('#country-flag-dropdown .dropdown-item');
    
    if (!flagContainer || !selectedFlag || !dropdownItems.length) return;
    
    // Handle dropdown functionality manually if Bootstrap isn't available
    let dropdown;
    try {
        dropdown = new bootstrap.Dropdown(flagContainer);
    } catch (e) {
        console.warn('Bootstrap dropdown not initialized:', e);
    }
    
    // Handle flag selection
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const country = this.getAttribute('data-country');
            const code = this.getAttribute('data-code');
            
            // Update the flag image
            selectedFlag.src = `https://flagcdn.com/w20/${country}.png`;
            
            // Update the country code
            const codeElement = flagContainer.querySelector('span');
            if (codeElement) {
                codeElement.textContent = code;
            }
            
            // Close the dropdown
            if (dropdown) dropdown.hide();
        });
    });
}

/**
 * Initialize language selector functionality
 */
function initLanguageSelector() {
    const languageItems = document.querySelectorAll('[data-lang]');
    const dropdownButton = document.querySelector('#languageDropdown');
    
    if (!languageItems.length || !dropdownButton) return;
    
    // Helper function to show toast notification
    function showToast(message) {
        // Check if toast container exists, create if not
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
            document.body.appendChild(toastContainer);
        }
        
        // Create toast element
        const toastId = 'toast-' + Date.now();
        const toastEl = document.createElement('div');
        toastEl.className = 'toast align-items-center text-white bg-primary border-0';
        toastEl.id = toastId;
        toastEl.setAttribute('role', 'alert');
        toastEl.setAttribute('aria-live', 'assertive');
        toastEl.setAttribute('aria-atomic', 'true');
        
        const toastBody = `
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        `;
        
        toastEl.innerHTML = toastBody;
        toastContainer.appendChild(toastEl);
        
        // Initialize and show toast
        try {
            const toast = new bootstrap.Toast(toastEl, {
                autohide: true,
                delay: 3000
            });
            toast.show();
            
            // Remove toast after it's hidden
            toastEl.addEventListener('hidden.bs.toast', function() {
                toastEl.remove();
            });
        } catch (e) {
            console.warn('Bootstrap toast not initialized:', e);
            // Fallback: remove toast after delay
            setTimeout(() => {
                toastEl.remove();
            }, 3000);
        }
    }
    
    // Make showToast available globally
    window.showToast = showToast;
    
    languageItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const lang = this.getAttribute('data-lang');
            const langText = this.textContent.trim();
            
            // Update the dropdown button text
            if (dropdownButton) {
                dropdownButton.innerHTML = `<i class="fas fa-globe me-1"></i> ${langText.split(' ')[0]}`;
            }
            
            // Simulate translation using Google's URL
            document.documentElement.lang = lang;
            
            // Show toast notification
            showToast(`Language changed to: ${langText}`);
            
            // Simulate price conversion based on language/region
            simulatePriceConversion(lang);
        });
    });
}

/**
 * Simulate price conversion based on selected language/region
 */
function simulatePriceConversion(lang) {
    const priceElements = document.querySelectorAll('.price');
    const originalPriceElements = document.querySelectorAll('.original-price .text-muted del');
    
    if (!priceElements.length) return;
    
    // Exchange rates (simulated)
    const rates = {
        'en': 1,      // INR (base)
        'hi': 1,      // Hindi (same currency)
        'es': 0.011,  // EUR
        'zh': 0.086,  // CNY
        'ar': 0.045,  // AED
        'fr': 0.011,  // EUR
        'de': 0.011   // EUR
    };
    
    // Currency symbols
    const symbols = {
        'en': '₹',    // Indian Rupee
        'hi': '₹',    // Indian Rupee
        'es': '€',    // Euro
        'zh': '¥',    // Chinese Yuan
        'ar': 'د.إ',  // UAE Dirham
        'fr': '€',    // Euro
        'de': '€'     // Euro
    };
    
    // Store original prices if not already stored
    if (!window.originalPrices) {
        window.originalPrices = {};
        priceElements.forEach((el, index) => {
            window.originalPrices[`price-${index}`] = {
                value: parseInt(el.textContent.replace(/[^0-9]/g, '')),
                element: el
            };
        });
        
        if (originalPriceElements.length) {
            originalPriceElements.forEach((el, index) => {
                window.originalPrices[`original-${index}`] = {
                    value: parseInt(el.textContent.replace(/[^0-9]/g, '')),
                    element: el
                };
            });
        }
    }
    
    // Convert prices using stored original values
    Object.keys(window.originalPrices).forEach(key => {
        const data = window.originalPrices[key];
        const value = data.value;
        const el = data.element;
        
        if (!isNaN(value)) {
            // Convert price
            const convertedPrice = Math.round(value * rates[lang]);
            
            // Update price with new currency symbol and value
            el.textContent = `${symbols[lang]}${convertedPrice.toLocaleString()}`;
        }
    });
}

/**
 * Helper function to show toast notification (globally accessible)
 */
function showToast(message) {
    // Check if function is defined in the window scope
    if (typeof window.showToast === 'function') {
        window.showToast(message);
        return;
    }
    
    // Check if toast container exists, create if not
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toastEl = document.createElement('div');
    toastEl.className = 'toast align-items-center text-white bg-primary border-0';
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');
    
    const toastBody = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;
    
    toastEl.innerHTML = toastBody;
    toastContainer.appendChild(toastEl);
    
    // Initialize and show toast
    try {
        const toast = new bootstrap.Toast(toastEl, {
            autohide: true,
            delay: 3000
        });
        toast.show();
        
        // Remove toast after it's hidden
        toastEl.addEventListener('hidden.bs.toast', function() {
            toastEl.remove();
        });
    } catch (e) {
        console.warn('Bootstrap toast not initialized:', e);
        // Fallback: remove toast after delay
        setTimeout(() => {
            toastEl.remove();
        }, 3000);
    }
} 