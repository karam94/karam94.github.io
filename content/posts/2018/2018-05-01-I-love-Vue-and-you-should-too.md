---
title: I love Vue & you should try it too!
date: 2018-05-01
published: true
tags: ["Vue.js"]
series: false
cover_image: ./images/caspar-camille-rubin-0qvBNep1Y04-unsplash.jpg
cover_image_credits: "<a href='https://unsplash.com/@casparrubin'>Caspar Camille Rubin</a>"
canonical_url: false
description: "Those of you who know me, know that I love Vue.js. Oh and before you ask, yes I have experience with other front-end frameworks. And yes, my exposure and usage of these other front-end frameworks did infact come before my exposure to Vue, so by no means did I approach other frameworks with a pre-conceived or biased mindset."
---
<figure>
    <img src="https://raw.githubusercontent.com/karam94/karam94.github.io/master/assets/images/lovevuejs.png"/>
</figure>

Those of you who know me, know that I love [Vue.js](https://vuejs.org/).

Oh and before you ask, yes I have experience with other front-end frameworks. And yes, my exposure and usage of these other front-end frameworks did infact come before my exposure to Vue, so by no means did I approach other frameworks with a pre-conceived or biased mindset.

In fact, I love Vue so much that I somehow managed to magically rub that very same love on to my boss at work who now also loves Vue.

*(Disclaimer: No actual physical rubbing took place... unfortunately.)*  

At work, the majority of our front-end development is done using [React](https://reactjs.org/) or [Inferno.js](https://infernojs.org/) as far as I'm currently aware at the moment. Although we do have older assets written in [Knockout.js](http://knockoutjs.com/), [AngularJS](https://angularjs.org/) and [Angular](https://angular.io/) - because those were *apparently* the right choices at the time in the ever changing opinionated world of JavaScript frameworks.

Now, this isn't an article where I'm going to try and sell Vue to you, nor convince you that it is better than the alternatives out there. In fact, on the contrary, I actually just wish that people belonging to all schools of thought would embrace the fact that it is perfectly normal for people to have different preferences and that this diversity of opinion makes software development as we know it today, as fascinating as it is. 

I like gravy with my fish and chips yet some people prefer curry sauce... who cares? 

*Note: If you do actually prefer curry sauce to gravy, then there is seriously something wrong with you... I can't explain why, but I probably either read it on a Medium blog post somewhere so it must be right or I have a strange biased pre-conceived mindset because I'm a Northerner, right? No, wrong. Or does that then make it right because two rights cancel out the wrong? I have no idea. Let's just agree to disagree. I have no idea what I'm talking about.*

In this post, I'd like to politely rant and address a few issues that I have had sat on my chest for a while and admittedly they are unfortunately linked to conversations or reactions (no pun intended, I promise) I have had from other fellow developers in the past, when finding out that we have chosen to use Vue.js extensively within our development team and that it is my personal favourite. 

Do also note that I am pre-dominantly a back-end developer, the same goes for everyone else in my team. So by no means are any of us JavaScript experts like one might expect a front-end developer to be, who probably eats, sleeps and drinks it. This may or may not - depending on your opinion - provide further insight as to my preference of frameworks.

## I don't like JSX. Change my mind?
<img src="https://i.imgflip.com/29mgnr.jpg"/>

That's right. I don't like JSX. 

*Note: this is usually the point where the React fanboys start to get defensive...*

But EXACTLY here is where my issue lies.

Some people like Razor, others prefer Pug, some prefer Blade or some other of the trillion templating language things there are out there... meanwhile believe it or not some of us would rather just do it the hard way and write standard HTML! I'm not saying JSX is merely a templating language, it is far more than that. But if you're open minded enough, you should be able to comprehend my analogy.

So why is it a crime to some, when someone says they don't like JSX?

Vue let's me write my templates in standard HTML using AngularJS-like directives. I can assign my div tag a class, like I always have done, since the dawn of time. I don't want to use className instead or have my code cluttered with what looks like inline styling everywhere or have functions that return bits of strange HTML-ish JSX things. 

While many will argue there is something wrong with this, I won't. I can see why people like it. I just... personally don't and I'm not ashamed to say so. Because there is no right or wrong answer. It's down to preference and in a way, we're blessed to have so many different options available to us to develop our dreams with.

Yes, Vue allows me to sprinkle magic on top of my HTML... but it's still plain, standard HTML and writing it just seems to come more naturally to me and as a result I build my applications faster without anywhere near as much overhead. Particularly if I'm using something like Bootstrap where using an actual Bootstrap component library seems overkill.

For example, in my opinion if one were to compare a Vue single file component to a React component, the former is easier to understand at first glance and I think this is important given that as we know, code is read significnatly more than it is written.

I am willing to concede though that the ease of reading the components could be linked to general JavaScript/front-end wizardry competency and thus why I as a back-end developer, lean more towards the opinion I do.

I'm also not going to sit here and lecture you about separation of concerns and all the other arguments that people use to moan with for and against JSX, because to be frank, I don't really care anymore. Use what makes you happy and let me use what I enjoy. Just don't lecture me about why my choice is significantly inferior, then when I ask you if you've actually sat down and tried to use my so called inferior preference... you answer with no.

If I have to work in a React environment, I'm happy to use JSX if I don't have much of a choice. In fact I'm happy to work with whatever JavaScript framework you throw at me. As long as you have the "JavaScript" part nailed on, you should be able to pick 'em all up with relative ease in terms of the actual basics. Getting your head around state management might take a bit more time and we address this in the next section of this post.

For example, while I do most of my back-end development in C# nowadays, I can easily switch to PHP or NodeJS (which I do regularly) without breaking too much of a sweat. Especially if what is being developed is a simple MVC-ish API. Yes you're using different frameworks but the core concepts remain the same and the subtle differences such as dealing with a different ORM, are minor.

We are software developers with preferences. Not React developers, Vue developers or whatever nonsense people come up with nowadays.

## I don't like Redux. Change my mind?
<img src="https://i.imgflip.com/29mj63.jpg"/>

That's right. I don't like Redux.

I love how powerful state management is in front-end frameworks, allowing us to build amazing user interfaces and experiences with ease.

Being a back-end developer, I also understand the importance of immutability and why it provides an extra barrier of security etc. I understand why we never directly modify state and if we do, Jon Skeet partnered with Mark Zuckerberg will come to us in the middle of the night, dressed up as grim reapers and put us out of our misery. Yes, I understand without it, bad things can happen.

However, can we not still achieve the same outcome without having to pretend we're trying to solve the Middle Eastern crisis every time we want to change something within our state? 

The whole process to me of modifying the immutable state object, in Redux isn't a process I particularly enjoy working with. My project ends up having too much boilerplate code. It's a process I can work with if I really have to, but I'd rather not if I have a choice.

On the other hand with alternatives - such as Vuex - I can define a bunch of stores, with mutations and with one simple line just call a mutation and pass it some data which in return modifies my mutable state.

*(yes, that's right. I said mutable.)*

This on a high level, is a similar concept to dispatching an action using Redux to our store and then our reducer which contains our logic on how to manipulate our immutable state is executed.

IS IT REALLY A CRIME THAT VUEX STATE IS MUTABLE?

Can we please, please, please stop kidding ourselves that Redux is the be all and end all just because of the immutability it brings to the table? Rather instead, we should be asking and answering the question of why Redux uses an immutable state, determine whether we really need it for our projects, what benefits it adds and whether the lack of these benefits in a mutable environment such as with Vuex does actually leave us vulnerable.

For example, while one could argue that theoretically our Vuex state is mutable because of what we do within our mutations... you still can't actually change your state without executing a mutation to your Vuex store. In fact, Vue throws an error if you try to make modifications to the contents of your store outside of doing so through a mutation.

```javascript
Error: [vuex] Do not mutate vuex store state outside mutation handlers.
```

Is this impure level of immutability (if we can call it that) still not good enough? Or are we going to just keep pretending blindly that Redux is the only acceptable way of doing things because immutability is a big word and for some reason agree to live in fear and paranoia for the rest of our lives, despite having the protection of the mutations?

Can we not just accept that there are in fact different ways of achieving the same thing and that it's okay for different people to prefer different options and that the lack of direct pure immutability with Vuex isn't actually a problem? Last time I checked, we managed state just fine before Redux came along!

*Note: You can still use Redux with Vue by npm-ing or yarn-ing in many of the available plugins out there.*

I know that we can put multiple Redux actions in one file to reduce the amount of noise or once our application grows legs, separate and group actions in to several files. But it just seems more intuitive to me and cleaner to create several Vuex stores with different concerns, all of which just contain the mutations they need. It also means less boilerplate code than when using Redux.

But you know what? Hey, this is my opinion and my brain could be wired a little differently to yours. I don't need anyone to convince me otherwise.

Either way, regardless of which you prefer, can we at least come to agreement that there is no right or wrong answer as long as we both find a way to achieve the same goal? Am I committing a crime by preferring Vuex though? No, I don't think so. Different developers, prefer different things. The world would be a much better place if we embraced frameworks as... frameworks, as opposed to religions or extreme ideologies by which we are somehow indoctrinated within.

Apologies if I seem a bit over the top, but it's exactly how many of those who sit and justify the React/Redux stack to me come across. Unable to justify why they believe what they do, but somehow they are always right and anything or anyone that goes against what they say to do with this topic, is wrong.

## I like Vue.
That's right. I like Vue.

*In case you haven't quite noticed that yet.*

I remember taking my first Vue course and thinking, I know AngularJS and React already. Am I wasting my time here?

One of the first things the instructor said was, imagine you took all the awesome chromosomes out of React and then took all the awesome chromosomes out of AngularJS - granted this is subjective - put them together and went on to create a baby framework out of them using all of those finger lickin' good genes. 

Well, turns out Vue is that baby.

I was intrigued and carried on watching, playing about with the framework, wrote a twitter clone & more... and here I am.
I can go on for longer on reasons as to why I prefer Vue over others, infact I might do in a future blog post. But I think the real point here is that, I ENJOY Vue and therefore use Vue where I see fit to do so.

As Software Developers, I think we get attached to not just our own code or general way of doing things, but our feelings can be affected significantly by our development process. We all have certain languages or architectures or frameworks or whatever, that we naturally incline towards for some reason enjoy working on because they just click with our minds and we crack on and become really productive. C'mon, you know that feeling I'm talking about. This feeling is different for different people and I just seem to get that with Vue.

## I get it, you like React. Please stop telling me about how bad Vue is, without evidence.
I've had it before. Person X walks up to my desk for a chat, notices I'm in Visual Studio Code.

"Oh, are you doing React? Wait that looks different...

*It's roughly around this moment that the 'import vue' statement is spotted.*

"Vue? Why are you using that? That's not a proper JavaScript framework. (*what exactly does that even mean?*) I heard/read it's X, Y & Z. Use React instead.

*This is roughly the point where I question their beliefs in an open minded, intrigued manner.*

"Err... It's not scalable.

*(SCALABLE? WHAT IS THIS? SERVERLESS ARCHITECTURE? Stop with this nonsensical pulling at straws. Yes, this is seriously a reason given to me once by a front-end developer who prefers React.)* 

"Does anyone even hire for it or even use it? Isn't it just maintained by some guy in his bedroom? You'd even be better off going with Angular, it might be old but at least it's backed by Google."

*This is where I ask them why it isn't scalable - which of course, they do not answer - and proceed to ask them if they've even tried to build a serious Vue application and they answer with no.*

*This is where they then proceed to change the subject.*

Rant over.

But seriously. I'm not here trying to say Vue is the best or brainwash you in to my wicked ways. I really just wanted to get this rant off my chest, take it or leave it. 

If any of this article resonates with you and you're not the Vue person... then please give it a chance before drawing conclusions on it. Be a person of your own opinion and stand up for it rather than just being a sheep for the sake of it, particularly when you haven't actually tried the alternatives for yourself. 

If you're going to comment on Vue, do so if you've genuinely tried it and deduced an opinion that way. Don't follow the masses blindly. Don't let trends define you or your developer habits or preferences, do what feels right to you, do what you enjoy and what helps make you be the most productive and happiest developer you can be.

If you still then dislike it or prefer alternatives, don't hate on others who don't share your point of vue.

Make love, not war.

Peace ✌