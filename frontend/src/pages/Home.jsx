import { Link } from 'react-router-dom'

export default function Home() {
  return <>
    <section className="hero" id="shop">
      <div className="hero-copy">
        <p className="eyebrow">The good stuff, thoughtfully chosen</p>
        <h1>Better tech.<br />
          <em>Better living.</em>
        </h1>
        <p className="hero-text">Electronics that earn their place in your everyday. Curated for the way you actually live, work, and play.</p>
        <Link className="primary-button" to="/products">Explore the collection <span>↘</span>
        </Link>
      </div>
      <div className="hero-image"><img src="https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=1400&q=90" alt="Headphones and music player on a bright desk" />
        <span className="hero-stamp">Designed for<br /><em>every day</em></span>
      </div>
    </section>
    <section className="promise-row"><div><strong>01</strong><span>Curated with care</span></div>
      <div><strong>02</strong>
        <span>Honest, useful advice</span>
      </div>
      <div><strong>03</strong>
        <span>Less stuff. More joy.</span>
      </div>
    </section>

    <section className="home-categories">
      <div className="section-heading"><div>
        <p className="eyebrow">Find your frequency</p>
        <h2>Shop by mood</h2>
      </div>
        <Link className="text-link" to="/products">View everything <span>↗</span></Link>
      </div>
      <div className="category-grid">
        <Link className="category-tile category-audio" to="/products?category=Audio">
          <span>01 / Audio</span>
          <strong>Sound that<br /><em>stays with you.</em></strong>
          <span className="tile-arrow">↗</span></Link><Link className="category-tile category-computing" to="/products?category=Computing"><span>02 / Computing</span><strong>Make space<br />
            <em>for good work.</em></strong><span className="tile-arrow">↗</span></Link>
        <Link className="category-tile category-wearables" to="/products?category=Wearables"><span>03 / Wearables</span>
          <strong>Keep life<br /><em>within reach.</em></strong><span className="tile-arrow">↗</span>
        </Link></div></section>
    <section className="home-editorial">
      <div className="editorial-image"><img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1100&q=85" alt="Minimal laptop setup on a desk" /></div>
      <div className="editorial-copy">
        <p className="eyebrow">The Volt point of view</p>
        <h2>Buy once.<br /><em>Love longer.</em></h2><p>We look for the details that make technology feel human: useful design, quiet confidence, and enough character to become part of your routine.</p>
        <Link className="text-link" to="/products">Meet the collection <span>↘</span></Link>
      </div>
    </section>
  </>
}
