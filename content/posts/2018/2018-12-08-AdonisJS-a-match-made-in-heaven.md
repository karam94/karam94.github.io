---
title: AdonisJS, a match made in heaven?
date: 2018-12-08
published: true
tags: ["AdonisJs"]
series: false
cover_image: ./images/nghia-le-V3DokM1NQcs-unsplash.jpg
cover_image_credits: "<a href='https://unsplash.com/@lephunghia'>Nghia Le</a>"
canonical_url: false
description: "Discussing our challenge for December 2018..."
---
<figure>
    <img src="https://cdn-images-1.medium.com/max/1600/1*h13YbzArlrQwRSGi2CM9cA.png" style="display: block; margin-left: auto; margin-right: auto;"/>
    <figcaption>Image Source: https://adonisjs.com/</figcaption>
</figure>

Adonis is a name that will probably ring some bells. To cut a long story short, to most it will remind them of the god of beauty and desire, as popularly known in Greek mythology. However a fact that many do not know is that Adonis was actually originally a god worshipped in Phoenicia that then later got adopted by the Greeks.

Now the trick here is that Phoenicia is actually what we refer to as, modern day Lebanon. Those who know me closely (which I guess now includes you - avid blog reader) will know that my parents both originate from [Lebanon](https://en.wikipedia.org/wiki/Lebanon) and as a result, it is a place I love and visit often. Whether or not however, I actually have any ties to the Phoenicians is up to you to figure out - good luck!

The real question at hand though is whether or not this means that myself and Adonis could end up being a match made in heaven... the Node.js framework of course, not the god (admit it, my pun using the word heaven was pretty decent there).

<figure>
    <img src="https://media.giphy.com/media/wWue0rCDOphOE/giphy.gif" style="display: block; margin-left: auto; margin-right: auto;"/>
    <figcaption>I apologise for my dreadful sense of humour.</figcaption>
</figure>

Regardless, I see it as a sign to use this month to brush up on a Node.js web framework I played around with just over a year ago - [AdonisJS](https://adonisjs.com/). In fact, [here](https://github.com/karam94/adonis-v4-blog) is a link to a blog project I worked on back when AdonisJS was still in version 3. 

At the time, version 4 was still in pre-release and I decided to convert the "Getting Started" tutorial for version 3 where users build a blog, to use the new version of the framework. Examples of changes from version 3 to version 4 include new ES6 features such as the async keyword, using [Edge](https://edge.adonisjs.com/) over [nunjucks](https://mozilla.github.io/nunjucks/) for a view templating engine and lots [more](https://adonisjs.com/docs/4.0/upgrade-guide)!

## Why AdonisJS?
I've always told myself that I'd dedicate some time to getting stuck in to version 4 once it's released - and to be fair, it's been available for a while - but I've just never gotten round to it. Given that I should have some free time over the Christmas period, it seems like a good choice to try it out again and build something with.

Adonis aims to be the [Laravel](https://laravel.com/) or [Ruby on Rails](https://rubyonrails.org/) of the hectic Node.js world. It comes with its own CLI, authentication packages, its own ORM meaning you can hook it up to your favourite SQL database (I think it might have MongoDB support too) with a breeze and even testing support. Pretty phenomenal considering the guys behind it all, don't even work on it full time (but would do if they got paid enough, so the framework isn't dead by any means!).

I'll dedicate a post in the future to looking at AdonisJS in more detail and once I've used it a bit more!

## What are we building?
Quite simply, I want to build a small web application that allows users to register, log in and post links to articles where they can also describe them under either preset categories or preset hashtags. 

I want to build it completely using AdonisJS with views based on the built-in templating engine, Edge, however depending on feedback of the MVP, might end up making next months goal, converting the project in to an AdonisJS API and creating alongside it a VueJS front-end that is a bit more interactive. The overall idea is that people can then eventually subscribe to specific categories or hashtags and that defines what their feed looks like when first logging in.

The project idea is something I actually want to introduce at work, where people of different roles within our IT department - so this includes front-end developers, back-end developers, business intelligence developers, business analysts, etc - can share interesting articles they have read within an internal feed and potentially even 'like' them and leave comments on them. It's a knowledge sharing exercise really.

As developers in particular, we tend to dedicate a lot of time towards reading interesting articles but tend not to share them with our colleagues who would also benefit from them - or if we do, do it to our closest colleagues and forget about the developers in other teams and even offices.

People who register - ideally I want to avoid needing people to register, but I'm unsure at the moment how I can go about linking windows active directory with a Node.js project - will then also receive a weekly e-mail newsletter containing the top 5 articles/links they should check out. There's a chance I might just write a small API in .NET Core that can figure out who the user logged in at work is, I need to look in to it.

For the sake of the MVP, I will most likely just check that the e-mails being registered have the correct @email.com suffix and have a confirmation e-mail on the go.

## What are we using?
In case you haven't noticed by now, I'll be using AdonisJS. I also want to use [Bulma](https://bulma.io/) for the front-end as it's something I've used before but only as part of a rushed migration away from Bootstrap 3. I will probably host it either on Heroku or DigitalOcean until it has surpassed the MVP stage and there is enough demand for it at work to merit going on our own work AWS servers. I'll also be using [Laravel Mix](https://github.com/JeffreyWay/laravel-mix) to deal with all the [webpack](https://github.com/webpack/webpack) black magic I will need. That is pretty much all I can think of for now.

## What I'm not looking forward to?
Debugging. I don't have much experience in the back-end world of Node.js so a learning experience out of all of this will certainly be trying to sort out debugging in Visual Studio Code because as we know, the exceptions will probably not point to much! Also due to JavaScript in general being a dynamically typed language (it took me 10 minutes earlier to realise the reason something wasn't working was because I was calling the encoreURIComponent method instead of the encodeURIComponent method and obviously Visual Studio Code wasn't pointing this out, nor the exception page) I might also give [WebStorm](https://www.jetbrains.com/webstorm/) a shot as I've been recently using [Rider](https://www.jetbrains.com/rider/) for my .NET development at work and am loving every second of it.

## Anything else?
I don't expect to actually start working on the project until I've gotten up to scratch again with the framework which will take a week or so. But either way, it should be a fun challenge and one we come out of having hopefully created something cool. As always, the source code will be made available on my [GitHub](https://github.com/karam94) just as my [first and previous project as part of this monthly challenge](http://www.karam.io/2018/November-2018-Best-thing-since-bread/) I'm doing.

Thanks for reading!