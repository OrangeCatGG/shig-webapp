# Sheigfred Bello - DevOps Engineer Portfolio

A modern, cyberpunk-themed portfolio website built with Flask, featuring a responsive design with neon aesthetics, animated particles, and smooth scrolling navigation.

## Features

- **Cyberpunk Aesthetic**: Neon gradients, animated particles, scanlines, and glitch effects
- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Dark/Light Mode**: Toggle between themes with persistent preference storage
- **Smooth Scrolling**: Single-page layout with sticky navigation
- **Performance Optimized**: Lazy loading, throttled scroll events, and GPU-friendly animations
- **Accessible**: ARIA labels, keyboard navigation, and reduced motion support
- **SEO Friendly**: Semantic HTML, meta tags, and Open Graph support

## Tech Stack

- **Backend**: Python 3.x, Flask
- **Frontend**: HTML5, CSS3 (Vanilla), JavaScript (ES6+)
- **Templates**: Jinja2
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Performance**: Intersection Observer API, throttled events

## Sections

1. **Home**: Hero section with animated title and contact info
2. **About**: Professional summary with key statistics
3. **Skills**: Technology stack organized by categories with tooltips
4. **Experience**: Timeline of professional roles
5. **Projects**: Portfolio of key projects with tags
6. **YouTube**: Embedded video from "The Root Access Podcast"
7. **Contact**: Contact form with validation and direct contact info

## Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Create a virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**:
   ```bash
   python app.py
   ```

5. **Open your browser** and navigate to `http://localhost:5000`

## Project Structure

```
portfolio/
├── app.py                 # Flask application
├── requirements.txt       # Python dependencies
├── README.md             # Project documentation
├── templates/
│   └── index.html        # Main template
└── static/
    ├── css/
    │   └── styles.css    # Main stylesheet
    └── js/
        └── app.js        # JavaScript functionality
```

## Key Features Explained

### Cyberpunk Design Elements
- **Animated Background**: Multi-layer gradient with parallax cityscape
- **Particle System**: GPU-optimized floating particles with neon glow
- **Scanlines**: Subtle animated overlay for retro CRT effect
- **Glitch Effects**: Hover animations on headings and interactive elements
- **Neon Glow**: CSS box-shadow effects on buttons and highlights

### Performance Optimizations
- **Throttled Scroll Events**: Limited to ~60fps for smooth performance
- **Intersection Observer**: Lazy loading and scroll-triggered animations
- **Reduced Motion Support**: Respects user's motion preferences
- **Optimized Particles**: Adaptive particle count based on screen size

### Accessibility Features
- **Keyboard Navigation**: Full keyboard support with focus indicators
- **ARIA Labels**: Screen reader friendly navigation and controls
- **High Contrast Support**: Enhanced visibility for accessibility needs
- **Semantic HTML**: Proper heading hierarchy and landmark elements

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Performance

- **Lighthouse Score**: 90+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## Customization

### Colors
Update CSS custom properties in `:root` for theme colors:
```css
:root {
    --accent-primary: #00ffff;
    --accent-secondary: #ff00ff;
    --accent-tertiary: #00ff88;
}
```

### Content
Modify the content in `templates/index.html` to update:
- Personal information
- Skills and technologies
- Work experience
- Projects and certifications

### Animations
Adjust animation parameters in `static/css/styles.css`:
- Particle count and behavior
- Glitch effect intensity
- Transition durations

## Deployment

### Local Development
```bash
python app.py
```

### Production Deployment
1. Set `debug=False` in `app.py`
2. Use a production WSGI server like Gunicorn:
   ```bash
   pip install gunicorn
   gunicorn app:app
   ```

## Contact

**Sheigfred Bello**
- Email: sheigfred.bello@gmail.com
- Phone: 0906-025-1610
- Location: Makati City, Philippines

## License

This project is open source and available under the [MIT License](LICENSE).