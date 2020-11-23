---
title: "Advent Design Patterns #2: The Factory Pattern"
date: 2020-12-02
published: true
tags: ["Design Patterns", "C#", "Advent Design Patterns"]
series: false
cover_image: ./images/patrick-hendry-6xeDIZgoPaw-unsplash.jpg
cover_image_credits: "<a href='https://unsplash.com/@worldsbetweenlines'>Patrick Hendry</a>"
canonical_url: false
description: "The second post of our Advent Design Patterns countdown, it's one of the Creational Patterns... the Factory Pattern!"
---

*Welcome to the second of my Advent Design Patterns series where I take a brief look at a design pattern, every day in the build up to Christmas! The reason why I've gone for brief overviews is because I think sometimes, less can be more (KISS, anyone?! Note the misteltoe Christmas pun!) and not everyone always wants to be drowned in text & UML diagrams. My goal is to keep each one of these a maximum of a 5 minute read. This post will cover one of the Creational Patterns, namely the Factory Pattern. If you're looking for a post on one of the other of the Gang of Four Design Patterns, you will most likely find them here.*

-----------------------------
## A Brief Overview
The Factory Pattern is a Creational Design Pattern that aims to abstract the complex creation logic of objects away from the user.

By using this pattern, we simplify the object creation process, where the object creation process may depend on complex underlying conditional logic. It also helps us avoid repeating this logic, every time we wish to create the object within the code base.

There are three common variations of this pattern, namely the Simple Factory Pattern, the Factory Method Pattern and finally the Abstract Factory Pattern.

## The Simple Factory Pattern
The Simple Factory Pattern, as suggested by the name, is the simplest variation of the Factory Pattern. It refers to the existence of a single reusable Factory class, which holds the sole purpose and responsibility of abstracting away the underlying logic that object creation might rely on.

Keeping it simple, imagine a system supports numerous countries/territories within an e-commerce company. Each country has different Shipping Providers. The code will probably pass around a `countryId` of some sort.

Instead of repeating some sort of conditional `if` or `switch` logic around the `countryId` every time a `ShippingProvider` object is required to perhaps perform some calculations, we can instead abstract the logic in to one single reusable place to look as follows:

```csharp
ShippingProviderFactory.CreateShippingProvider(string countryId);
```

## The Factory Method Pattern
Unlike the Simple Factory Pattern which contains a single class, encapsulating all of the object creation logic, the Factory Method Pattern instead provides an abstract class and method that facilitates the creation of new inheriting factories. 

The abstract class will allow us to create numerous different types of factories to create objects for us, so based on the example discussed earlier, each type of possible `ShippingProvider`, will now have a separate Factory class versus the one single method containing a huge `if` or `switch` statement.

```csharp
public abstract class ShippingProviderFactory
{
    // This is the method that gets overridden
	public abstract ShippingProvider CreateShippingProvider(string countryId);

    // This is the "Factory Method" that remains the same for all Factories
	public ShippingProvider GetShippingProvider(string countryId)
	{
		var provider = CreateShippingProvider(countryId);	

        // If we want to write logic that applies to all shipping providers
        // we can insert it as "middleware" here

		return provider; 
	}
}

public class StandardShippingProviderFactory : ShippingProviderFactory
{
	public override ShippingProvider CreateShippingProvider(string countryId)
	{
		// Logic to create a Standard Shipping Provider
	}
}

public class ExpressShippingProviderFactory : ShippingProviderFactory
{
	public override ShippingProvider CreateShippingProvider(string countryId)
	{
		// Logic to create an Express Shipping Provider
	}
}

// Whatever depends on a ShippingProvider can now have any implementation of
// the abstract class injected in and therefore becomes compatible with any 
// type of current or future ShippingProvider with ease.
public class ShoppingCart 
{
	private readonly ShippingProviderFactory _factory;
	public ShoppingCart(ShippingProviderFactory factory)
	{
		_factory = factory;
	}
}

var shoppingCart = new ShoppingCart(new StandardShippingProviderFactory());
var shoppingCart = new ShoppingCart(new ExpressShippingProviderFactory());
```

## The Abstract Factory Pattern
The third and final variation of the Factory Pattern is very similar to the Factory Method Pattern. The main difference here is that rather than having a single overridable method within our abstract class, all methods within our factory become abstract and can therefore be overriden.

```csharp
public abstract class ShippingProviderFactory
{
	public abstract IShippingProvider CreateStandardShippingProvider();
	public abstract IShippingProvider CreateExpressShippingProvider();
}

public class UkShippingProviderFactory : ShippingProviderFactory
{
    public override IShippingProvider CreateStandardShippingProvider 
                                            => new YodelShippingProvider();
    public override IShippingProvider CreateExpressShippingProvider 
                                            => new RoyalMailShippingProvider();
}

public class GermanyShippingProviderFactory : ShippingProviderFactory
{
    public override IShippingProvider CreateStandardShippingProvider 
                                            => new DeutschePostShippingProvider();
    public override IShippingProvider CreateExpressShippingProvider 
                                            => new DHLShippingProvider();
}

// Whatever depends on a ShippingProvider can now have any implementation of
// the abstract class injected in and therefore becomes compatible with any 
// type of current or future ShippingProvider with ease.
public class ShoppingCart 
{
	private readonly ShippingProviderFactory _factory;
	public ShoppingCart(ShippingProviderFactory factory)
	{
		_factory = factory;
	}
}

var shoppingCart = new ShoppingCart(new UkShippingProviderFactory());
var shoppingCart = new ShoppingCart(new GermanyShippingProviderFactory());
```

## Conclusion
TL;DR - If you find yourself with a class that has to be compatible with numerous types of related classes (sub-classes), however should not be concerned with how those types are created (de-coupling), then consider one of the variations of the Factory Pattern.

By moving out object creation logic in to a factory, we apply the Single Responsibility Principle through ensuring our `ShoppingCart` is told "as X is the shipping provider, with costs Y, then the final cart price must be Z", rather than be asking the question of "which shipping provider do I need, in order to correctly calculate the prices"? We also get the Open/Closed Principle for free too, since every time we need to introduce a brand new `ShippingProvider` with different Shipping Costs for the `ShoppingCart` to use, we can do so without having to change any code within the `ShoppingCart`.

If you spot any mistakes, do let me know as I am churning through these at a decent pace for advent! 🎅

## Source Code
https://github.com/karam94/CSharpDesignPatterns