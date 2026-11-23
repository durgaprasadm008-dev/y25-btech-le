
import { Star, Plus, Leaf, Flame } from "lucide-react";

function MenuItem({ food, onAdd }) {
  const isVeg = food.category === "Veg";

  return (
    <article className="food-card">
      <div className="food-image-wrap">
        <img src={food.image} alt={food.name} loading="lazy" />

        <span className={`food-type ${isVeg ? "veg" : "nonveg"}`}>
          {isVeg ? <Leaf size={13} /> : <Flame size={13} />}
          {food.category}
        </span>

        {food.popular && (
          <span className="popular-tag">BESTSELLER</span>
        )}
      </div>

      <div className="food-content">
        <div className="food-rating">
          <Star size={14} fill="currentColor" />
          {food.rating}
          <span>({food.reviews} reviews)</span>
        </div>

        <h3>{food.name}</h3>
        <p>{food.description}</p>

        <div className="food-bottom">
          <div className="food-price">
            <strong>₹{food.price}</strong>
            <span>Inclusive of taxes</span>
          </div>

          <button
            className="add-food-btn"
            onClick={() => onAdd(food)}
          >
            <Plus size={18} />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}

export default MenuItem;
