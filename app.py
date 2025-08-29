from flask import Flask, render_template, request, redirect, url_for
import json
from datetime import datetime

app = Flask(__name__)
LEADERBOARD_FILE = 'leaderboard.json'


def _score_int(v):
    """Coerce score to int robustly: '85', '85%', 85.0, etc."""
    try:
        if isinstance(v, str) and v.endswith('%'):
            v = v[:-1]
        return int(float(v))
    except Exception:
        return 0


def _int(v, default=0):
    """Robust int() for strings/floats/None."""
    try:
        return int(float(v))
    except Exception:
        return default


def _time_to_seconds(t):
    """Convert 'mm:ss' to seconds; large default on parse failure."""
    try:
        m, s = str(t).split(':')
        return int(m) * 60 + int(s)
    except Exception:
        return 1_000_000


def _load_lb():
    try:
        with open(LEADERBOARD_FILE, 'r') as f:
            content = f.read().strip()
            lb = json.loads(content) if content else []
    except FileNotFoundError:
        lb = []
    # normalize existing rows
    for p in lb:
        p['score'] = _score_int(p.get('score', 0))
        m = (p.get('mode') or 'practice').lower()
        p['mode'] = 'exam' if m == 'exam' else 'practice'
        # normalize optional fields for legacy rows
        p['correct'] = _int(p.get('correct', p.get('score', 0)))
        p['total'] = _int(p.get('total', 100)) or 100
    return lb


def _save_lb(lb):
    with open(LEADERBOARD_FILE, 'w') as f:
        json.dump(lb, f, indent=2)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/documentation')
def documentation():
    return render_template('documentation.html')


@app.route('/skill-tree')
def skill_tree():
    return render_template('skill_tree.html')


# canonical route + alias; no hardcoded paths in redirects/templates
@app.route('/aws-practice', methods=['GET', 'POST'])
@app.route('/awspractice', methods=['GET', 'POST'])
def aws_practice():
    VALID_MODES = {'practice', 'exam'}
    TOP_N = 10  # top 10 leaderboard

    if request.method == 'POST':
        name = (request.form.get('player-name') or '').strip()
        if not name:
            return redirect(url_for('aws_practice'))

        # sanitize inputs
        score = _score_int(request.form.get('score', 0))
        correct = _int(request.form.get('correct', 0))          # NEW
        total = _int(request.form.get('total', 0))              # NEW
        mode = (request.form.get('quiz-mode') or 'practice').lower()
        if mode not in VALID_MODES:
            mode = 'practice'
        time_taken = request.form.get('time', '0:00')

        # 🚫 Do NOT record practice attempts
        if mode != 'exam':
            return redirect(url_for('aws_practice'))

        # prefer exact counts to recompute score for consistency
        if total > 0 and correct >= 0:
            try:
                score = round((correct / total) * 100)
            except Exception:
                pass

        leaderboard = _load_lb()
        leaderboard.append({
            'name': name,
            'score': score,                 # keep for legacy/compatibility
            'correct': correct,             # NEW
            'total': total,                 # NEW
            'mode': 'exam',                 # normalize
            'time': time_taken,             # mm:ss (used as tie-breaker)
            'timestamp': datetime.now().isoformat()
        })

        # Sort: highest correct, then faster time, then earlier timestamp
        leaderboard.sort(
            key=lambda x: (
                -_int(x.get('correct', 0)),
                _time_to_seconds(x.get('time', '9999:59')),
                x.get('timestamp', '')
            )
        )

        _save_lb(leaderboard)
        return redirect(url_for('aws_practice', highlight=name))

    # GET
    highlight_name = request.args.get('highlight')
    leaderboard = _load_lb()

    # --- Exam-only rows ---
    filtered = [p for p in leaderboard if (p.get('mode') or 'practice').lower() == 'exam']

    # sorting key: higher correct → faster time → earlier timestamp
    def _sort_key(x):
        return (-_int(x.get('correct', 0)),
                _time_to_seconds(x.get('time', '9999:59')),
                x.get('timestamp', ''))

    # UNIQUE-BY-NAME (case-insensitive): keep best attempt per player
    best_by_name = {}
    for p in filtered:
        key = (p.get('name') or '').strip().lower()
        if not key:
            continue
        if key not in best_by_name:
            best_by_name[key] = p
        else:
            if _sort_key(p) < _sort_key(best_by_name[key]):  # better tuple wins
                best_by_name[key] = p

    unique_rows = list(best_by_name.values())
    unique_rows.sort(key=_sort_key)

    TOP_N = 10
    grouped_leaderboard = {'exam': unique_rows[:TOP_N]}

    return render_template(
        'aws_practice.html',
        leaderboard=grouped_leaderboard,
        highlight_name=highlight_name,
        save_url=url_for('aws_practice')
    )

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
