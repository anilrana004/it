"""Install retro offset shadow CSS (global enforce rules — do not mutate page CSS)."""
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
shutil.copy(ROOT / "scripts" / "_retro_buttons.css", ROOT / "src" / "app" / "retro-buttons.css")
print("retro-buttons.css installed")
