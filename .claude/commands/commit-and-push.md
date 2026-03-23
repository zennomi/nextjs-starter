---
description: >-
  Commit current changes (if no files are added) or added files, and push to
  remote.
---
# Commit and Push

**When to use:**
Use this command when the user requests to "commit and push" current changes.

**Instructions:**
1. Check if there are any staged files using `git diff --cached --name-only`.
2. If there are **no files staged (added)**, run `git add .` to stage all current modifications.
3. If there **are files staged**, do not run `git add .`, only proceed with the currently staged files.
4. Prompt the user for a commit message or generate a concise one based on the current `git status` or diff.
5. Run `git commit -m "<message>"`.
6. Run `git push` to push the committed changes to the active remote branch.
