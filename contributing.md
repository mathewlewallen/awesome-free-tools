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

# How to contribute?

> [!NOTE]
> You'll need a [GitHub account](https://github.com/join) to contribute!

1. Access the GitHub page (https://github.com/mathewlewallen/awesome-tools). Make sure the app is not in the main list or in [archived.md](archived.md). If it is in archived.md, mention it when you make the PR.

2. Click on the `readme.md` file:

![Step 2 Click on Readme.md](https://cloud.githubusercontent.com/assets/170270/9402920/53a7e3ea-480c-11e5-9d81-aecf64be55eb.png)


3. Now click on the edit icon.

![Step 3 - Click on Edit](https://cloud.githubusercontent.com/assets/170270/9402927/6506af22-480c-11e5-8c18-7ea823530099.png)


4. You can start editing the text of the file in the in-browser editor. Make sure you follow the guidelines above. You can use [GitHub Flavored Markdown](https://help.github.com/articles/github-flavored-markdown/).

![Step 4 - Edit the file](https://cloud.githubusercontent.com/assets/170270/9402932/7301c3a0-480c-11e5-81f5-7e343b71674f.png)


5. Say why you're proposing the changes, and then click on "Propose file change".

![Step 5 - Propose Changes](https://cloud.githubusercontent.com/assets/170270/9402937/7dd0652a-480c-11e5-9138-bd14244593d5.png)


6. Submit the [pull request](https://help.github.com/articles/using-pull-requests/)!

## Updating your Pull Request

Sometimes, a maintainer might ask you to edit your Pull Request before it is included. This is normally due to spelling errors or because your PR didn't match the guidelines stated here.

[Here](https://github.com/RichardLitt/knowledge/blob/master/github/amending-a-commit-guide.md) is a write up on how to change a Pull Request and the different ways you can do that.

---

Thank you for making SaaS development easier for everyone 🚀