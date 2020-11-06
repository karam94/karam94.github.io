---
title: Tips for learning a new code base.
date: 2020-05-18
published: true
tags: ["Miscellaneous"]
series: false
cover_image: ./images/wes-hicks-4-EeTnaC1S4-unsplash.jpg
cover_image_credits: "<a href='https://unsplash.com/@sickhews'>Wes Hicks</a>"
canonical_url: false
description: "Need to quickly learn a new code base or upskill in some technologies? Here are my tips."
---
I don't usually talk much about my adventures within the professional world of software development on this blog, but I feel like an article about this topic is far too relevant to just about everyone, not to write about.

<figure>
    <img src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" 
    style="width: 100%; display: block; margin-left: auto; margin-right: auto;"/>
</figure>

As you can probably tell from the title, it's about familiarising yourselves with new code bases and unsurprisingly, this situation usually comes to those who have recently changed teams or jobs.

I changed jobs roughly 6 months ago and my new role is within a consultancy, therefore as you can imagine, not only are you required to become familiar with codebases (and sometimes new technologies) relatively often as you swap between new clients, but you also have to be prepared in accomplishing to do so within a relatively quick amount of time becuase you're expected to a certain extent, to hit the ground running.

## Learning a new code base:

**Tip #1 - Know your boundaries:**

You aren't going to learn everything overnight. Understand from your colleagues exactly what services, APIs & bananas you need to know about and concern yourself with. Find out which of those you will actually be working within and which of those you have only been told about only because you may need to communicate with them. Your aim should be to reduce the scope of what you need to learn as much as possible.

Businesses tend to have tens of different solutions, but domain aligned teams or projects only tend to touch a sub-set of them. This can also help you mentally if you feel overwhelmed as those 90 solutions you were worried about needing to learn, have suddenly become only 10.

**Tip #2 - Understand the context & architecture:**

Before you start to worry about the micro-architecture of applications (which refers to the structure of the code bases), you first need to understand the context and purpose of these different services, including how and why they communicate with each other. Why do they exist in the first place? What value are they bringing to the table? Why are they the ones you need to work on within your particular team/role?

I recommend the C4 Model as a fantastic way to draw a high level architectural diagram for this kind of thing. You can also use it to diagram the internals of an application once you get past this point. This will leave you with diagrams of both the macro and micro-architecture of what you need to learn about.

**Tip #3 - Ask questions:**

The only stupid question, is not asking any questions.

If you can't think of any questions, ask about the coding conventions/standards. If there aren't any, then it's a good chance for you to make an instant impact.

**Tip #4 - Read the documentation, tests are part of the documentation process:**

Some places will have long winded documentation for software (that is most likely out of date) whilst others won't. What all places however should have within a code base though is relatively decent test coverage, which is the best kind of documentation as it inevitably evolves and updates with the codebase... one would hope!

Look at the different test files, focus on a small subset of them and work your way inwards. At this point you won't learn too many implementation details but you should be seeing references to functions or classes referred to in these tests, navigate in to them to gain a rough understanding of what methods also exist within the codebase in terms of the file structure. This gives you an idea of what use cases are fulfilled by the software, as they are what are under test.

**Tip #5 - Read the code:**

You now understand why all the different services exist, you understand how they all communicate and you understand roughly what classes or files exist inside a particular code base. Now it's time to understand the implementation details.

As you did in tip #4, start with the tests. Work your way inwards, but this time pay attention to the specifics of what makes these tests pass, which is the implementation detail.

This is great because rather than focusing on learning a huge codebase all at once, you focus on learning the implementation details of a method. Then that method becomes learning the implementation details of the other methods in the same class, until you've seen and read it all.

Rinse and repeat this process. Tackle the codebase like you would a jigsaw, complete one corner, then the other and eventually it will all come together. Those of you who are more experienced, may also spot refactoring opportunities as a pair of fresh eyes, take a note of these.

Divide and conquer.

**Tip #6 - Look at past commits/pull requests:**

Did a feature being implemented by your colleague mentioned during your daily scrum sound interesting? Look at how they implemented it, what do you think? Look where they placed certain bits of logic and their overall approach. If you are unsure about anything, ask.

Were there any PR comments about the implementation from other colleagues which may contain hidden gems of things you should know about to do with the codebase? If not the codebase, then the conventions used within it?

**Tip #7 - Pair programming:**

Obviously, working with a developer who is more familiar with a codebase or even potentially more experienced than you, will help you and significantly speed you up at the start of your new journey. However I believe there is another benefit than just purely technical and what you usually get in terms of benefits of pair programming.

We can all read code and eventually understand it, but the code doesn't always tell the full story of a piece of software. Some of your colleagues may have been amongst the original authors of a codebase or regular contributors. Whilst you pair, they may provide extra insight in to decisions that were made months ago, relevant to the work you're currently implementing. These decisions could be the use of certain libraries or opting to use a certain design pattern for example.

**Tip #8 - Break the code:**

As you're learning a codebase, you most likely have it pulled down on to your machine by now.

Try to implement a feature on the backlog for next sprint, this way you don't have the pressure of a looming deadline to meet, or just try to change or refactor the existing code around and see what happens.

Note that I'm not saying you should actively seek to do work... outside of work. You can come up with your own use case/user story if you wish instead of picking something up off the backlog for next sprint.

**Tip #9 - Take notes:**

I use the notes app on my Macbook as it allows me to copy and paste code snippets to refer back to, however there's also nothing wrong with a good old fashioned notepad and pen. Chances are, if you've written something down, others will probably want it documented too. This brings us nicely to our final tip...

**Tip #10 - Reflect back on yourself:**

What else did you struggle with during the onboarding/codebase learning process? Do something about it and make the next new developers onboarding experience better than yours.

## Learning new technologies:

**Tip #1 - Online courses:**

Consider a Pluralsight subscription, a Udemy course or a simple search on YouTube.

Dedicate a day or two towards learning the basics. Remember that you don't need to be an expert and that as a new developer, you ARE expected to learn on the job.

Aim to know the basics and the rest will come with time and through applying what you already know from other technologies.

**Tip #2 - Cheat sheets:**

Write your own cheat sheets for each technology that you can refer back to. I like to just create a bunch of private repositories on my GitHub and write the cheat sheets using markdown in the `README.md` files.

Different people will want different things out of their cheat sheets. We all think slightly differently and as a result may prefer different formats of things to refer back to when we are stuck.

I end up writing cheat sheets that encapsulate a load of snippets of doing basic things. An example of this could be what a simple snippet of a functional React component looks like that deals with a simple use case such as with an onClick handler.

**Tip #3 - Build something:**

...without using a tutorial in your own time. Do not fall in to tutorial purgatory and keep it simple.

In conclusion, these are the tips I'd have given myself 6 months ago. Are there any tips you think I may have missed out? Let me (and all the other developers who will come across this post) know in the comments below.

Thanks for reading!