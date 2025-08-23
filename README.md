# Sheigfred Bello - DevOps Engineer Portfolio

A modern, cyberpunk-themed portfolio website built with **Flask**, featuring a responsive design with neon aesthetics, animated particles, smooth scrolling navigation, a **downloadable résumé**, and an **AWS Cloud Practitioner quiz** with an **exam-only leaderboard**.

---

## Features

- **Cyberpunk Aesthetic**: Neon gradients, animated particles, scanlines, and glitch effects
- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Dark/Light Mode**: Toggle between themes with persistent preference storage
- **Smooth Scrolling**: Single-page layout with sticky navigation
- **Performance Optimized**: Lazy loading, throttled scroll events, and GPU-friendly animations
- **Accessible**: ARIA labels, keyboard navigation, and reduced motion support
- **SEO Friendly**: Semantic HTML, meta tags, and Open Graph support
- **Downloadable Résumé**: One-click PDF from a prominent CTA on the hero
- **AWS Practice Quiz**:
    - **Practice & Exam modes** (Exam = **15** randomized questions, **90-minute** timer)
    - Practice shows **inline explanations**
    - **Only Exam results** are saved to the leaderboard
    - Leaderboard shows **`correct/total`** (e.g., `12/15`) and highlights your latest attempt

---

## Tech Stack

- **Backend**: Python 3.x, Flask
- **Frontend**: HTML5, CSS3 (Vanilla), JavaScript (ES6+)
- **Templates**: Jinja2
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Performance**: Intersection Observer API, throttled events
- **Storage**: JSON file (`leaderboard.json`) for exam results

---

## Sections

1. **Home**: Hero with animated title, résumé download, and contact info
2. **About**: Professional summary with key statistics
3. **Skills**: Technology stack organized by categories with tooltips/badges
4. **Experience**: Timeline of professional roles
5. **Projects**: Portfolio of key projects with tags
6. **YouTube**: Embedded video from *The Root Access Podcast*
7. **Contact**: Contact form with validation and direct contact info
8. **AWS Practice**: Quiz (Practice/Exam) with **exam-only** leaderboard

---

## Installation & Setup

1. **Clone the repository**:
    
    ```bash
    git clone <repository-url>
    cd portfolio
    
    ```
    
2. **Create a virtual environment**:
    
    ```bash
    python -m venv venv
    # macOS/Linux
    source venv/bin/activate
    # Windows
    # venv\Scripts\activate
    
    ```
    
3. **Install dependencies**:
    
    ```bash
    pip install -r requirements.txt
    
    ```
    
4. **(Optional) Add résumé PDF**
    
    Put your file at:
    
    ```
    static/assets/resume.pdf
    
    ```
    
    The homepage “Resume” button links to this exact path.
    
5. **Run the application**:
    
    ```bash
    python app.py
    
    ```
    
6. **Open your browser** and navigate to `http://localhost:5000`

> Note: leaderboard.json is created on first write. Ensure the app can write to the project directory.
> 

---

## Project Structure

```
portfolio/
├── app.py                       # Flask app (with /aws-practice + alias /awspractice)
├── requirements.txt
├── README.md
├── leaderboard.json             # Created at runtime (exam leaderboard storage)
├── templates/
│   ├── index.html               # Home
│   ├── documentation.html       # Docs page
│   └── aws_practice.html        # AWS quiz page (exam-only leaderboard)
└── static/
    ├── assets/
    │   └── resume.pdf           # Résumé served by the CTA
    ├── css/
    │   ├── styles.css           # Main site styles (home/docs/shared)
    │   └── aws-practice.css     # Quiz styles (scoped to .aws-practice-main)
    └── js/
        ├── app.js               # Nav, theme, particles, typing, etc.
        └── aws-quiz.js          # Quiz logic (Practice/Exam, timer, POST to backend)

```

---

## Key Features Explained

### Cyberpunk Design Elements

- **Animated Background**: Multi-layer gradient with optional parallax cityscape
- **Particle System**: GPU-optimized floating particles with neon glow
- **Scanlines**: Subtle animated overlay for retro CRT effect
- **Glitch Effects**: Hover animations on headings and interactive elements
- **Neon Glow**: CSS box-shadow effects on buttons and highlights

### Résumé Download (CTA)

Add a download button in the hero:

```html
<a class="cta-button resume"
   href="{{ url_for('static', filename='assets/resume.pdf') }}"
   download>
  Download Résumé
</a>

```

### AWS Practice Quiz

**Client (`static/js/aws-quiz.js`)**

- Prompts for player name on **Start**
- **Exam Mode**
    - Randomizes the bank and uses **15** questions (`AWSQuiz.EXAM_QUESTIONS = 15`)
    - **90:00** countdown; adds a warning class under 5 minutes
    - **POST** body on submit:
        
        ```
        player-name, score, correct, total, time, quiz-mode
        
        ```
        
- **Practice Mode**
    - Uses the full pool; shows explanations after selections
    - **Not** saved to the leaderboard
- After successful save, redirects to:
    
    ```
    /aws-practice?highlight=<name>#leaderboard
    
    ```
    

**Server (`app.py`)**

- **Routes**:
    
    ```python
    @app.route('/aws-practice', methods=['GET', 'POST'])
    @app.route('/awspractice', methods=['GET', 'POST'])  # alias
    
    ```
    
- **POST**
    - Accepts legacy `score` plus `correct` and `total`
    - Recomputes `score = round((correct/total) * 100)` if counts are provided
    - **Only persists when** `mode == 'exam'`
    - Sorts leaderboard by: **correct (desc)** → **shorter time** → **earlier timestamp**
- **GET**
    - Renders **exam-only** leaderboard (top N)
    - Displays score as **`correct/total`**

**Styling**

- Quiz styles are isolated in `static/css/aws-practice.css` and apply only inside:
    
    ```html
    <main class="aws-practice-main"> ... </main>
    
    ```
    
    This prevents styling collisions with the homepage.
    

---

## Performance Optimizations

- **Throttled Scroll Events**: Limited to ~60fps for smooth performance
- **Intersection Observer**: Lazy-ish reveal and scroll-triggered animations
- **Reduced Motion Support**: Respects user's motion preferences
- **Adaptive Particles**: Particle count scaled by screen size

---

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support with focus indicators
- **ARIA Labels**: Screen reader friendly navigation and controls
- **High Contrast Support**: Enhanced visibility for accessibility needs
- **Semantic HTML**: Proper heading hierarchy and landmark elements

---

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

---

## Performance

- **Lighthouse Score**: 90+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

---

## Customization

### Colors

Update CSS custom properties in `:root`:

```css
:root {
  --accent-primary:  #00ffff;
  --accent-secondary:#ff00ff;
  --accent-tertiary: #00ff88;
}

```

### Content

Modify the content in `templates/` to update:

- Personal information
- Skills and technologies
- Work experience
- Projects and certifications

### Animations & Quiz

- Adjust animation parameters in `static/css/styles.css` (particles, glitch, transitions)
- Edit the quiz bank in `loadQuestions()` within `static/js/aws-quiz.js`
- Change exam length via `AWSQuiz.EXAM_QUESTIONS`

---

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
    
3. Ensure write permissions for `leaderboard.json`

---

## Contact

**Sheigfred Bello**

- Email: **sheigfred.bello@gmail.com**
- Phone: **0906-025-1610**
- Location: **Makati City, Philippines**

---

## License

This project is open source and available under the [MIT License](https://www.notion.so/LICENSE)