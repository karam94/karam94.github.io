---
title: Associating templating file formats with html in Visual Studio Code
date: 2018-12-15
published: true
tags: ["Miscellaneous"]
series: false
cover_image: ./images/pankaj-patel-u2Ru4QBXA5Q-unsplash.jpg
cover_image_credits: "<a href='https://unsplash.com/@pankajpatel'>Pankaj Patel</a>"
canonical_url: false
description: "A simple solution, to an annoying problem."
---

If you read my last blog post, you'll be aware that I've been playing around a lot with [AdonisJS](https://adonisjs.com/) at home and as it is a Node.js web framework, instead of just plain HTML in views, it actually uses its own templating engine instead called [Edge](https://edge.adonisjs.com/).

This is just a quick post that addresses a small issue in Visual Studio Code that I've faced a lot in the past when dealing with different frameworks and different templating languages such as [Nunjucks](https://mozilla.github.io/nunjucks/) that are all really just HTML based files.

## What's the issue?
Formatting the files is the issue.
Be honest, you've been there - or you're currently there at the moment.
The dreaded "Sorry, but there is no formatter for ‘xyz’-files installed." message, and all you really want is for Visual Studio Code to just pretend your file is a standard HTML file!

## What's the solution?
Press CTRL + SHIFT + P and search for "Preferences: Open Settings (JSON)" or go to File > Preferences > Settings & search for "files.associations" via your VS Code GUI.

Then simply add an association that tells VS Code to treat your file type of "xyz" as a "html" file. In my case, I went for the following:

```json
"files.associations": {
  "*.edge": "html"
}
```

Hopefully that helped you as much as it helped me!

See you next week!