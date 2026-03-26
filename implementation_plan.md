# IndustrialLink India — B2B Industrial Marketplace

A multi-portal, single-codebase website built from scratch with **HTML + Vanilla CSS + JavaScript** (no frameworks). It will look and function like a premium SaaS product, tailored for India's industrial B2B sector.

---

## Proposed Design System

| Token | Value |
|---|---|
| Primary | `#FF6B00` (industrial orange) |
| Secondary | `#1A2744` (deep navy) |
| Accent | `#00C896` (trust green) |
| Background | `#0D1117` (dark mode) |
| Surface | `#161B27` |
| Glass | `rgba(255,255,255,0.05)` backdrop-blur |
| Font | Inter + Sora (Google Fonts) |

Micro-animations: fade-in on scroll, hover lift cards, progress rings, animated stats counter.

---

## File Structure

```
c:\Users\shukl\Music\Projects\legendary-tribble\
├── index.html                  # Landing page
├── auth.html                   # Login / Register (role selector)
├── buyer/
│   ├── dashboard.html
│   ├── catalog.html
│   ├── product.html
│   ├── labor.html
│   ├── worker-profile.html
│   ├── cart.html
│   ├── checkout.html
│   └── orders.html
├── seller/
│   ├── dashboard.html
│   ├── listings.html
│   ├── orders.html
│   └── analytics.html
├── worker/
│   ├── dashboard.html
│   ├── profile.html
│   └── jobs.html
├── hr/
│   ├── dashboard.html
│   ├── team.html
│   └── jobs.html
├── css/
│   ├── global.css              # Design tokens, resets, utilities
│   ├── components.css          # Cards, buttons, badges, modals
│   ├── landing.css
│   ├── auth.css
│   ├── buyer.css
│   ├── seller.css
│   ├── worker.css
│   └── hr.css
└── js/
    ├── global.js               # Nav, theme, shared utils
    ├── landing.js              # Animations, stat counters
    ├── auth.js                 # Role-based form toggling, mock login
    ├── buyer.js
    ├── seller.js
    ├── worker.js
    └── hr.js
```

---

## Pages

### Landing (`index.html`)
- **Hero**: "One Platform — Tools & Talent" with animated background (SVG grid + glow). Two split CTAs: *Find Tools* and *Find Workers*.
- **Live Stats**: Animated counters (₹1.2T market, 7.5 Cr MSMEs, etc.)
- **How It Works**: 3-step flow for each user type (tabs).
- **Product Categories**: Grid of category cards (Power Tools, Welding, Safety, etc.)
- **Why Us**: trust signals (KYC verified, GST invoices, same-day UPI pay)
- **Testimonials**: rotating story cards
- **Footer**: links + newsletter

### Auth (`auth.html`)
- Tabbed: Login | Register
- Role selector on register: **Buyer / Supplier / Worker / HR Manager** (icon cards)
- Buyer: company name, GST, phone, email
- Supplier: business reg., GST, product categories
- Worker: Aadhaar, trade, skill level, city
- HR Manager: company name, GST, "# workers I manage" — then add workers sub-flow
- Mock session stored in `localStorage`

### Buyer Portal
| Page | Key Content |
|---|---|
| `dashboard` | Quick stats (orders, active hires, spend), banner, quick actions |
| `catalog` | Sidebar filters (category, brand, price, rating), product grid, search bar |
| `product` | Image gallery, specs table, supplier badge, "Add to Cart" + "Request Quote" |
| `labor` | Search bar + filters (trade, city, availability, rating), worker cards |
| `worker-profile` | Full worker card, certifications, reviews, "Hire Now" / "Request Team" |
| `cart` | Line items (products + workers), subtotal, credit toggle |
| `checkout` | Delivery address, payment (UPI/Net banking/Credit 30d), GST invoice |
| `orders` | Tabs: Products | Labor — timeline tracking |

### Supplier/Seller Portal
| Page | Key Content |
|---|---|
| `dashboard` | Revenue chart, pending orders, top SKUs, payout schedule |
| `listings` | Table of SKUs, Add New modal (image, price, stock, certifications) |
| `orders` | Incoming orders, accept/ship flow, track |
| `analytics` | Sales by category, buyer locations heatmap, conversion |

### Worker Portal
| Page | Key Content |
|---|---|
| `dashboard` | Profile completeness ring, earnings, upcoming jobs, badges |
| `profile` | Edit skills, upload Aadhaar / trade cert, availability calendar |
| `jobs` | Job feed (card: trade, site, location, pay/day, dates), Accept/Decline |

### HR Manager Portal
| Page | Key Content |
|---|---|
| `dashboard` | Team size, active deployments, aggregate earnings, quick post-job |
| `team` | Table of workers (name, trade, status, rating) + "Add Worker" modal |
| `jobs` | Job listings, apply on behalf of worker(s), track assignments |

---

## Key UX Details
- **Persistent sidebar navigation** per portal with active state highlighting  
- **Glassmorphism cards** throughout  
- **Toast notifications** for actions  
- **Search + filter** with live JS filtering (no server needed)  
- **LocalStorage mock**: login state, cart items, worker team  
- **Responsive**: desktop-first, mobile breakpoints at 768px  
- **Badges**: Verified ✓ (green), KYC Pending (amber), Top Rated ⭐  

---

## Verification Plan

### Browser Testing (manual)
1. Open `index.html` in a Chromium browser via the built-in browser subagent — verify hero renders, stats animate, navigation links work.
2. Click *Register as Buyer* → verify role selector and form fields appear correctly.
3. Log in as Buyer → verify redirect to `buyer/dashboard.html`, sidebar active.
4. Browse to `buyer/catalog.html` → apply category filter, verify cards filter live.
5. Click a product → verify product detail page loads, Add to Cart updates badge.
6. Visit `buyer/labor.html` → filter by "Welder", verify worker cards appear.
7. Log in as Supplier → visit `seller/listings.html`, click "Add Listing" modal.
8. Log in as Worker → complete profile, visit `worker/jobs.html`, click Accept.
9. Log in as HR Manager → add a worker via `hr/team.html`, post a job on their behalf.
10. Verify responsive layout at 768px width in browser devtools.
