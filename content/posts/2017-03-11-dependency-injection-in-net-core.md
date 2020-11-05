---
title: Dependency Injection in .NET Core
date: 2017-03-11
published: true
tags: [".NET Core"]
series: false
cover_image: ./images/emin-baycan-LV1CxYBgXqU-unsplash.jpg
cover_image_credits: Emin BAYCAN https://unsplash.com/@aimlesscode?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
canonical_url: false
description: "I think it's safe to say that there's a lot of hype around .NET Core nowadays because of it being cross-platform, open source, etc, which isn't really something we've been used to from Microsoft technologies over the years. So as someone who works in a predominantly .NET dominated environment, I wanted to dedicate some time playing around with it, building a simple API & just investigating how different it is to the regular .NET Framework."
---

I think it's safe to say that there's a lot of hype around .NET Core nowadays because of it being cross-platform, open source, etc, which isn't really something we've been used to from Microsoft technologies over the years. So as someone who works in a predominantly .NET dominated environment, I wanted to dedicate some time playing around with it, building a simple API & just investigating how different it is to the regular .NET Framework.

One of the more intriguing perks of .NET Core that sparked my interest was its built in Dependency Injection which I'd assume is a concept most software developers are somewhat acquainted with. If you don't know what Dependency Injection is, it is a way of passing a classes external dependencies without having to instantiate the dependency every single time an instance of the base class is used. It has many useful uses, but one of my favourite is probably the fact that it makes mocking & testing classes a lot easier as well as helps overall with decoupling.

Here's a quick example scenario, which should hopefully explain this:

- Imagine we have a `UserService` class, containing logic related to Users and a `UserRepository` class that talks to a database.
- A level above that, we also have a `UserController` class, which in an API project for example could contain methods that are mapped to `GET` or `POST` routes which could then allow your Angular, React or Vue front-end to call them or pass data to them to be executed.
- If a user is attempting to log in via our API, they will first hit a route defined within our `UserController` which would then require the `UserService` to work its magic and talk to a database somewhere via the `UserRepository`, compare password hashes & eventually return whether or not the user has indeed successfully managed to login successfully or not.
- Given that our `UserService` talks to a separate class which is the `UserRepository`, you'd probably normally do something like this simplified example:

```csharp
public class UserService
{
    UserRepository repository;

    public UserService()
    {
        repository = new UserRepository();
    }

    public User Login(string username, string password)
    {
        return repository.GetUser(username, password);
    }
}
```

- So let's say we now decide that we want to write some unit tests around our `UserService` but because of the nature of tests, we don't actually want our tests to force the `UserRepository` to talk to or play around with the database in any way shape or form. For logging in, this scenario isn't too bad. But imagine you're testing registering a new user... what do you want to do, create a new user object in the database every time you run your unit tests? This would cause chaos!
- A suitable solution would be to obviously mock out our `UserRepository`, so that when we Unit Test the `UserService`, we use a mocked out `UserRepository` where we can define what it should return when we pretend to call the `GetUser()` method and allow us to test our `UserService` in isolation. But we don't really want to mock out the `UserRepository` within the `UserService`code because then we're modifying our production code... this is where Dependency Injection becomes your best friend.

```csharp
public class UserService
{
    IUserRepository _repository;

    public UserService (IUserRepository repository)
    {
        _repository = repository;
    }

    public User Login(string username, string password)
    {
        return _repository.getUser(username, password);
    }
}
```

- We have now applied Dependency Injection to our `UserService` class. Instead of instantiating our `UserRepository` within the constructor of our `UserService`, we've declared an interface of it at the top of the class and assigned it to the dependency passed in via the constructor parameters and due to the magic of dependency injection, regardless of whether you're using a framework like Spring, the built in .NET Core dependency injection or something like Castle Windsor to handle it for you, every time the `UserService` is being used, it will always have access to a usable instance of the `UserRepository` and the functions inside.

```csharp
public class GivenUserService
{
    [Test]
    public void ThisIsATerribleTestLol()
    {
        User exampleUser = new User {
        userid = 1,
        username = "Bill Gates",
        password = "somehashedstuff"
        }

        // Arrange
        var repository = Substitute.For<IUserRepository>();
        UserService userService = new UserService(repository);

        // Act
        var loggedUser = userService.Login("Bill Gates", "somehashedstuff").Returns(exampleUser);

        // Assert
        Assert.That(exampleUser, Is.EqualTo(loggedUser));
    }
}
```

- Within our tests, we can use a mocking framework to mock out the `UserRepository` based on an interface of the `UserRepository`, called `IUserRepository`. This now means that our mocking framework within our unit tests will now be able to mock out an `IUserRepository` and pass it to our `UserService`'s constructor when testing it. Allowing the `UserService` to run and thus be tested in isolation without actually hitting the database through the real `UserRepository`.
- Now, not only is our production code looking much better with reduced coupling, but we can also test our code in a much easier, more isolated fashion.
- The above test doesn't really test anything as it is just to showcase how the use of Dependency Injection makes life easier for us in terms of testing. In a real scenario, the `UserService` would more than likely contain more logic within the `Login()` method we are testing against.

Back on topic, normally we tend to use Castle Windsor to handle Dependency Injection at work because of the perks that come with it being a full fledged IoC container. But what intrigued me about .NET Core's built in Dependency Injection was the claim that it was packaged with the framework. Whilst in older versions you would have to manually set up and configure the Dependency Injection yourself - which nowadays just means wasting time with the number of packages out there that do it for you - it apparently could be done in .NET Core with a few lines the same way something like Castle Windsor allows you to do once set up.

So, to do this all you have to do is simply navigate to your .NET Core project's `Startup.cs` file and add the following under the `ConfigureServices(IServiceCollection services)` method:


```csharp
public void ConfigureServices(IServiceCollection services)
{
  services.AddMvc();

  RabbitRepository _rabbitRepository = new RabbitRepository();

  services.AddTransient<IUserRepository, UserRepository>();
  services.AddScoped<IDogRepository, DogRepository>();
  services.AddSingleton<ICatRepository, CatRepository>();
  services.AddInstance<IRabbitRepository>(_rabbitRepository);
}
```

The `AddTransient()` method creates a brand new instance of the `UserRepository()` each and every single time it is requested, even if requested within the same scope, these are great for stateless APIs. This means every time any kind of Service within a project uses a `UserRepository`, it will have a brand new Repository injected to use.

The `AddScoped()` method creates a new instance of the `DogRepository` each time it is requested within different scopes. This means every Service within a project that uses a `DogRepository`, will have its own single `DogRepository` to keep re-using.

The `AddSingleton()` method creates a new instance of the `CatRepository` once and shares the same instance across all different scopes within the application. This means every Service within a project that uses a `CatRepository`, will be injected with and use the same single `CatRepository` object.

The `AddInstance()` method passes a specific instance of an `IRabbitRepository` type object as parameter, meaning each and every time it is requested regardless of scope, that specific `RabbitService` instance that was manually instantiated in the code above, will always be used and shared rather than let the Dependency Injection itself instantiate the object.

And now... breathe! That's it. You have now set up the built in Dependency Injection within .NET Core in your project! Every time you require a dependency, simply register it however you like within your Startup.cs file and then just pop the interface in your constructor as shown above!