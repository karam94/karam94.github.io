---
title: Creating & deploying a .NET Core Web API to AWS with the Serverless Framework.
date: 2019-07-05
published: true
tags: ["AWS", ".NET Core"]
series: false
cover_image: ./images/taylor-vick-M5tzZtFCOfs-unsplash.jpg
cover_image_credits: "<a href='https://unsplash.com/@tvick'>Taylor Vick</a>"
canonical_url: false
description: "Lambda functions are nice... but sometimes you just want a whole API!"
---
## Introduction
I've recently been jumping on the Serverless hype train... and probably rightly so. But the fact that you're reading this article, probably means that you're already riding that train with me, so I'll cut to the chase.

<figure>
    <img src="http://www.karam.io/assets/images/2019-07-05/deployingserverless.png" 
    style="width: 100%; display: block; margin-left: auto; margin-right: auto;"/>
</figure>

Basically, when trying to learn more about the world of Serverless, most tutorials on the internet that I could find around the .NET Core serverless world, seemed to revolve around writing a single individual serverless lambda function written in C# that does one small bit of functionality, sometimes utilising other AWS services to communicate with other lambda functions, all of which don't really exist within any sort of actual scaffolded project.

![Joining the world of Serverless!](https://media.giphy.com/media/F5p9Uuz3F1a3S/giphy.gif)

This was all great and useful for learning purposes and also helped me understand the potential power of lambda functions. For example, the idea that you can have a small bit of code that can be triggered and run whenever you like... sets my imagination on fire!

![Joining the world of Serverless!](https://media.giphy.com/media/ule4vhcY1xEKQ/giphy.gif)

BUT it deviated too much from my regular .NET Core developer workflow. I had questions on the developer scalability and developer experience of trying to replicate what was being taught on a larger scale - such as the first iteration a relatively large and complex CRUD-ish API. I just wanted something that got to the point and said, you have a fully blown .NET Core API that you wrote two years ago that you now want to run serverless-ly? Okay, here's what you do...

For example if one needs to build a .NET Core API, chances are they will probably go for a quick:

```bash
dotnet new webapi
```

...and take things from there. The .NET CLI will generate the project scaffolding needed and in a matter of seconds, you can do things like play around with middleware, create new controllers & so on.

Whilst you can extract different bits of functionality in to lots of different smaller lambdas, I do believe that if you are entering the unknown and are building something brand new that exceeds a certain threshold of complexity, the problem at hand isn't a new problem. It's the old monolith-first strategy that we should be following and that monolith, may be a large API that all lives under one roof until we can actually start dissecting and extracting it in to smaller chunks later.

So, I wanted to figure out if there was a way for me to develop my .NET Core Web APIs, following what I consider to be the general standardised workflow and then be able to deploy it as a serverless API as a whole, not having to worry about its modularisation as lots of smaller lambdas/functions. Basically, my deployment choices shouldn't affect my development choices. I should be able to deploy whatever I want, regardless of how it is written or its general size.

## What is the Serverless Framework?

![The Serverless Framework](https://files.readme.io/ffb4c59-Serverless.png)

The [Serverless Framework](https://serverless.com/) is an open source framework (that comes with an awesome CLI) that aims to help us configure and deploy serverless functions written in numerous technology stacks, to numerous cloud providers.

If you've ever written and deployed a lambda function to AWS without using any sort of tooling (yes, I've been there... wrote a Python script to run every fortnight to check for redundant security groups etc...) you'll know how tiresome the process of zipping your code project up and uploading it is (or even worse, using the in-browser IDE thing) as well as having to then configure your lambda through the UI that AWS provide in the web console.

This approach is usually okay for small projects such as my given example above of the single Python script for example (even though dealing with PIP dependencies was still a little tedious) but obviously it is not scalable. You also cannot commit your lambda's configuration to some sort of source control too which itself raises potential hiccups waiting to happen.

The goal of the Serverless Framework quite simply, is to streamline your deployment process as much as possible.

## What alternatives are there and why should I use the Serverless Framework in particular?
Alternatives include AWS's very own [SAM](https://aws.amazon.com/serverless/sam/) or even the [official AWS Visual Studio tooling for Visual Studio](https://aws.amazon.com/blogs/developer/aws-serverless-applications-in-visual-studio/). 

However, I personally prefer using the Serverless Framework for a few reasons:
- Quite simply, I prefer its workflow due to the minimalistic CLI more to the alternatives.
- As I often use varied technology stacks when working on projects at home such as NodeJS or Python, the Serverless Framework's compatibility with these means I don't have to deviate away from what I'm used to when it comes to deploying my lambdas. If I decide to randomly try and deploy something to Azure one day, I don't need to learn some other way of deployment.
- The Serverless Framework comes with an incredibly healthy and large open source community behind it, which means there are plenty of plugins for it.
- The Serverless Framework allows you to debug your deployed lambdas, locally really easily within your IDE of choice such as Visual Studio Code which means you can utilise breakpoints & so forth. Note that this is not a unique feature of the Serverless Framework, but it is in this case, really easy to get it up and running which is cool.
- Whilst the AWS Visual Studio tooling may use a more familiar (to some) CloudFormation-style configuration file and the deployment process within the IDE is really quick (bar the fact that you need to have previously created an S3 bucket to upload your code to beforehand), it is essentially a dependency on having Visual Studio installed. So, if you don't have Visual Studio installed, you can't deploy your lambda and you'd probably end up running the Serverless Framework or something else in your CI/CD pipeline anyways.
- The Serverless framework automatically offloads the creation of an S3 bucket to host your uploaded artifacts off you and as a result, gets you from zero to hero as fast as possible.

## So what will we be doing today?
We'll be taking a brand new .NET Core Web API project and deploying it as a single AWS Lambda. If one were to do this manually, it would not only require the setting up of AWS assets such as an S3 bucket & API gateway on top of the lambdas we create but it would also be a tiresome and very manual process.

By the end of this post, you should have a deployed version of your .NET Core Web API that is triggered as a single AWS Lambda function with an API gateway that proxies requests through to all the routes you have defined within your controllers. The Serverless Framework will also handle an S3 bucket for your deployed assets to be uploaded in to.

![Let's begin!](https://media.giphy.com/media/QLvRBqfLXCphu/giphy.gif)

## Prerequisites
- An [AWS](https://aws.amazon.com) account.
- The [Serverless Framework CLI](https://serverless.com) installed on your machine via [NPM](https://www.npmjs.com/get-npm).
- [Your AWS account configured with your Serverless Framework CLI.](https://www.youtube.com/watch?v=KngM5bfpttA)
- An ASP.NET Core Web API to deploy.

## Don't have a .NET Core Web API to deploy?
```bash
mkdir YourNewDirectory
cd YourNewDirectory
dotnet new webapi
dotnet restore
```

## Integrating the Serverless Framework
The way the Serverless Framework knows how to handle your deployment process is through utilising a YAML configuration file called `serverless.yml` in the root directory of your project. Create this file and add the contents as shown below. Obviously, anywhere I refer to `blog-tutorial-serverless` will differ depending on how you have named your project. If you have used hyphens, these become underscores in your project if you maintain the same name as a namespace within your code.

```yaml
service: blog-tutorial-serverless

provider:
  name: aws
  runtime: dotnetcore2.1
  stage: ${opt:stage, 'dev'}
  region: eu-west-1
  profile: default

package:
  artifact: bin/release/netcoreapp2.1/blog-tutorial-serverless.zip

functions:
  api:
    handler: blog-tutorial-serverless::blog_tutorial_serverless.LambdaEntryPoint::FunctionHandlerAsync
    events:
     - http:
         path: /{proxy+}
         method: ANY

custom:
  stage: ${opt:stage, self:provider.stage}
```

If you want to learn more about more magic you can place in your Serverless.yml configuration file, visit [here](https://serverless.com/framework/docs/).

In this case, I've named my service after my Web API project name. I've also made sure my function handler follows the required format of `AssemblyName::Namespace.ClassName::FunctionHandlerAsync`.

I've specified that the cloud provider I want Serverless to try and deploy to is AWS and that I want it to try and deploy using my default account to the eu-west-1 region (Ireland). This should make sense if you followed [this]((https://www.youtube.com/watch?v=KngM5bfpttA)) video tutorial that I linked to in the prerequisites. The profile option is useful if you have more than one AWS account configured to the AWS CLI on your machine.

The package section is pointing to where my compiled code that Serverless will be uploading will be.

An example of what the serverless.yml file would look like if configured for different individual functions rather than to generalise a whole Web API project is like so:

```yaml
functions:
  hello:
    handler: CsharpHandlers::AwsDotnetCsharp.Handler::Hello
    events:
      - http:
          path: hello
          method: post
  goodbye:
    handler: CsharpHandlers::AwsDotnetCsharp.Handler::Goodbye
    events:
      - http:
          path: goodbye
          method: get
```

So, in order to be able to get away with a single function that encapsulates our whole Web API we use the ANY method along with the ["/{proxy+}"](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-http.html) http path which sort of acts as a wildcard path.

Last but not least, we have the custom section which I have been currently using primarily for environment variables.

`${opt:xyz}` is the syntax used to reference CLI options passed in. So for example, if you were to input:

```bash
serverless deploy --stage prod
```

Serverless will deploy and assign your stage environmental variable on AWS as "prod". You may or may not be then referencing environmental variables in your code.

## Tweaking our .NET Core project
Our function in this case is pointing to a class in the root of your project, called `LambdaEntryPoint`.

```yaml
functions:
  api:
    handler: blog-tutorial-serverless::blog_tutorial_serverless.LambdaEntryPoint::FunctionHandlerAsync
    events:
     - http:
         path: /{proxy+}
         method: ANY

custom:
  stage: ${opt:stage, self:provider.stage}
```

So, as you may have guessed. You need to create this class.

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace blog_tutorial_serverless
{
    public class LambdaEntryPoint : Amazon.Lambda.AspNetCoreServer.APIGatewayProxyFunction
    {
        protected override void Init(IWebHostBuilder builder)
        {
            builder
                .UseStartup<Startup>();
        }
    }
}
```

And as you may have spotted, we are inheriting from a third party class. So for that reason, we need to add the following dependencies.

```bash
dotnet add package Amazon.Lambda.Core
dotnet add package Amazon.Lambda.Serialization.Json
dotnet add package Amazon.Lambda.AspNetCoreServer
```

If you open your project's .csproj file, you will also find the default `Microsoft.AspNetCore.App` package reference. Since AWS Lambda is only compatible up to .NET Core 2.1, we must hard code this package's version reference. Ignore any Visual Studio warnings that it is advised to not hard code a version number for this package. If you have any other references to `2.2.0` such as `Microsoft.AspNetCore.Razor.Design`, set them to `2.1.0` too.

The reason why we're limited to .NET Core 2.1 is because Amazon said they'll only support LTS releases. So in theory, the next version we will be gifted with within the Lambda world will be .NET Core 3.1 which should appear in and around November 2019.

```xml
<PackageReference Include="Microsoft.AspNetCore.App" Version="2.1.0" />
```

You may also have to modify your `ConfigureServices(IServiceCollection services)` method in your `Startup.cs` to specify `CompatibilityVersion.Version_2_1`.

Make sure to also remove the line within your `.csproj` that says `<AspNetCoreHostingModel>InProcess</AspNetCoreHostingModel>`, otherwise you will get an error later on.

We also need to install a tool to the dotnet CLI that allows us to deploy AWS Lambda functions.

```bash
dotnet tool install --global Amazon.Lambda.Tools
```

## Building our .NET Core project
Earlier we touched on the specification of a package artifact within our `serverless.yml` file and said it was what would be uploaded to an S3 bucket and deployed as our lambda.

```yaml
package:
  artifact: bin/release/netcoreapp2.1/blog-tutorial-serverless.zip
```

Usually when you want to build, publish and deploy, you will run `dotnet publish` with some flags and that will create some artifacts for you to deploy. In this case, we need to create a "lambda package" out of our artifacts.

This can be done for us using the Amazon Lambda Tools plugin for the dotnet CLI that we installed earlier by running the following command:

```bash
dotnet lambda package --configuration release --framework netcoreapp2.1 --output-package bin/release/netcoreapp2.1/blog-tutorial-serverless.zip
```

Note how we have once again hard coded .NET Core 2.1 along with ensuring that our `--output-package` flag is pointing to the same directory we specified in our `serverless.yml` earlier.

It might be a useful idea to place the above bash command in a batch file (e.g. `./build.cmd`) you can easily execute so that you can always generate a fresh build with that configuration prior to deployment going forwards. Because deploying with the serverless framework is such a breeze, I sometimes end up deploying without realising I haven't run the above command to generate a new output package with my changes to actually be deployed.

If you've done everything correctly, your output should look something like this:

```bash
...
...
... zipping: Amazon.Lambda.APIGatewayEvents.dll
... zipping: Amazon.Lambda.ApplicationLoadBalancerEvents.dll
... zipping: Amazon.Lambda.AspNetCoreServer.dll
... zipping: Amazon.Lambda.Core.dll
... zipping: Amazon.Lambda.Logging.AspNetCore.dll
... zipping: Amazon.Lambda.Serialization.Json.dll
... zipping: appsettings.Development.json
... zipping: appsettings.json
... zipping: blog-tutorial-serverless
... zipping: blog-tutorial-serverless.deps.json
... zipping: blog-tutorial-serverless.dll
... zipping: blog-tutorial-serverless.pdb
... zipping: blog-tutorial-serverless.runtimeconfig.json
... zipping: web.config
Lambda project successfully packaged: C:\code\serverless\blog-tutorial-serverless\bin\release\netcoreapp2.1\blog-tutorial-serverless.zip
```

## DEPLOY!
Prepare yourselves...

```bash
serverless deploy -v
```

The `-v` flag here stands for `--verbose`. I like it when the CLI tells me more about what it's doing during deployment and gives me feedback. The Serverless Framework CLI reference can be found [here](https://serverless.com/framework/docs/providers/aws/cli-reference/deploy/).

You will see cool things being output such as the below, which emphasizes how much heavy lifting the Serverless Framework has removed for you.

```bash
CloudFormation - CREATE_IN_PROGRESS - AWS::CloudFormation::Stack - blog-tutorial-serverless-dev
CloudFormation - CREATE_IN_PROGRESS - AWS::S3::Bucket - ServerlessDeploymentBucket
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::RestApi - ApiGatewayRestApi
CloudFormation - CREATE_IN_PROGRESS - AWS::Logs::LogGroup - ApiLogGroup
CloudFormation - CREATE_IN_PROGRESS - AWS::IAM::Role - IamRoleLambdaExecution
```

Once deployment is complete, you should have a AWS hosted URL returned. You can use that URL to access your API. Simply append to it, whatever you've specified in your project as your API endpoint routes and it should be functioning as expected.

```bash
Serverless: Stack update finished...
Service Information
service: blog-tutorial-serverless
stage: dev
region: eu-west-1
stack: blog-tutorial-serverless-dev
resources: 10
api keys:
  None
endpoints:
  ANY - https://trololo.execute-api.eu-west-1.amazonaws.com/dev/{proxy+}
functions:
  api: blog-tutorial-serverless-dev-api
layers:
  None
```

Now, if I take the URL and try and hit both `GET` endpoints that we have in our default `ValuesController` that we get with `dotnet new webapi`:

```bash
curl -XGET 'https://trololo.execute-api.eu-west-1.amazonaws.com/dev/api/values'
["value1","value2"]
```

```bash
curl -XGET 'https://trololo.execute-api.eu-west-1.amazonaws.com/dev/api/values/1'
value
```

Boom!

## Awesome. How does this now affect costs?
As with all AWS Lambda's, you only pay for what is used. You get your first 1 million requests completely FREE... and then $0.20 for every 1 million requests thereafter.

Requests can also translate in to compute time per month (400,000 GB-seconds), so whichever is hit first becomes your free threshold. You can read about AWS Lambda pricing in more detail [here](https://aws.amazon.com/lambda/pricing/).

The previously discussed method of defining a bunch of smaller, separated functions versus encapsulating a whole API within a single function, means you create an AWS lambda function for every HTTP endpoint you define. Meanwhile when going down the API encapsulation method as followed within this post, you are instead creating a single AWS lambda function.

Logic therefore dictates that since all endpoint requests are then coming from your API Gateway to a single lambda rather than spread out over numerous lambdas, that you are therefore more likely to hit your free threshold sooner.

## Conclusion
I hope this article helps a lot of people who ran in to the same brick wall as me. I loved the idea of serverless hosting, understood the concepts but struggled to understand how it could be integrated in to this type of scenario encapsulating a fully blown API within an individual project such as what you should have created by the end of this post.

If I've gone wrong anywhere in this article, feel free to get in touch either in the comments below or on twitter.

If all this deployment lark interests you, I also wrote a tutorial on [Deploying a .NET Core Application to a $5 DigitalOcean droplet using Dokku](http://www.karam.io/2018/Deploying-a-NET-Core-application-to-a-5-digitalocean-droplet-using-dokku/) that even reached the top page of [/r/dotnet](http://reddit.com/r/dotnet) a while back.

Bye! 👋