---
title: My ReSharper-esque Visual Studio Code bindings
date: 2018-05-11
published: true
tags: ["Miscellaneous"]
series: false
cover_image: ./images/emin-baycan-LV1CxYBgXqU-unsplash.jpg
cover_image_credits: Emin BAYCAN https://unsplash.com/@aimlesscode?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
canonical_url: false
description: "Used to ReSharper bindings like me? Get 'em in VS Code!."
---

Alright, let's be honest. Tools like ReSharper are a gift from the software development Gods. After all, the code just seems to... write itself. Brilliant, right?

Well, no. Once as a developer you get used to a particular setup, it can feel very uncomfortable when you have to pivot away from it. That's why I've had to tweak my Visual Studio Code to have ReSharper-esque bindings on my MacBook that I use to write .NET Core applications on at home. 

I can't emphasize how smoother my development experience has now become and how much more I am now enjoying using Visual Studio Code as my main IDE *(I guess it isn't anything near an actual full blown IDE, but you get what I mean)* over alternatives! It's certainly much smoother than running full blown Visual Studio 2017 & ReSharper in Parallels.

```json
// Place your key bindings in this file to overwrite the defaults
[
    {
        "key": "alt+enter",
        "command": "editor.action.quickFix",
        "when": "editorTextFocus"
    },
    {
        "key": "cmd+f12",
        "command": "workbench.action.gotoSymbol"
    },
    {
        "key": "cmd+p",
        "command": "editor.action.triggerParameterHints"
    },
    {
        "key": "cmd+k cmd+f",
        "command": "editor.action.formatSelection",
        "when": "editorHasSelection && editorTextFocus && !editorReadonly"
    },
    {
        "key": "cmd+k cmd+f",
        "command": "editor.action.formatDocument",
        "when": "editorTextFocus && !editorReadonly"
    },
    {
        "key": "cmd+r cmd+r",
        "command": "editor.action.rename",
        "when": "editorHasRenameProvider && editorTextFocus && !editorReadonly"
    },
    {
        "key": "cmd+shift+t",
        "command": "workbench.action.quickOpen"
    },
]
```

In order to use my binds, just hit CTRL+SHIFT+P in Visual Studio Code, search for your "Preferences: Open Keyboard Shortcuts File" and paste them on the right handside within your "keybindings.json" file.

They should be relatively self explanatory with regards to what they do. There could very well be ReSharper bindings that you utilise that I've missed out as I've just really stuck to ones I use the most off the top of my head. I'm sure my bindings list will grow with time and so will yours.

Obviously the ALT+ENTER functionality doesn't provide anywhere near as much help or depth as you get in Visual Studio & ReSharper, but it is more than enough to help you fix most problems that crop up, such as importing namespaces.

Enjoy! Visual Studio Code is an absolute joy to use... when you tweak it right!