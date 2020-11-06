---
title: The Micro Frontend Conundrum
date: 2018-11-17
published: true
tags: ["Software Architecture"]
series: false
cover_image: ./images/job-savelsberg-TY1_ppdFUKc-unsplash.jpg
cover_image_credits: Job Savelsberg https://unsplash.com/@jobsavelsberg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
canonical_url: false
description: "When your frontend becomes a monolith..."
---
<figure>
    <a href="https://micro-frontends.org/ressources/diagrams/organisational/monolith-frontback-microservices.png">
        <img src="https://micro-frontends.org/ressources/diagrams/organisational/monolith-frontback-microservices.png"/>
    </a>
    <figcaption>Image Source: https://micro-frontends.org/</figcaption>
</figure>

To be fully honest, I had absolutely no idea what to write about this week.

It's annoying because I think I had some ideas floating about in my head earlier in the week, but on this cold Saturday afternoon, my brain seems to have switched in to weekend mode.

Despite that though, it won't stop me from grinding something out there and keep myself on target towards writing at least one blog post per week. So I've decided to write about a bit of a frontend struggle I've been having recently - as you can probably guess from the title of this blog post.

To quickly summarise, micro frontends is the name that [ThoughtWorks](https://www.thoughtworks.com/radar/techniques/micro-frontends) (I think?) came up with in reference to the concept of trying to apply a micro services-like structure in, you guessed it, the front end layer of single page applications.

The reason why it is suddenly a relevant concept to me is because over the past few months, one of my on-going tasks at work has been to re-write a legacy web application that revolved around some sort of .NET/KnockoutJS stack - which to be frank, gave a headache to anyone who entered that codebase, which might explain why nobody bothered treading anywhere near it for years (disclaimer: this is not a dig at .NET or KnockoutJS... this is a dig at letting applications get in a hideous, unloved state in the first place) - in to a more maintainable web application that was generally a much cleaner, modern and maintainable .NET based codebase, integrated to use our newly written in parallel backend microservices and used Vue for the front-end.

This project however soon began to grow legs and what began as a simple web application that removed a monolith of the past, suddenly started to smell of monolith itself.

It was fresh, it was shiny, it was new. Our end-users loved it. 

So obviously, having become spoilt, they started to ask for a lot of their other older legacy applications to be rewritten and moved in to the same application. This way they would have one base application from within which they could do everything. As a developer who tends to follow orders, this was done and to be frank, at the time I didn't realise the animal that I had become.

<figure>
    <div style="text-align: center">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/xqds0B_meys" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    <figcaption>Three Days Grace - Animal I Have Become</figcaption>
</figure>

Fast forward three months, our end users had what they wanted. We had developed our fancy microservices in the backend - but our frontend had become... a monolith. The exact thing we were trying to move away from, in the first place.

Am I over exaggerating? Yes. Because Vue is lovely and we've separated our components similar to how John Papa suggests to do so in his [AngularJS styleguide](https://github.com/johnpapa/angular-styleguide) by applying the LIFT principle. So really, everything is pretty straight forward to find and it isn't the end of the world just yet.

However, it is easy to see how the frontend could continue to grow legs and eventually one day become an actual monolith. 

I always like to think ahead and this was what triggered the search for a solution - given that we are not frontend developers, this is alien territory for us.

A colleague suggested potentially splitting out frontend elements and using iFrames to display them and whilst this coincidentally is a method by which some people according to Lord Google consider when facing this problem - for obvious reasons, it isn't the cleanest of potential solutions.

I then discovered the concept of Micro Frontends which in theory would allow us to split our frontend to match the backend microservices they consume and then essentially, this new "web app" becomes a middleman that merely links functionality together to allow the end users to use it and gain access to the numerous views which in this case are the micro frontends. Going down this route would also mean that each micro frontend could also be deployable individually and easily also opens the door for different components within the middleman "web app" to be written in other frameworks if required in the future.

<figure>
    <a href="https://agileforall.com/wp-content/uploads/2016/06/vertical-vs-horizontal-slices.png">
        <img src="https://agileforall.com/wp-content/uploads/2016/06/vertical-vs-horizontal-slices.png"/>
    </a>
    <figcaption>Image Source: https://agileforall.com/vertical-slices-and-scale/</figcaption>
</figure>

So for example, when one is given a large, heavyweight monolith, the best way to move away from it - in my opinion - is to try and [vertically slice](https://agileforall.com/vertical-slices-and-scale/) bits of functionality away from it, bit by bit. Slice, test, refactor, test and on to the next slice. 

As can be seen from the image above, the vertical slice should also contain the UI layer but most of the time, that slice of the UI layer just gets dumped in another newly written horizontal UI slice. I'm comparing backend microservices here that become their own lightweight, individually deployable entities as a result of the move from the monolith with their associated UI entity that tends to get thrown in to a larger - even if newer - UI project. Sound familiar? Probably will do if you work on single page applications with a complex backend (note that split microservices can be as simple as numerous of APIs the single page application calls for different use cases/separation of concerns).

Like microservices in the backend, it is up to you to determine when going down this route is overkill and when it comes with benefits and is worth implementing.

So I started brainstorming possible ways of going down the micro frontend route:
1. iFrames - Probably the easiest to implement, however sharing state between different applications within the different iFrames will probably be difficult.
2. JavaScript/Client Side Injection - This is an idea I had where the micro frontend applications and their dependencies are loaded and injected on the fly using JavaScript within the parent application. E.g. The micro frontend is accessible via a domain and we can therefore embed the source in to the parent application.
3. Backend Injection - This is similar to idea 2 except instead of fetching the content of the micro frontend applications on the client side, do it in the backend and inject it in to the view from the server side.
4. NPM Packages/Components - The idea here is to make each micro frontend available on an internal NPM server and then simply import them in to the parent application. This way the components should not only have access to the Vuex store but you can also pass props to the components too.

Now the truth is, I still don't know which of these four approaches is going to be the best for us to use. I plan on dedicating time over the Christmas break at work during the code freeze to test this out locally.

If anyone reading this has gone down this route before, I'd love to hear about your findings.

My main concerns at the moment are with regards to whether or not if I were to go down approaches 2 or 3, if the injected micro frontends would have access to the contents of the existing Vuex store in the parent application. If not, how would I go about at least passing what I'm interested in as a prop? Which is why I'm inclined to go down the route of refactoring a lot of our components which we would define as worthy of becoming a separate, deployable micro frontend to depend on values passed in via props than values that already pre-exist within a Vuex store.

It's all a world of unknowns at the moment, but one I'm really looking forward to getting my head around and I will of course, write a follow up post as soon as I've tried things out!

Thanks for reading!