/**
 * Professional E-commerce Application
 * Glow by Astou - Enhanced JavaScript Implementation with Product Details
 */

class EcommerceApp {
  constructor() {
    this.state = {
      products: [],
      filteredProducts: [],
      cart: this.loadFromStorage('cart', []),
      wishlist: this.loadFromStorage('wishlist', []),
      filters: {
        search: '',
        category: '',
        priceRange: '',
        sortBy: 'name'
      },
      ui: {
        cartOpen: false,
        loading: false
      }
    };

    this.config = {
      whatsappNumber: '221703044669',
      currency: 'CFA',
      storageKeys: {
        cart: 'glow_cart',
        wishlist: 'glow_wishlist'
      }
    };

    this.selectors = {
      productGrid: '#productGrid',
      searchInput: '#searchInput',
      categoryFilter: '#categoryFilter',
      priceFilter: '#priceFilter',
      sortFilter: '#sortFilter',
      cartBtn: '#cartBtn',
      wishBtn: '#wishBtn',
      cartModal: '#cartModal',
      cartItems: '#cartItems',
      cartCount: '#cartCount',
      wishCount: '#wishCount',
      toast: '#toast'
    };

    // Current product details state
    this.currentDetailProduct = null;
    this.currentDetailQuantity = 1;

    this.sampleProducts = [
      {
        id: '1',
        name: 'Sérum pour Cils',
        category: 'Soins beauté',
        price: 2000,
        originalPrice: 2500,
        image: 'img/Eyelash-serum.jpg',
        description: 'Sérum pousse-cils rapide et efficace. Formule enrichie en vitamines pour des cils plus longs et plus fournis.',
        stock: 50,
        rating: 4.8,
        reviews: 124,
        tags: ['soin', 'cils', 'beauté'],
        colors: [
          { name: 'Transparent', code: '#F0F8FF', border: '#E5E5E5' },
          { name: 'Rose', code: '#FFB6C1' }
        ],
        images: ['img/Eyelash-serum.jpg', 'img/Eyelash-serum.jpg', 'img/Eyelash-serum.jpg']
      },
      {
        id: '2',
        name: 'Ensemble Blanc Élégant',
        category: 'Vêtements',
        price: 7000,
        image: 'img/white-ensemble.jpg',
        description: 'Ensemble blanc élégant (disponible aussi en plusieurs couleurs). Coupe moderne et confortable.',
        stock: 15,
        rating: 4.7,
        reviews: 87,
        tags: ['ensemble', 'mode', 'polyvalent'],
        colors: [
          { name: 'Blanc', code: '#FFFFFF', border: '#E5E5E5' },
          { name: 'Rose', code: '#FFB6C1' },
          { name: 'Bleu', code: '#87CEEB' },
          { name: 'Noir', code: '#2C2C2C' }
        ],
        images: ['img/white-ensemble.jpg', 'img/white-ensemble.jpg', 'img/white-ensemble.jpg']
      },
      {
        id: '3',
        name: 'Ensemble Rose',
        category: 'Vêtements',
        price: 6000,
        originalPrice: 7500,
        image: 'img/robe-rose.jpg',
        description: 'Ensemble rose chic et tendance. Parfait pour toutes les occasions spéciales.',
        stock: 10,
        rating: 4.6,
        reviews: 74,
        tags: ['ensemble', 'rose', 'mode'],
        colors: [
          { name: 'Rose', code: '#FFB6C1' },
          { name: 'Blanc', code: '#FFFFFF', border: '#E5E5E5' },
          { name: 'Vert', code: '#90EE90' }
        ],
        images: ['img/robe-rose.jpg', 'img/robe-rose.jpg', 'img/robe-rose.jpg']
      },
      {
        id: '4',
        name: 'Short Décontracté',
        category: 'Vêtements',
        price: 2500,
        image: 'img/short2.jpg',
        description: 'Short confortable pour un look casual. Matière légère et respirante.',
        stock: 20,
        rating: 4.5,
        reviews: 65,
        tags: ['short', 'été', 'casual'],
        colors: [
          { name: 'Beige', code: '#F5F5DC' },
          { name: 'Bleu', code: '#87CEEB' },
          { name: 'Vert', code: '#90EE90' }
        ],
        images: ['img/short2.jpg', 'img/short2.jpg', 'img/short2.jpg']
      },
      {
        id: '5',
        name: 'Short à Carreaux',
        category: 'Vêtements',
        price: 2500,
        image: 'img/short-careau.jpg',
        description: 'Short à carreaux tendance et stylé. Coupe moderne et ajustée.',
        stock: 18,
        rating: 4.6,
        reviews: 72,
        tags: ['short', 'carreaux', 'mode'],
        colors: [
          { name: 'Multicolore', code: '#DDD', border: '#999' },
          { name: 'Bleu', code: '#87CEEB' },
          { name: 'Rouge', code: '#FFB6B6' }
        ],
        images: ['img/short-careau.jpg', 'img/short-careau.jpg', 'img/short-careau.jpg']
      },
      {
        id: '6',
        name: 'Nue-Pieds Hermes',
        category: 'Chaussures',
        price: 7000,
        originalPrice: 8500,
        image: 'img/nue-pied.jpg',
        description: 'Chaussures Hermes confortables et tendance. Cuir véritable et finitions de qualité.',
        stock: 12,
        rating: 4.7,
        reviews: 91,
        tags: ['chaussures', 'hermes', 'été'],
        colors: [
          { name: 'Marron', code: '#8B4513' },
          { name: 'Noir', code: '#2C2C2C' },
          { name: 'Beige', code: '#F5F5DC' }
        ],
        images: ['img/nue-pied.jpg', 'img/nue-pied.jpg', 'img/nue-pied.jpg']
      },
      {
        id: '7',
        name: 'Chaussures à Crochet',
        category: 'Chaussures',
        price: 4000,
        image: 'img/nue-pied2.jpg',
        description: 'Chaussures avec crochet, légères et pratiques. Design unique et confortable.',
        stock: 14,
        rating: 4.5,
        reviews: 68,
        tags: ['chaussures', 'crochet', 'confort'],
        colors: [
          { name: 'Beige', code: '#F5F5DC' },
          { name: 'Blanc', code: '#FFFFFF', border: '#E5E5E5' },
          { name: 'Noir', code: '#2C2C2C' }
        ],
        images: ['img/nue-pied2.jpg', 'img/nue-pied2.jpg', 'img/nue-pied2.jpg']
      },
      {
        id: '8',
        name: 'Cargo',
        category: 'Vêtements',
        price: 7000,
        image: 'img/jean-baggy.jpg',
        description: 'Pantalon cargo stylé pour un look streetwear. Nombreuses poches pratiques.',
        stock: 10,
        rating: 4.6,
        reviews: 56,
        tags: ['cargo', 'streetwear', 'mode'],
        colors: [
          { name: 'Kaki', code: '#BDB76B' },
          { name: 'Noir', code: '#2C2C2C' },
          { name: 'Vert olive', code: '#808000' }
        ],
        images: ['img/jean-baggy.jpg', 'img/jean-baggy.jpg', 'img/jean-baggy.jpg']
      },
      {
        id: '9',
        name: 'Bas Large Vert',
        category: 'Vêtements',
        price: 4000,
        image: 'img/green-bl.jpg',
        description: 'Bas large vert tendance. Coupe fluide et confortable.',
        stock: 15,
        rating: 4.7,
        reviews: 59,
        tags: ['lin', 'bas large', 'été'],
        colors: [
          { name: 'Vert', code: '#90EE90' },
          { name: 'Beige', code: '#F5F5DC' },
          { name: 'Blanc', code: '#FFFFFF', border: '#E5E5E5' }
        ],
        images: ['img/green-bl.jpg', 'img/green-bl.jpg', 'img/green-bl.jpg']
      },
      {
        id: '10',
        name: 'Bas Large en Lin',
        category: 'Vêtements',
        price: 3500,
        image: 'img/bl.jpg',
        description: 'Pantalon bas large en lin, léger et confortable. Parfait pour l\'été.',
        stock: 12,
        rating: 4.6,
        reviews: 48,
        tags: ['vert', 'bas large', 'mode'],
        colors: [
          { name: 'Lin naturel', code: '#F5F5DC' },
          { name: 'Blanc', code: '#FFFFFF', border: '#E5E5E5' },
          { name: 'Beige', code: '#DEB887' }
        ],
        images: ['img/bl.jpg', 'img/bl.jpg', 'img/bl.jpg']
      },
      {
        id: '11',
        name: 'Boyfriend Jeans',
        category: 'Vêtements',
        price: 7000,
        image: 'img/jean1.jpg',
        description: 'Jean boyfriend coupe ample, look moderne. Denim de qualité premium.',
        stock: 9,
        rating: 4.5,
        reviews: 51,
        tags: ['jean', 'boyfriend', 'mode'],
        colors: [
          { name: 'Bleu denim', code: '#4682B4' },
          { name: 'Noir', code: '#2C2C2C' },
          { name: 'Bleu clair', code: '#87CEEB' }
        ],
        images: ['img/jean1.jpg', 'img/jean1.jpg', 'img/jean1.jpg']
      },
      {
        id: '12',
        name: 'Jupe',
        category: 'Vêtements',
        price: 3600,
        image: 'img/robe-rose.jpg',
        description: 'Jupe tendance pour un style chic. Coupe flatteuse et élégante.',
        stock: 14,
        rating: 4.6,
        reviews: 62,
        tags: ['jupe', 'féminin', 'mode'],
        colors: [
          { name: 'Rose', code: '#FFB6C1' },
          { name: 'Noir', code: '#2C2C2C' },
          { name: 'Blanc', code: '#FFFFFF', border: '#E5E5E5' }
        ],
        images: ['img/robe-rose.jpg', 'img/robe-rose.jpg', 'img/robe-rose.jpg']
      },
      {
        id: '13',
        name: 'Jalaba Traditionnelle',
        category: 'Vêtements',
        price: 7000,
        image: 'img/jalaba.jpg',
        description: 'Jalaba élégante inspirée de la tradition. Broderies raffinées et tissu de qualité.',
        stock: 6,
        rating: 4.7,
        reviews: 55,
        tags: ['jalaba', 'tradition', 'élégant'],
        colors: [
          { name: 'Blanc', code: '#FFFFFF', border: '#E5E5E5' },
          { name: 'Beige', code: '#F5F5DC' },
          { name: 'Or', code: '#FFD700' }
        ],
        images: ['img/jalaba.jpg', 'img/jalaba.jpg', 'img/jalaba.jpg']
      },
      {
        id: '14',
        name: 'Jalaba Style 2',
        category: 'Vêtements',
        price: 7000,
        image: 'img/jalaba2.jpg',
        description: 'Deuxième modèle de jalaba, raffiné et tendance. Design moderne avec touches traditionnelles.',
        stock: 7,
        rating: 4.6,
        reviews: 48,
        tags: ['jalaba', 'raffiné', 'mode'],
        colors: [
          { name: 'Bleu', code: '#87CEEB' },
          { name: 'Blanc', code: '#FFFFFF', border: '#E5E5E5' },
          { name: 'Vert', code: '#90EE90' }
        ],
        images: ['img/jalaba2.jpg', 'img/jalaba2.jpg', 'img/jalaba2.jpg']
      },
      {
        id: '15',
        name: 'Pantalon Taille Hanche',
        category: 'Vêtements',
        price: 4500,
        image: 'img/hanche1.jpg',
        description: 'Pantalon taille basse moderne. Coupe ajustée et tendance.',
        stock: 10,
        rating: 4.5,
        reviews: 47,
        tags: ['pantalon', 'hanche', 'mode'],
        colors: [
          { name: 'Noir', code: '#2C2C2C' },
          { name: 'Beige', code: '#F5F5DC' },
          { name: 'Bleu', code: '#87CEEB' }
        ],
        images: ['img/hanche1.jpg', 'img/hanche1.jpg', 'img/hanche1.jpg']
      },
      {
        id: '16',
        name: 'Pantalon Taille Hanche 2',
        category: 'Vêtements',
        price: 4500,
        image: 'img/hanche2.jpg',
        description: 'Deuxième modèle de pantalon taille basse. Style moderne et confortable.',
        stock: 12,
        rating: 4.6,
        reviews: 51,
        tags: ['pantalon', 'hanche', 'stylé'],
        colors: [
          { name: 'Marron', code: '#8B4513' },
          { name: 'Noir', code: '#2C2C2C' },
          { name: 'Beige', code: '#F5F5DC' }
        ],
        images: ['img/hanche2.jpg', 'img/hanche2.jpg', 'img/hanche2.jpg']
      },
      {
        id: '17',
        name: 'Abaya',
        category: 'Vêtements',
        price: 4500,
        image: 'img/abaya.jpg',
        description: 'Abaya élégante et moderne. Coupe fluide et confortable pour un style raffiné.',
        stock: 10,
        rating: 4.5,
        reviews: 47,
        tags: ['abaya', 'élégant', 'mode'],
        colors: [
          { name: 'Noir', code: '#2C2C2C' },
          { name: 'Beige', code: '#F5F5DC' },
          { name: 'Gris', code: '#808080' }
        ],
        images: ['img/abaya.jpg', 'img/abaya.jpg', 'img/abaya.jpg']
      }
    ];

    this.init();
  }

  // Initialization
  async init() {
    try {
      await this.loadProducts();
      this.buildFilters();
      this.attachEvents();
      this.updateUI();
      this.renderProducts();
      this.injectStyles();
      
      console.log('Glow by Astou - E-commerce app initialized successfully');
    } catch (error) {
      console.error('Failed to initialize app:', error);
      this.showToast('Erreur lors du chargement de l\'application', 'error');
    }
  }

  // Inject CSS styles for product details modal
  injectStyles() {
    const styles = `
      <style id="product-detail-styles">
        .product-detail-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          animation: fadeIn 0.3s ease-out;
          padding: 20px;
        }

        .product-detail-card {
          background: white;
          border-radius: 20px;
          max-width: 900px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
          animation: slideUp 0.4s ease-out;
        }

        .close-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .close-btn:hover {
          background: rgba(255, 255, 255, 1);
          transform: rotate(90deg);
        }

        .close-btn ion-icon {
          font-size: 20px;
          color: #333;
        }

        .product-detail-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          padding: 30px;
        }

        .product-images {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .main-image {
          position: relative;
          border-radius: 15px;
          overflow: hidden;
          background: #f8f9fa;
        }

        .main-image img {
          width: 100%;
          height: 400px;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .main-image:hover img {
          transform: scale(1.05);
        }

        .discount-badge {
          position: absolute;
          top: 15px;
          left: 15px;
          background: #ff4757;
          color: white;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
          z-index: 2;
        }

        .stock-warning {
          position: absolute;
          top: 15px;
          right: 15px;
          background: #ffa726;
          color: white;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
          z-index: 2;
        }

        .image-thumbnails {
          display: flex;
          gap: 10px;
          justify-content: center;
        }

        .thumbnail {
          width: 60px;
          height: 60px;
          border-radius: 10px;
          object-fit: cover;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.3s ease;
        }

        .thumbnail.active {
          border-color: #667eea;
          transform: scale(1.1);
        }

        .thumbnail:hover {
          transform: scale(1.05);
          border-color: #667eea;
        }

        .product-info {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .product-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .product-category {
          background: rgba(102, 126, 234, 0.1);
          color: #667eea;
          padding: 5px 12px;
          border-radius: 15px;
          font-size: 12px;
          font-weight: 500;
          display: inline-block;
          margin-bottom: 10px;
        }

        .product-title {
          font-size: 28px;
          font-weight: 700;
          color: #2c3e50;
          margin: 0;
          line-height: 1.2;
        }

        .product-price {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .current-price {
          font-size: 32px;
          font-weight: 700;
          color: #27ae60;
        }

        .original-price {
          font-size: 20px;
          color: #95a5a6;
          text-decoration: line-through;
        }

        .product-rating {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .rating {
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .rating ion-icon {
          color: #f1c40f;
          font-size: 16px;
        }

        .rating-text {
          color: #7f8c8d;
          font-size: 14px;
          margin-left: 5px;
        }

        .product-description {
          color: #576574;
          line-height: 1.6;
          font-size: 16px;
        }

        .color-selection h4,
        .quantity-selection h4 {
          font-size: 16px;
          color: #2c3e50;
          margin: 0 0 12px 0;
          font-weight: 600;
        }

        .color-options {
          display: flex;
          gap: 10px;
          margin-bottom: 8px;
        }

        .color-option {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          border: 3px solid transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .color-option.active {
          border-color: #667eea;
          transform: scale(1.1);
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
        }

        .color-option:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .selected-color-name {
          color: #667eea;
          font-weight: 500;
          font-size: 14px;
        }

        .qty-controls {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 8px;
        }

        .qty-controls button {
          width: 35px;
          height: 35px;
          border: 2px solid #667eea;
          background: white;
          color: #667eea;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .qty-controls button:hover {
          background: #667eea;
          color: white;
        }

        .qty-controls .quantity {
          font-size: 18px;
          font-weight: 600;
          color: #2c3e50;
          min-width: 30px;
          text-align: center;
        }

        .stock-info {
          color: #27ae60;
          font-size: 14px;
          font-weight: 500;
        }

        .action-buttons {
          display: flex;
          gap: 15px;
          margin-top: 20px;
        }

        .btn {
          flex: 1;
          padding: 15px 20px;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .btn-secondary {
          background: white;
          color: #667eea;
          border: 2px solid #667eea;
        }

        .btn-secondary:hover {
          background: #667eea;
          color: white;
          transform: translateY(-2px);
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none !important;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(50px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        @media (max-width: 768px) {
          .product-detail-card {
            margin: 10px;
            max-height: 95vh;
          }

          .product-detail-content {
            grid-template-columns: 1fr;
            gap: 20px;
            padding: 20px;
          }

          .main-image img {
            height: 300px;
          }

          .product-title {
            font-size: 24px;
          }

          .current-price {
            font-size: 28px;
          }

          .action-buttons {
            flex-direction: column;
          }
        }
      </style>
    `;

    // Remove existing styles
    const existingStyles = document.getElementById('product-detail-styles');
    if (existingStyles) {
      existingStyles.remove();
    }

    // Add new styles
    document.head.insertAdjacentHTML('beforeend', styles);
  }

  // Data Management
  async loadProducts() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.state.products = this.sampleProducts;
        this.state.filteredProducts = [...this.state.products];
        resolve();
      }, 500);
    });
  }

  loadFromStorage(key, defaultValue) {
    try {
      const data = localStorage.getItem(this.config.storageKeys[key] || key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
      console.error(`Error loading ${key} from storage:`, error);
      return defaultValue;
    }
  }

  saveToStorage(key, data) {
    try {
      localStorage.setItem(this.config.storageKeys[key] || key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error saving ${key} to storage:`, error);
    }
  }

  // Utility Methods
  $(selector) {
    return document.querySelector(selector);
  }

  $$(selector) {
    return document.querySelectorAll(selector);
  }

  formatPrice(price) {
    const formatted = new Intl.NumberFormat('fr-FR').format(price);
    return `${formatted} ${this.config.currency}`;
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Product Management
  getProductById(id) {
    return this.state.products.find(product => product.id === id);
  }

  buildFilters() {
    const categories = [...new Set(this.state.products.map(p => p.category))];
    const categoryFilter = this.$(this.selectors.categoryFilter);
    
    if (categoryFilter) {
      categoryFilter.innerHTML = '<option value="">Toutes catégories</option>';
      categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
      });
    }
  }

  filterProducts() {
    const { search, category, priceRange, sortBy } = this.state.filters;

    this.state.filteredProducts = this.state.products.filter(product => {
      const matchesSearch = this.matchesSearchTerm(product, search);
      const matchesCategory = !category || product.category === category;
      const matchesPrice = this.matchesPriceRange(product.price, priceRange);
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    this.sortProducts(sortBy);
    this.renderProducts();
  }

  matchesSearchTerm(product, searchTerm) {
    if (!searchTerm) return true;
    
    const term = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term) ||
      (product.tags && product.tags.some(tag => tag.toLowerCase().includes(term)))
    );
  }

  matchesPriceRange(price, range) {
    if (!range) return true;
    
    if (range.includes('+')) {
      const minPrice = parseInt(range.replace('+', ''));
      return price >= minPrice;
    } else {
      const [min, max] = range.split('-').map(x => parseInt(x));
      return price >= min && price <= max;
    }
  }

  sortProducts(sortBy) {
    const sortFunctions = {
      'name': (a, b) => a.name.localeCompare(b.name),
      'price-asc': (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price,
      'rating': (a, b) => (b.rating || 0) - (a.rating || 0),
      'newest': (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    };

    const sortFn = sortFunctions[sortBy] || sortFunctions['name'];
    this.state.filteredProducts.sort(sortFn);
  }

  // Product Details Modal Methods
  showProductDetails(productId) {
    const product = this.getProductById(productId);
    if (!product) return;

    this.createProductModal(product);
  }

  createProductModal(product) {
    const isInWishlist = this.state.wishlist.includes(product.id);
    const discountPercent = product.originalPrice ? 
      Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

    const modalHTML = `
      <div class="product-detail-overlay" id="productDetailOverlay">
        <div class="product-detail-card">
          <button class="close-btn" onclick="app.closeProductDetails()">
            <ion-icon name="close-outline"></ion-icon>
          </button>

          <div class="product-detail-content">
            <div class="product-images">
              <div class="main-image">
                <img id="mainProductImage" src="${product.images[0]}" alt="${product.name}">
                ${discountPercent > 0 ? `<div class="discount-badge">-${discountPercent}%</div>` : ''}
                ${product.stock < 5 ? `<div class="stock-warning">Plus que ${product.stock}</div>` : ''}
              </div>
              ${product.images.length > 1 ? `
                <div class="image-thumbnails">
                  ${product.images.map((img, index) => `
                    <img class="thumbnail ${index === 0 ? 'active' : ''}" 
                         src="${img}" 
                         onclick="app.selectProductImage(${index})"
                         data-index="${index}">
                  `).join('')}
                </div>
              ` : ''}
            </div>

            <div class="product-info">
              <div class="product-header">
                <div>
                  <span class="product-category">${product.category}</span>
                  <h2 class="product-title">${product.name}</h2>
                </div>
                <button class="wish-btn ${isInWishlist ? 'active' : ''}" 
                        onclick="app.toggleWishlist('${product.id}')">
                  <ion-icon name="heart${isInWishlist ? '' : '-outline'}"></ion-icon>
                </button>
              </div>

              <div class="product-price">
                <span class="current-price">${this.formatPrice(product.price)}</span>
                ${product.originalPrice ? `<span class="original-price">${this.formatPrice(product.originalPrice)}</span>` : ''}
              </div>

              ${product.rating ? `
                <div class="product-rating">
                  ${this.renderRating(product.rating, product.reviews)}
                </div>
              ` : ''}

              <p class="product-description">${product.description}</p>

              <div class="color-selection">
                <h4>Couleurs disponibles:</h4>
                <div class="color-options">
                  ${product.colors.map((color, index) => `
                    <button class="color-option ${index === 0 ? 'active' : ''}" 
                            style="background-color: ${color.code}; ${color.border ? `border: 3px solid ${color.border} !important;` : ''}"
                            title="${color.name}"
                            onclick="app.selectColor(${index})"
                            data-index="${index}">
                    </button>
                  `).join('')}
                </div>
                <span class="selected-color-name">${product.colors[0].name}</span>
              </div>

              <div class="quantity-selection">
                <h4>Quantité:</h4>
                <div class="qty-controls">
                  <button onclick="app.updateDetailQuantity(-1)">
                    <ion-icon name="remove-outline"></ion-icon>
                  </button>
                  <span class="quantity" id="detailQuantity">1</span>
                  <button onclick="app.updateDetailQuantity(1)">
                    <ion-icon name="add-outline"></ion-icon>
                  </button>
                </div>
                <span class="stock-info">Stock disponible: ${product.stock}</span>
              </div>

              <div class="action-buttons">
                <button class="btn btn-primary" 
                        onclick="app.addToCartFromDetails('${product.id}')"
                        ${product.stock < 1 ? 'disabled' : ''}>
                  <ion-icon name="bag-add-outline"></ion-icon>
                  ${product.stock < 1 ? 'Rupture de stock' : 'Ajouter au panier'}
                </button>
                <button class="btn btn-secondary" onclick="app.buyNow('${product.id}')">
                  <ion-icon name="flash-outline"></ion-icon>
                  Acheter maintenant
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Remove existing modal
    const existingModal = document.getElementById('productDetailOverlay');
    if (existingModal) {
      existingModal.remove();
    }

    // Add modal to DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';

    // Store current product for reference
    this.currentDetailProduct = product;
    this.currentDetailQuantity = 1;

    // Add click outside to close
    setTimeout(() => {
      const overlay = document.getElementById('productDetailOverlay');
      if (overlay) {
        overlay.addEventListener('click', (e) => {
          if (e.target === overlay) {
            this.closeProductDetails();
          }
        });
      }
    }, 100);
  }

  closeProductDetails() {
    const modal = document.getElementById('productDetailOverlay');
    if (modal) {
      modal.style.animation = 'fadeOut 0.3s ease-in forwards';
      setTimeout(() => {
        modal.remove();
        document.body.style.overflow = '';
      }, 300);
    }
    this.currentDetailProduct = null;
    this.currentDetailQuantity = 1;
  }

  selectProductImage(index) {
    if (!this.currentDetailProduct) return;

    const mainImage = document.getElementById('mainProductImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    if (mainImage && this.currentDetailProduct.images[index]) {
      mainImage.src = this.currentDetailProduct.images[index];
      
      thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
      });
    }
  }

  selectColor(index) {
    if (!this.currentDetailProduct) return;

    const colorOptions = document.querySelectorAll('.color-option');
    const colorNameEl = document.querySelector('.selected-color-name');
    
    colorOptions.forEach((option, i) => {
      option.classList.toggle('active', i === index);
    });

    if (colorNameEl && this.currentDetailProduct.colors[index]) {
      colorNameEl.textContent = this.currentDetailProduct.colors[index].name;
    }
  }

  updateDetailQuantity(change) {
    if (!this.currentDetailProduct) return;

    const newQuantity = this.currentDetailQuantity + change;
    
    if (newQuantity < 1 || newQuantity > this.currentDetailProduct.stock) {
      if (newQuantity > this.currentDetailProduct.stock) {
        this.showToast('Stock insuffisant', 'warning');
      }
      return;
    }

    this.currentDetailQuantity = newQuantity;
    const quantityEl = document.getElementById('detailQuantity');
    if (quantityEl) {
      quantityEl.textContent = this.currentDetailQuantity;
    }
  }

  addToCartFromDetails(productId) {
    if (!this.currentDetailProduct) return;

    for (let i = 0; i < this.currentDetailQuantity; i++) {
      this.addToCart(productId);
    }
    
    this.showToast(`${this.currentDetailQuantity} produit(s) ajouté(s) au panier`, 'success');
  }

  buyNow(productId) {
    this.addToCartFromDetails(productId);
    this.closeProductDetails();
    setTimeout(() => {
      this.toggleCart();
    }, 500);
  }

  // Rendering Methods
  renderProducts() {
    const grid = this.$(this.selectors.productGrid);
    if (!grid) return;

    if (!this.state.filteredProducts.length) {
      grid.innerHTML = this.renderEmptyState();
      return;
    }

    const productsHTML = this.state.filteredProducts
      .map(product => this.renderProductCard(product))
      .join('');

    grid.innerHTML = productsHTML;
  }

  renderProductCard(product) {
    const isInWishlist = this.state.wishlist.includes(product.id);
    const discountPercent = product.originalPrice ? 
      Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

    return `
      <div class="card" data-id="${product.id}">
        ${discountPercent > 0 ? `<div class="discount-badge">-${discountPercent}%</div>` : ''}
        ${product.stock < 5 ? `<div class="stock-warning">Plus que ${product.stock}</div>` : ''}
        
        <button class="wish-btn ${isInWishlist ? 'active' : ''}" 
                onclick="app.toggleWishlist('${product.id}')">
          <ion-icon name="heart${isInWishlist ? '' : '-outline'}"></ion-icon>
        </button>
        
        <div class="card-image" onclick="app.showProductDetails('${product.id}')" style="cursor: pointer;">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>
        
        <div class="card-body">
          <h4 class="card-title" onclick="app.showProductDetails('${product.id}')" style="cursor: pointer;">${product.name}</h4>
          <p class="card-desc">${this.truncateText(product.description, 80)}</p>
          
          ${product.rating ? this.renderRating(product.rating, product.reviews) : ''}
          
          <div class="card-price">
            ${this.formatPrice(product.price)}
            ${product.originalPrice ? `<span class="original-price">${this.formatPrice(product.originalPrice)}</span>` : ''}
          </div>
          
          <div class="color-preview">
            ${product.colors.slice(0, 4).map(color => `
              <span class="color-dot" 
                    style="background-color: ${color.code}; ${color.border ? `border: 1px solid ${color.border};` : ''}" 
                    title="${color.name}"></span>
            `).join('')}
            ${product.colors.length > 4 ? `<span class="more-colors">+${product.colors.length - 4}</span>` : ''}
          </div>
          
          <div class="card-footer">
            <button class="btn btn-primary" 
                    onclick="app.addToCart('${product.id}')"
                    ${product.stock < 1 ? 'disabled' : ''}>
              <ion-icon name="add-outline"></ion-icon>
              ${product.stock < 1 ? 'Rupture' : 'Ajouter'}
            </button>
            <button class="btn btn-outline" onclick="app.showProductDetails('${product.id}')">
              <ion-icon name="eye-outline"></ion-icon>
              Voir
            </button>
          </div>
        </div>
      </div>
    `;
  }

  renderRating(rating, reviewCount) {
    const stars = Array.from({length: 5}, (_, i) => 
      `<ion-icon name="star${i < Math.floor(rating) ? '' : '-outline'}"></ion-icon>`
    ).join('');
    
    return `
      <div class="rating">
        ${stars}
        <span class="rating-text">${rating} (${reviewCount})</span>
      </div>
    `;
  }

  renderEmptyState() {
    return `
      <div class="empty-state">
        <ion-icon name="search-outline"></ion-icon>
        <h3>Aucun produit trouvé</h3>
        <p>Essayez de modifier vos critères de recherche</p>
        <button class="btn btn-primary" onclick="app.clearFilters()">
          Réinitialiser les filtres
        </button>
      </div>
    `;
  }

  renderCart() {
    const container = this.$(this.selectors.cartItems);
    if (!container) return;

    if (!this.state.cart.length) {
      container.innerHTML = this.renderEmptyCart();
      this.updateCartTotal();
      return;
    }

    const cartHTML = this.state.cart
      .map(item => this.renderCartItem(item))
      .join('');

    container.innerHTML = cartHTML;
    this.updateCartTotal();
  }

  renderCartItem(item) {
    return `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${this.formatPrice(item.price)}</div>
        </div>
        <div class="qty-controls">
          <button onclick="app.updateQuantity('${item.id}', -1)">
            <ion-icon name="remove-outline"></ion-icon>
          </button>
          <span class="quantity">${item.quantity}</span>
          <button onclick="app.updateQuantity('${item.id}', 1)">
            <ion-icon name="add-outline"></ion-icon>
          </button>
        </div>
        <button class="remove-btn" onclick="app.removeFromCart('${item.id}')">
          <ion-icon name="trash-outline"></ion-icon>
        </button>
      </div>
    `;
  }

  renderEmptyCart() {
    return `
      <div class="empty-state">
        <ion-icon name="bag-outline"></ion-icon>
        <h3>Votre panier est vide</h3>
        <p>Ajoutez des produits pour commencer</p>
      </div>
    `;
  }

  // Cart Management
  addToCart(productId) {
    const product = this.getProductById(productId);
    if (!product || product.stock < 1) {
      this.showToast('Produit non disponible', 'error');
      return;
    }

    const existingItem = this.state.cart.find(item => item.id === productId);
    
    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        this.showToast('Stock insuffisant', 'warning');
        return;
      }
      existingItem.quantity++;
    } else {
      this.state.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        maxStock: product.stock
      });
    }

    this.saveToStorage('cart', this.state.cart);
    this.updateCartCount();
    this.showToast('Produit ajouté au panier', 'success');
  }

  removeFromCart(productId) {
    this.state.cart = this.state.cart.filter(item => item.id !== productId);
    this.saveToStorage('cart', this.state.cart);
    this.updateCartCount();
    this.renderCart();
    this.showToast('Produit retiré du panier', 'info');
  }

  updateQuantity(productId, change) {
    const item = this.state.cart.find(item => item.id === productId);
    if (!item) return;

    const newQuantity = item.quantity + change;
    
    if (newQuantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    if (newQuantity > item.maxStock) {
      this.showToast('Stock insuffisant', 'warning');
      return;
    }

    item.quantity = newQuantity;
    this.saveToStorage('cart', this.state.cart);
    this.updateCartCount();
    this.renderCart();
  }

  updateCartCount() {
    const count = this.state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountEl = this.$(this.selectors.cartCount);
    
    if (cartCountEl) {
      cartCountEl.textContent = count;
      cartCountEl.style.display = count > 0 ? 'flex' : 'none';
    }
  }

  updateCartTotal() {
    const subtotal = this.state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const subtotalEl = this.$('#subtotal');
    const totalEl = this.$('#total');
    
    if (subtotalEl) subtotalEl.textContent = this.formatPrice(subtotal);
    if (totalEl) totalEl.textContent = this.formatPrice(subtotal);
  }

  clearCart() {
    this.state.cart = [];
    this.saveToStorage('cart', this.state.cart);
    this.updateCartCount();
    this.renderCart();
    this.showToast('Panier vidé', 'info');
  }

  // Wishlist Management
  toggleWishlist(productId) {
    const index = this.state.wishlist.indexOf(productId);
    
    if (index > -1) {
      this.state.wishlist.splice(index, 1);
      this.showToast('Retiré des favoris', 'info');
    } else {
      this.state.wishlist.push(productId);
      this.showToast('Ajouté aux favoris', 'success');
    }

    this.saveToStorage('wishlist', this.state.wishlist);
    this.updateWishCount();
    this.renderProducts();
  }

  updateWishCount() {
    const count = this.state.wishlist.length;
    const wishCountEl = this.$(this.selectors.wishCount);
    
    if (wishCountEl) {
      wishCountEl.textContent = count;
      wishCountEl.style.display = count > 0 ? 'flex' : 'none';
    }
  }

  showWishlist() {
    if (!this.state.wishlist.length) {
      this.showToast('Votre liste de souhaits est vide', 'info');
      return;
    }
    
    this.state.filteredProducts = this.state.products.filter(p => 
      this.state.wishlist.includes(p.id)
    );
    this.renderProducts();
    this.showToast('Liste de souhaits affichée', 'info');
  }

  // UI Management
  toggleCart() {
    const modal = this.$(this.selectors.cartModal);
    if (!modal) return;

    const isOpen = modal.classList.contains('open');
    
    if (isOpen) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      this.state.ui.cartOpen = false;
    } else {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      this.state.ui.cartOpen = true;
      this.renderCart();
    }
  }

  showToast(message, type = 'success') {
    const toast = this.$(this.selectors.toast);
    if (!toast) return;

    const messageEl = toast.querySelector('#toastMessage') || toast;
    messageEl.textContent = message;
    
    toast.classList.remove('success', 'error', 'warning', 'info');
    toast.classList.add(type, 'show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  updateUI() {
    this.updateCartCount();
    this.updateWishCount();
  }

  clearFilters() {
    this.state.filters = {
      search: '',
      category: '',
      priceRange: '',
      sortBy: 'name'
    };

    const searchInput = this.$(this.selectors.searchInput);
    const categoryFilter = this.$(this.selectors.categoryFilter);
    const priceFilter = this.$(this.selectors.priceFilter);
    const sortFilter = this.$(this.selectors.sortFilter);

    if (searchInput) searchInput.value = '';
    if (categoryFilter) categoryFilter.value = '';
    if (priceFilter) priceFilter.value = '';
    if (sortFilter) sortFilter.value = 'name';

    this.state.filteredProducts = [...this.state.products];
    this.renderProducts();
  }

  // Checkout
  checkout() {
    if (!this.state.cart.length) {
      this.showToast('Votre panier est vide', 'warning');
      return;
    }

    const total = this.state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    let message = '🛍️ *Nouvelle commande - Glow by Astou*\n\n';
    message += '📋 *Détail de la commande:*\n';
    
    this.state.cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      message += `• ${item.name}\n`;
      message += `  Quantité: ${item.quantity} × ${this.formatPrice(item.price)} = ${this.formatPrice(itemTotal)}\n\n`;
    });
    
    message += `💰 *TOTAL: ${this.formatPrice(total)}*\n\n`;
    message += '📍 Merci de confirmer votre adresse de livraison.\n';
    message += '🕐 Livraison sous 24-48h à Dakar';
    
    const whatsappUrl = `https://wa.me/${this.config.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    setTimeout(() => {
      if (confirm('Commande envoyée ! Voulez-vous vider votre panier ?')) {
        this.clearCart();
        this.toggleCart();
      }
    }, 2000);
  }

  // Event Handlers
  attachEvents() {
    const searchInput = this.$(this.selectors.searchInput);
    if (searchInput) {
      searchInput.addEventListener('input', this.debounce((e) => {
        this.state.filters.search = e.target.value;
        this.filterProducts();
      }, 300));
    }

    const categoryFilter = this.$(this.selectors.categoryFilter);
    if (categoryFilter) {
      categoryFilter.addEventListener('change', (e) => {
        this.state.filters.category = e.target.value;
        this.filterProducts();
      });
    }

    const priceFilter = this.$(this.selectors.priceFilter);
    if (priceFilter) {
      priceFilter.addEventListener('change', (e) => {
        this.state.filters.priceRange = e.target.value;
        this.filterProducts();
      });
    }

    const sortFilter = this.$(this.selectors.sortFilter);
    if (sortFilter) {
      sortFilter.addEventListener('change', (e) => {
        this.state.filters.sortBy = e.target.value;
        this.filterProducts();
      });
    }

    const cartBtn = this.$(this.selectors.cartBtn);
    if (cartBtn) {
      cartBtn.addEventListener('click', () => this.toggleCart());
    }

    const closeCart = this.$('#closeCart');
    if (closeCart) {
      closeCart.addEventListener('click', () => this.toggleCart());
    }

    const wishBtn = this.$(this.selectors.wishBtn);
    if (wishBtn) {
      wishBtn.addEventListener('click', () => this.showWishlist());
    }

    const checkoutBtn = this.$('#checkoutBtn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => this.checkout());
    }

    const cartModal = this.$(this.selectors.cartModal);
    if (cartModal) {
      cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
          this.toggleCart();
        }
      });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (this.state.ui.cartOpen) {
          this.toggleCart();
        }
        if (document.getElementById('productDetailOverlay')) {
          this.closeProductDetails();
        }
      }
    });
  }

  // Utility methods
  truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }
}

// Initialize the application
let app;

document.addEventListener('DOMContentLoaded', () => {
  app = new EcommerceApp();
});

// Global functions for onclick handlers
window.app = {
  addToCart: (id) => app?.addToCart(id),
  removeFromCart: (id) => app?.removeFromCart(id),
  updateQuantity: (id, change) => app?.updateQuantity(id, change),
  toggleWishlist: (id) => app?.toggleWishlist(id),
  clearFilters: () => app?.clearFilters(),
  showProductDetails: (id) => app?.showProductDetails(id),
  closeProductDetails: () => app?.closeProductDetails(),
  selectProductImage: (index) => app?.selectProductImage(index),
  selectColor: (index) => app?.selectColor(index),
  updateDetailQuantity: (change) => app?.updateDetailQuantity(change),
  addToCartFromDetails: (id) => app?.addToCartFromDetails(id),
  buyNow: (id) => app?.buyNow(id)
};