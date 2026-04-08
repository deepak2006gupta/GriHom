import React, { useState } from 'react';
import './DecorPage.css';

const rooms = [
  { id: 'living', label: 'Living Room', icon: '🛋️' },
  { id: 'bedroom', label: 'Bedroom', icon: '🛏️' },
  { id: 'kitchen', label: 'Kitchen', icon: '🍳' },
  { id: 'bathroom', label: 'Bathroom', icon: '🚿' },
  { id: 'dining', label: 'Dining Room', icon: '🍽️' },
  { id: 'study', label: 'Study / Home Office', icon: '📚' },
  { id: 'balcony', label: 'Balcony / Terrace', icon: '🌿' },
  { id: 'entrance', label: 'Entrance / Foyer', icon: '🚪' },
];

const amz = (q) => `https://www.amazon.in/s?k=${encodeURIComponent(q)}`;
const fk  = (q) => `https://www.flipkart.com/search?q=${encodeURIComponent(q)}`;
const pf  = (q) => `https://www.pepperfry.com/search?q=${encodeURIComponent(q)}`;
const im  = (q) => `https://www.indiamart.com/search.mp?ss=${encodeURIComponent(q)}`;

const decorData = {
  living: {
    theme: 'Elegant & Inviting',
    palette: ['#c9a96e', '#f0ebe3', '#5a4a42', '#2d4a3e'],
    paletteNames: ['Warm Gold', 'Ivory Cream', 'Deep Walnut', 'Forest Green'],
    materials: [
      {
        icon: '🪵', name: 'Herringbone Hardwood Flooring', category: 'Flooring',
        description: 'Oak or teak herringbone floors add timeless sophistication. Opt for wide planks in warm honey or grey-washed tones.',
        fancyFactor: 5, budgetRange: '₹800–₹1,500/sq ft',
        tips: 'Pair with a plush area rug to define seating zones and add warmth.',
        links: [
          { site: 'Amazon', url: amz('herringbone hardwood wooden flooring'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('herringbone wooden floor tiles'), color: '#2874F0' },
          { site: 'IndiaMart', url: im('herringbone engineered wood flooring'), color: '#E0112B' },
        ],
      },
      {
        icon: '🪨', name: 'Marble Feature Wall', category: 'Wall Treatment',
        description: 'Calacatta or Carrara marble panels behind the TV or sofa create a luxury focal point without overwhelming the space.',
        fancyFactor: 5, budgetRange: '₹1,200–₹3,000/sq ft',
        tips: 'Use book-matched slabs for a mirror-image pattern that looks ultra-premium.',
        links: [
          { site: 'Amazon', url: amz('marble wall tiles living room'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('marble wall tiles'), color: '#2874F0' },
          { site: 'IndiaMart', url: im('calacatta marble wall panels'), color: '#E0112B' },
        ],
      },
      {
        icon: '🎨', name: 'Textured Venetian Plaster', category: 'Wall Finish',
        description: 'Polished limewash or Venetian plaster walls give depth and an old-world luxe feel. Works in beige, greige, or dusty rose.',
        fancyFactor: 4, budgetRange: '₹250–₹500/sq ft',
        tips: 'Accent just one wall to keep the effect dramatic but balanced.',
        links: [
          { site: 'Amazon', url: amz('venetian plaster wall texture paint'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('texture paint venetian plaster'), color: '#2874F0' },
          { site: 'IndiaMart', url: im('venetian plaster texture coating'), color: '#E0112B' },
        ],
      },
      {
        icon: '🪟', name: 'Velvet & Linen Drapes', category: 'Soft Furnishings',
        description: 'Floor-to-ceiling velvet drapes in jewel tones (emerald, sapphire, burgundy) instantly elevate any living room.',
        fancyFactor: 4, budgetRange: '₹3,000–₹12,000 per panel',
        tips: 'Mount rods 15cm above the window frame to make ceilings appear taller.',
        links: [
          { site: 'Amazon', url: amz('velvet curtains living room floor ceiling'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('velvet blackout curtains'), color: '#2874F0' },
          { site: 'Pepperfry', url: pf('velvet drapes curtains'), color: '#F15A22' },
        ],
      },
      {
        icon: '💡', name: 'Sculptural Pendant Lighting', category: 'Lighting',
        description: 'Statement chandeliers or rattan/brass pendants over the seating area create instant visual drama.',
        fancyFactor: 5, budgetRange: '₹8,000–₹80,000',
        tips: 'Layer with floor lamps and wall sconces for warm ambient glow in the evenings.',
        links: [
          { site: 'Amazon', url: amz('brass pendant chandelier living room'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('decorative chandelier pendant light'), color: '#2874F0' },
          { site: 'Pepperfry', url: pf('statement pendant chandelier'), color: '#F15A22' },
        ],
      },
      {
        icon: '🏺', name: 'Travertine & Brass Accents', category: 'Décor Accessories',
        description: 'Travertine side tables, brass vases, and stone bookends add earthy luxury without going overboard.',
        fancyFactor: 4, budgetRange: '₹2,000–₹25,000',
        tips: 'Mix metals thoughtfully — stick to 1–2 finish types (e.g., brass + matte black).',
        links: [
          { site: 'Amazon', url: amz('brass vase travertine home decor accessories'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('brass decorative vase home accents'), color: '#2874F0' },
          { site: 'Pepperfry', url: pf('travertine decor accessories'), color: '#F15A22' },
        ],
      },
    ],
  },
  bedroom: {
    theme: 'Serene & Plush',
    palette: ['#d4c5b0', '#8b9ea8', '#3d2b2b', '#f5f0ea'],
    paletteNames: ['Warm Sand', 'Steel Blue', 'Espresso', 'Off-White'],
    materials: [
      {
        icon: '🛏️', name: 'Upholstered Headboard Wall Panel', category: 'Feature Wall',
        description: 'A full wall of channel-tufted velvet or bouclé fabric behind the bed creates a hotel-suite aesthetic.',
        fancyFactor: 5, budgetRange: '₹15,000–₹60,000',
        tips: 'Choose dusty rose, sage, or warm taupe for a calming, luxurious tone.',
        links: [
          { site: 'Amazon', url: amz('upholstered headboard wall panel velvet'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('upholstered headboard bed'), color: '#2874F0' },
          { site: 'Pepperfry', url: pf('tufted headboard wall panel bedroom'), color: '#F15A22' },
        ],
      },
      {
        icon: '🪵', name: 'Engineered Oak Flooring', category: 'Flooring',
        description: 'Warm-toned wide-plank engineered wood is durable, budget-friendlier than solid wood, and looks stunning in bedrooms.',
        fancyFactor: 4, budgetRange: '₹500–₹1,100/sq ft',
        tips: 'Add a sheepskin or wool rug beside the bed for a luxe morning feel.',
        links: [
          { site: 'Amazon', url: amz('engineered wood flooring bedroom'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('engineered wood laminate flooring'), color: '#2874F0' },
          { site: 'IndiaMart', url: im('engineered oak wood flooring India'), color: '#E0112B' },
        ],
      },
      {
        icon: '🎭', name: 'Grasscloth or Fabric Wallpaper', category: 'Wall Covering',
        description: 'Textured grasscloth wallpaper or hand-painted silk designs on a feature wall adds instant cosy opulence.',
        fancyFactor: 4, budgetRange: '₹150–₹800/sq ft',
        tips: 'Apply only to the headboard wall for a bold yet balanced effect.',
        links: [
          { site: 'Amazon', url: amz('grasscloth textured wallpaper bedroom'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('fabric texture wallpaper roll'), color: '#2874F0' },
          { site: 'IndiaMart', url: im('fabric wallpaper bedroom India'), color: '#E0112B' },
        ],
      },
      {
        icon: '💡', name: 'Cove & Recessed LED Lighting', category: 'Lighting',
        description: 'Indirect cove lighting around ceiling perimeters combined with warm-white recessed lights creates a spa-like mood.',
        fancyFactor: 5, budgetRange: '₹12,000–₹40,000',
        tips: 'Add dimmer switches — the ability to control light intensity is the true luxury.',
        links: [
          { site: 'Amazon', url: amz('cove LED strip ceiling light bedroom'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('LED strip light cove lighting warm white'), color: '#2874F0' },
          { site: 'IndiaMart', url: im('recessed LED ceiling light bedroom'), color: '#E0112B' },
        ],
      },
      {
        icon: '🪞', name: 'Antique or Arch Mirror', category: 'Décor',
        description: 'A large arched full-length mirror in aged gold or matte black frame doubles as art and makes the room feel larger.',
        fancyFactor: 4, budgetRange: '₹5,000–₹35,000',
        tips: 'Place opposite a window to bounce natural light and brighten the room.',
        links: [
          { site: 'Amazon', url: amz('arch full length mirror gold frame bedroom'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('arched full length standing mirror'), color: '#2874F0' },
          { site: 'Pepperfry', url: pf('arch mirror gold frame'), color: '#F15A22' },
        ],
      },
      {
        icon: '🧵', name: 'Layered Bedding with Throw Pillows', category: 'Soft Furnishings',
        description: 'Egyptian cotton sheets (600+ thread count), a weighted duvet, and decorative euro pillows create a 5-star look.',
        fancyFactor: 4, budgetRange: '₹8,000–₹40,000',
        tips: 'Odd numbers of pillows look more curated — try 5 or 7 in varying sizes.',
        links: [
          { site: 'Amazon', url: amz('Egyptian cotton bed sheet 600 thread count'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('luxury bedding set duvet pillow covers'), color: '#2874F0' },
          { site: 'Pepperfry', url: pf('luxury bedding set throw pillows'), color: '#F15A22' },
        ],
      },
    ],
  },
  kitchen: {
    theme: 'Sleek & Functional Luxury',
    palette: ['#2c2c2c', '#e8dcc8', '#4a6741', '#c0c0c0'],
    paletteNames: ['Charcoal', 'Linen', 'Sage Green', 'Brushed Silver'],
    materials: [
      {
        icon: '🪨', name: 'Quartzite or Quartz Countertops', category: 'Countertop',
        description: 'Quartzite slabs with dramatic veining or pure quartz in waterfall edge configuration are the ultimate kitchen upgrade.',
        fancyFactor: 5, budgetRange: '₹1,000–₹3,500/sq ft',
        tips: 'A waterfall edge (where the slab runs down the sides of the island) adds instant wow-factor.',
        links: [
          { site: 'Amazon', url: amz('quartz kitchen countertop slab India'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('kitchen countertop quartz stone'), color: '#2874F0' },
          { site: 'IndiaMart', url: im('quartz stone countertop kitchen India'), color: '#E0112B' },
        ],
      },
      {
        icon: '🧱', name: 'Zellige or Handmade Ceramic Tiles', category: 'Backsplash',
        description: 'Moroccan zellige tiles or handcrafted ceramic subway tiles with irregular glazes make backsplashes truly artisanal.',
        fancyFactor: 5, budgetRange: '₹200–₹1,200/tile',
        tips: 'Extend the backsplash all the way to the ceiling for a dramatic, gallery-like effect.',
        links: [
          { site: 'Amazon', url: amz('handmade ceramic kitchen backsplash tiles'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('moroccan subway kitchen tile backsplash'), color: '#2874F0' },
          { site: 'IndiaMart', url: im('zellige ceramic mosaic kitchen tiles'), color: '#E0112B' },
        ],
      },
      {
        icon: '🚪', name: 'Shaker or Slab Cabinet Fronts', category: 'Cabinetry',
        description: 'Deep navy, forest green, or matte black shaker cabinets paired with brushed gold hardware look incredibly luxurious.',
        fancyFactor: 5, budgetRange: '₹1,500–₹4,000/linear ft',
        tips: 'Mix upper open shelving with closed lower cabinets for a curated restaurant-kitchen look.',
        links: [
          { site: 'Amazon', url: amz('modular kitchen cabinet shaker front India'), color: '#FF9900' },
          { site: 'IndiaMart', url: im('shaker kitchen cabinet modular India'), color: '#E0112B' },
          { site: 'Pepperfry', url: pf('kitchen cabinet modular'), color: '#F15A22' },
        ],
      },
      {
        icon: '💡', name: 'Under-Cabinet LED Strip Lighting', category: 'Lighting',
        description: 'Warm-white LED strips under upper cabinets illuminate work surfaces beautifully and create a premium ambience.',
        fancyFactor: 4, budgetRange: '₹200–₹600/meter',
        tips: 'Add a statement pendant above the island — rattan or antique brass works beautifully.',
        links: [
          { site: 'Amazon', url: amz('under cabinet LED strip light kitchen warm white'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('under cabinet LED strip light kitchen'), color: '#2874F0' },
          { site: 'IndiaMart', url: im('LED strip under cabinet kitchen lighting'), color: '#E0112B' },
        ],
      },
      {
        icon: '🪵', name: 'Chevron or Herringbone Kitchen Floor', category: 'Flooring',
        description: 'Large-format chevron porcelain tiles (60×60 or 80×80 cm) in concrete or stone-look finishes are chef-worthy.',
        fancyFactor: 4, budgetRange: '₹120–₹400/sq ft',
        tips: 'Rectified tiles with minimal grout lines look the most premium and modern.',
        links: [
          { site: 'Amazon', url: amz('herringbone porcelain floor tiles kitchen'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('large format porcelain kitchen floor tile'), color: '#2874F0' },
          { site: 'IndiaMart', url: im('chevron porcelain floor tile kitchen India'), color: '#E0112B' },
        ],
      },
      {
        icon: '🔧', name: 'Brass or Gunmetal Fixtures', category: 'Hardware & Fixtures',
        description: 'Unlacquered brass taps, pot fillers, and cabinet pulls develop a rich patina over time — unique and luxurious.',
        fancyFactor: 4, budgetRange: '₹3,000–₹20,000 per fixture',
        tips: 'Mix metals intentionally: brushed brass + matte black is a winning combination.',
        links: [
          { site: 'Amazon', url: amz('brass kitchen faucet tap mixer gold'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('brass kitchen tap faucet'), color: '#2874F0' },
          { site: 'IndiaMart', url: im('brass kitchen faucet mixer India'), color: '#E0112B' },
        ],
      },
    ],
  },
  bathroom: {
    theme: 'Spa-Inspired Retreat',
    palette: ['#e8dfd0', '#5c7a6b', '#1a1a2e', '#b09a82'],
    paletteNames: ['Warm Stone', 'Sage', 'Deep Navy', 'Bronze Tan'],
    materials: [
      {
        icon: '🪨', name: 'Book-Matched Stone Wall Cladding', category: 'Wall Material',
        description: 'Veined marble or travertine slabs that mirror each other on opposite walls create an architectural showpiece.',
        fancyFactor: 5, budgetRange: '₹1,500–₹4,000/sq ft',
        tips: "Use honed (matte) finish — it's more slip-resistant and looks more modern than polished.",
        links: [
          { site: 'Amazon', url: amz('marble bathroom wall tiles travertine'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('marble bathroom wall cladding tiles'), color: '#2874F0' },
          { site: 'IndiaMart', url: im('travertine marble bathroom wall cladding India'), color: '#E0112B' },
        ],
      },
      {
        icon: '🚿', name: 'Rainwater Shower System', category: 'Fixtures',
        description: 'A ceiling-flush rainwater head combined with body jets transforms showering into a daily spa ritual.',
        fancyFactor: 5, budgetRange: '₹25,000–₹1,50,000',
        tips: 'A separate handheld head is practical — pair with a thermostatic mixer for precision temperature control.',
        links: [
          { site: 'Amazon', url: amz('rain shower head ceiling mount stainless steel'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('rain shower system ceiling bathroom'), color: '#2874F0' },
          { site: 'IndiaMart', url: im('rain shower system bathroom India'), color: '#E0112B' },
        ],
      },
      {
        icon: '🪵', name: 'Teak or Bamboo Slatted Accents', category: 'Accent Material',
        description: 'Teak bath mats, slat wall panels, and bamboo shelving bring warmth into an otherwise cool, stone bathroom.',
        fancyFactor: 4, budgetRange: '₹3,000–₹18,000',
        tips: 'Teak is naturally water-resistant — ideal for wet zones without sealing.',
        links: [
          { site: 'Amazon', url: amz('teak wood bath mat bathroom spa'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('bamboo teak bathroom accessories'), color: '#2874F0' },
          { site: 'Pepperfry', url: pf('teak bathroom accessories'), color: '#F15A22' },
        ],
      },
      {
        icon: '💡', name: 'Backlit Mirror or LED Vanity Mirror', category: 'Lighting & Mirror',
        description: 'LED-edged mirrors with anti-fog and dimming features are both functional and strikingly beautiful.',
        fancyFactor: 5, budgetRange: '₹8,000–₹50,000',
        tips: 'Add wall sconces at eye level on either side of the mirror for shadow-free grooming light.',
        links: [
          { site: 'Amazon', url: amz('LED backlit bathroom mirror anti fog dimmer'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('LED vanity mirror bathroom backlit'), color: '#2874F0' },
          { site: 'Pepperfry', url: pf('LED bathroom mirror'), color: '#F15A22' },
        ],
      },
      {
        icon: '🏺', name: 'Freestanding Soaking Bathtub', category: 'Feature Piece',
        description: 'A sculptural freestanding tub in matte white, stone resin, or copper is the single most impactful bathroom upgrade.',
        fancyFactor: 5, budgetRange: '₹40,000–₹3,00,000',
        tips: 'Position the tub near a window or facing the shower — visual symmetry matters.',
        links: [
          { site: 'Amazon', url: amz('freestanding bathtub acrylic soaking India'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('freestanding bathtub bathroom'), color: '#2874F0' },
          { site: 'IndiaMart', url: im('freestanding bathtub India'), color: '#E0112B' },
        ],
      },
      {
        icon: '🧱', name: 'Terrazzo or Penny Tile Flooring', category: 'Flooring',
        description: 'Terrazzo with brass or gold aggregate chips, or tiny penny tiles in mosaic patterns add artisanal charm to floors.',
        fancyFactor: 4, budgetRange: '₹300–₹900/sq ft',
        tips: 'Use heated floor coils (electric underfloor heating) beneath — the ultimate comfort luxury.',
        links: [
          { site: 'Amazon', url: amz('terrazzo floor tile bathroom mosaic'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('penny mosaic tile bathroom floor'), color: '#2874F0' },
          { site: 'IndiaMart', url: im('terrazzo mosaic bathroom tile India'), color: '#E0112B' },
        ],
      },
    ],
  },
  dining: {
    theme: 'Dramatic & Convivial',
    palette: ['#722f37', '#d4a853', '#2c2416', '#f2ece4'],
    paletteNames: ['Deep Wine', 'Antique Gold', 'Dark Oak', 'Cream'],
    materials: [
      {
        icon: '💡', name: 'Dramatic Chandelier or Linear Pendant', category: 'Lighting',
        description: "A grand chandelier or a row of 3 linear pendants directly above the dining table is the dining room's crown jewel.",
        fancyFactor: 5, budgetRange: '₹12,000–₹2,00,000',
        tips: 'Hang the pendant 70–90 cm above the table surface for ideal task and ambient lighting.',
        links: [
          { site: 'Amazon', url: amz('dining room chandelier pendant light'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('chandelier dining room pendant light'), color: '#2874F0' },
          { site: 'Pepperfry', url: pf('dining room chandelier'), color: '#F15A22' },
        ],
      },
      {
        icon: '🪵', name: 'Live-Edge or Solid Wood Dining Table', category: 'Furniture',
        description: 'A single-slab live-edge walnut or acacia table is a conversation piece and heirloom rolled into one.',
        fancyFactor: 5, budgetRange: '₹50,000–₹4,00,000',
        tips: 'Pair with mismatched upholstered chairs for an eclectic, high-end look.',
        links: [
          { site: 'Amazon', url: amz('live edge solid wood dining table'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('solid wood dining table 6 seater'), color: '#2874F0' },
          { site: 'Pepperfry', url: pf('solid wood dining table'), color: '#F15A22' },
        ],
      },
      {
        icon: '🎨', name: 'Moody Wallpaper or Colour Drenching', category: 'Wall Treatment',
        description: "Deep inky wallpaper (dark florals, abstract art) or colour-drenching creates drama.",
        fancyFactor: 4, budgetRange: '₹150–₹1,000/sq ft',
        tips: "Dark dining rooms feel intimate and luxurious — don't be afraid of bold colour.",
        links: [
          { site: 'Amazon', url: amz('dark floral wallpaper dining room moody'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('dark botanical wallpaper roll'), color: '#2874F0' },
          { site: 'IndiaMart', url: im('luxury wallpaper dining room dark floral India'), color: '#E0112B' },
        ],
      },
      {
        icon: '🪞', name: 'Oversized Ornate Mirror or Gallery Wall', category: 'Wall Décor',
        description: 'A large antique mirror or curated gallery wall with matching frames elevates the dining room beyond furniture.',
        fancyFactor: 4, budgetRange: '₹8,000–₹60,000',
        tips: 'Mirrors also reflect candlelight beautifully at dinner, doubling the ambiance.',
        links: [
          { site: 'Amazon', url: amz('large ornate wall mirror antique gold dining room'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('large decorative wall mirror dining'), color: '#2874F0' },
          { site: 'Pepperfry', url: pf('large wall mirror ornate'), color: '#F15A22' },
        ],
      },
      {
        icon: '🧱', name: 'Wainscoting or Panelled Walls', category: 'Architectural Detail',
        description: 'Classic wainscoting (wooden panelling on lower walls) or modern fluted panelling add architectural interest and a formal feel.',
        fancyFactor: 4, budgetRange: '₹400–₹900/sq ft',
        tips: 'Paint panelling in a contrasting tone to the upper wall for a sophisticated, layered look.',
        links: [
          { site: 'Amazon', url: amz('wainscoting wall panel mdf wood'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('wall panelling wainscoting MDF'), color: '#2874F0' },
          { site: 'IndiaMart', url: im('wainscoting wall panel MDF India'), color: '#E0112B' },
        ],
      },
      {
        icon: '🌿', name: 'Sideboard with Statement Styling', category: 'Storage & Display',
        description: 'A solid wood or lacquer sideboard styled with sculptural vases, art books, and decanters creates purposeful luxury.',
        fancyFactor: 4, budgetRange: '₹20,000–₹1,20,000',
        tips: 'Use the rule of odd numbers in décor groupings — trios always look more curated.',
        links: [
          { site: 'Amazon', url: amz('sideboard buffet table solid wood dining'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('sideboard buffet cabinet dining room'), color: '#2874F0' },
          { site: 'Pepperfry', url: pf('sideboard dining room storage'), color: '#F15A22' },
        ],
      },
    ],
  },
  study: {
    theme: 'Focused & Sophisticated',
    palette: ['#2c3e50', '#c9a84c', '#f5f0e8', '#3d5a4c'],
    paletteNames: ['Midnight Blue', 'Antique Brass', 'Warm White', 'Hunter Green'],
    materials: [
      {
        icon: '📚', name: 'Floor-to-Ceiling Built-in Bookshelves', category: 'Feature Element',
        description: 'Custom walnut or lacquer built-ins with integrated ladder instantly create a private-library aesthetic.',
        fancyFactor: 5, budgetRange: '₹30,000–₹2,00,000',
        tips: 'Style shelves with a mix of books, objects, and plants — not just books — for depth.',
        links: [
          { site: 'Amazon', url: amz('tall bookshelf floor to ceiling bookcase wood'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('tall bookcase floor to ceiling'), color: '#2874F0' },
          { site: 'Pepperfry', url: pf('tall bookshelf study'), color: '#F15A22' },
        ],
      },
      {
        icon: '🪵', name: 'Solid Wood Executive Desk', category: 'Furniture',
        description: 'A thick-slabbed walnut or mahogany desk with leather inlay or a marble top commands authority and elegance.',
        fancyFactor: 5, budgetRange: '₹25,000–₹2,50,000',
        tips: 'Add a leather desk pad and brass stationery set for a complete executive look.',
        links: [
          { site: 'Amazon', url: amz('solid wood executive office desk large'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('solid wood executive study desk'), color: '#2874F0' },
          { site: 'Pepperfry', url: pf('executive wooden study desk'), color: '#F15A22' },
        ],
      },
      {
        icon: '🎨', name: 'Wainscoting with Dark Paint Above', category: 'Wall Treatment',
        description: 'Classic wall panelling below and a deep colour (Oxford navy, racing green, or charcoal) above gives the room a club-like gravitas.',
        fancyFactor: 4, budgetRange: '₹400–₹800/sq ft',
        tips: 'Add crown moulding at the ceiling for extra architectural refinement.',
        links: [
          { site: 'Amazon', url: amz('wall panelling MDF wainscoting study room'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('MDF wall panel study room'), color: '#2874F0' },
          { site: 'IndiaMart', url: im('wainscoting MDF panel home office India'), color: '#E0112B' },
        ],
      },
      {
        icon: '💡', name: "Banker's Lamp or Arched Task Light", category: 'Lighting',
        description: "A classic brass banker's lamp or an articulated arched floor lamp in matte black is functional and stylishly iconic.",
        fancyFactor: 4, budgetRange: '₹4,000–₹30,000',
        tips: 'Layer with recessed ceiling lights and under-shelf LEDs to prevent eye strain.',
        links: [
          { site: 'Amazon', url: amz("banker lamp brass green study desk"), color: '#FF9900' },
          { site: 'Flipkart', url: fk('arched floor lamp study desk lamp'), color: '#2874F0' },
          { site: 'Pepperfry', url: pf('desk lamp study room'), color: '#F15A22' },
        ],
      },
      {
        icon: '🪨', name: 'Cork or Felt Acoustic Wall Panels', category: 'Acoustic Treatment',
        description: 'Designer acoustic panels in rich fabric or leatherette improve focus and sound quality while looking intentional.',
        fancyFactor: 3, budgetRange: '₹500–₹2,000/sq ft',
        tips: 'Frame panels with thin brass or wood borders to turn them into wall art.',
        links: [
          { site: 'Amazon', url: amz('acoustic wall panel fabric sound absorbing home office'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('acoustic foam panel wall sound absorption'), color: '#2874F0' },
          { site: 'IndiaMart', url: im('felt acoustic panel home office India'), color: '#E0112B' },
        ],
      },
      {
        icon: '🧵', name: 'Persian or Overdyed Rug', category: 'Flooring Accent',
        description: 'A large geometric or floral rug in jewel tones grounds the seating area and adds warmth to a hardwood or tile floor.',
        fancyFactor: 4, budgetRange: '₹8,000–₹1,20,000',
        tips: 'All legs of the desk chair and any guest chair should sit on the rug for visual unity.',
        links: [
          { site: 'Amazon', url: amz('persian overdyed area rug study room large'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('persian style area rug large'), color: '#2874F0' },
          { site: 'Pepperfry', url: pf('persian rug large area'), color: '#F15A22' },
        ],
      },
    ],
  },
  balcony: {
    theme: 'Lush Outdoor Oasis',
    palette: ['#4a7c59', '#c8a96e', '#2c3e2d', '#f0e6d3'],
    paletteNames: ['Forest Green', 'Warm Terracotta', 'Deep Moss', 'Natural Linen'],
    materials: [
      {
        icon: '🌿', name: 'Vertical Garden Wall', category: 'Green Element',
        description: 'A modular living wall system with ferns, money plants, and pothos transforms a blank wall into a lush green backdrop.',
        fancyFactor: 5, budgetRange: '₹8,000–₹60,000',
        tips: 'Choose low-maintenance plants like pothos, ferns, and succulents for Indian climates.',
        links: [
          { site: 'Amazon', url: amz('vertical garden wall planter balcony indoor'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('vertical garden wall planter kit'), color: '#2874F0' },
          { site: 'IndiaMart', url: im('vertical garden wall planter India'), color: '#E0112B' },
        ],
      },
      {
        icon: '🪵', name: 'Teak Deck Flooring', category: 'Flooring',
        description: 'Snap-together teak decking tiles over an existing slab create an instant rooftop-lounge feel without renovation.',
        fancyFactor: 5, budgetRange: '₹400–₹1,200/sq ft',
        tips: 'Oil teak once a year to maintain its golden colour and weather resistance.',
        links: [
          { site: 'Amazon', url: amz('teak wood deck tiles balcony outdoor'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('teak wood deck tiles outdoor balcony'), color: '#2874F0' },
          { site: 'IndiaMart', url: im('teak decking tiles balcony India'), color: '#E0112B' },
        ],
      },
      {
        icon: '💡', name: 'String Lights & Lanterns', category: 'Lighting',
        description: 'Edison bulb string lights draped overhead combined with floor lanterns create magical evening ambience.',
        fancyFactor: 4, budgetRange: '₹500–₹5,000',
        tips: 'Choose IP65-rated outdoor-rated string lights for monsoon durability.',
        links: [
          { site: 'Amazon', url: amz('outdoor string lights Edison bulb waterproof balcony'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('string fairy lights outdoor balcony Edison'), color: '#2874F0' },
          { site: 'Pepperfry', url: pf('string lights outdoor balcony'), color: '#F15A22' },
        ],
      },
      {
        icon: '🧵', name: 'Outdoor Wicker or Rope Furniture', category: 'Seating',
        description: 'All-weather wicker lounge chairs with UV-resistant cushions in neutral or bold outdoor fabrics look resort-worthy.',
        fancyFactor: 4, budgetRange: '₹12,000–₹80,000 per set',
        tips: 'Layer with outdoor throw pillows and a jute or flat-weave rug to make it feel like an indoor room.',
        links: [
          { site: 'Amazon', url: amz('outdoor wicker rattan balcony furniture set'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('rattan wicker outdoor balcony chair set'), color: '#2874F0' },
          { site: 'Pepperfry', url: pf('outdoor balcony furniture set wicker'), color: '#F15A22' },
        ],
      },
      {
        icon: '🏺', name: 'Terracotta & Ceramic Planters', category: 'Décor',
        description: 'Clusters of varying-height terracotta pots, tall ceramic urns, and hanging planters add height and visual interest.',
        fancyFactor: 3, budgetRange: '₹300–₹5,000 per piece',
        tips: 'Group planters in odd numbers and vary heights dramatically — this looks most curated.',
        links: [
          { site: 'Amazon', url: amz('terracotta ceramic planter pot large balcony'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('terracotta planter ceramic pot balcony'), color: '#2874F0' },
          { site: 'Pepperfry', url: pf('ceramic terracotta planter'), color: '#F15A22' },
        ],
      },
      {
        icon: '⛱️', name: 'Cantilever Parasol or Shade Sail', category: 'Shade Structure',
        description: 'A large cantilever umbrella or triangular shade sail in UV-resistant canvas makes the balcony usable in all seasons.',
        fancyFactor: 4, budgetRange: '₹8,000–₹45,000',
        tips: 'Opt for earthy neutrals (sand, taupe, sage) rather than bright colours for a luxury resort feel.',
        links: [
          { site: 'Amazon', url: amz('cantilever parasol umbrella outdoor garden'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('outdoor cantilever umbrella balcony shade'), color: '#2874F0' },
          { site: 'IndiaMart', url: im('shade sail balcony outdoor India'), color: '#E0112B' },
        ],
      },
    ],
  },
  entrance: {
    theme: 'Grand First Impressions',
    palette: ['#1a1a2e', '#c9a84c', '#f5f0e8', '#8b4513'],
    paletteNames: ['Deep Indigo', 'Gold Leaf', 'Ivory', 'Saddle Brown'],
    materials: [
      {
        icon: '🪨', name: 'Large-Format Stone Tile Flooring', category: 'Flooring',
        description: 'Oversized 120×60 cm tiles in marble, limestone, or premium porcelain create a grand entrance regardless of size.',
        fancyFactor: 5, budgetRange: '₹300–₹1,500/sq ft',
        tips: 'Lay large tiles in a running bond or herringbone pattern with minimal grout lines.',
        links: [
          { site: 'Amazon', url: amz('large format marble porcelain floor tile entrance'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('large marble floor tile entrance foyer'), color: '#2874F0' },
          { site: 'IndiaMart', url: im('large format vitrified floor tile foyer India'), color: '#E0112B' },
        ],
      },
      {
        icon: '💡', name: 'Statement Entry Pendant or Chandelier', category: 'Lighting',
        description: 'A sculptural pendant — cage, crystal, or woven — hung low in the entry makes an immediate stylistic declaration.',
        fancyFactor: 5, budgetRange: '₹6,000–₹1,00,000',
        tips: 'The foyer light is seen more than any other — invest here first.',
        links: [
          { site: 'Amazon', url: amz('foyer pendant chandelier entrance hall light'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('entrance foyer chandelier pendant light'), color: '#2874F0' },
          { site: 'Pepperfry', url: pf('foyer chandelier entrance light'), color: '#F15A22' },
        ],
      },
      {
        icon: '🪞', name: 'Statement Mirror with Console Table', category: 'Furniture & Mirror',
        description: 'A large arched or sunburst mirror above a narrow console table with fresh flowers is a classic luxury entry formula.',
        fancyFactor: 5, budgetRange: '₹12,000–₹80,000',
        tips: 'Keep the console surface minimal — a tray, single vase, and perhaps a sculptural piece is enough.',
        links: [
          { site: 'Amazon', url: amz('console table with mirror entryway narrow'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('console table entrance hall mirror'), color: '#2874F0' },
          { site: 'Pepperfry', url: pf('console table entrance foyer'), color: '#F15A22' },
        ],
      },
      {
        icon: '🎨', name: 'Bold Wallpaper or Wall Mural', category: 'Wall Treatment',
        description: 'A maximalist botanical, geometric, or hand-painted mural in the entryway sets the tone for the entire home.',
        fancyFactor: 4, budgetRange: '₹200–₹2,000/sq ft',
        tips: "Since the entry is small, you can afford to go bold — this is the place to be daring.",
        links: [
          { site: 'Amazon', url: amz('botanical wall mural wallpaper entryway foyer'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('wall mural wallpaper entrance hall'), color: '#2874F0' },
          { site: 'IndiaMart', url: im('custom wall mural wallpaper India foyer'), color: '#E0112B' },
        ],
      },
      {
        icon: '🚪', name: 'Solid Core Door with Architectural Hardware', category: 'Door & Hardware',
        description: 'A solid wood door with chunky brass or matte black lever handles and an ornate knocker signals quality from the outside in.',
        fancyFactor: 5, budgetRange: '₹20,000–₹1,50,000',
        tips: 'Keep the door colour interesting — deep lacquer red, forest green, or midnight blue are all stunning.',
        links: [
          { site: 'Amazon', url: amz('solid wood main door brass handle lever'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('solid wood door brass hardware'), color: '#2874F0' },
          { site: 'IndiaMart', url: im('solid wood main door India custom'), color: '#E0112B' },
        ],
      },
      {
        icon: '🌿', name: 'Sculptural Indoor Plant or Floral Arrangement', category: 'Organic Décor',
        description: 'A tall fiddle-leaf fig, snake plant, or a weekly-changed fresh floral arrangement brings life to the entry.',
        fancyFactor: 4, budgetRange: '₹500–₹15,000',
        tips: 'Place plants where they get indirect light — most entryways lack direct sun.',
        links: [
          { site: 'Amazon', url: amz('fiddle leaf fig snake plant indoor entrance'), color: '#FF9900' },
          { site: 'Flipkart', url: fk('indoor plant foyer large snake plant'), color: '#2874F0' },
          { site: 'Pepperfry', url: pf('indoor plant pot foyer entrance'), color: '#F15A22' },
        ],
      },
    ],
  },
};

const FancyStars = ({ count }) => (
  <div className="fancy-stars">
    {[1, 2, 3, 4, 5].map((star) => (
      <span key={star} className={star <= count ? 'star filled' : 'star'}>★</span>
    ))}
    <span className="fancy-label">{count === 5 ? 'Ultra Luxury' : count === 4 ? 'Very Fancy' : 'Nice Upgrade'}</span>
  </div>
);

const SITE_ICONS = {
  Amazon:   { emoji: '🟠', bg: '#FFF3E0', border: '#FF9900' },
  Flipkart: { emoji: '🔵', bg: '#E3F0FF', border: '#2874F0' },
  Pepperfry:{ emoji: '🟤', bg: '#FFF0EA', border: '#F15A22' },
  IndiaMart:{ emoji: '🔴', bg: '#FFE8E8', border: '#E0112B' },
};

const ShopLinks = ({ links }) => (
  <div className="shop-links" onClick={(e) => e.stopPropagation()}>
    <span className="shop-links-label">🛒 Buy Online</span>
    <div className="shop-btns">
      {links.map((link, i) => {
        const s = SITE_ICONS[link.site] || {};
        return (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shop-btn"
            style={{ background: s.bg, borderColor: s.border, color: s.border }}
          >
            <span className="shop-emoji">{s.emoji}</span>
            {link.site}
            <span className="shop-arrow">↗</span>
          </a>
        );
      })}
    </div>
  </div>
);

const DecorPage = () => {
  const [selectedRoom, setSelectedRoom] = useState('living');
  const [expandedCard, setExpandedCard] = useState(null);
  const room = decorData[selectedRoom];

  return (
    <div className="decor-page">
      <section className="decor-hero">
        <div className="decor-hero-inner">
          <span className="decor-badge">✨ Interior Materials Guide</span>
          <h1>Elevate Every Room</h1>
          <p>Discover premium decorative materials curated for each space — with direct links to shop from Amazon, Flipkart, Pepperfry & IndiaMart.</p>
        </div>
      </section>

      <section className="room-selector-section">
        <div className="room-selector-inner">
          <h2>Choose a Room to Explore</h2>
          <div className="room-grid">
            {rooms.map((r) => (
              <button
                key={r.id}
                className={`room-btn ${selectedRoom === r.id ? 'active' : ''}`}
                onClick={() => { setSelectedRoom(r.id); setExpandedCard(null); }}
              >
                <span className="room-btn-icon">{r.icon}</span>
                <span className="room-btn-label">{r.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {room && (
        <section className="decor-content">
          <div className="decor-content-inner">
            <div className="room-content-header">
              <div className="room-header-text">
                <div className="room-header-top">
                  <span className="room-icon-big">{rooms.find(r => r.id === selectedRoom)?.icon}</span>
                  <div>
                    <h2>{rooms.find(r => r.id === selectedRoom)?.label}</h2>
                    <span className="room-theme-tag">🎨 Theme: {room.theme}</span>
                  </div>
                </div>
              </div>
              <div className="palette-block">
                <p className="palette-label">Suggested Colour Palette</p>
                <div className="palette-row">
                  {room.palette.map((colour, i) => (
                    <div key={i} className="palette-swatch-wrap">
                      <div className="palette-swatch" style={{ background: colour }} />
                      <span className="palette-name">{room.paletteNames[i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="materials-header">
              <h3>Recommended Materials & Elements</h3>
              <p>{room.materials.length} curated suggestions · click a card for a pro styling tip · shop links on every card</p>
            </div>

            <div className="materials-grid">
              {room.materials.map((mat, idx) => (
                <div
                  key={idx}
                  className={`material-card ${expandedCard === idx ? 'expanded' : ''}`}
                  onClick={() => setExpandedCard(expandedCard === idx ? null : idx)}
                >
                  <div className="material-card-header">
                    <div className="material-icon">{mat.icon}</div>
                    <span className="material-category">{mat.category}</span>
                  </div>
                  <h4>{mat.name}</h4>
                  <p className="material-desc">{mat.description}</p>

                  <div className="material-meta">
                    <div className="material-budget">
                      <span className="meta-label">💰 Est. Cost</span>
                      <strong>{mat.budgetRange}</strong>
                    </div>
                    <FancyStars count={mat.fancyFactor} />
                  </div>

                  <ShopLinks links={mat.links} />

                  {expandedCard === idx && (
                    <div className="material-tip">
                      <span className="tip-icon">💡</span>
                      <div>
                        <strong>Pro Tip</strong>
                        <p>{mat.tips}</p>
                      </div>
                    </div>
                  )}

                  <button className="expand-btn">
                    {expandedCard === idx ? 'Show Less ↑' : 'Pro Tip ↓'}
                  </button>
                </div>
              ))}
            </div>

            <div className="decor-cta-block">
              <div className="decor-cta-text">
                <h3>Ready to plan your renovation?</h3>
                <p>Generate a personalised GriHom report to see which upgrades offer the best return on investment for your home.</p>
              </div>
              <a href="/report" className="btn btn-primary decor-cta-btn">📊 Get My Report</a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default DecorPage;
