// Card Rearrangement Module - Custom Drag & Drop System
// Makes IC cards and elements moveable and saveable

const CardMover = {
    activeElement: null,
    ghostElement: null,
    startCoords: { x: 0, y: 0 },
    elementStartPos: { x: 0, y: 0 },
    containerMap: new Map(),
    savedPositions: {},
    
    initialize: function() {
        console.log('[CardMover] Initializing drag system');
        this.loadSavedPositions();
        this.setupDraggableElements();
        this.attachEventHandlers();
    },
    
    loadSavedPositions: function() {
        chrome.storage.local.get(['cardPositions'], (result) => {
            if (result.cardPositions) {
                this.savedPositions = result.cardPositions;
                this.applyStoredPositions();
            }
        });
    },
    
    setupDraggableElements: function() {
        const selectors = [
            '.ic-DashboardCard',
            '.app-button',
            '.card',
            '.panel',
            '.grid-item',
            '.notification',
            '.bettercanvas-gpa-card'
        ];
        
        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((elem, idx) => {
                if (!elem.hasAttribute('data-moveable')) {
                    elem.setAttribute('data-moveable', 'true');
                    elem.setAttribute('data-card-id', `${selector.replace(/[^a-z]/gi, '')}_${idx}`);
                    this.makeElementMoveable(elem);
                }
            });
        });
    },
    
    makeElementMoveable: function(element) {
        // Add grip indicator
        const gripIndicator = document.createElement('div');
        gripIndicator.className = 'card-move-grip';
        gripIndicator.innerHTML = '⋮⋮';
        gripIndicator.style.cssText = `
            position: absolute;
            top: 8px;
            right: 8px;
            cursor: move;
            padding: 4px 8px;
            background: rgba(58, 195, 235, 0.2);
            border-radius: 6px;
            font-size: 16px;
            color: #5bc5eb;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.2s;
        `;
        
        element.style.position = 'relative';
        element.appendChild(gripIndicator);
        
        // Show grip on hover
        element.addEventListener('mouseenter', () => {
            gripIndicator.style.opacity = '0.8';
        });
        
        element.addEventListener('mouseleave', () => {
            if (!this.activeElement) {
                gripIndicator.style.opacity = '0';
            }
        });
        
        // Start drag from grip
        gripIndicator.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.startDragging(element, e);
        });
    },
    
    startDragging: function(element, event) {
        this.activeElement = element;
        this.startCoords = { x: event.clientX, y: event.clientY };
        
        const rect = element.getBoundingClientRect();
        this.elementStartPos = { x: rect.left, y: rect.top };
        
        // Create ghost element
        this.createGhostElement(element);
        
        // Style the original element
        element.style.transition = 'none';
        element.style.opacity = '0.4';
        element.style.transform = 'scale(0.95)';
        
        document.body.style.cursor = 'grabbing';
        document.addEventListener('mousemove', this.handleDragMove);
        document.addEventListener('mouseup', this.handleDragEnd);
    },
    
    createGhostElement: function(original) {
        this.ghostElement = original.cloneNode(true);
        this.ghostElement.style.cssText = `
            position: fixed;
            pointer-events: none;
            z-index: 999999;
            opacity: 0.9;
            transform: rotate(-2deg) scale(1.05);
            box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 80px rgba(58, 195, 235, 0.4);
            transition: transform 0.1s;
        `;
        
        const rect = original.getBoundingClientRect();
        this.ghostElement.style.left = rect.left + 'px';
        this.ghostElement.style.top = rect.top + 'px';
        this.ghostElement.style.width = rect.width + 'px';
        
        document.body.appendChild(this.ghostElement);
    },
    
    handleDragMove: function(event) {
        if (!CardMover.activeElement || !CardMover.ghostElement) return;
        
        const deltaX = event.clientX - CardMover.startCoords.x;
        const deltaY = event.clientY - CardMover.startCoords.y;
        
        const newX = CardMover.elementStartPos.x + deltaX;
        const newY = CardMover.elementStartPos.y + deltaY;
        
        CardMover.ghostElement.style.left = newX + 'px';
        CardMover.ghostElement.style.top = newY + 'px';
        
        // Find drop target
        CardMover.highlightDropTarget(event.clientX, event.clientY);
    },
    
    highlightDropTarget: function(mouseX, mouseY) {
        const moveable = document.querySelectorAll('[data-moveable="true"]');
        let closestElement = null;
        let closestDistance = Infinity;
        
        moveable.forEach(elem => {
            if (elem === this.activeElement) return;
            
            const rect = elem.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distance = Math.sqrt(
                Math.pow(mouseX - centerX, 2) + 
                Math.pow(mouseY - centerY, 2)
            );
            
            if (distance < closestDistance && distance < 200) {
                closestDistance = distance;
                closestElement = elem;
            }
            
            // Remove previous highlights
            elem.style.outline = '';
        });
        
        if (closestElement) {
            closestElement.style.outline = '3px solid rgba(58, 195, 235, 0.6)';
            closestElement.style.outlineOffset = '4px';
        }
    },
    
    handleDragEnd: function(event) {
        if (!CardMover.activeElement) return;
        
        const finalX = event.clientX;
        const finalY = event.clientY;
        
        // Find swap target
        const swapTarget = CardMover.findSwapTarget(finalX, finalY);
        
        if (swapTarget && swapTarget !== CardMover.activeElement) {
            CardMover.swapElements(CardMover.activeElement, swapTarget);
        }
        
        // Cleanup
        if (CardMover.ghostElement) {
            CardMover.ghostElement.remove();
            CardMover.ghostElement = null;
        }
        
        CardMover.activeElement.style.opacity = '';
        CardMover.activeElement.style.transform = '';
        CardMover.activeElement.style.transition = '';
        
        // Remove highlights
        document.querySelectorAll('[data-moveable="true"]').forEach(elem => {
            elem.style.outline = '';
        });
        
        document.body.style.cursor = '';
        document.removeEventListener('mousemove', CardMover.handleDragMove);
        document.removeEventListener('mouseup', CardMover.handleDragEnd);
        
        CardMover.activeElement = null;
        
        // Save new positions
        CardMover.saveCurrentLayout();
    },
    
    findSwapTarget: function(x, y) {
        const moveable = document.querySelectorAll('[data-moveable="true"]');
        
        for (let elem of moveable) {
            if (elem === this.activeElement) continue;
            
            const rect = elem.getBoundingClientRect();
            if (x >= rect.left && x <= rect.right &&
                y >= rect.top && y <= rect.bottom) {
                return elem;
            }
        }
        return null;
    },
    
    swapElements: function(elem1, elem2) {
        const parent1 = elem1.parentNode;
        const parent2 = elem2.parentNode;
        
        if (parent1 === parent2) {
            // Same parent - swap positions
            const next1 = elem1.nextSibling;
            const next2 = elem2.nextSibling;
            
            if (next1 === elem2) {
                parent1.insertBefore(elem2, elem1);
            } else if (next2 === elem1) {
                parent1.insertBefore(elem1, elem2);
            } else {
                parent1.insertBefore(elem2, next1);
                parent2.insertBefore(elem1, next2);
            }
        } else {
            // Different parents - move to other container
            const next2 = elem2.nextSibling;
            parent1.appendChild(elem2);
            parent2.insertBefore(elem1, next2);
        }
        
        // Animate swap
        elem1.style.animation = 'cardSwapIn 0.3s ease';
        elem2.style.animation = 'cardSwapIn 0.3s ease';
        
        setTimeout(() => {
            elem1.style.animation = '';
            elem2.style.animation = '';
        }, 300);
    },
    
    saveCurrentLayout: function() {
        const layout = {};
        const moveable = document.querySelectorAll('[data-moveable="true"]');
        
        moveable.forEach((elem, index) => {
            const cardId = elem.getAttribute('data-card-id');
            const parent = elem.parentNode;
            const siblings = Array.from(parent.children).filter(
                child => child.hasAttribute('data-moveable')
            );
            const position = siblings.indexOf(elem);
            
            layout[cardId] = {
                parentId: parent.id || parent.className,
                position: position,
                index: index
            };
        });
        
        chrome.storage.local.set({ cardPositions: layout }, () => {
            console.log('[CardMover] Layout saved', layout);
        });
    },
    
    applyStoredPositions: function() {
        // Apply saved positions on page load
        setTimeout(() => {
            const moveable = document.querySelectorAll('[data-moveable="true"]');
            const grouped = new Map();
            
            moveable.forEach(elem => {
                const cardId = elem.getAttribute('data-card-id');
                const saved = this.savedPositions[cardId];
                
                if (saved) {
                    const key = saved.parentId;
                    if (!grouped.has(key)) {
                        grouped.set(key, []);
                    }
                    grouped.get(key).push({ elem, position: saved.position });
                }
            });
            
            // Rearrange within each parent
            grouped.forEach((items, parentKey) => {
                items.sort((a, b) => a.position - b.position);
                items.forEach(item => {
                    const parent = item.elem.parentNode;
                    parent.appendChild(item.elem);
                });
            });
        }, 500);
    },
    
    attachEventHandlers: function() {
        // Re-initialize on dynamic content load
        const observer = new MutationObserver((mutations) => {
            let shouldReinit = false;
            mutations.forEach(mutation => {
                if (mutation.addedNodes.length > 0) {
                    shouldReinit = true;
                }
            });
            
            if (shouldReinit) {
                setTimeout(() => this.setupDraggableElements(), 300);
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    },
    
    resetLayout: function() {
        chrome.storage.local.remove('cardPositions', () => {
            console.log('[CardMover] Layout reset');
            window.location.reload();
        });
    }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => CardMover.initialize());
} else {
    CardMover.initialize();
}

// Export for use in content.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CardMover;
}
