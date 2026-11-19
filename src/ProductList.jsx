import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartItems } from './CartSlice.jsx';
import { formatPrice } from './money.js';

const categories = [
  {
    id: 'easy-care',
    name: 'Easy care',
    plants: [
      { id: 'snake-plant', name: 'Snake Plant', price: 1800, description: 'Upright, banded leaves that suit bright corners and can tolerate lower light.' },
      { id: 'golden-pothos', name: 'Golden Pothos', price: 1400, description: 'Trailing vines with heart-shaped leaves splashed in golden yellow.' },
      { id: 'zz-plant', name: 'ZZ Plant', price: 2200, description: 'Glossy green leaflets on upright stems. Water when the mix dries out.' },
      { id: 'spider-plant', name: 'Spider Plant', price: 1600, description: 'Arching, striped leaves and small offshoots that trail over the pot.' },
      { id: 'cast-iron', name: 'Cast Iron Plant', price: 2400, description: 'Deep green, strap-shaped leaves for a spot away from harsh sun.' },
      { id: 'chinese-evergreen', name: 'Chinese Evergreen', price: 2100, description: 'Pointed leaves with silvery patterns that brighten a shelf.' },
    ],
  },
  {
    id: 'statement-plants',
    name: 'Statement plants',
    plants: [
      { id: 'monstera', name: 'Swiss Cheese Monstera', price: 3200, description: 'Large, split leaves that make a focal point in bright indirect light.' },
      { id: 'rubber-plant', name: 'Rubber Plant', price: 2900, description: 'Dark, polished oval leaves on a compact, upright stem.' },
      { id: 'fiddle-leaf', name: 'Fiddle-Leaf Fig', price: 3800, description: 'Broad, fiddle-shaped leaves that do well near a bright window.' },
      { id: 'bird-of-paradise', name: 'Bird of Paradise', price: 4400, description: 'Tall, paddle-shaped leaves for a spacious, sunny room.' },
      { id: 'umbrella-tree', name: 'Dwarf Umbrella Tree', price: 2600, description: 'Clusters of radiating leaflets give this upright plant its shape.' },
      { id: 'areca-palm', name: 'Areca Palm', price: 3600, description: 'Feathery fronds soften a bright corner with room to spread out.' },
    ],
  },
  {
    id: 'foliage-texture',
    name: 'Foliage and texture',
    plants: [
      { id: 'boston-fern', name: 'Boston Fern', price: 1900, description: 'Soft, arching fronds that favor humidity and evenly moist soil.' },
      { id: 'calathea', name: 'Calathea Orbifolia', price: 2800, description: 'Rounded green leaves with soft bands of silver.' },
      { id: 'polka-dot', name: 'Polka Dot Plant', price: 1200, description: 'Small leaves dotted in pink for a splash of color at desk height.' },
      { id: 'nerve-plant', name: 'Pink Nerve Plant', price: 1300, description: 'A compact grower with intricate pink veins on green leaves.' },
      { id: 'pilea', name: 'Chinese Money Plant', price: 2000, description: 'Coin-shaped leaves on slender stems that reach toward the light.' },
      { id: 'peperomia', name: 'Baby Rubber Plant', price: 1700, description: 'Rounded, fleshy leaves on a small plant well suited to a windowsill.' },
    ],
  },
];

function plantImage(id) {
  return `${import.meta.env.BASE_URL}plants/${id}.webp`;
}

export function ShopNav({ page }) {
  const itemCount = useSelector((state) => selectCartItems(state)
    .reduce((total, item) => total + item.quantity, 0));

  return (
    <header className="shop-header">
      <div className="shell shop-header-inner">
        <a className="wordmark" href="#home">
          <span className="leaf-mark" aria-hidden="true" />
          Paradise Nursery
        </a>
        <nav aria-label="Shop navigation">
          <a href="#home">Home</a>
          <a href="#plants" aria-current={page === 'plants' ? 'page' : undefined}>Plants</a>
          <a className="cart-link" href="#cart" aria-current={page === 'cart' ? 'page' : undefined}>
            <span className="cart-icon" aria-hidden="true" />
            Cart <span className="cart-count" aria-live="polite">{itemCount}</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

export default function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const addedIds = new Set(cartItems.map((item) => item.id));

  return (
    <>
      <ShopNav page="plants" />
      <main className="shell catalog">
        <div className="shop-intro">
          <h1>Houseplants</h1>
          <nav className="category-links" aria-label="Plant categories">
            {categories.map(({ id, name }) => (
              <button key={id} type="button" onClick={() => {
                document.getElementById(id)?.scrollIntoView({ block: 'start' });
              }}>{name}</button>
            ))}
          </nav>
        </div>
        {categories.map(({ id, name, plants }) => (
          <section className="category" id={id} key={id} aria-labelledby={`${id}-heading`}>
            <div className="category-heading">
              <h2 id={`${id}-heading`}>{name}</h2>
              <span>{plants.length} plants</span>
            </div>
            <div className="plant-grid">
              {plants.map((plant) => {
                const added = addedIds.has(plant.id);
                const image = plantImage(plant.id);
                return (
                  <article className="plant-card" key={plant.id}>
                    <img src={image} alt={plant.name} width="254" height="339" loading="lazy" />
                    <div className="plant-content">
                      <h3>{plant.name}</h3>
                      <p>{plant.description}</p>
                      <div className="plant-bottom">
                        <strong>{formatPrice(plant.price)}</strong>
                        <button
                          className="button button-small"
                          disabled={added}
                          onClick={() => dispatch(addItem({ ...plant, image }))}
                        >{added ? 'Added to Cart' : 'Add to Cart'}</button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </>
  );
}
