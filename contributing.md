# Contribution Guidelines

Please note that this project is released with a [Contributor Code of Conduct](code-of-conduct.md). By participating in this project you agree to abide by its terms.

---

## ✅ Contribution Checklist

- Make sure tools are **easy to integrate** — CLI, GitHub Action, API, or lightweight SDK.  
- Ensure the tool fits **SaaS workflows** (e.g., billing, auth, analytics, DevOps, etc.).  
- Only submit tools that are:  
  - **Completely free**  
  - **Extremely cheap** (flat-rate or solo-developer friendly)  
  - **Free with generous tier**  
  - **Free to self-host** (MIT, Apache-2.0, etc.)  
- Use the correct section for each tool.  
- Follow the formatting template (see below).  

---

## 🔄 Updating Your PR

If your pull request doesn’t meet the guidelines, maintainers will request changes. There’s no need to open a new PR — just edit the existing one.

[Here’s how to update a PR.](https://github.com/RichardLitt/knowledge/blob/master/github/amending-a-commit-guide.md)

---

## ✍️ Template for Adding a Tool

Please add new entries in the correct category at the **bottom** of the list.

```md
- **Tool Name** – Category – Short, useful description.
```

**Good example:**  
```md
- **LogSnag** – Notifications – Visual event tracking and logging with real-time UI.
```

**Avoid:**  
- Overly generic descriptions (e.g. "Tool to manage analytics")  
- Starting with "A", "An", or "The"  
- Ending with symbols like `!`, `?`, or emojis in the main list  

---

## 🧩 Categories

Use one of the following categories:

- Security  
- DevOps  
- Analytics  
- Monitoring  
- Email  
- Support  
- Billing  
- Scheduling  
- CMS  
- Automation  
- Logging  
- Feature Flags  
- Localization  
- Performance  
- Notifications  

If a new category is needed, make sure at least **one tool** fits it before submitting.

---

## 📦 Commit Message Format

Please use consistent commit messages:

```console
Add: Tool Name  
Update: Tool Name  
Remove: Tool Name  
```

**Examples:**  
```console
Add: LogSnag  
Update: Highlight.io  
Remove: Fathom Lite  
```

---

## 🛠 Code Contributions

If you are contributing to helper scripts, CI tools, or automation in this repo:

- Follow standard JS/TS formatting with Prettier.  
- Avoid breaking changes without discussion.  
- Use `Feat:` or `Fix:` in commit messages for clarity.  

---

Thank you for making SaaS development easier for everyone 🚀