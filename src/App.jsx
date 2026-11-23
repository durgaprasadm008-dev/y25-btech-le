
import { useState } from "react";
import {
  UtensilsCrossed, Search, ShoppingBag, ArrowRight,
  Star, Clock3, MapPin, Phone,
  Leaf, Flame, ChefHat, Sparkles, Truck, ShieldCheck,
  X, Minus, Plus, Trash2, CheckCircle2, Menu,
  Heart, ArrowUpRight
} from "lucide-react";
import MenuItem from "./components/MenuItem";
import "./App.css";

// Restaurant menu records stored in a JavaScript array
const menuData = [
  {
    id: 1,
    name: "Hyderabadi Chicken Biryani",
    category: "Non-Veg",
    price: 289,
    rating: 4.9,
    reviews: 284,
    popular: true,
    description: "Aromatic basmati rice, tender chicken and royal spices.",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=700&auto=format&fit=crop&q=85"
  },
  {
    id: 2,
    name: "Royal Paneer Butter Masala",
    category: "Veg",
    price: 249,
    rating: 4.8,
    reviews: 196,
    popular: true,
    description: "Soft paneer cubes in a rich, creamy tomato gravy.",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=700&auto=format&fit=crop&q=85"
  },
  {
    id: 3,
    name: "Margherita Cheese Pizza",
    category: "Veg",
    price: 299,
    rating: 4.7,
    reviews: 158,
    popular: false,
    description: "Stone-baked crust, mozzarella, basil and tomato.",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=700&auto=format&fit=crop&q=85"
  },
  {
    id: 4,
    name: "Tandoori Chicken",
    category: "Non-Veg",
    price: 349,
    rating: 4.9,
    reviews: 211,
    popular: true,
    description: "Smoky, perfectly roasted chicken with Indian spices.",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=700&auto=format&fit=crop&q=85"
  },
  {
    id: 5,
    name: "Garden Fresh Veg Burger",
    category: "Veg",
    price: 179,
    rating: 4.6,
    reviews: 125,
    popular: false,
    description: "Crispy vegetable patty with fresh lettuce and sauce.",
    image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=700&auto=format&fit=crop&q=85"
  },
  {
    id: 6,
    name: "Creamy Alfredo Pasta",
    category: "Veg",
    price: 269,
    rating: 4.8,
    reviews: 173,
    popular: false,
    description: "Italian pasta tossed in silky white cheese sauce.",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=700&auto=format&fit=crop&q=85"
  },
  {
    id: 7,
    name: "Crispy Chicken Burger",
    category: "Non-Veg",
    price: 229,
    rating: 4.7,
    reviews: 143,
    popular: false,
    description: "Golden crispy chicken with fresh vegetables.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&auto=format&fit=crop&q=85"
  },
  {
    id: 8,
    name: "Chocolate Brownie Delight",
    category: "Veg",
    price: 159,
    rating: 4.9,
    reviews: 192,
    popular: true,
    description: "Rich chocolate brownie with an indulgent finish.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=700&auto=format&fit=crop&q=85"
  }
];

function App() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Filter food using useState and JavaScript filter()
  const filteredMenu = menuData.filter((food) => {
    const categoryMatch =
      filter === "All" || food.category === filter;

    const searchMatch = food.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  });

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity, 0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity, 0
  );

  function addToCart(food) {
    setCart((previous) => {
      const existing = previous.find(
        (item) => item.id === food.id
      );

      if (existing) {
        return previous.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previous, { ...food, quantity: 1 }];
    });

    setOrderPlaced(false);
  }

  function changeQuantity(id, amount) {
    setCart((previous) =>
      previous
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function scrollToMenu() {
    document.getElementById("menu")?.scrollIntoView({
      behavior: "smooth"
    });
    setMobileMenu(false);
  }

  function selectCategory(category) {
    setFilter(category);
    scrollToMenu();
  }

  function placeOrder() {
    if (cart.length === 0) return;

    setOrderPlaced(true);
    setCart([]);
    setCartOpen(false);
  }

  return (
    <div className="app">

      {/* TOP STRIP */}
      <div className="top-strip">
        <Sparkles size={14} />
        A TASTE OF SOMETHING EXTRAORDINARY
        <Sparkles size={14} />
      </div>

      {/* HEADER */}
      <header className="header">
        <div className="header-inner">
          <a href="#home" className="brand">
            <span className="brand-icon">
              <UtensilsCrossed size={24} />
            </span>

            <span>
              <strong>
                SAVOUR<span>É</span>
              </strong>
              <small>THE ART OF DINING</small>
            </span>
          </a>

          <nav className={mobileMenu ? "nav open" : "nav"}>
            <a href="#home" onClick={() => setMobileMenu(false)}>
              Home
            </a>
            <a href="#menu" onClick={() => setMobileMenu(false)}>
              Our Menu
            </a>
            <a href="#about" onClick={() => setMobileMenu(false)}>
              Our Story
            </a>
            <a href="#contact" onClick={() => setMobileMenu(false)}>
              Contact
            </a>
          </nav>

          <div className="header-right">
            <button
              className="cart-trigger"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag size={20} />
              <span>My Order</span>
              <b>{cartCount}</b>
            </button>

            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenu(!mobileMenu)}
              aria-label="Toggle navigation"
            >
              {mobileMenu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      <main>

        {/* HERO */}
        <section className="hero" id="home">
          <div className="hero-copy">
            <div className="hero-label">
              <span className="label-dot"></span>
              WELCOME TO SAVOURÉ
            </div>

            <h1>
              Good food.
              <br />
              Great <em>moments.</em>
            </h1>

            <p>
              Experience a thoughtfully crafted menu where
              timeless flavours meet modern culinary artistry.
              Every plate tells a delicious story.
            </p>

            <div className="hero-actions">
              <button
                className="primary-btn"
                onClick={scrollToMenu}
              >
                Explore Our Menu
                <ArrowRight size={19} />
              </button>

              <a className="secondary-btn" href="#about">
                Discover Our Story
                <ArrowUpRight size={18} />
              </a>
            </div>

            <div className="hero-social-proof">
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    fill="currentColor"
                    size={16}
                  />
                ))}
              </div>

              <span>
                <strong>4.9 / 5</strong> — Loved by food enthusiasts
              </span>
            </div>
          </div>

          <div className="hero-image-area">
            <div className="hero-image-frame">
              <img
                src="https://images.unsplash.com/photo-1547592180-85f173990554?w=1100&auto=format&fit=crop&q=90"
                alt="Beautifully plated restaurant cuisine"
              />
            </div>

            <div className="hero-floating-card">
              <div className="floating-icon">
                <ChefHat size={24} />
              </div>

              <div>
                <strong>Chef's Special</strong>
                <span>Made with love, served fresh.</span>
              </div>
            </div>

            <span className="hero-deco">✳</span>
          </div>
        </section>

        {/* FEATURES */}
        <section className="features-bar">
          <div className="feature">
            <ChefHat size={24} />
            <div>
              <strong>Expertly Crafted</strong>
              <span>Made by passionate chefs</span>
            </div>
          </div>

          <div className="feature">
            <Leaf size={24} />
            <div>
              <strong>Fresh Ingredients</strong>
              <span>Quality in every bite</span>
            </div>
          </div>

          <div className="feature">
            <Clock3 size={24} />
            <div>
              <strong>Made Fresh</strong>
              <span>Prepared with care</span>
            </div>
          </div>

          <div className="feature">
            <Heart size={24} />
            <div>
              <strong>Made With Love</strong>
              <span>Food worth sharing</span>
            </div>
          </div>
        </section>

        {/* RESTAURANT MENU */}
        <section className="menu-section" id="menu">
          <div className="section-heading">
            <span className="section-eyebrow">
              ✦ THE SAVOURÉ COLLECTION
            </span>

            <h2>
              Explore our <em>menu.</em>
            </h2>

            <p>
              From comforting classics to signature creations,
              find something you'll absolutely love.
            </p>
          </div>

          {/* FILTER BUTTONS USING useState */}
          <div className="menu-toolbar">
            <div className="filter-buttons">
              {["All", "Veg", "Non-Veg"].map((category) => (
                <button
                  key={category}
                  className={filter === category ? "active" : ""}
                  onClick={() => setFilter(category)}
                >
                  {category === "Veg" && <Leaf size={16} />}
                  {category === "Non-Veg" && <Flame size={16} />}
                  {category === "All" ? "All Dishes" : category}
                </button>
              ))}
            </div>

            <div className="menu-search">
              <Search size={19} />

              <input
                type="text"
                placeholder="Search your favourite dish..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {search && (
                <button onClick={() => setSearch("")}>
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          <div className="menu-results">
            <span>
              Showing <strong>{filteredMenu.length}</strong> delicious dishes
            </span>
            <span>Freshly prepared, always.</span>
          </div>

          {/* ARRAY RENDERING USING map() AND PROPS */}
          <div className="food-grid">
            {filteredMenu.map((food) => (
              <MenuItem
                key={food.id}
                food={food}
                onAdd={addToCart}
              />
            ))}
          </div>

          {filteredMenu.length === 0 && (
            <div className="no-results">
              <Search size={45} />
              <h3>No dishes found</h3>
              <p>Try searching for another delicious dish.</p>

              <button
                onClick={() => {
                  setFilter("All");
                  setSearch("");
                }}
              >
                Show All Dishes
              </button>
            </div>
          )}
        </section>

        {/* ABOUT */}
        <section className="experience-section" id="about">
          <div className="experience-image">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1000&auto=format&fit=crop&q=85"
              alt="Elegant restaurant dining experience"
            />
          </div>

          <div className="experience-copy">
            <span className="section-eyebrow">
              ✦ OUR PHILOSOPHY
            </span>

            <h2>
              More than a meal.
              <br />
              <em>It's an experience.</em>
            </h2>

            <p>
              At Savouré, we believe every meal should be memorable.
              Our carefully curated menu celebrates flavour,
              creativity and the joy of coming together.
            </p>

            <div className="experience-points">
              <span>
                <ShieldCheck size={20} />
                Quality First
              </span>

              <span>
                <ChefHat size={20} />
                Crafted with Care
              </span>

              <span>
                <Truck size={20} />
                Convenient Ordering
              </span>
            </div>

            <button
              className="primary-btn"
              onClick={scrollToMenu}
            >
              Find Your Favourite
              <ArrowRight size={18} />
            </button>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="cta-section">
          <div>
            <span>YOUR NEXT FAVOURITE DISH AWAITS</span>
            <h2>Hungry for something amazing?</h2>
            <p>
              Explore our menu and create your perfect meal.
            </p>
          </div>

          <button onClick={scrollToMenu}>
            Order From Menu
            <ArrowRight size={19} />
          </button>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer" id="contact">
        <div className="footer-main">
          <div className="footer-brand">
            <h2>
              SAVOUR<span>É</span>
            </h2>

            <p>
              An elevated dining experience,
              thoughtfully crafted for every occasion.
            </p>

            <div className="socials">
  <span>Follow Savouré</span>
</div>
          </div>

          <div>
            <h3>Explore</h3>
            <a href="#home">Home</a>
            <a href="#menu">Our Menu</a>
            <a href="#about">Our Story</a>
          </div>

          <div>
            <h3>Our Menu</h3>

            <button onClick={() => selectCategory("All")}>
              All Dishes
            </button>

            <button onClick={() => selectCategory("Veg")}>
              Vegetarian
            </button>

            <button onClick={() => selectCategory("Non-Veg")}>
              Non-Vegetarian
            </button>
          </div>

          <div>
            <h3>Get In Touch</h3>

            <p>
              <MapPin size={17} />
              Andhra Pradesh, India
            </p>

            <p>
              <Phone size={17} />
              Demo Restaurant Application
            </p>

            <p>
              <Clock3 size={17} />
              Explore Anytime
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Savouré. All rights reserved.</span>
          <span>Y25-Btech-LE • React Restaurant Menu Project</span>
        </div>
      </footer>

      {/* CART DRAWER */}
      {cartOpen && (
        <div
          className="cart-overlay"
          onClick={() => setCartOpen(false)}
        >
          <div
            className="cart-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cart-header">
              <div>
                <span>YOUR SELECTION</span>
                <h2>My Order ({cartCount})</h2>
              </div>

              <button onClick={() => setCartOpen(false)}>
                <X size={22} />
              </button>
            </div>

            <div className="cart-body">
              {cart.length === 0 ? (
                <div className="empty-cart">
                  <ShoppingBag size={55} />
                  <h3>Your plate is empty!</h3>
                  <p>Add something delicious from our menu.</p>

                  <button
                    onClick={() => {
                      setCartOpen(false);
                      scrollToMenu();
                    }}
                  >
                    Explore Menu
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <img src={item.image} alt={item.name} />

                    <div className="cart-item-details">
                      <h4>{item.name}</h4>
                      <strong>₹{item.price}</strong>

                      <div className="quantity-control">
                        <button
                          onClick={() => changeQuantity(item.id, -1)}
                        >
                          <Minus size={14} />
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() => changeQuantity(item.id, 1)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    <button
                      className="delete-item"
                      onClick={() =>
                        setCart((previous) =>
                          previous.filter((food) => food.id !== item.id)
                        )
                      }
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="cart-checkout">
                <div>
                  <span>Subtotal</span>
                  <strong>₹{cartTotal}</strong>
                </div>

                <p>
                  Demo order only — no real payment or delivery.
                </p>

                <button onClick={placeOrder}>
                  Confirm Demo Order
                  <ArrowRight size={19} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ORDER SUCCESS MODAL */}
      {orderPlaced && (
        <div className="success-overlay">
          <div className="success-modal">
            <CheckCircle2 size={65} />

            <h2>Order Confirmed!</h2>

            <p>
              Your demo restaurant order has been placed
              successfully. Thank you for choosing Savouré!
            </p>

            <button onClick={() => setOrderPlaced(false)}>
              Continue Exploring
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
