# Smoke Effect Animation - GSAP Theme Transition

## Overview
A professional, GSAP-powered smoke effect animation that triggers when switching between dark and light themes. The effect creates a visually stunning transition by animating smoke particles that spread across the screen as the theme changes.

## Features

### ✨ Visual Effects
- **35 smoke particles** that animate in a coordinated pattern
- **Dynamic particle sizing**: Particles range from 60-180px with blur effects
- **Color-adaptive**: Dark smoke for dark theme transitions, white smoke for light theme transitions
- **Radial gradients**: Each particle has a gradient opacity for natural smoke appearance
- **Blend modes**: Optimized for dark and light themes
  - Dark theme: `multiply` blend mode for authentic shadow effect
  - Light theme: `screen` blend mode for glowing appearance

### 🎬 Animation Details
- **Particle spread**: Particles spread outward in a 360° pattern
- **Staggered timing**: Each particle animates with a slight delay for wave effect
- **Duration**: ~0.6-1.4 seconds total animation time
- **Easing**: `power2.inOut` for smooth acceleration/deceleration
- **Rotation**: Particles rotate up to 720 degrees during animation
- **Scale**: Particles scale up to 2.5x their original size

### 🎯 Triggering
The smoke effect is triggered when clicking the theme toggle button in the sidebar:
1. User clicks Sun/Moon icon
2. `showSmokeEffect` state is set to `true`
3. Smoke animation plays (40-100ms per particle wave)
4. Theme switches during animation
5. Effect automatically cleans up after 1 second

## Implementation Details

### Components Used
- **SmokeEffect** (`components/smoke-effect.tsx`): Main animation component
  - Props: `isActive` (boolean), `isDark` (boolean)
  - Uses GSAP Timeline for coordinated particle animation
  - Self-cleaning particles (removed after animation completes)

### Integration in Page
Location: `app/page.tsx`
- Imported: `import { SmokeEffect } from "@/components/smoke-effect"`
- State: `const [showSmokeEffect, setShowSmokeEffect] = useState(false)`
- Usage in JSX: `<SmokeEffect isActive={showSmokeEffect} isDark={theme === 'dark'} />`
- Trigger: Click handler on theme button sets `showSmokeEffect(true)`, auto-resets after 1s

### Styling
Location: `app/globals.css` (lines added at end)
```css
.smoke-effect-container {
  mix-blend-mode: screen;
  pointer-events: none;
}

.smoke-particle {
  will-change: transform, opacity;
  backface-visibility: hidden;
}

.dark .smoke-particle {
  mix-blend-mode: multiply;
}

.light .smoke-particle {
  mix-blend-mode: screen;
}
```

## Technical Stack
- **GSAP 3.13.0**: Animation library for smooth particle movement
- **React**: Component management and state
- **TypeScript**: Type-safe implementation
- **CSS**: Styling and blend modes

## Browser Compatibility
- Chrome/Chromium: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support (with `-webkit-` prefixes for performance)
- Edge: ✅ Full support

## Performance Optimizations
1. **Fixed positioning**: Particles use `position: fixed` for GPU acceleration
2. **Will-change**: Set on particles for hardware acceleration
3. **Backface visibility**: Hidden to improve rendering performance
4. **Auto-cleanup**: Particles are removed from DOM after animation completes
5. **Timeline-based**: GSAP timeline ensures coordinated animation without multiple tweens

## Customization

### Adjust Particle Count
In `components/smoke-effect.tsx`, line 14:
```typescript
const particleCount = 35; // Change this number
```

### Adjust Animation Duration
In `components/smoke-effect.tsx`, line 67:
```typescript
duration: Math.random() * 0.8 + 0.6, // Range: 0.6-1.4 seconds
```

### Adjust Spread Distance
In `components/smoke-effect.tsx`, line 56:
```typescript
const distance = Math.random() * 400 + 300; // Range: 300-700px
```

### Adjust Particle Size
In `components/smoke-effect.tsx`, line 41:
```typescript
const size = Math.random() * 120 + 60; // Range: 60-180px
```

### Change Color/Opacity
In `components/smoke-effect.tsx`, lines 50-56:
```typescript
if (isDark) {
  const opacity = Math.random() * 0.6 + 0.4; // Range: 0.4-1.0
  particle.style.background = `radial-gradient(...)`; // Modify here
}
```

## Usage Example
The smoke effect is automatically triggered when users click the theme toggle button. No additional setup needed - it works out of the box!

```
User clicks Sun/Moon icon → Smoke animation plays → Theme switches → Effect cleans up
```

## Future Enhancements
- Add sound effect to smoke animation
- Particle trails or motion blur
- Different effects for different transitions
- Customizable particle colors per theme
- Smoke effect on other page transitions

## Files Modified
1. `components/smoke-effect.tsx` - New component file
2. `app/page.tsx` - Added import, state, and trigger logic
3. `app/globals.css` - Added CSS styling for particles

## Testing
To test the smoke effect:
1. Open the portfolio at `http://localhost:3000`
2. Look for the Sun/Moon icon in the top-right sidebar
3. Click the icon to toggle between light and dark themes
4. Observe the smoke particles spreading across the screen during transition
