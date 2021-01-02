---
title: "Five Minute Design Patterns #3: The Prototype Pattern"
date: 2021-01-02
published: true
tags: ["Design Patterns", "C#", "Five Minute Design Patterns"]
series: false
cover_image: ./images/philipp-katzenberger-LLmqyIxcXCE-unsplash.jpg
cover_image_credits: "<a href='https://unsplash.com/@fantasyflip'>Philipp Katzenberger</a>"
canonical_url: false
description: "Another post in my blog post series where I try to cover all of the Gang of Four Design Patterns in five minutes each, once again we have one of the Creational Patterns... the Prototype Pattern!"
---

_Welcome to the third of my [Five Minute Design Patterns series](https://www.karam.io/blog/tag/Five%20Minute%20Design%20Patterns/) where I take a brief look at a design pattern every week! I've gone for brief because I think sometimes, less can be more and not everyone always wants to be drowned in text & UML diagrams. My goal is to keep these to a maximum of a 5 minute read as per the calculation that can be seen under the blog title. This post will cover one of the Creational Patterns - the Prototype Pattern. If you're looking for a post on one of the other of the Gang of Four Design Patterns, you will most likely find them [here](https://www.karam.io/blog/tag/Five%20Minute%20Design%20Patterns/)._

---

## A Brief Overview

The Prototype Pattern is a Creational Design Pattern that provides an elegant way of solving a common problem - cloning an existing object. At first, this may seem underwhelming, however most of us who have had to manage large codebases will relate with this tedious problem & how it leads to long-winded & duplicated code. The reason it leads to this is because more often than not, we take the object we wish to clone, create a new object of the same class & then manually populate the attributes of the new object through the constructor.

This becomes more tedious when you want to clone an object that contains private fields. How do you copy the values over, to the clone object, if you can't see what they are? This means that scenarios obviously exist where we can't truly fully clone an object properly as we cannot access the internals.

## The Prototype Pattern

.NET provides an `ICloneable` [interface](https://docs.microsoft.com/en-us/dotnet/api/system.icloneable?view=net-5.0) & when implemented it gives you an `object Clone()` method. It isn't an abstract class therefore it doesn't implement the cloning, however the interface is sometimes used to denote when an object type is cloneable. You don't have to use it.

What you do have to implement is the `Clone()` method & you can do so using the `Object.MemberwiseClone` [method](https://docs.microsoft.com/en-us/dotnet/api/system.object.memberwiseclone?view=net-5.0#System_Object_MemberwiseClone). This provides a Shallow Copy. However, Deep Copies are also a thing...

## Shallow Copy

A `MemberwiseClone` performs a Shallow Copy of an object. This means that the cloned object will have all value types & strings (which are the obvious exception since strings are reference types) copied over. Reference types to the clone however, are copied over purely as references. This means that changes to the reference, will incur in both the original & the clone. Simple, right?

## Deep Copy

A Deep Copy is the same as a Shallow Copy except that reference types will have brand new matching instances created on the clone. This means that a change to a reference type on the original, will not affect the clone as the deep copied clone references different object instances altogether.

## An Example

Here we have a `DevelopmentTeam` class that should be quite self explanatory.

```csharp
    public class DevelopmentTeam
    {
        private string Name { get; set; }

        public DevelopmentTeam(string name)
        {
            Name = name;
        }

        public string GetName() => Name;
        public void SetName(string newName) => Name = newName;
        public override string ToString() => $"{Name}.\n";
    }
```

Here we have a `Developer` class. 
It contains both value types & reference types. 
The string array & reference to the `DevelopmentTeam` are the reference types in this case.

```csharp
    public class Developer : ICloneable
    {
        private string Name { get; set; }
        private int Age { get; set; }
        private string Role { get; }
        private string[] Languages { get; }
        private DevelopmentTeam Team { get; set; }

        public Developer(string name, int age, string role, string[] languages, DevelopmentTeam team)
        {
            Name = name;
            Age = age;
            Role = role;
            Languages = languages;
            Team = team;
        }

        // Shallow Copy
        // All value types are copied to the clone.
        // However reference types (except string) are copied as references.
        // This means changes made to reference types on the original, also affect the clone.
        public object Clone()
        {
            return MemberwiseClone();
        }

        // Deep Copy
        // All value types are copied to the clone.
        // All reference types have brand new matching instances created on the clone.
        public object DeepClone()
        {
            var clonedDeveloper = (Developer) MemberwiseClone();
            clonedDeveloper.SetTeam(new DevelopmentTeam(Team.GetName()));
            return clonedDeveloper;
        }

        public void SetName(string newName) => Name = newName;
        public void SetAge(int newAge) => Age = newAge;
        public void SetTeam(DevelopmentTeam newTeam) => Team = newTeam;
        public override string ToString() => $"Name & Age: {Name}, {Age}.\nRole: {Role}.\nLanguages: {Join(", ", Languages)}.\nTeam: {Team.ToString()}";
    }
```

To implement the Shallow Copy, all we do is return a `MemberwiseClone()`.
To implement the Deep Copy, we create a Shallow Copy & then manually set the private values on it. 

The reason why this is useful is because we can actually access the original object's private values within the `Developer` class, versus if we were to try & construct the object outside. Not rocket science, but still pretty neat.

Note that within this example, I haven't bothered doing anything with the Languages array reference type. 
I'll leave it as an exercise for you to play around with!

```csharp
    public class Program
    {
        public static void Main(string[] args)
        {
            var teamDevAlot = new DevelopmentTeam("Team Dev-alot");
            var originalDeveloper = new Developer("Rob Brown", 30, "Software Developer", new[] { "C#", "JavaScript", "TypeScript" }, teamDevAlot);
            Console.WriteLine("----- ORIGINAL DEVELOPER -----");
            Console.WriteLine(originalDeveloper.ToString());

            var shallowClonedDeveloper = (Developer) originalDeveloper.Clone();
            Console.WriteLine("----- CLONED DEVELOPER -----");
            Console.WriteLine(shallowClonedDeveloper.ToString());

            Console.WriteLine("----- MODIFYING VALUE TYPES (& STRINGS) ON ORIGINAL, DOES NOT APPLY TO SHALLOW CLONE -----");
            originalDeveloper.SetName("Donald Trump");
            originalDeveloper.SetAge(74);
            Console.WriteLine("----- MODIFIED ORIGINAL DEVELOPER -----");
            Console.WriteLine(originalDeveloper.ToString());
            Console.WriteLine("----- SHALLOW CLONED DEVELOPER -----");
            Console.WriteLine(shallowClonedDeveloper.ToString());

            Console.WriteLine("----- MODIFYING REFERENCE TYPE (TEAM) ON ORIGINAL, DOES ALSO APPLY TO SHALLOW CLONE -----");
            teamDevAlot.SetName("Thunderbirds");
            Console.WriteLine("----- ORIGINAL DEVELOPER -----");
            Console.WriteLine(originalDeveloper.ToString());
            Console.WriteLine("----- SHALLOW CLONED DEVELOPER -----");
            Console.WriteLine(shallowClonedDeveloper.ToString());

            var deepClonedDeveloper = (Developer) originalDeveloper.DeepClone();
            Console.WriteLine("----- MODIFYING REFERENCE TYPE (TEAM) ON ORIGINAL, HOWEVER, DOES NOT APPLY TO DEEP CLONE -----");
            teamDevAlot.SetName("Manchester United");
            Console.WriteLine("----- ORIGINAL DEVELOPER -----");
            Console.WriteLine(originalDeveloper.ToString());
            Console.WriteLine("----- DEEP CLONED DEVELOPER -----");
            Console.WriteLine(deepClonedDeveloper.ToString());
        }
    }
```

Notice how on the shallow clones, when we make changes to the reference types on the original object, the changes are also reflected on the shallow clones as they are pointing to the same references.

Whilst on the deep clones, when we make changes to the reference types on the original object, the changes do not apply to the deep clone as they are pointing to a brand new `DevelopmentTeam` object/reference.

## Conclusion

TL;DR - If you find yourself constantly having to make copies or clones of objects, then you want the Prototype Pattern.

If you spot any mistakes, do let me know in the comments below!

## Source Code

In order to keep the blog posts within this series short & sweet, I've not dumped all of the source code on the posts. If you want to see the full working implementation of the above & explore it yourself, feel free to get the source code from the link below.

https://github.com/karam94/CSharpDesignPatterns/tree/main/Creational

Thanks for reading! 👋
