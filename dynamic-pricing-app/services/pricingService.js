class PricingService {
    constructor() {
        // In-memory storage for simplicity (use database in production)
        this.pricingRules = new Map();
        this.ipMultipliers = new Map();
        this.initDefaultData();
    }

    initDefaultData() {
        // Sample pricing data structure
        this.pricingRules.set('product_123', {
            'ES': { // Spain
                hasLocalWarehouse: true,
                sizes: {
                    'standard': {
                        localWarehouse: 49.90,
                        centralWarehouse: 54.90
                    },
                    'premium': {
                        localWarehouse: 69.90,
                        centralWarehouse: 74.90
                    }
                }
            },
            'FR': { // France
                hasLocalWarehouse: false,
                sizes: {
                    'standard': {
                        centralWarehouse: 59.90
                    }
                }
            },
            'DE': { // Germany
                hasLocalWarehouse: true,
                sizes: {
                    'standard': {
                        localWarehouse: 52.90,
                        centralWarehouse: 57.90
                    }
                }
            }
        });

        // Default IP multipliers
        this.ipMultipliers.set('US', {
            type: 'percentage',
            value: 20, // +20%
            roundingRule: 'nearest_90'
        });

        this.ipMultipliers.set('UK', {
            type: 'fixed',
            value: 5, // +5€
            roundingRule: 'nearest_99'
        });
    }

    async calculatePrice(params) {
        const { productId, variantId, deliveryCountry, customerLocation } = params;

        // Get base price for product and country
        const productPricing = this.pricingRules.get(productId);
        if (!productPricing) {
            throw new Error('Product pricing not found');
        }

        const countryPricing = productPricing[deliveryCountry];
        if (!countryPricing) {
            throw new Error(`Pricing not available for country: ${deliveryCountry}`);
        }

        // Determine size from variant (simplified)
        const size = 'standard'; // In production, get from variant metadata

        // Select warehouse and get base price
        let basePrice;
        let selectedWarehouse;

        if (countryPricing.hasLocalWarehouse) {
            // Check local warehouse availability (simplified - always available)
            const localAvailable = true;

            if (localAvailable && countryPricing.sizes[size].localWarehouse) {
                basePrice = countryPricing.sizes[size].localWarehouse;
                selectedWarehouse = 'local';
            } else {
                basePrice = countryPricing.sizes[size].centralWarehouse;
                selectedWarehouse = 'central';
            }
        } else {
            basePrice = countryPricing.sizes[size].centralWarehouse;
            selectedWarehouse = 'central';
        }

        // Apply IP-based multiplier
        let finalPrice = basePrice;
        const multiplier = this.ipMultipliers.get(customerLocation?.country);

        if (multiplier) {
            if (multiplier.type === 'percentage') {
                finalPrice = basePrice * (1 + multiplier.value / 100);
            } else if (multiplier.type === 'fixed') {
                finalPrice = basePrice + multiplier.value;
            }

            // Apply rounding
            finalPrice = this.applyRounding(finalPrice, multiplier.roundingRule);
        }

        return {
            basePrice,
            finalPrice,
            currency: 'EUR',
            warehouse: selectedWarehouse,
            multiplier: multiplier || null,
            deliveryCountry,
            customerCountry: customerLocation?.country
        };
    }

    applyRounding(price, rule) {
        const integerPart = Math.floor(price);

        switch (rule) {
            case 'nearest_90':
                return integerPart + 0.90;
            case 'nearest_95':
                return integerPart + 0.95;
            case 'nearest_99':
                return integerPart + 0.99;
            default:
                return Math.round(price * 100) / 100;
        }
    }

    async updatePricingRules({ country, productId, rules }) {
        if (!this.pricingRules.has(productId)) {
            this.pricingRules.set(productId, {});
        }

        const productPricing = this.pricingRules.get(productId);
        productPricing[country] = rules;

        return true;
    }

    async setIPMultiplier({ country, multiplierType, value, roundingRule }) {
        this.ipMultipliers.set(country, {
            type: multiplierType,
            value,
            roundingRule
        });

        return true;
    }

    // Get all pricing rules for admin display
    getAllPricingRules() {
        const rules = [];

        for (const [productId, countries] of this.pricingRules) {
            for (const [country, pricing] of Object.entries(countries)) {
                rules.push({
                    productId,
                    country,
                    ...pricing
                });
            }
        }

        return rules;
    }

    // Get all IP multipliers for admin display
    getAllIPMultipliers() {
        const multipliers = [];

        for (const [country, rules] of this.ipMultipliers) {
            multipliers.push({
                country,
                ...rules
            });
        }

        return multipliers;
    }
}

module.exports = { PricingService };