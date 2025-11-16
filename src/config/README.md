# Configuration

## Assumption Categories

All assumption categories are centrally defined in `categories.ts`. This file serves as the **single source of truth** for category definitions, colors, and metadata.

### Adding a New Category

When you need to add a new assumption category, follow these steps:

1. **Update `categories.ts`**:
   - Add the new category to the `AssumptionCategory` type
   - Add a complete configuration object to `ASSUMPTION_CATEGORIES`
   - Include label, description, and all three color values (primary, background, border)

2. **Update CSS** (`src/App.css`):
   - Add badge styles: `.badge.{category}`
   - Add filter styles: `.category-filter .tag.active.{category}`
   - Use the exact color values from the config

3. **Validation**:
   - Run the app in development mode
   - Check the browser console for validation warnings
   - The system will warn you if:
     - Assumptions use undefined categories
     - Categories are missing CSS styles
     - Configurations are incomplete

### Example

```typescript
// In categories.ts
newCategory: {
  id: 'newCategory',
  label: 'New Category',
  color: {
    primary: '#60a5fa',
    background: 'rgba(59, 130, 246, 0.2)',
    border: 'rgba(59, 130, 246, 0.4)',
  },
  description: 'Description of what this category represents',
}
```

```css
/* In App.css */
.badge.newCategory {
  background: rgba(59, 130, 246, 0.2);
  color: #60a5fa;
  border: 1px solid rgba(59, 130, 246, 0.4);
}

.category-filter .tag.active.newCategory {
  background: rgba(59, 130, 246, 0.2);
  color: #60a5fa;
  border-color: rgba(59, 130, 246, 0.6);
}
```

### Current Categories

- **technical** - AI capabilities, compute, architecture breakthroughs
- **alignment** - AI alignment and control challenges
- **safety** - Safety measures, control mechanisms, risks
- **security** - Cybersecurity, model theft, infrastructure protection
- **economic** - Deployment, automation, market dynamics
- **geopolitical** - US-China competition, manufacturing, espionage
- **regulatory** - Government response, international coordination
- **strategic** - Takeoff speed, value drift, long-term considerations
