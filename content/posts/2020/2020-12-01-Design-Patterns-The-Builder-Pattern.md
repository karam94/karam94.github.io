---
title: "Five Minute Design Patterns #1: The Builder Pattern"
date: 2020-11-28
published: true
tags: ["Design Patterns", "C#", "Five Minute Design Patterns"]
series: true
cover_image: ./images/ashkan-forouzani-_Y82jqFIBgw-unsplash.jpg
cover_image_credits: "<a href='https://unsplash.com/@ashkfor121'>Ashkan Forouzani</a>"
canonical_url: false
description: "The first of posts in my blog post series where I try to cover all of the Gang of Four Design Patterns in five minutes each, this time it's one of the Creational Patterns... the Builder Pattern!"
---

*Welcome to the first of my [Five Minute Design Patterns series](https://www.karam.io/blog/tag/Five%20Minute%20Design%20Patterns/) where I take a brief look at a design pattern every week! The reason why I've gone for brief overviews is because I think sometimes, less can be more and not everyone always wants to be drowned in text & UML diagrams. My goal is to keep each one of these a maximum of a 5 minute read as per the calculation that can be seen under the blog title. This post will cover one of the Creational Patterns, namely the Builder Pattern. If you're looking for a post on one of the other of the Gang of Four Design Patterns, you will most likely find them [here](https://www.karam.io/blog/tag/Five%20Minute%20Design%20Patterns/).*

-----------------------------
## A Brief Overview
- The Builder Pattern is a Creational Design Pattern that aims to separate the construction of a **complex object** from its **internal representation**, instead facilitating a single/same construction process that can be used instead to create all of the different representations.
    - **complex object** - an object is considered complex when it can be resembled by numerous permutations, sometimes based on some sort of internal logic, also sometimes referred to as an aggregate. e.g. A car object is the complex object and examples of different representations could be... Silver Honda Civic, Red Honda Civic, Black Honda Accord.
    - **internal representation** - e.g. an object class, within a codebase.

By using this pattern, we can both simplify and refine the object construction process to allow easier creation of different permutations of the complex object, whilst also as a bonus, decreasing any code repetition and increasing code re-usability that may exist otherwise.

There are two common variations of this pattern, namely the Builder Pattern alongside the Fluent Builder Pattern.

## The Builder Pattern vs. The Fluent Builder Pattern
The Builder Pattern will result in a `Builder` class alongside an optional `BuilderDirector` class. Either-or will contain methods that provide constructed objects and using these gets favoured over using the standard object constructor. Think of the `Director` class as an orchestrator that knows how to create pre-defined permutations using the `Builder`. Sometimes as you may have realised by now, you may just want to directly use the `Builder` yourself. In the below example, our `BuilderDirector` contains a pre-defined method that returns a `Car` object pre-configured to match that of a Silver Honda Civic.

```csharp
var carBuilder = new CarBuilder(upgradeInventory);
var carBuilderDirector = new CarBuilderDirector(carBuilder);
Console.WriteLine(carBuilderDirector.BuildSilverHondaCivic().ToString());
```

Obviously it is possible to instantiate a new Car and pass parameters in to the constructor to construct our object, however at scale and with a large number of parameters, this becomes very tedious in a code base where we have to constantly instantiate different permutations of different cars, models, colours, specifications, etc. However on that note, do not go wild and suddenly convert every object instantiation to use this pattern. Use it as a tool, only where necessary.

The Fluent Builder Pattern provides the exact same functionality as the regular Builder Pattern, however with a fluent interface/API to help facilitate the construction process. This makes life particularly easier for developers going forward within the same codebase, particularly if they want to skip the middle man that is the `Director`. 

In the below example our `CarBuilder` is a Fluent Builder and provides us with a fluent interface to configure and create the exact car we want. 

```csharp
var customCar = carBuilder
                    .WithMake(Brand.Nissan)
                    .WithModel("Skyline")
                    .WithNumberOfDoors(4)
                    .WithColour(Colour.Black)
                    .Build();
```

The fluent API is a lot nicer to use and as you see fit, the possibilities to abstract complexity is endless. For example, you could abstract a group of constructor parameters at once if it is logical to do so.

```csharp
var customCar = carBuilder
                    .WithModel(Car.NissanSkyline)
                    .WithColour(Colour.Black)
                    .Build();
```

As a Skyline is always a Nissan and vice versa, along with always having four doors, it is possible to do something as the above. Within the above example, the `WithModel(Car.NissanSkyline)` method on the `carBuilder` somehow has been implemented to know that the enum `Car.NissanSkyline` needs to provide you a new `Car` with the correct brand, model and number of doors.

## A Brief High Level Overview
Whilst UML class diagrams work well for Design Pattern overviews, as I said in the introduction, I'm looking to keep things simple and avoid them throughout this [Five Minute Design Pattern series of blog posts](https://www.karam.io/blog/tag/Five%20Minute%20Design%20Patterns/).

Our Program can optionally depend on a `CarBuilderDirector`.

```csharp
public class CarBuilderDirector
{
    private readonly ICarBuilder _carBuilder;

    public CarBuilderDirector(ICarBuilder carBuilder)
    {
        _carBuilder = carBuilder;
    }

    public Car BuildSilverHondaCivic()
    {
        _carBuilder
            .WithMake(Brand.Honda)
            .WithModel("Civic")
            .WithNumberOfDoors(4)
            .WithColour(Colour.Silver);

        return _carBuilder.Build();
    }

    public Car BuildRedToyotaYaris()
    {
        _carBuilder
            .WithMake(Brand.Toyota)
            .WithModel("Yaris")
            .WithNumberOfDoors(2)
            .WithColour(Colour.Red);

        return _carBuilder.Build();
    }
}
```

Within the below `CarBuilder` class we see one of the main perks of the Builder Pattern at play. We have some business logic that determines whether we can create a `Car` object with a specific upgrade, depending on whether it is in stock or not. 

When not employing the Builder Pattern, we might usually see this sit within the constructor of the `Car` object. Therefore by using a `CarBuilder`, we can separate the complex construction of the object from its internal representation, as per our initial definition of this pattern.

```csharp
public class CarBuilder : ICarBuilder
{
    private Car _car;
    private readonly IEnumerable<Upgrade> _upgradesInStock;

    public CarBuilder(IEnumerable<Upgrade> upgradesInStock)
    {
        ResetBuilder();
        _upgradesInStock = upgradesInStock;
    }

    public void ResetBuilder()
    {
        _car = new Car();
    }

    public ICarBuilder WithMake(Brand brand)
    {
        _car.SetBrand(brand);
        return this;
    }

    public ICarBuilder WithModel(string model)
    {
        _car.SetModel(model);
        return this;
    }

    public ICarBuilder WithNumberOfDoors(int numberOfDoors)
    {
        _car.SetNumberOfDoors(numberOfDoors);
        return this;
    }

    public ICarBuilder WithColour(Colour colour)
    {
        _car.SetColour(colour);
        return this;
    }

    // By using the Builder Pattern, we separate
    // this complex construction logic of the Car object
    // (which is based on whether an upgrade is in stock or not),
    // from the internal representation of the Car.
    public ICarBuilder WithUpgrade(Upgrade upgrade)
    {
        if (!_upgradesInStock.Contains(upgrade)) return this;
        _car.AddUpgrade(upgrade);
        return this;
    }

    public Car Build()
    {
        var builtCar = _car;
        ResetBuilder();
        return builtCar;
    }
}
```

## Conclusion
TL;DR - If you find yourself with a complex object within your codebase that can be constructed in many different permutations and this is leading to lots of large constructors repeated everywhere and more headaches of that sort... then the Builder Pattern might be just what you're looking for.

If you spot any mistakes, do let me know in the comments below.

## Source Code
In order to keep the blog posts within this series short and sweet, I've not dumped all of the source code on the posts. If you want to see the full working implementation of the above and explore it yourself, feel free to get the source code from the link below.

https://github.com/karam94/CSharpDesignPatterns/tree/main/Creational

Thanks for reading! 👋