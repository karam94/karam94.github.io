---
title: A trick to clean up your .NET Web API controllers!
date: 2019-01-04
published: true
tags: [".NET Core"]
series: false
cover_image: ./images/emin-baycan-LV1CxYBgXqU-unsplash.jpg
cover_image_credits: Emin BAYCAN https://unsplash.com/@aimlesscode?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
canonical_url: false
description: "Love clean looking code? Love C# & .NET? This might help!"
---
<figure>
    <img src="https://pbs.twimg.com/profile_images/531202538360414208/f_3aOvZe_400x400.png" style="display: block; margin-left: auto; margin-right: auto; width: 350px;"/>
    <figcaption>Image Source: https://twitter.com/dotnet</figcaption>
</figure>

Firstly, I want to say that I hope everyone reading this enjoyed their time off for Christmas & the New Year! Bring on 2019! This might also explain why I haven't posted since mid-December, however I do plan on catching up with an update on my December development goal discussed [here](http://www.karam.io/2018/AdonisJS-a-match-made-in-heaven/), so if you're interested, keep an eye out for it!

## What's this post about?
I'm a bit OCD when it comes to writing clean looking code. I'm a big advocate of the [KISS principle](https://en.wikipedia.org/wiki/KISS_principle) in both software development and the real world. Note that "clean code" is relative terminology, so make of it what you will.

Whilst I do understand that sometimes you can't keep everything looking neat, tidy and simple... I think a big reason why a lot of us C#/.NET developers love our ecosystem is because of how neat, tidy and simple it is (well, sometimes).

What I mean by this is that when you start writing a .NET Web API, things start well. You use attribute routing because things look "cleaner" and more obvious at instant sight.

What do I mean by "obvious at instant sight"? Well, with most of the code I write, I always ask myself... if I or someone else came back to this and glanced at it in 6 months time, would it take them long to comprehend exactly what is going on? If the answer is yes, then I've not done my job well enough depending on the complexity of the scenario at hand.

So, you start writing your API. Your controller methods are nice and small, but then you realise you probably need to add a logging framework such as [Log4Net](https://logging.apache.org/log4net/) and a bunch of try catches in places... and suddenly your method that was three lines tall, is eating up about 15 lines of your controller and the OCD starts kicking in.

## Well, I can think of a few ways to solve this problem?
You probably can. So share how you go about solving this problem yourself in the comments below!

## So Karam, what's your trick?
I create an extension class for the ApiController class that looks something similar to the below.

```csharp
    public static class FuncExtension
    {
        public static Action AsFunc(this Action action)
        {
            return action;
        }
    }

    public static class ApiControllerExtensions
    {
        private static readonly ILog Logger = LogManager.GetLogger("Application");

        public static IHttpActionResult TryCatchLog(this ApiController apiController, 
        Action func)
        {
            return TryCatchLog(apiController, func.AsFunc());
        }

        public static IHttpActionResult TryCatchLog<TResult>(
        this ApiController apiController, Func<TResult> func)
        {
            try
            {
                var response = apiController.Request
                    .CreateResponse(HttpStatusCode.OK, func());
                // Return your response...
            }
            catch (Exception e)
            {
                Logger.Error(e.Message, e);
                var response = 
                    apiController.Request
                    .CreateResponse(HttpStatusCode.InternalServerError, func());
                // Return your response... 
                // Define your error status code based on exception type 
                // caught perhaps?
            }
        }
    }
```

By creating an Extension class of the ApiController class, all my API Controllers naturally then inherit my TryCatchLog method that allows any sort of function to be passed through to it as a parameter.

This will then allow my Extension class to execute the passed through function, within a try catch statement, logging errors most importantly WITHOUT me having to re-write duplicate try catch statements and logging code within my controllers.

As a result, my controllers then look nice and clean like so:

```csharp
    [RoutePrefix("api")]
    public class CatController : ApiController
    {
        private readonly ICatFeeder _catFeeder;
        private readonly ICatStroker _catStroker;

        public CatController(ICatFeeder catFeeder, ICatStroker catStroker)
        {
            _catFeeder = catFeeder;
            _catStroker = catStroker;
        }

        [HttpGet]
        [Route("feed")]
        public IHttpActionResult Feed(string name)
        {
            return this.TryCatchLog(() => _catFeeder.FeedCat(name));
        }

        [HttpGet]
        [Route("stroke")]
        public IHttpActionResult Stroke(string name)
        {
            return this.TryCatchLog(() => _catStroker.StrokeCat(name));
        }
    }
```

See how much cleaner that now looks without duplicated code everywhere?
Nothing spectacular, but much cleaner! Hope it helps!

Do you do something similar? Let me know what you do in the comments below.

Thanks for reading!