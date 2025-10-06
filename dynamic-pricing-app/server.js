const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const { PricingService } = require('./services/pricingService');
const { IPGeolocation } = require('./services/ipGeolocation');
const { ShopifyWebhooks } = require('./services/shopifyWebhooks');

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Initialize services
const pricingService = new PricingService();
const ipGeolocation = new IPGeolocation();
const webhooks = new ShopifyWebhooks();

// Admin interface route
app.get('/admin', (req, res) => {
    res.render('admin', {
        title: 'Dynamic Pricing Admin'
    });
});

// API endpoint to get dynamic price
app.post('/api/calculate-price', async (req, res) => {
    try {
        const { productId, variantId, deliveryCountry, customerIP } = req.body;

        // Get customer location from IP
        const customerLocation = await ipGeolocation.getLocation(customerIP);

        // Calculate dynamic price
        const price = await pricingService.calculatePrice({
            productId,
            variantId,
            deliveryCountry,
            customerLocation,
            customerIP
        });

        res.json({
            success: true,
            price,
            currency: price.currency,
            appliedMultiplier: price.multiplier,
            warehouse: price.warehouse
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// API endpoint to update pricing rules
app.post('/api/pricing-rules', async (req, res) => {
    try {
        const { country, productId, rules } = req.body;

        await pricingService.updatePricingRules({
            country,
            productId,
            rules
        });

        res.json({
            success: true,
            message: 'Pricing rules updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// API endpoint to set IP multipliers
app.post('/api/ip-multipliers', async (req, res) => {
    try {
        const { country, multiplierType, value, roundingRule } = req.body;

        await pricingService.setIPMultiplier({
            country,
            multiplierType, // 'percentage' or 'fixed'
            value,
            roundingRule // 'nearest_90', 'nearest_95', 'nearest_99'
        });

        res.json({
            success: true,
            message: 'IP multiplier set successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Webhook endpoint for Shopify cart updates
app.post('/webhooks/cart/update', async (req, res) => {
    try {
        const cartData = req.body;
        const updatedCart = await webhooks.processCartUpdate(cartData);
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Dynamic Pricing App running on port ${PORT}`);
    console.log(`Admin interface: http://localhost:${PORT}/admin`);
});