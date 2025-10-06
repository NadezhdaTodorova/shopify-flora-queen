# Shopify Flora Queen - Technical Interview Questions & Answers

## Part 1: Frontend Questions

### Question 1: How would you organize this component in a Shopify theme's file structure? (sections, snippets, templates, etc.)

**Answer:**
I would organize the home page components as:
- `templates/index.json` - Main template file defining section order
- `sections/homepage-hero.liquid` - Hero section with banner and CTA
- `sections/header.liquid` - Navigation and header section
- `snippets/language-switcher.liquid` - Language switcher component
- `snippets/image.liquid` - Reusable image component
- `assets/critical.css` - Critical styles for the theme
- `sections/header-group.json` - Header section group configuration

### Question 2: What strategy would you use to make this component reusable across different pages of the site?

**Answer:**
Create the hero and navigation as dynamic sections with schema settings:
- `sections/homepage-hero.liquid` with customizable image, text, and button settings that can be added to any page
- `sections/header.liquid` as a global section referenced in `layout/theme.liquid` so it appears on all pages
- Use snippets with parameters: `{% render 'language-switcher' %}` and `{% render 'image', image: section.settings.image %}`
- This allows using the same hero and navigation components on landing pages, collections, and campaign pages

### Question 3: How would you manage product images to optimize loading and SEO?

**Answer:**
- Use lazy loading: `loading="lazy"`
- Add descriptive alt tags: `alt="{{ product.title }}"`
- Use Shopify's responsive images: `{{ image | image_url: width: 800 }}`
- Implement srcset for different screen sizes

### Question 4: If this design requires dynamic product data (price, inventory, variants), how do we access it in Liquid?

**Answer:**
```liquid
{{ product.price | money }}              // Product price
{{ product.available }}                  // Availability status
{{ product.variants }}                   // Access variants
{{ product.selected_variant.inventory_quantity }}  // Inventory
{{ product.metafields.custom.field }}    // Custom metafields
```
