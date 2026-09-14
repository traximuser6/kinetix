### Reset git changes

To **reset all Git changes**, including:

- Modified (unstaged + staged) files
- Untracked files and folders
- Ignored files (optional)

You can use the following **safe but complete** set of commands:

---

### ✅ **Full Git Reset to Clean Working Directory**

```bash
# 1. Reset all tracked files (removes staged and unstaged changes)
git reset --hard

# 2. Remove all untracked files
git clean -fd

# 3. (Optional) Also remove ignored files
git clean -xfd
```

---

### 🔍 What Each Command Does

| Command            | Description                                                                      |
| ------------------ | -------------------------------------------------------------------------------- |
| `git reset --hard` | Resets all tracked files to `HEAD` – clears both staged and unstaged changes.    |
| `git clean -fd`    | Deletes untracked **files (`-f`)** and **directories (`-d`)**.                   |
| `git clean -xfd`   | Deletes **everything untracked**, including ignored files (`-x`). Use carefully. |

---

### ⚠️ Caution

- These commands **cannot be undone easily**.
- Make sure you don’t have uncommitted work you care about.
- You can run `git status` first to review what will be lost.

---

### 🧪 Preview (Dry Run)

If you're unsure, run this first:

```bash
git clean -fdn   # Preview what will be deleted
```
