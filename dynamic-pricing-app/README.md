# Shopify Dynamic Pricing App

A simple Shopify app for implementing dynamic pricing based on IP geolocation, country, and warehouse availability.

## Features

✅ **Country-based pricing** - Different prices per country
✅ **Warehouse selection** - Local vs central warehouse pricing
✅ **IP-based multipliers** - Adjust prices based on customer location
✅ **Size variants** - Support for small/medium/large pricing
✅ **Admin interface** - Easy price management
✅ **Price simulator** - Test pricing calculations

## Project Structure

```
dynamic-pricing-app/
├── server.js                 # Main Express server
├── package.json             # Dependencies
├── .env.example            # Environment variables template
├── services/
│   ├── pricingService.js   # Core pricing logic
│   ├── ipGeolocation.js    # IP location detection
│   └── shopifyWebhooks.js  # Webhook handlers
└── views/
    └── admin.ejs           # Admin interface
```

## Installation

1. Navigate to the app directory:
```bash
cd dynamic-pricing-app
```

2. Copy `.env.example` to `.env` and fill in your Shopify credentials:
```bash
cp .env.example .env
```

3. Install dependencies:
```bash
npm install
```

4. Run the app:
```bash
npm run dev
```

5. Access admin at: http://localhost:3000/admin

## How It Works

### Pricing Logic

1. **Base Price Determination**
   - Product has different prices per country
   - If local warehouse exists, two prices available
   - System selects warehouse based on availability

2. **IP Multiplier Application**
   - Detects customer's country via IP
   - Applies percentage or fixed amount adjustment
   - Custom rounding rules (e.g., always end in .90)

3. **Final Price Calculation**
   ```
   Base Price → Apply Multiplier → Apply Rounding → Final Price
   ```

## API Endpoints

### Calculate Price
```
POST /api/calculate-price
{
  "productId": "product_123",
  "deliveryCountry": "ES",
  "customerIP": "1.1.1.1"
}
```

### Update Pricing Rules
```
POST /api/pricing-rules
{
  "country": "ES",
  "productId": "product_123",
  "rules": { ... }
}
```

### Set IP Multipliers
```
POST /api/ip-multipliers
{
  "country": "US",
  "multiplierType": "percentage",
  "value": 20,
  "roundingRule": "nearest_90"
}
```

## What Still Needs Implementation

### Backend Requirements
- **Database Integration** - Replace in-memory storage with PostgreSQL/MySQL
- **Shopify API Integration** - Connect to real Shopify store
- **Authentication** - Add OAuth for Shopify app installation
- **Real IP Geolocation** - Integrate MaxMind or IPinfo service
- **Caching Layer** - Add Redis for performance
- **Queue System** - Handle bulk price updates

### Shopify Integration
- **Shopify Functions** - Implement checkout price modifications
- **Metafields** - Store pricing data on products
- **Webhooks** - Listen to product/order events
- **Storefront API** - Display dynamic prices