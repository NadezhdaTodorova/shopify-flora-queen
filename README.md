# Flora Queen Shopify Store

A Shopify store built using the basic skeleton theme, customized for flora and flower products.

## Theme Setup

Created using Shopify CLI basic template:
```bash
shopify theme init flora-queen-store
```

## Customizations

### Theme Configuration
- **Theme Name**: Flora Queen
- **Colors**:
  - Background: `#FFF8F5` (soft cream)
  - Text: `#2E5D3E` (forest green)
  - Accent: `#E91E63` (pink)

### Homepage
- **Clean Hero Section**: Replaced default "Hello World" content
  - Welcome message with Flora Queen branding
  - Descriptive subtitle highlighting flower offerings
  - "Shop Collections" CTA button linking to all products
  - Flora-themed gradient background styling
  - Fully responsive design for all devices
  - Customizable content through Shopify admin

### Navigation
Default navigation menu includes:
- Home
- Catalog

### Collection Pages
- Responsive product grid layout
- Hover effects and smooth animations
- Mobile-optimized display
- **Product Filters**: Interactive filtering system
  - **Price Range Filter**: Under $100, Over $100 (simplified options)
  - **Availability Filter**: In Stock / Out of Stock options
  - **Real-time filtering**: Instant results without page reload
  - **Clear Filters** button to reset all selections
  - **Bilingual support**: Filter labels in English and Spanish
- **Add to Cart Functionality**: Direct purchase from collection pages
  - **Working cart forms**: Properly adds products to Shopify cart
  - **Variant handling**: Automatically selects first available variant
  - **Stock validation**: Shows "Sold Out" for unavailable products
  - **Disabled states**: Gray styling for out-of-stock items
  - **Bilingual labels**: "Add to Cart"/"Agregar al Carrito" and "Sold Out"/"Agotado"

### Product Pages
- **Image Gallery with Zoom**: Interactive product image gallery
  - Click main image to zoom in/out (2x magnification)
  - Mouse movement follows zoom position
  - Thumbnail navigation for multiple images
  - Active thumbnail highlighting
- **Information Accordions**: Collapsible sections for product details
  - **Product Details**: Shows product description
  - **Care Instructions**: Flora care tips and guidelines
  - **Delivery Information**: Shipping and delivery details
  - **Specifications**: Custom metafield content (optional)
- **Features**:
  - 400px main image size with hover effects
  - 60px thumbnail gallery
  - Smooth accordion animations with Flora styling
  - One accordion open at a time functionality
  - Flora-themed styling with pink accents

### Navigation
- **Breadcrumbs**: Simple navigation trail on collection and product pages
  - Shows current page location (Home > Collection > Product)
  - Hover effects with Flora Queen colors
  - Responsive design for mobile devices
  - Supports collections, products, blog posts, and pages
- **Language Switcher**: Multi-language support with dropdown selector
  - English and Spanish locales included
  - Elegant dropdown in header with Flora Queen styling
  - Automatic form submission for language switching
  - Responsive design for mobile devices

### Cart Page
- **Modern Layout**: Replaced basic table with responsive grid design
- **Smaller Product Images**: 100px × 100px (80px on mobile) for better space usage
- **Enhanced Features**: Clear product details, quantity controls, line totals
- **Empty Cart State**: Friendly message with continue shopping link
- **Flora Queen Styling**: White cards with shadows matching theme colors
- **Bilingual Support**: Complete translations for all cart text

## Development

```bash
cd flora-queen-store
shopify theme serve    # Local development
shopify theme push     # Deploy to store
```