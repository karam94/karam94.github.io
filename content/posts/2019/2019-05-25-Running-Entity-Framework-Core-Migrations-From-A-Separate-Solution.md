---
title: Running Entity Framework Core migrations from a separate solution that doesn't contain a Startup.cs file.
date: 2019-05-25
published: true
tags: [".NET Core"]
series: false
cover_image: ./images/campaign-creators-IKHvOlZFCOg-unsplash.jpg
cover_image_credits: "<a href='https://unsplash.com/@campaign_creators'>Campaign Creators</a>"
canonical_url: false
description: "After an hour of tearing my hair out..."
---
## A painful introduction
I'll keep this one short as I currently need to figure out a way to stick my hair back on the  my head, after wasting the last hour tearing it all out.

Basically, I'm currently in the middle of building a new side project using .NET Core.
I'm trying to apply a Clean Architecture approach to it, avoiding your typical repository pattern approach but utilising EF Core with Identity as my persistence layer.

Resultantly, this therefore meant that my migrations and DbContext had to live in a separate project to my Web API project which acts as a presentation layer and this caused some hiccups which I'll try to point out below.

## Prerequisites
Firstly, we must ensure that our AddDbContext in our Startup.cs class of our Web API project is pointing at the separate project which contains our actual DbContext implementation.

```csharp
  services.AddDbContext<YourDbContext>(options =>
    options.UseSqlServer(Configuration.GetConnectionString("YourConnectionString"), x => x.MigrationsAssembly(typeof(YourDbContext).Assembly.FullName)));
```

## dotnet ef migrations add InitialMigrations
Usually when our DbContext exists within the same project as our Startup file, it takes a couple of seconds to generate and add our initial migrations via the awesome CLI that gets shipped with EF Core.

However, in this scenario, I ran in to a couple of issues:

After running the migrations add command in my Web API project...

```bash
info: Microsoft.EntityFrameworkCore.Infrastructure[10403]
      Entity Framework Core 2.2.4-servicing-10062 initialized 'CleanstagramDbContext' using provider 'Microsoft.EntityFrameworkCore.SqlServer' with options: MigrationsAssembly=Cleanstagram.Persistence
Your target project 'Cleanstagram.Web' doesn't match your migrations assembly 'Cleanstagram.Persistence'. Either change your target project or change your migrations assembly.
Change your migrations assembly by using DbContextOptionsBuilder. E.g. options.UseSqlServer(connection, b => b.MigrationsAssembly("Cleanstagram.Web")). By default, the migrations assembly is the assembly containing the DbContext.
Change your target project to the migrations project by using the Package Manager Console's Default project drop-down list, or by executing "dotnet ef" from the directory containing the migrations project.
```

So this error was confusing as it was clear that it had picked up that my DbContext lived in a separate project. But fortunately it pointed me in the direction of changing my target project in the Package Manager console. So I did.

Unfortunately after changing my target project/root directory in regular cmd/bash, this resulted in a separate error...

```bash
Unable to create an object of type 'CleanstagramDbContext'. For the different patterns supported at design time, see https://go.microsoft.com/fwlink/?linkid=851728
```

I was baffled, so I tried to add an OnModelCreating() override within my IdentityDbContext inheriting DbContext to see if it would help and to an extent it did. To a certain extent...

```bash
System.InvalidOperationException: The entity type 'IdentityUserLogin<string>' requires a primary key to be defined.
   at Microsoft.EntityFrameworkCore.Infrastructure.ModelValidator.ValidateNonNullPrimaryKeys(IModel model)
   at Microsoft.EntityFrameworkCore.Infrastructure.ModelValidator.Validate(IModel model)
   at Microsoft.EntityFrameworkCore.Infrastructure.RelationalModelValidator.Validate(IModel model)
   at Microsoft.EntityFrameworkCore.Internal.SqlServerModelValidator.Validate(IModel model)
   at Microsoft.EntityFrameworkCore.Metadata.Conventions.Internal.ValidatingConvention.Apply(InternalModelBuilder modelBuilder)
   at Microsoft.EntityFrameworkCore.Metadata.Conventions.Internal.ConventionDispatcher.ImmediateConventionScope.OnModelBuilt(InternalModelBuilder modelBuilder)
   at ...
The entity type 'IdentityUserLogin<string>' requires a primary key to be defined.
```

But whilst it helped, it just ended up digging me down a deeper hole.

So, the solution?

```bash
dotnet ef migrations add InitialMigration --startup-project ./Cleanstagram.Web/ --project ./Cleanstagram.Persistence/
```

I had to go up a level to the parent of both projects and then specify both as shown above. A startup project and another project which specifies where the DbContext in this case lives. Straight away after running this, just by magic, my migrations were generated and I resultantly followed it up with a dotnet ef database update.

This isn't much and it might be obvious to some, but judging from the hoarding of googling that I was going through, it was quite a common issue without a specific one size fits all solution that is easy to find online. So hopefully this helps some other poor sod out there.

Thanks for reading!