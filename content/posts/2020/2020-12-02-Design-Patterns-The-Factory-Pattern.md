---
title: "Five Minute Design Patterns #2: The Factory Pattern"
date: 2020-12-05
published: true
tags: ["Design Patterns", "C#", "Five Minute Design Patterns"]
series: false
cover_image: ./images/patrick-hendry-6xeDIZgoPaw-unsplash.jpg
cover_image_credits: "<a href='https://unsplash.com/@worldsbetweenlines'>Patrick Hendry</a>"
canonical_url: false
description: "The second post in my blog post series where I try to cover all of the Gang of Four Design Patterns in five minutes each, this time it's one of the Creational Patterns... the Factory Pattern!"
---

_Welcome to the second of my [Five Minute Design Patterns series](https://www.karam.io/blog/tag/Five%20Minute%20Design%20Patterns/) where I take a brief look at a design pattern every week! I've gone for brief because I think sometimes, less can be more and not everyone always wants to be drowned in text & UML diagrams. My goal is to keep these to a maximum of a 5 minute read as per the calculation that can be seen under the blog title. This post will cover one of the Creational Patterns - the Factory Pattern. If you're looking for a post on one of the other of the Gang of Four Design Patterns, you will most likely find them [here](https://www.karam.io/blog/tag/Five%20Minute%20Design%20Patterns/)._

---

## A Brief Overview

The Factory Pattern is a Creational Design Pattern that aims to provide an interface/abstract class to facilitate object creation, in such a way that the user does not have to specify which type of class they want instantiated, but rather defer it to subclasses.

By using this pattern, we simplify the object creation process where the object creation process relies on underlying conditional logic to deduct what type of class should be instantiated. It also helps us avoid repeating this logic every time we wish to create the object.

There are three common variations of this pattern, the Simple Factory Pattern, the Factory Method Pattern and finally the Abstract Factory Pattern.

## The Simple Factory Pattern

The simplest variation of the Factory Pattern, refers to the existence of a single re-usable Factory class, that holds the sole purpose and responsibility of abstracting away any underlying logic that object creation relies on.

Instead of repeating some sort of conditional `if` or `switch` logic around `brand` every time a `Vehicle` object is required, we can instead abstract it in to one single re-usable place.

```csharp
public class VehicleFactory
{
	public Vehicle BuildVehicle(Brand brand)
	{
		return brand switch
		{
			Brand.Honda => new Vehicle(Brand.Honda),
			Brand.Ferrari => new Vehicle(Brand.Ferrari),
			_ => throw new NotSupportedException($"The factory cannot construct
												 vehicles of the brand
												 {brand} at the current time.")
		};

		// ...think about how this scales as more Shipping Providers are added
		// If we do this every time we add a new Shipping Provider,
		// are we violating one of the SOLID principles?
	}
}

VehicleFactory.BuildVehicle(Brand.Honda);
```

## The Factory Method Pattern

The Factory Method Pattern provides an abstract class and method (hence the name) that facilitates creation of subclasses (e.g. different types of shipping providers).

By utilising this abstract class, we create a Factory for every type of `ShippingProvider` and since our code is dependent on a type of `ShippingProviderFactory`, it automatically can handle subclasses such as a `StandardShippingProviderFactory`.

```csharp
public abstract class VehicleFactory
{
	public abstract Vehicle BuildVehicle();

	// This is the "Factory Method"
	public Vehicle GetVehicle()
	{
		var vehicle = BuildVehicle();

		// If we want to write logic that applies to all vehicle factories
		// we can insert it as "middleware" here

		return vehicle;
	}
}

public class FerrariFactory : VehicleFactory
{
	public override Vehicle BuildVehicle() => new Vehicle(Brand.Ferrari);
}

public class HondaFactory : VehicleFactory
{
	public override Vehicle BuildVehicle() => new Vehicle(Brand.Honda);
}

// Whatever depends on a VehicleFactory can now have any implementation of
// the abstract class injected in and therefore becomes compatible with any
// type of current or future ShippingProvider with ease.
public class ShoppingCart
{
	private readonly VehicleOrder _vehicleOrder;
	private readonly VehicleFactory _vehicleFactory;

	public ShoppingCart(VehicleOrder vehicleOrder, VehicleFactory vehicleFactory)
	{
		_vehicleOrder = vehicleOrder;
		_vehicleFactory = vehicleFactory;
	}

	public string Checkout()
	{
			// The Shopping Cart can now handle any type of VehicleFactory,
			// without needing to change any of its implementation details.
			var carToBuild = _vehicleFactory.GetVehicle();
			return $"Vehicle built of brand {carToBuild.GetBrand()}
						for Order ID: ${_vehicleOrder.GetId()}";
	}
}

var hondaShoppingCart = new ShoppingCart(new VehicleOrder(Brand.Honda),
										 new HondaFactory());
var hondaOrderResponse = hondaShoppingCart.Checkout();

var ferrariShoppingCart = new ShoppingCart(new VehicleOrder(Brand.Ferrari),
										   new FerrariFactory());
var ferrariOrderResponse = ferrariShoppingCart.Checkout();
```

## The Abstract Factory Pattern

The third and final variation of the Factory Pattern is very similar to the Factory Method Pattern. The main difference here is that rather than having a single overridable method within our abstract class, all methods within our factory become abstract and can therefore become overriden.

I like to think of this as the version of the Factory Pattern that caters for families. For example, in our previous example, a Ferrari vehicle... is a single vehicle. In this example, a UK Shipping Provider... can have a family of various couriers. (Obviously Ferrari have numerous car models too, but play along here!)

```csharp
public abstract class ShippingProviderFactory
{
	public abstract IShippingProvider CreateStandardShippingProvider();
	public abstract IShippingProvider CreateExpressShippingProvider();
}

public class UkShippingProviderFactory : ShippingProviderFactory
{
	public override IShippingProvider CreateStandardShippingProvider() 
											=> new YodelShippingProvider();
	public override IShippingProvider CreateExpressShippingProvider() 
											=> new RoyalMailShippingProvider();
}

public class RoyalMailShippingProvider : IShippingProvider
{
	public string GetCourierName() => "Royal Mail";
	public string GetCourierCountryCode() => "UK";
}

// Extendable as it handles any time of present or future Shipping Provider Factory.
// e.g. Imagine we introduce French shipping later. No need for code changes in here.
public class ShoppingCart
{
	private readonly ShippingProviderFactory _shippingProviderFactory;

	public ShoppingCart(ShippingProviderFactory shippingProviderFactory)
	{
		_shippingProviderFactory = shippingProviderFactory;
	}

	public string Checkout(bool isExpressShipping)
	{
		var shippingProvider = isExpressShipping ?
								_shippingProviderFactory.CreateExpressShippingProvider() :
								_shippingProviderFactory.CreateStandardShippingProvider();

		var shippingProviderName = shippingProvider.GetCourierName();

		// Note: 
		// This translation bit violates OCP but our example doesn't revolve around this 
		// so ignore it... assume we're following the rule of three to refactor this out.
		if (shippingProvider.GetCourierCountryCode() == "DE")
		{
			return $"Ihr Zustellkurier ist: {shippingProviderName}";
		}
		else
		{
			return $"Your delivery courier is: {shippingProviderName}";
		};
	}
}

var shoppingCart = new ShoppingCart(new UkShippingProviderFactory());
shoppingCart = new ShoppingCart(new GermanyShippingProviderFactory());
```

## Conclusion

TL;DR - If you find yourself with a class that has to be compatible with a family of sub-classes, however should be decoupled with regards to how those types are created, consider one of the variations of the Factory Pattern.

By moving out object creation logic in to a factory, we apply the Single Responsibility Principle through ensuring our `ShoppingCart` is told what shipping provider it is using, rather than leave it asking "which shipping provider do I need, to correctly calculate the prices?" ([Tell don't ask](https://martinfowler.com/bliki/TellDontAsk.html)). We also get the Open/Closed Principle for free too, since every time we need to introduce a brand new `Vehicle` or `ShippingProvider`, we can do so without having to change any code within the `ShoppingCart`.

If you spot any mistakes, do let me know in the comments below!

## Source Code

In order to keep the blog posts within this series short and sweet, I've not dumped all of the source code on the posts. If you want to see the full working implementation of the above and explore it yourself, feel free to get the source code from the link below.

https://github.com/karam94/CSharpDesignPatterns/tree/main/Creational

Thanks for reading! 👋
