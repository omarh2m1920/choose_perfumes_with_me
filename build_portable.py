from pathlib import Path
import base64

root = Path(__file__).resolve().parent
html = (root / 'index.html').read_text(encoding='utf-8')
for name in ['styles.css', 'yes_style.css']:
    html = html.replace(f'<link rel="stylesheet" href="{name}?v=5">', '<style>\n' + (root / name).read_text(encoding='utf-8') + '\n</style>')
scripts = []
for name in ['script.js', 'yes_script.js']:
    html = html.replace(f'<script src="{name}?v=5" defer></script>', '')
    scripts.append('<script>\n' + (root / name).read_text(encoding='utf-8') + '\n</script>')
image = base64.b64encode((root / 'assets/myriam.png').read_bytes()).decode('ascii')
html = html.replace('src="assets/myriam.png"', 'src="data:image/png;base64,' + image + '"')
html = html.replace('</body>', '\n'.join(scripts) + '\n</body>')
(root / 'START-HERE.html').write_text(html, encoding='utf-8')
print('Built START-HERE.html with all styles, scripts, and pictures embedded.')
