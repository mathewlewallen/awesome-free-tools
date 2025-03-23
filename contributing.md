# Contribution Guidelines

Please note that this project is released with a [Contributor Code of Conduct](code-of-conduct.md). By participating in this project you agree to abide by its terms.

---

## ✅ Contribution Checklist

- <ins>**Ensure the tool is not already on the [***`list`***](README.md).**</ins>
- Make sure tools are **easy to integrate** — CLI, GitHub Action, API, or lightweight SDK.  
- Ensure the tool fits **app workflows** (e.g., billing, auth, analytics, DevOps, etc.).  
- Only submit tools that are:
  - **Completely free**
  - **Free with generous tier**
- Make sure the tool isn't on [**Awesome Self-hosted**](https://github.com/awesome-selfhosted/awesome-selfhosted)
- Use the correct **category** and **pricing tier**.
- Check that the tool isn’t already in [`no-go-list.md`](no-go-list.md) before submitting.
- Follow the PR [template](.github/PULL_REQUEST_TEMPLATE.md) and formatting guide.

---

## ✍️ Tool Formatting Template

Add new tools in the appropriate pricing section and place them at the **bottom** of the table.

```md
[Tool Name] | `Category` | Short, useful description.
```

**Example:**
```md
[LogSnag] | `Notifications` | Visual event tracking and logging with real-time UI.
```

**Avoid:**
- Starting with "A", "An", or "The"
- Overly generic descriptions
- Ending with `!`, `?`, or emojis in the description

---

## 🧩 Valid Categories

Choose from the following categories:

- AI
- Analytics
- Billing
- Code Quality
- DevOps
- DNS/CDN
- Editor
- Email
- Hosting
- IDE
- Monitoring
- Performance
- Playground
- Scheduling
- Scraping
- Security
- Support
- Testing
- Version Control

> Need a new category? Justify it and ensure **at least one** relevant tool fits.

---

## 📦 Commit Message Format

Use consistent commit messages to help track changes:

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

If contributing scripts, CI configs, or logic:

- Use Prettier or standard JS/TS formatting  
- Avoid breaking changes unless discussed  
- Use `Feat:` or `Fix:` in commit messages when relevant

---

# 🙋‍♂️ How to Contribute?

> 💡 You'll need a [GitHub account](https://github.com/join) to contribute.

1. Visit the [GitHub repo](https://github.com/mathewlewallen/awesome-free-tools).
2. Confirm the tool is **not already listed** or marked in [`no-go-list.md`](no-go-list.md).
3. Open `README.md` and click the pencil icon to edit.

4. Add your tool at the bottom of the correct section.
5. Scroll down, explain your changes, and submit a pull request.

---

## 🔄 Updating Your Pull Request

If requested to make changes:
- Do **not** open a new PR — edit the existing one.
- Push the updates and GitHub will auto-refresh your submission.

Need help? [Learn how to amend a PR.](https://github.com/RichardLitt/knowledge/blob/master/github/amending-a-commit-guide.md)

---

Thank you for helping developers find better tools 🚀
