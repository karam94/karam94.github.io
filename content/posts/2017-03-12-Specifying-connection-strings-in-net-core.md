---
title: Connection Strings in .NET Core
date: 2017-03-12
published: true
tags: [".NET Core"]
series: false
cover_image: ./images/emin-baycan-LV1CxYBgXqU-unsplash.jpg
cover_image_credits: Emin BAYCAN https://unsplash.com/@aimlesscode?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
canonical_url: false
description: "When you waste an entire hour trying to define a connection string..."
---
It's true. I wasted an entire hour trying to get my head around how on earth we can define connection strings in .NET Core.

Traditionally in older .NET Frameworks, you just used to place something along these lines under `web.config`, somewhere in the root of your solution.

```xml
<connectionStrings>
  <add name="myConnectionString"
  connectionString="server=localhost;database=db;" />
</connectionStrings>
```

Unfortunately though, `web.config` is now used differently in .NET Core and we now have a brand new `appsettings.json` where we are now apparently meant to use to specify... you guessed it, our app's settings.

This apparently has something to do with how the new Entity Framework is configured and makes things more straight forward as once you write your `JSON` containing your connection string, you can then call a simple method in your `Startup.cs` which automatically configures everything for you. However, if like me you aren't using Entity Framework... let's just say, things aren't as straight forward as they used to be.

```json
{
  "ConnectionData": {
    "DefaultConnection": {
      "ConnectionString": "Server=localhost;Database=db;Trusted_Connection=True;"
    }
  }
}
```

We then have to create a `ConnectionData` class, which resembles the `JSON` structure within our `appsettings.json` file. Alongside it, a `DefaultConnection` class too.

```csharp
public class ConnectionData
{
  public DefaultConnection DefaultConnection { get; set; }
}

public class DefaultConnection
{
  public string ConnectionString { get; set; }
}
```

Next, we add the following to our `ConfigureServices(IServiceCollection services)` method in our `Startup.cs` file.

```csharp
public void ConfigureServices(IServiceCollection services)
{
  services.Configure<ConnectionData>(Configuration.GetSection("ConnectionData"));
}
```

Finally, we now need to get used to the idea of using Dependency Injection to inject our `ConnectionData` object in to every class that requires access to our connection string. So, let's take a `RecipeRepository` class for example that might use some kind of ORM such as Dapper to talk to your database as an example.

```csharp
public class RecipeRepository
{
  private readonly ConnectionData _connectionData;
  string _connectionString;

  public RecipeRepository(IOptions<ConnectionData> connectionData)
  {
    _connectionData = connectionData;
    _connectionString = _connectionData.DefaultConnection.ConnectionString;
  }

  public IDbConnection Connection
  {
    get {
      return new SqlConnection(_connectionString);
    }
  }

  public Recipe GetRecipeById(int id){
    using (IDbConnection dbConnection = Connection)
    {
      dbConnection.Open();
      // do things
    }
  }
}
```

So, due to what we specified in `Startup.cs`, we can now inject an `IOptions<ConnectionData>` object containing our data from `appsettings.json` in to our `RecipeRepository`, which then gives us access to the `DefaultConnection` object it holds and the `ConnectionString` within it. We can then create a new `SqlConnection` using that string and link it up with our ORM. In this case, I've used Dapper.

Is there a simpler way to do this? I'm not too sure at the moment, but I am yet to find one! Fortunately though, .NET Core is somewhat young and hopefully we might see our old beloved friend `ConfigurationManager.ConnectionStrings["myConnectionString"]` back again soon... or at least something that gives us access to `appsettings.json` without having to create a bunch of classes and forcing us to inject them in!