---
title: The best thing since []bread?
date: 2018-11-25
published: true
tags: ["Go"]
series: false
cover_image: ./images/jude-infantini-rYOqbTcGp1c-unsplash.jpg
cover_image_credits: Jude Infantini https://unsplash.com/@easy_emu?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
canonical_url: false
description: "Our monthly challenge for November 2018 is complete..."
---


<figure>
    <img src="https://raw.githubusercontent.com/karam94/karam94.github.io/master/assets/images/karam-gopher.png" style="width: 400px; display: block; margin-left: auto; margin-right: auto;"/>
    <figcaption>Image Source: https://gopherize.me</figcaption>
</figure>

Those of you reading this may have come across a previous post titled ["My 24th birthday developer resolutions."](http://www.karam.io/2018/My-24th-birthday-developer-resolutions/), where I touched on my goal of working towards the completion of a new project every month for the next 12 months (until my 25th birthday) with the sole aim of either learning something new or just generally play around with something to broaden my horizons in software development.

I don't want to say the goal was to "learn" [Go](https://golang.org) as such, since a single month doesn't do any programming language justice and can't be mastered over a single year, let alone a single month. However it was more to just expose myself to the language and try it out - as it has been recommended to me by a few colleagues in the past - and to of course, build something with it. In this case, the goal was to build something I needed, which is some sort of automated application [that allows Twitter users to delete all past tweets that contain a list of swear words or instead delete all tweets prior to a specific date](http://www.karam.io/2018/My-24th-birthday-developer-resolutions/).

Here we are two weeks later and the deed is done. It's important to note that the source code to the two projects I have linked to below is by no means perfect or production ready and they certainly have room to be refactored and improved. A very simple example to what I mean being how the web application has inline CSS styling within the views.

General shoutout to [Dalton Hubble](https://github.com/dghubble/go-twitter) for his easy to use Go client for the Twitter API and OAuth libraries.

## The Prerequisites
For the console application project, you require two comma separated value files. One which is your twitter accounts archive that can be found under Settings > Account > Content > Request your archive and another which contains your [dirty words](http://www.bannedwordlist.com/). For the web application, it is written with the assumption that the host will have predefined the swear words, meaning you only need your twitter archive.

You also need a [twitter developer account](https://apps.twitter.com/) for the OAuth. The console application uses an OAuth 1.0 approach and the web application uses an OAuth 2.0 approach. There's no specific reason for this except wanting to try out both and using it as an excuse to learn more about the difference between the two. You can set up your values in your environment config for either of the two applications.

## The Console Application
Upon running the application, you have the option to specify the date you want to delete tweets before followed by the opportunity to specify if you want to bulk delete all tweets prior to the specified date, or only those that contain swear words.

If you've looked at the source code, you'll have noticed that I used a library from [Valere Jeantet](https://github.com/vjeantet) called "jodaTime". If you have any sort of slight familiarity with Java, you'll probably be reading this with a smirk on your face. Yes, we've all been there. Java's default date and time library (java.util.Date) gave me nightmares once upon a time too.

However unfortunately for someone like myself who has been spoilt working in predominantly C#/JavaScript stacks over the past few years when it comes to dealing with dates and times, I found myself rolling back the years with Go's idea of using layouts to format dates and times and to be frank, I couldn't be bothered with it so I pretended I was a Java developer again and used jodaTime.

It is used in two places. One to format the initial before date input by the user and one to parse the mental "yyyy-MM-dd HH:mm:ss Z" format that Twitter delightfully give you when you download your tweet archive.

You can view the [dirty-tweets-deleter project on GitHub here](https://github.com/karam94/dirty-tweets-deleter).

## The Web Application

<figure>
    <img src="https://raw.githubusercontent.com/karam94/karam94.github.io/master/assets/images/dirty-tweet-deleter-screenshot.png" style="width: 700px; display: block; margin-left: auto; margin-right: auto;"/>
    <figcaption>The logged in Dirty Tweet Deleter UI.</figcaption>
</figure>

The main difference in functionality between the web application and the console application is that the web application limits you to deleting only tweets that contain swear words. If you wish to fork the repository, build on it a date UI or whatever takes your fancy, go for it. However, if I was actually developing a web application around this idea seriously, I would probably refactor the logic in to a Go based API and go for a SPA for the UI. The main motivation behind this is because if someone has a lot of tweets, it can take time to delete them all and with this approach it becomes more straight forward to provide the user with real time visual feedback.

The web application also requires users to login by allowing the app permissions to read their tweets, like most third party twitter apps. In order to use this, I used [Mark Bates's](https://github.com/markbates) goth package which I believe is probably the most widely used authentication package out there for Go. Again, with these monthly challenges, if I can avoid re-inventing the wheel, I will do.

The only reason I decided to build a web application alternative was because I found that I finished the console application earlier than I predicted and was intrigued to see what working with the popular [Iris Web Framework](https://github.com/kataras/iris) would be like on a very simple scale.

You can view the [dirty-tweets-deleter-web project on GitHub here](https://github.com/karam94/dirty-tweets-deleter-web).

## My Verdict
Firstly, I want to start off by just making it abundantly clear that when I give a verdict at the end of a monthly challenge about a new technology I've used that month, it is merely based on my personal opinion and limited time with that technology. For that reason, if you disagree with anything I say, I welcome you to comment below and constructively tell me why you disagree - because chances are, if you're more experienced with something than I (e.g. in this case, have spent more than 4-5 days programming in Go), your opinion is probably right. Ultimately there is absolutely no point in going through this whole monthly learning process if I'm not willing to learn from my mistakes and be open minded to listen to constructive criticism from others and in the end if we still can't come to agreement, then we can agree to disagree!

### Where is my ternary operator?
Whilst Go does well in some areas to try and make code look cleaner such as removing keywords like public and private (which we'll get on to next...), my code would look a lot more minimal in a lot of areas if we just had an if ternary operator as opposed to having to stick if blocks everywhere. I understand you can define your own if-based function as a ternary function, but c'mon...

"The reason ?: is absent from Go is that the language's designers had seen the operation used too often to create impenetrably complex expressions. The if-else form, although longer, is unquestionably clearer. A language needs only one conditional control flow construct." is the reasoning for the absence of a ternary operator according to the [GoLang docs](https://golang.org/doc/faq#Does_Go_have_a_ternary_form).

```
if expr {
    n = trueVal
} else {
    n = falseVal
}
```

### Identifier visibility...
Those of you familiar with Go will know that to avoid classes having the keywords we've all grown to love - public and private - plastered everywhere, Go uses capitalisation to determine whether a struct or function is public or privately accessible. I admit this is something someone can get used to, but it didn't feel practical to me in some scenarios. For example, if you start off with a private struct identifier which you eventually change to make public (e.g. name to Name), you then have to go and manually change all the instances of it. There might be a magical IDE to do this, but there's a level of practicality that should exist almost by default without having to fork out for something such as a premium IDE or ReSharper license and this is one of them. Another example of a potential issue this could cause is obviously duplicate naming which could cause confusion.

```
//type Tweet struct {
//type tweet struct {
```

### Multiple function return values are cool, but...
When I first realised that Go lets you return more than a single value from a function, I was buzzing. Unfortunately it turned out that this meant functions all return "error" types instead of throwing an exception.

Exceptions are great because they essentially tell you what's wrong most of the time. The issue I found though was that since Go just let me do something such as:

```go
user, err := isUserLoggedIn(ctx)
```

In the scenario where an error actually occurred, in order to then realise an error has occurred, I would have to manually write code to check:

```go
if err != nil {
    // there's a problem, panic!
} else {
    // no error, continue!
}
```

And straight away, you can see why I asked for a ternary operator earlier on! A try catch concept is off the cards due to the lack of exceptions.

### Let me have unused variables!
Surely it results in cleaner code if you don't have loads of unused variables everywhere?!
Well, yes. However sometimes when debugging complex code, you tend to comment out lines of code and so forth.
I don't want to be thinking through a potential bug or problem, comment out a line, hit that debug button only to be met by a compile error because one of the variables I have declared higher up within my file is no longer being used (because the only place it was being used... I commented out).

### Packages...
It's mental that you can quite literally import packages by referencing GitHub repositories. Now, mental isn't necessarily a bad thing. In fact, I can see why this might be a plus to some people. However what worries me is that with no package management features such as versioning, how can I be sure that my code will still work fine for another person when they clone my repository a year on and automatically then end up referencing the same GitHub repositories which have been updated and as a result are no longer compatible with my source code? Can you see where I'm going with this?

Fortunately, I discovered something called [Glide](https://glide.sh/) which tries to paint over the cracks.

### WYSIWYG
Apparently by design - unlike most popular high-level programming languages - the creators of Go purposely aimed to reduce the use of readily available extensible keywords within the language such as the ability to have a generic foreach loop or similar iterator concept. Their reasoning according to Google is apparently to try and keep the code as simple as possible to understand, so that reading Go code is literally, what you see is what you get.

Now, I can live with using the built in for range loop that Go brings to the table as an alternative:

```go
for i, tweet := range tweetsToDelete {
```

However, the issue is that in this case, tweetsToDelete is an array. Arrays in Go are a default data structure defined within the language and therefore we can use the built in range function against it. What happens when I want to iterate through a structure that isn't an array or slice? What happens when I create my own linked list structure and want to iterate through it? Well, you can only use the range keyword for arrays or slices. So you then essentially have to put your linked list structure in some sort of wrapper, that utilises an array to give you access to the range keyword for example. Or, write your own - which seems like a time consuming task that you shouldn't have to be doing in a high level programming language.

### It's a pain to Google (ironically)
Most information or answers to your problems online are referred to with the keyword "Go" and therefore that is what gets picked up by Google's web scrapers and therefore the keyword most pages use to index those websites with. This means that when you search "Problem XYZ Go", you get all sorts of websites returned because the development related ones aren't exactly top of the search engine's list. Even if you search for "GoLang" instead of "Go", you resultantly miss out on a lot of good content or potential sites which address the solution to your problems.

Ultimately, there are pros and cons to most programming languages but ultimately, a language is useless without a strong community of developers and users behind it. This in return generates an abundance of useful discussion and answers to problems that become available online and if people can't get to it, then you have a problem.

## Conclusion
If you've made it this far, fair play to you! To be fair, while I have listed things a bunch of things that I PERSONALLY didn't like about Go during my limited exposure to it, it doesn't mean I didn't necessarily enjoy using the language as a whole nor that I wouldn't use it again in the future. Coming from my specific software development background, I do still strongly feel that I would rather use C#, Java or some other object orientated behemoth for most projects which surpass a certain level of complexity. For example if a project is larger than small, requires several layers such as a persistence layer and requires the use of a data structure that isn't merely an array or slice then it's hard to put Go on top of my list.

However, if I'm working on a small application, particularly if the task is CPU intensive or an API based microservice that does one very small specific thing, then I can maybe see myself using Go for it. I definitely wouldn't use Iris, I'd be looking for a much more barebones framework for an API. Overall, you can go from A to B pretty quickly in the language - providing you have experience in a C-based language - and the testing framework was a breeze to integrate and use.

I also concede that the points I have made may be considered flimsy to some, especially the Gophers among you and that it is possible to nit-pick any language really, so if you're starting to get upset... read [this](http://www.karam.io/2018/I-love-Vue-and-you-should-too/).

As for the project itself, like I said, there is room for improvement in the two repositories and I'll probably dedicate time to refactoring them over a weekend... eventually. If you spot any improvements that haven't quite been made yet or perhaps I've gone against the standard Go convention somewhere, let me know in the comments below.

Thanks for reading!