---
title: Updating your .gitignore
date: 2019-04-28
published: true
tags: ["Miscellaneous"]
series: false
cover_image: ./images/kristina-flour-BcjdbyKWquw-unsplash.jpg
cover_image_credits: "<a href='https://unsplash.com/@tinaflour'>Kristina Flour</a>"
canonical_url: false
description: "When you forget to add a .gitignore to your project..."
---
Be honest, you've been there. I know I have.

You've started a new project, decided to use Git for your source control and then later down the line realise that you forgot to kick off your repository with a .gitignore file and now when you try to add one, files that should be ignored are still within your repository!

In fact, the whole reason why I'm writing this is because I make this mistake so darn often when developing at home, I can now refer back to this post every time I do than waste minutes googling the solution every time.

So, how can we go about solving this?

First of all, we need to basically remove all the files from our repository. This way we can commit them back in but allow our .gitignore to come in to play when deciding what we should be re-adding to our repository.

```bash
# IMPORTANT: Do not ignore the "." at the end of this command! Run it in the root of your repository to remove all filles.
git rm -r --cached .
```

At this point you can either re-add all of your files with your new .gitignore having kicked in using whatever source control software you have installed... or just do it the good ol' fashioned way:

```bash
git add -A
```

```bash
git commit -a -m "Your message here"
```

Enjoy!