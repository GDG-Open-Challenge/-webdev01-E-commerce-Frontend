# 🤝 Contributing to NovaBuy

Thank you for your interest in contributing! This project is a **debugging challenge** — your goal is to find and fix the 20 intentional bugs hidden in the codebase. Here's how to get started.

---

## 🚀 Getting Started

### 1. Fork the Repository

Click the **Fork** button in the top-right corner of the GitHub repo page. This creates your own copy of the project under your GitHub account.

### 2. Clone Your Fork

```bash
git clone https://github.com/<your-username>/web-dev-challenge-1.git
cd web-dev-challenge-1
```

### 3. Add the Upstream Remote

Keep your fork synced with the original repo:

```bash
git remote add upstream https://github.com/GDG-Open-Challenge/web-dev-challenge-1.git
git fetch upstream
```

---

## 🔀 Branching Strategy

Create a **separate branch** for each bug fix. Use this naming convention:

```
fix/issue-<number>-<short-description>
```

**Examples:**

```bash
git checkout -b fix/issue-1-cart-total-calculation
git checkout -b fix/issue-4-search-case-sensitivity
git checkout -b fix/issue-16-unicode-hidden-character
```

> [!IMPORTANT]
> Always branch off from the latest `main` branch:
> ```bash
> git checkout main
> git pull upstream main
> git checkout -b fix/issue-<number>-<description>
> ```

---

## 🛠 Making Changes

1. **Pick an issue** from [ISSUES.md](ISSUES.md) or the GitHub Issues tab
2. **Read the full description** — understand the bug behavior, root cause, and affected file
3. **Fix the bug** in the relevant file(s)
4. **Test your fix** by opening `index.html` in a browser and verifying the correct behavior

### Testing Locally

```bash
# Option 1: Open directly
open index.html

# Option 2: Use a local server
python3 -m http.server 8080
# Then visit http://localhost:8080
```

---

## 📝 Committing Your Changes

Write clear, descriptive commit messages:

```bash
git add <file>
git commit -m "fix: resolve cart total string concatenation (Issue #1)"
```

**Commit message format:**

```
fix: <short description> (Issue #<number>)

- What was the bug
- What was changed to fix it
```

---

## 🚀 Submitting a Pull Request

### 1. Push Your Branch

```bash
git push origin fix/issue-<number>-<description>
```

### 2. Open a Pull Request

- Go to your fork on GitHub
- Click **"Compare & pull request"**
- Set the base repository to `GDG-Open-Challenge/web-dev-challenge-1` and base branch to `main`
- Fill in the PR template

### 3. PR Description Template

```markdown
## Bug Fix: Issue #<number>

**Bug:** <One-line description of the incorrect behavior>

**Root Cause:** <What was causing the bug>

**Fix:** <What you changed and why>

**Testing:**
- [ ] Verified the fix resolves the described bug
- [ ] Checked that no other functionality was broken
- [ ] Tested on desktop and mobile viewports

**Files Changed:**
- `<file path>` — <what was changed>
```

---

## ✅ Contribution Guidelines

| Rule | Details |
|------|---------|
| **One bug per PR** | Don't bundle multiple fixes in a single pull request |
| **No frameworks** | Keep it HTML, CSS, and vanilla JS only — no React, jQuery, etc. |
| **Don't reformat code** | Fix only the bug; don't restructure or beautify the surrounding code |
| **Test before submitting** | Verify your fix works in at least 2 browsers |
| **Be descriptive** | Explain what the bug was and why your fix works |

---

## 🏷 Issue Difficulty Levels

Issues are tagged by difficulty to help you choose based on your experience:

| Level | Label | Description |
|-------|-------|-------------|
| 🟢 | `good first issue` | Great for beginners — straightforward fixes |
| 🟡 | `intermediate` | Requires understanding of JS/CSS behavior |
| 🔴 | `advanced` | Deep debugging — type coercion, async behavior, data mutation, hidden characters |

---

## 💬 Need Help?

- Comment on the issue you're working on so others know it's in progress
- Ask questions in the issue thread if you're stuck
- Review other contributors' PRs to learn different approaches

---

## 📜 Code of Conduct

- Be respectful and constructive in all interactions
- Help other contributors when possible
- Give credit where credit is due
- Have fun debugging! 🐛
