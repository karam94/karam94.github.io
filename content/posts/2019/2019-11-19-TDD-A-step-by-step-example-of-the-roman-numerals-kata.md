---
title: "Test-driven Development: A step by step example of the Roman Numerals Kata"
date: 2019-11-23
published: true
tags: ["TDD"]
series: false
cover_image: ./images/concha-mayo-cAkcO3Vk3_E-unsplash.jpg
cover_image_credits: Concha Mayo https://unsplash.com/@conchamayo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
canonical_url: false
description: "Understanding TDD is one thing, but putting it into practice is another!"
---
As explained in my previous blog post that can be found here, the purpose of this post will be to document an iterative test-driven solution to the popular Roman Numerals Kata (which I have never done before).

The reason why I am doing this is because, as previously stated:

> The issue is that when you try to look up material on Test-driven Development online, you find yourself met with explanations of what it is and solutions. The issue is, that the solutions tend to be the finished code plus the finished test suite. When in reality, the value is actually in the iterative journey taken, to reach the solution. Whilst the tests give a rough idea of that journey, they still neglect the "refactor" part of the red, green, refactor cycle.

Let's begin...

Problem Description

> The Romans wrote numbers using letters : I, V, X, L, C, D, M. (notice these letters have lots of straight lines and are hence easy to hack into stone tablets). \
> \
> You should write a function to convert normal numbers to Roman Numerals: \
> e.g.\
>  1 --> I\
>  4 --> IV\
>  5 --> V\
>  6 --> VI\
>  7 --> VII\
>  9 --> IX\
>  10 --> X\
>  11 --> XI\
>  \
> If you are unfamiliar with Roman Numerals, numbers such as 4 or 9 are IV and IX respectively because the Romans decided they were easier to read that IIII and XIIII. This is called subtractive notation.\
> \
> There is also no need to be able to convert numbers larger than 3000 (The Romans themselves didn't tend to go any higher).

It is important not to think too far ahead as it might lead to us trying to code for those scenarios, before we've even started developing them which may lead to needlessly over-complicating our code (KISS), so we'll begin by focusing on just getting the first 3 numbers spot on, incrementally. That seems like a pretty sensible place to begin, before we have to deal with more complex scenarios such as V or IV.

> I = 1\
> II = 2\
> III = 3

1 - Step One: I = 1

To begin, we start with a blank test and build scaffold it up, ready to start implementing our first test case. A new blank class called RomanNumeralsConverter has been created on the bank of defining it within the test (thanks ReSharper!) along with the Convert method.

I'm also using a popular library called Shouldly that makes tests slightly more readable and less confusing than the traditional Assert methods.

```csharp
public class GivenRomanNumeralsConverter
{
private RomanNumeralsConverter \_romanNumeralsConverter;

        [SetUp]
        public void Setup()
        {
            _romanNumeralsConverter = new RomanNumeralsConverter();
        }

        [Test]
        public void WhenConverting_1_ThenEquals_I()
        {
            _romanNumeralsConverter.Convert(1).ShouldBe("I");
        }
    }

```

```csharp
public class RomanNumeralsConverter
{
public string Convert(int i)
{
throw new System.NotImplementedException();
}
}
```

Unsurprisingly, our test fails. So, it is time to make it pass with the least amount of code we can possibly write. Don't worry if it fails for II or any other scenarios for now, even if you think you know how to solve the obstacles coming our way next.

```csharp
public class RomanNumeralsConverter
{
public string Convert(int i)
{
return "I";
}
}
```

There we go. Our first test should now pass.

2 - Step Two: II = 2

```csharp
public class GivenRomanNumeralsConverter
{
private RomanNumeralsConverter \_romanNumeralsConverter;

        [SetUp]
        public void Setup()
        {
            _romanNumeralsConverter = new RomanNumeralsConverter();
        }

        [Test]
        public void WhenConverting_1_ThenEquals_I()
        {
            _romanNumeralsConverter.Convert(1).ShouldBe("I");
        }

        [Test]
        public void WhenConverting_2_ThenEquals_II()
        {
            _romanNumeralsConverter.Convert(2).ShouldBe("II");
        }
    }

```

Once again, we have a failing test. So let's change our implementation code, so that it can handle both scenarios!

```csharp
public class RomanNumeralsConverter
{
public string Convert(int i)
{
if (i == 1) return "I";
return "II";
}
}
```

There we go. Both of our tests now pass. Notice we've done red and green, but not necessarily any refactoring yet. This is because our implementation code is so little, there really isn't much to refactor at the moment. Hold on to your horses and on to the next one!

3 - Step Three: III = 3

```csharp
public class GivenRomanNumeralsConverter
{
private RomanNumeralsConverter \_romanNumeralsConverter;

        [SetUp]
        public void Setup()
        {
            _romanNumeralsConverter = new RomanNumeralsConverter();
        }

        [Test]
        public void WhenConverting_1_ThenEquals_I()
        {
            _romanNumeralsConverter.Convert(1).ShouldBe("I");
        }

        [Test]
        public void WhenConverting_2_ThenEquals_II()
        {
            _romanNumeralsConverter.Convert(2).ShouldBe("II");
        }

        [Test]
        public void WhenConverting_3_ThenEquals_III()
        {
            _romanNumeralsConverter.Convert(3).ShouldBe("III");
        }
    }

```

Failing test... time to make it pass. Bet you can guess how we're going to go about doing that!

```csharp
public class RomanNumeralsConverter
{
public string Convert(int i)
{
if (i == 1) return "I";
if (i == 2) return "II";
return "III";
}
}
```

BOOM! We are green. But, is it time to refactor?\
I think it is. Funnily enough though, it's not our implementation that we're going to refactor, rather it's our tests.

```csharp
public class GivenRomanNumeralsConverter
{
private RomanNumeralsConverter \_romanNumeralsConverter;

        [SetUp]
        public void Setup()
        {
            _romanNumeralsConverter = new RomanNumeralsConverter();
        }

        [TestCase(1, "I")]
        [TestCase(2, "II")]
        [TestCase(3, "III")]
        public void WhenConvertingArabicNumeral_ThenEqualsExpectedRomanNumeral
            (int arabicNumeral, string romanNumeral)
        {
            _romanNumeralsConverter.Convert(arabicNumeral).ShouldBe(romanNumeral);
        }
    }

```

Firstly, if you're wondering why I've written "arabic numeral"... look it up! Secondly, we've replaced three big, bulky, repetitive tests with one single test that allows us to simply use the NUnit TestCase attribute and parameters with. Refactor done, for now!

4 - Step Four: V = 5

Up until this point, our implementation has been incredibly easy and simple. Part of the reason for this is because we've completely neglected the complexities that are about to come our way, dealing with numbers such as 4 (IV), 5 (V) and 6 (VI). We could have taken a big bang approach and tried to implement an algorithm that handles everything back in Step One. Whilst our implementation could've been spot in, there's also a big chance we could've implemented it, written lots of tests around it, only to find that one small hiccup means it is incorrect and we have to therefore either tweak it awkwardly to make it work, assuming we manage to without re-architecting it from scratch again. This approach means that even if we fail at this step, we at least have a checkpoint to go back to and we can provide our stakeholders with something that at least satisfies some of the requirements criteria.

Anyways, I've added a new test case. I'm going to get our converter working for the number 5 before, 4 or 6. Realistically, it's not going to make much difference which I address first. However my gut feeling tells me there's a possibility we're closer to getting our converter to spit out 5 than we are, 4 or 6 and I want to make my steps forward as small as possible.

Test failing...

```csharp
public class GivenRomanNumeralsConverter
{
private RomanNumeralsConverter \_romanNumeralsConverter;

        [SetUp]
        public void Setup()
        {
            _romanNumeralsConverter = new RomanNumeralsConverter();
        }

        [TestCase(1, "I")]
        [TestCase(2, "II")]
        [TestCase(3, "III")]
        [TestCase(5, "V")]
        public void WhenConvertingArabicNumeral_ThenEqualsExpectedRomanNumeral
            (int arabicNumeral, string romanNumeral)
        {
            _romanNumeralsConverter.Convert(arabicNumeral).ShouldBe(romanNumeral);
        }
    }

```

Now the implementation... test passing!

```csharp
public class RomanNumeralsConverter
{
public string Convert(int i)
{
if (i == 1) return "I";
if (i == 2) return "II";
if (i == 3) return "III";
return "V";
}
}
```

5 - Step Five: IV = 4

A failing test...

```csharp
public class GivenRomanNumeralsConverter
{
private RomanNumeralsConverter \_romanNumeralsConverter;

        [SetUp]
        public void Setup()
        {
            _romanNumeralsConverter = new RomanNumeralsConverter();
        }

        [TestCase(1, "I")]
        [TestCase(2, "II")]
        [TestCase(3, "III")]
        [TestCase(4, "IV")]
        [TestCase(5, "V")]
        public void WhenConvertingArabicNumeral_ThenEqualsExpectedRomanNumeral
            (int arabicNumeral, string romanNumeral)
        {
            _romanNumeralsConverter.Convert(arabicNumeral).ShouldBe(romanNumeral);
        }
    }

```

I am writing this as I code along, so I'm going to put my neck on the line and take a guess that there's probably a number of ways to go about solving this problem. I keep feeling like I'll need a Dictionary somewhere that maps the letters to the numbers, but I don't want to jump the gun yet.

This is funny because I don't actually know Roman Numerals and I've never done this Kata before, so I'm just playing along at the moment. Looking at the first 10 Roman Numerals, it's clear that the fancy stuff happens at 4, 5, 6 and 9, 10. Both 5 and 10 are multiples of five, so there's a chance that as we keep counting upwards, we will always have to do some sort of fancy stuff on a multiple of five. So for now, I'm going to just identify that if the number I want to convert, is one off a multiple of five, then in this case it is most likely 4 and therefore IV.

```csharp
public class RomanNumeralsConverter
{

        public string Convert(int i)
        {
            if (i == 1) return "I";
            if (i == 2) return "II";
            if (i == 3) return "III";
            if ((i + 1) % 5 == 0) return "IV";

            return "V";
        }
    }

```

Note how I could've continued with the same old chained if statement approach where I just return "IV" if i == 4. However, I'm trying to keep thing simple whilst writing something that could be scalable past the 10 mark. This isn't possible with hard coding printing out "IV", but I anticipate we will deal with this problem when we have to write a test around the number 9.

6 - Step Six: VI = 6

Time to deal with the number six, again with a failing test.

```csharp
public class GivenRomanNumeralsConverter
{
private RomanNumeralsConverter \_romanNumeralsConverter;

        [SetUp]
        public void Setup()
        {
            _romanNumeralsConverter = new RomanNumeralsConverter();
        }

        [TestCase(1, "I")]
        [TestCase(2, "II")]
        [TestCase(3, "III")]
        [TestCase(4, "IV")]
        [TestCase(5, "V")]
        [TestCase(6, "VI")]
        public void WhenConvertingArabicNumeral_ThenEqualsExpectedRomanNumeral
            (int arabicNumeral, string romanNumeral)
        {
            _romanNumeralsConverter.Convert(arabicNumeral).ShouldBe(romanNumeral);
        }
    }

```

Failing test... time to make it pass.

```csharp
public class RomanNumeralsConverter
{

        public string Convert(int i)
        {
            if (i == 1) return "I";
            if (i == 2) return "II";
            if (i == 3) return "III";
            if ((i + 1) % 5 == 0) return "IV";
            if ((i - 1) % 5 == 0) return "VI";

            return "V";
        }
    }

```

7 - Step Six: VII = 7

Again, there is no real right or wrong way to go about solving this Kata. I'm writing this as I code along and am trying to splurt my thoughts on to here as I think. I could have made the jump to 9 however I think 7 is an interesting number, because it is not directly affected by the 4, 5, 6 subtractive notation scenario.

The logic behind it is basically, this is 7. It is therefore 5 and two 1's which gives us VII. If we can now try to get our Convert method to start building our output string, potentially by using a StringBuilder and by dipping in to a Dictionary that perhaps maps our main numbers to I, X, L, etc, then perhaps we can start to reverse engineer numbers?

```csharp
public class GivenRomanNumeralsConverter
{
private RomanNumeralsConverter \_romanNumeralsConverter;

        [SetUp]
        public void Setup()
        {
            _romanNumeralsConverter = new RomanNumeralsConverter();
        }

        [TestCase(1, "I")]
        [TestCase(2, "II")]
        [TestCase(3, "III")]
        [TestCase(4, "IV")]
        [TestCase(5, "V")]
        [TestCase(6, "VI")]
        [TestCase(7, "VII")]
        public void WhenConvertingArabicNumeral_ThenEqualsExpectedRomanNumeral
            (int arabicNumeral, string romanNumeral)
        {
            _romanNumeralsConverter.Convert(arabicNumeral).ShouldBe(romanNumeral);
        }
    }

```

And a solution... where we probably need to do some serious refactoring.

```csharp
public class RomanNumeralsConverter
{

        public string Convert(int i)
        {
            StringBuilder toReturn = new StringBuilder();

            if (i == 1) return "I";
            if (i == 2) return "II";
            if (i == 3) return "III";
            if ((i + 1) % 5 == 0) return "IV";
            if ((i - 1) % 5 == 0) return "VI";

            var howManyDivisibleByV = i / 5;
            for (var k = howManyDivisibleByV; k > 0; k--)
            {
                toReturn.Append("V");
            }

            i = i - (howManyDivisibleByV * 5);

            var howManyDivisibleByI = i / 1;
            for (var k = howManyDivisibleByI; k > 0; k--)
            {
                toReturn.Append("I");
            }

            return toReturn.ToString();
        }
    }

```

So immediately, we can tell that our solution has started to grow legs. The fact that it's grown this many legs, probably suggests we may have gone down the wrong rabbit hole. That's fine, because I'd rather go down a rabbit hole that's a meter deep, than go down a rabbit hole that's a kilometer deep by attempting to big bang the whole solution up front.

Let's refactor. We can immediately replace the first three lines with a for loop that appends "I" to our StringBuilder. The awesome thing is that, even though we've gone down this hole, because we have our tests as security, we can refactor safely without living with the fear of breaking anything. Hoorah!

```csharp
public class RomanNumeralsConverter
{
public string Convert(int i)
{
StringBuilder toReturn = new StringBuilder();

            for (var k = i; k < 0; k--)
            {
                toReturn.Append("I");
            }

            if ((i + 1) % 5 == 0) return "IV";
            if ((i - 1) % 5 == 0) return "VI";

            var howManyDivisibleByV = i / 5;
            for (var k = howManyDivisibleByV; k > 0; k--)
            {
                toReturn.Append("V");
            }

            i = i - (howManyDivisibleByV * 5);

            var howManyDivisibleByI = i / 1;
            for (var k = howManyDivisibleByI; k > 0; k--)
            {
                toReturn.Append("I");
            }

            return toReturn.ToString();
        }
    }

```

Upon refactoring the first three lines, all of our tests pass except for the first test case. Upon debugging, it becomes clear that this is because we end up returning "VI" regardless of what occurs within the for loop. Let's fix this.

```csharp
public class RomanNumeralsConverter
{
public string Convert(int i)
{
StringBuilder toReturn = new StringBuilder();

            if (i == 6) return "VI";
            if (i == 5) return "V";
            if (i == 4) return "IV";

            for (var k = i; k < 0; k--)
            {
                toReturn.Append("I");
            }

            var howManyDivisibleByV = i / 5;
            for (var k = howManyDivisibleByV; k > 0; k--)
            {
                toReturn.Append("V");
            }

            i = i - (howManyDivisibleByV * 5);

            var howManyDivisibleByI = i / 1;
            for (var k = howManyDivisibleByI; k > 0; k--)
            {
                toReturn.Append("I");
            }

            return toReturn.ToString();
        }
    }

```

Alright, all green. However, still shambolic. The fact that it still looks shambolic probably means we need to get rid of what we consider to be, shambolic.

Clearly, I'm still unhappy with the supposed "solution" around dealing with the 7th number. With the 7th number being VII, we are able to spit out VI as the 6th number and V as the 5th number. So what we probably should instead be doing, is simplify the loop that appends I's to just deal with scenarios 1, 2 and 3. At the moment it counts backwards because of the shambolic code. Then modify it slightly to pick up the remaining I's we expect after 5. Let's give it a try.

```csharp
public class RomanNumeralsConverter
{
public string Convert(int i)
{
StringBuilder toReturn = new StringBuilder();

            if (i >= 5)
            {
                toReturn.Append("V");
                i -= 5;
            }

            if (i == 4) return "IV";

            for (var k = 0; k < i; k++)
            {
                toReturn.Append("I");
            }

            return toReturn.ToString();
        }
    }

```

...and now we can breathe again with all of our tests green. It might seem like we're not really getting anywhere, but in fact, we are. We basically not only slaughtered the "if it works, don't touch it" approach, but we've been able to produce something quite simple and concise, from something that was severely overly engineered. The truth is, some people might be smart enough to avoid producing the overly engineered code in the first place, but as we see in code bases on a daily basis, that isn't always the case.

The code of "i-=5" in the first if statement, is not too far off the same theory, that we were trying to do when we had the long shambolic code. At the end of the day, code is just our thought process deciphered down.

8 - Step Eight: IX = 9

Now we have to handle a similar situation to the 4, 5, 6 one. Except this time it is 9, 10 & 11.

```csharp
public class GivenRomanNumeralsConverter
{
private RomanNumeralsConverter \_romanNumeralsConverter;

        [SetUp]
        public void Setup()
        {
            _romanNumeralsConverter = new RomanNumeralsConverter();
        }

        [TestCase(1, "I")]
        [TestCase(2, "II")]
        [TestCase(3, "III")]
        [TestCase(4, "IV")]
        [TestCase(5, "V")]
        [TestCase(6, "VI")]
        [TestCase(7, "VII")]
        [TestCase(9, "IX")]
        public void WhenConvertingArabicNumeral_ThenEqualsExpectedRomanNumeral
            (int arabicNumeral, string romanNumeral)
        {
            _romanNumeralsConverter.Convert(arabicNumeral).ShouldBe(romanNumeral);
        }
    }

```

Keep it simple, let's get the test passing before overthinking things.

```csharp
public class RomanNumeralsConverter
{
public string Convert(int i)
{
StringBuilder toReturn = new StringBuilder();

            if (i >= 9)
            {
                toReturn.Append("IX");
                i -= 9;
            }

            if (i >= 5)
            {
                toReturn.Append("V");
                i -= 5;
            }

            if (i == 4) return "IV";

            for (var k = 0; k < i; k++)
            {
                toReturn.Append("I");
            }

            return toReturn.ToString();
        }
    }
```

8 - Step Nine: X & IX = 10 & 11

Here, I realise I can add tests for both 10 & 11. Cheating a little bit, yeah I know.

```csharp
public class GivenRomanNumeralsConverter
{
private RomanNumeralsConverter \_romanNumeralsConverter;

        [SetUp]
        public void Setup()
        {
            _romanNumeralsConverter = new RomanNumeralsConverter();
        }

        [TestCase(1, "I")]
        [TestCase(2, "II")]
        [TestCase(3, "III")]
        [TestCase(4, "IV")]
        [TestCase(5, "V")]
        [TestCase(6, "VI")]
        [TestCase(7, "VII")]
        [TestCase(9, "IX")]
        [TestCase(10, "X")]
        [TestCase(11, "XI")]
        public void WhenConvertingArabicNumeral_ThenEqualsExpectedRomanNumeral
            (int arabicNumeral, string romanNumeral)
        {
            _romanNumeralsConverter.Convert(arabicNumeral).ShouldBe(romanNumeral);
        }
    }

```

But I've spotted that the TestCase for 11 will work, without any specific code changes. Bingo!

```csharp
public class RomanNumeralsConverter
{
public string Convert(int i)
{
StringBuilder toReturn = new StringBuilder();

            if (i >= 10)
            {
                toReturn.Append("X");
                i -= 10;
            }

            if (i >= 9)
            {
                toReturn.Append("IX");
                i -= 9;
            }

            if (i >= 5)
            {
                toReturn.Append("V");
                i -= 5;
            }

            if (i == 4) return "IV";

            for (var k = 0; k < i; k++)
            {
                toReturn.Append("I");
            }

            return toReturn.ToString();
        }
    }

```

The question now is, can we refactor? We've certainly built up some duplication/a pattern in terms of the type of logic we are dealing with. Let's try and extract and refactor our if statements in to their own method as their scaffolding is roughly the same.

```csharp
public class RomanNumeralsConverter
{
public string Convert(int i)
{
StringBuilder toReturn = new StringBuilder();
var remainingI = AppendRomanNumerals(i, toReturn);

            for (var k = 0; k < remainingI; k++)
            {
                toReturn.Append("I");
            }

            return toReturn.ToString();
        }

        public int AppendRomanNumerals(int arabicNumeral, StringBuilder stringBuilder)
        {
            if (arabicNumeral >= 10)
            {
                stringBuilder.Append("X");
                arabicNumeral -= 10;
            }

            if (arabicNumeral >= 9)
            {
                stringBuilder.Append("IX");
                arabicNumeral -= 9;
            }

            if (arabicNumeral >= 5)
            {
                stringBuilder.Append("V");
                arabicNumeral -= 5;
            }

            if (arabicNumeral == 4) stringBuilder.Append("IV");

            return arabicNumeral;
        }
    }

```

We've managed to extract our logic in to a method if its own, which should make our Convert() method easier to skim read. We have a test failing however, which is the test of the numeral 4. Instead of "IV" we're getting "IVIIII" and the fix is easy to spot. Thank you for your protection, tests!

```csharp
public class RomanNumeralsConverter
{
public string Convert(int i)
{
StringBuilder toReturn = new StringBuilder();
var remainingI = AppendRomanNumerals(i, toReturn);

            for (var k = 0; k < remainingI; k++)
            {
                toReturn.Append("I");
            }

            return toReturn.ToString();
        }

        public int AppendRomanNumerals(int arabicNumeral, StringBuilder stringBuilder)
        {
            if (arabicNumeral >= 10)
            {
                stringBuilder.Append("X");
                arabicNumeral -= 10;
            }

            if (arabicNumeral >= 9)
            {
                stringBuilder.Append("IX");
                arabicNumeral -= 9;
            }

            if (arabicNumeral >= 5)
            {
                stringBuilder.Append("V");
                arabicNumeral -= 5;
            }

            if (arabicNumeral >= 4)
            {
                stringBuilder.Append("IV");
                arabicNumeral -= 4;
            }

            return arabicNumeral;
        }
    }

```

At this point however, my brain keeps swinging back to that Dictionary (similar to a Map, for you Java people) that I mentioned earlier. We have a lot of code duplication within the new method we created. A dictionary would allow us to map our arabic numerals to the numbers 10, 9, 5 & 4 and we could simply replace all four if statements with a single one, potentially.

Let's give it a try... and if it goes wrong, well our tests will tell us so!

```csharp
public class RomanNumeralsConverter
{
private readonly Dictionary<int, string> \_romanNumeralsDictionary = new Dictionary<int, string>()
{
{10, "X"},
{9, "IX"},
{5, "V"},
{4, "IV"},
{1, "I"}
};

        public string Convert(int i)
        {
            StringBuilder toReturn = new StringBuilder();
            var remainingI = AppendRomanNumerals(i, toReturn);

            for (var k = 0; k < remainingI; k++)
            {
                toReturn.Append("I");
            }

            return toReturn.ToString();
        }

        public int AppendRomanNumerals(int arabicNumeral, StringBuilder stringBuilder)
        {
            foreach (var (key, value) in _romanNumeralsDictionary)
            {
                if (arabicNumeral >= key)
                {
                    stringBuilder.Append(value);
                    arabicNumeral -= key;
                }
            }

            return arabicNumeral;
        }
    }

```

There we go. One of the things you tend to notice when doing these types of Katas is that it takes time to get the engine going, but once the patterns start to emerge after the first couple of obstacles, things become easier to refactor lets us clear our minds a little bit.

9 - Step Ten: XIV = 14

Here we go again. Let's get a failing test going...

```csharp
public class GivenRomanNumeralsConverter
{
private RomanNumeralsConverter \_romanNumeralsConverter;

        [SetUp]
        public void Setup()
        {
            _romanNumeralsConverter = new RomanNumeralsConverter();
        }

        [TestCase(1, "I")]
        [TestCase(2, "II")]
        [TestCase(3, "III")]
        [TestCase(4, "IV")]
        [TestCase(5, "V")]
        [TestCase(6, "VI")]
        [TestCase(7, "VII")]
        [TestCase(9, "IX")]
        [TestCase(10, "X")]
        [TestCase(11, "XI")]
        [TestCase(14, "XIV")]
        [TestCase(15, "XV")]
        [TestCase(16, "XVI")]
        public void WhenConvertingArabicNumeral_ThenEqualsExpectedRomanNumeral
            (int arabicNumeral, string romanNumeral)
        {
            _romanNumeralsConverter.Convert(arabicNumeral).ShouldBe(romanNumeral);
        }
    }

```

It passes! Without doing any work! So do 15 and 16. Just like magic!

9 - Step Eleven: XX = 20

This time I'm afraid, we've not been as lucky. Can you see why the test for 20 is failing?
I'll give you a clue, the output is currently "XIXI" which is obviously incorrect.

```csharp
public class GivenRomanNumeralsConverter
{
private RomanNumeralsConverter \_romanNumeralsConverter;

        [SetUp]
        public void Setup()
        {
            _romanNumeralsConverter = new RomanNumeralsConverter();
        }

        [TestCase(1, "I")]
        [TestCase(2, "II")]
        [TestCase(3, "III")]
        [TestCase(4, "IV")]
        [TestCase(5, "V")]
        [TestCase(6, "VI")]
        [TestCase(7, "VII")]
        [TestCase(9, "IX")]
        [TestCase(10, "X")]
        [TestCase(11, "XI")]
        [TestCase(14, "XIV")]
        [TestCase(15, "XV")]
        [TestCase(16, "XVI")]
        [TestCase(19, "XIX")]
        [TestCase(20, "XX")]
        public void WhenConvertingArabicNumeral_ThenEqualsExpectedRomanNumeral
            (int arabicNumeral, string romanNumeral)
        {
            _romanNumeralsConverter.Convert(arabicNumeral).ShouldBe(romanNumeral);
        }
    }

```

What's happening is that we are only checking for each element in our dictionary once. This means we only check if our arabic numeral requires an X or fits in to 10 once. By replacing the if statement with a while loop as shown below, we address this and our tests confirm that we've not hindered anything else by doing so.

```csharp
public class RomanNumeralsConverter
{
private readonly Dictionary<int, string> \_romanNumeralsDictionary = new Dictionary<int, string>()
{
{10, "X"},
{9, "IX"},
{5, "V"},
{4, "IV"},
{1, "I"}
};

        public string Convert(int i)
        {
            StringBuilder toReturn = new StringBuilder();
            var remainingI = AppendRomanNumerals(i, toReturn);

            for (var k = 0; k < remainingI; k++)
            {
                toReturn.Append("I");
            }

            return toReturn.ToString();
        }

        public int AppendRomanNumerals(int arabicNumeral, StringBuilder stringBuilder)
        {
            foreach (var (key, value) in _romanNumeralsDictionary)
            {
                while (arabicNumeral >= key)
                {
                    stringBuilder.Append(value);
                    arabicNumeral -= key;
                }
            }

            return arabicNumeral;
        }
    }

```

Do we spot any possible refactorings at this point? Of course we do. We can get rid of the entire for loop in the Convert method as our AppendRomanNumerals method now deals with appending our I's as we now are using a dictionary.

```csharp
public class RomanNumeralsConverter
{
private readonly Dictionary<int, string> \_romanNumeralsDictionary = new Dictionary<int, string>()
{
{10, "X"},
{9, "IX"},
{5, "V"},
{4, "IV"},
{1, "I"}
};

        public string Convert(int i)
        {
            StringBuilder toReturn = new StringBuilder();
            AppendRomanNumerals(i, toReturn);

            return toReturn.ToString();
        }

        public int AppendRomanNumerals(int arabicNumeral, StringBuilder stringBuilder)
        {
            foreach (var (key, value) in _romanNumeralsDictionary)
            {
                while (arabicNumeral >= key)
                {
                    stringBuilder.Append(value);
                    arabicNumeral -= key;
                }
            }

            return arabicNumeral;
        }
    }
```

9 - Step Twelve: To infinity (not really) and beyond!

As our core logic has been implemented and nothing really changes as our Roman Numerals increase, I'm imagining that the algorithm we've written should just automatically work if we test it against larger numbers.

```csharp
public class GivenRomanNumeralsConverter
{
private RomanNumeralsConverter \_romanNumeralsConverter;

        [SetUp]
        public void Setup()
        {
            _romanNumeralsConverter = new RomanNumeralsConverter();
        }

        [TestCase(1, "I")]
        [TestCase(2, "II")]
        [TestCase(3, "III")]
        [TestCase(4, "IV")]
        [TestCase(5, "V")]
        [TestCase(6, "VI")]
        [TestCase(7, "VII")]
        [TestCase(9, "IX")]
        [TestCase(10, "X")]
        [TestCase(11, "XI")]
        [TestCase(14, "XIV")]
        [TestCase(15, "XV")]
        [TestCase(16, "XVI")]
        [TestCase(19, "XIX")]
        [TestCase(20, "XX")]
        [TestCase(21, "XXI")]
        [TestCase(24, "XXIV")]
        [TestCase(37, "XXXVII")]
        [TestCase(40, "XL")]
        [TestCase(58, "LVIII")]
        [TestCase(100, "C")]
        [TestCase(256, "CCLVI")]
        [TestCase(294, "CCXCIV")]
        [TestCase(400, "CD")]
        [TestCase(500, "D")]
        [TestCase(700, "DCC")]
        [TestCase(1000, "M")]
        [TestCase(2019, "MMXIX")]
        [TestCase(2377, "MMCCCLXXVII")]
        [TestCase(2992, "MMCMXCII")]
        public void WhenConvertingArabicNumeral_ThenEqualsExpectedRomanNumeral
            (int arabicNumeral, string romanNumeral)
        {
            _romanNumeralsConverter.Convert(arabicNumeral).ShouldBe(romanNumeral);
        }
    }

```

We also mustn't forget to add the rest of our Roman Numerals to our dictionary, however.

```csharp
public class RomanNumeralsConverter
{
private readonly Dictionary<int, string> \_romanNumeralsDictionary = new Dictionary<int, string>()
{
{1000, "M"},
{900, "CM"},
{500, "D"},
{400, "CD"},
{100, "C"},
{90, "XC"},
{50, "L"},
{40, "XL"},
{10, "X"},
{9, "IX"},
{5, "V"},
{4, "IV"},
{1, "I"}
};

        public string Convert(int i)
        {
            StringBuilder toReturn = new StringBuilder();
            AppendRomanNumerals(i, toReturn);

            return toReturn.ToString();
        }

        public int AppendRomanNumerals(int arabicNumeral, StringBuilder stringBuilder)
        {
            foreach (var (key, value) in _romanNumeralsDictionary)
            {
                while (arabicNumeral >= key)
                {
                    stringBuilder.Append(value);
                    arabicNumeral -= key;
                }
            }

            return arabicNumeral;
        }
    }

```

Our tests are green!

9 - Step Thirteen: Edge Cases

One thing I always like to do once I feel I've approached the "done" stage of a Kata, is make sure that my final algorithm is resilient enough to deal with edge cases. The reason for this is because whilst we know the only external user of our RomanNumeralsConverter is our tests in this case, on the contrary, in the real world we cannot anticipate when or what may ever need to use what we have written.

What happens if Bob comes along in 6 months and decides to modify a Roman Numerals UI to no longer limit input up to 3000 without realising the implications in the back-end? In our Kata's current state, it will accept both 300,000 and 3001.

There is no point in even evaluating whether or not our algorithm accidentally produces a correct output for those numbers. The only way to correctly evaluate this, is to test-drive the functionality and use our tests as our true source of truth to answer that exact question. No tests to prove we can handle those edge case inputs, means that we as developers should not be comfortable releasing lies in to production and therefore we need to handle numbers over 3000 by ensuring our code does something more intelligent than outputting an answer that could be erroneous.

```csharp
using System;
using NUnit.Framework;
using RomanNumeralsKata;
using Shouldly;

namespace RomanNumeralsKataTests
{
public class GivenRomanNumeralsConverter
{
private RomanNumeralsConverter \_romanNumeralsConverter;

        [SetUp]
        public void Setup()
        {
            _romanNumeralsConverter = new RomanNumeralsConverter();
        }

        [TestCase(1, "I")]
        [TestCase(2, "II")]
        [TestCase(3, "III")]
        [TestCase(4, "IV")]
        [TestCase(5, "V")]
        [TestCase(6, "VI")]
        [TestCase(7, "VII")]
        [TestCase(9, "IX")]
        [TestCase(10, "X")]
        [TestCase(11, "XI")]
        [TestCase(14, "XIV")]
        [TestCase(15, "XV")]
        [TestCase(16, "XVI")]
        [TestCase(19, "XIX")]
        [TestCase(20, "XX")]
        [TestCase(21, "XXI")]
        [TestCase(24, "XXIV")]
        [TestCase(37, "XXXVII")]
        [TestCase(40, "XL")]
        [TestCase(58, "LVIII")]
        [TestCase(100, "C")]
        [TestCase(256, "CCLVI")]
        [TestCase(294, "CCXCIV")]
        [TestCase(400, "CD")]
        [TestCase(500, "D")]
        [TestCase(700, "DCC")]
        [TestCase(1000, "M")]
        [TestCase(2019, "MMXIX")]
        [TestCase(2377, "MMCCCLXXVII")]
        [TestCase(2992, "MMCMXCII")]
        public void WhenConvertingArabicNumeral_ThenEqualsExpectedRomanNumeral
            (int arabicNumeral, string romanNumeral)
        {
            _romanNumeralsConverter.Convert(arabicNumeral).ShouldBe(romanNumeral);
        }

        [TestCase(0)]
        [TestCase(-1)]
        [TestCase(3001)]
        [TestCase(300000)]
        public void WhenConvertingOutOfRangeNumeral_ThenThrowsArgumentOutOfRangeException(int arabicNumeral)
        {
            Should.Throw<ArgumentOutOfRangeException>(() => { _romanNumeralsConverter.Convert(arabicNumeral); },
                "Only arabic numbers between 1 and 3000 can be converted.");
        }
    }

}
```

Obviously, here I've just cut to the chase instead of going through the whole red, green, refactor process and showing you all the different iterations I went through. But these tests cover realistic edge cases and our implementation now looks as follows...

```csharp
public class RomanNumeralsConverter
{
private readonly string \_outOfRangeMessage = "Only arabic numbers between 1 and 3000 can be converted.";
private readonly Dictionary<int, string> \_romanNumeralsDictionary = new Dictionary<int, string>()
{
{1000, "M"},
{900, "CM"},
{500, "D"},
{400, "CD"},
{100, "C"},
{90, "XC"},
{50, "L"},
{40, "XL"},
{10, "X"},
{9, "IX"},
{5, "V"},
{4, "IV"},
{1, "I"}
};

        public string Convert(int i)
        {
            var romanNumeralBuilder = new StringBuilder();

            if(i < 1 || i > 3000) throw new ArgumentOutOfRangeException(_outOfRangeMessage);

            AppendRomanNumerals(i, romanNumeralBuilder);

            return romanNumeralBuilder.ToString();
        }

        private void AppendRomanNumerals(int arabicNumeral, StringBuilder romanNumeralBuilder)
        {
            foreach (var (key, value) in _romanNumeralsDictionary)
            {
                while (arabicNumeral >= key)
                {
                    romanNumeralBuilder.Append(value);
                    arabicNumeral -= key;
                }
            }
        }
    }

```

Simple, but effective. There isn't much point in us testing inputs such as "Hello" or 13.37 (decimal data type, for example) as we can assume that our compiler would not compile to allow Bob to call the Convert method in our RomanNumeralsCalculator successfully in the first place.

9 - Step Fourteen: The final refactor

Time for one last hoorah!

```csharp
public class RomanNumeralsConverter
{
private readonly string \_outOfRangeMessage = "Only arabic numbers between 1 and 3000 can be converted.";
private readonly Dictionary<int, string> \_romanNumeralsDictionary = new Dictionary<int, string>()
{
{1000, "M"},
{900, "CM"},
{500, "D"},
{400, "CD"},
{100, "C"},
{90, "XC"},
{50, "L"},
{40, "XL"},
{10, "X"},
{9, "IX"},
{5, "V"},
{4, "IV"},
{1, "I"}
};

        public string ToRoman(int arabicNumeral)
        {
            if (arabicNumeral < 1 || arabicNumeral > 3000) throw new ArgumentOutOfRangeException(_outOfRangeMessage);

            var romanNumeralBuilder = new StringBuilder();

            foreach (var (arabicValue, romanValue) in _romanNumeralsDictionary)
            {
                while (arabicNumeral >= arabicValue)
                {
                    romanNumeralBuilder.Append(romanValue);
                    arabicNumeral -= arabicValue;
                }
            }

            return romanNumeralBuilder.ToString();
        }
    }

```

I've renamed the method from "Convert" to "ToRoman". If someone has instantiated an instance of a "RomanConverter", then "RomanConverter.Convert" is an obsolete name. The reason I went with "ToRoman" is because there is a second part of this Kata which proposes adding the functionality to convert from Roman to Arabic and therefore that would then be called "ToArabic".

I've also removed the need for a secondary method, since we can achieve doing one, single responsibility within just the single ToRoman method. I don't consider the if statement for input validation as a separate responsibility.

Finally, I've renamed some variables to make reading the code easier. Whilst I am usually a fan of extracting if statements or loops in to separate methods to allow us to name them, like we do in the popular FizzBuzz Kata, I only deem this a requirement if the statement is actually difficult to read in the first place. All the if or loop criteria in this case should be pretty straightforward for most developers to understand at first glance.

One thing I considered was removing the StringBuilder and just concatenating a string normally. The reason why I started with a StringBuilder was because it is more performant than string concatenation. Reflecting on it now, given how simple our Kata is, the performance gains are obviously negligible and a StringBuilder doesn't really come with any benefit. In the end I decided to just keep the StringBuilder.

Conclusion
This has been quite a long post, both to write, to code and probably for you to read!
However I certainly learnt a lot by doing it and hopefully so did you from this post. I've done Kata's in the past, but I've always ignored this one in particular because I never learned Roman Numerals until today, so I've always been a bit scared of it!

My favourite part of this Kata was the transition period (or eureka moment) where we had just about enough duplication to notice a trend and refactor from the numerous if statements we had, in to something of a more generic algorithm. I also had a hiccup (or brainfart!) around step 6 where we tried to deal with numbers after 6. But looking back at it, it could have been avoided if I had noticed the obvious pattern of I's. It was also a result of overthinking and probably not taking a baby step mentally, as when trying to figure out how to deal with the conversion of only the number 7 (the smallest baby step possible), instead I ended up implementing (and over-engineering) something that did more.

My brainfart is an example of the effectiveness and importance of the TDD, baby steps approach versus thinking of the solution ahead of time and 'big banging' it. I spoke to some colleagues about my experience with the Kata and some resonated that the same thing actually happened to them, so if you're going to try this Kata out for yourself... remember... baby steps! And of course bare in mind, that it isn't easy either to define what is and isn't a baby step. This is where the importance of Pair Programming and a second pair of eyes comes in to the equation, so if you can pair this Kata with someone, over doing it alone, go for it!