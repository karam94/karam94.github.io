---
title: My Raspberry Pi Zero & the USB Audio Confusion
date: 2019-02-17
published: true
tags: ["Miscellaneous"]
series: false
cover_image: ./images/emin-baycan-LV1CxYBgXqU-unsplash.jpg
cover_image_credits: Emin BAYCAN https://unsplash.com/@aimlesscode?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
canonical_url: false
description: "So... I won a free Raspberry Pi Zero from Google! Then I bought some USB speakers for it and chaos ensued!"
---
<figure>
    <img src="https://www.raspberrypi.org/app/uploads/2017/05/Raspberry-Pi-Zero-1-1755x1080.jpg" style="display: block; margin-left: auto; margin-right: auto;"/>
    <figcaption>Image Source: https://www.raspberrypi.org/</figcaption>
</figure>

To cut a long story short, I won a FREE [Raspberry Pi Zero](https://www.raspberrypi.org/products/raspberry-pi-zero/) from [Google](http://google.com/) at [NDC London](https://ndc-london.com/) in one of the giveaways they were hosting. In all honesty, I'd never really acquainted myself much with Raspberry Pi's before this happened and always saw myself as someone who was more interested in the web development sphere as opposed to creating little gadgets like the famous [magic mirrors](https://www.raspberrypi.org/blog/magic-mirror/).

However, given that I won one for free, it seemed almost rude not to read up more about them and then come up with an idea of some sort to try and push its boundaries (which seemed right given that I won a Pi Zero - which is a smaller more limited and streamlined version of the original that is slightly less powerful).

## So, what did I create with my Raspberry Pi Zero?
Being a C# fan, the first thing I obviously did - whilst trapped at London Euston station - was to see if I could run [.NET Core](https://dotnet.microsoft.com/download) on it. Unfortunately the Raspberry Pi Zero's come with an ARM CPU chip as opposed to their more powerful daddy Pi counter-parts which meant that I could only run the [Mono framework](https://www.mono-project.com/) on my Pi Zero. I wasn't too disheartened by this as at the end of the day, whilst the popularity of IoT devices within the .NET Core development world is only going to grow exponentially, this type of scenario was exactly what Mono was initially made for.

I created an application that queried a publicly facing API (it is one of the new Pi Zero W's so it has built in Wi-Fi) running on a job at midnight every day to fetch times and in return schedule jobs to play an audio file at those times. Simple, right?

The foresight is to eventually add customisability to this where I can set an alarm every morning through my own created web interface (that I would probably access via my mobile phone) and then my Raspberry Pi Zero connected to a USB speaker would essentially become my alarm clock. Again, not very exciting but given my lack of creativity in terms of ideas, it was still a very fulfilling process to learn about how Raspberry Pi's work along with the [NOOBS/Raspbian](https://www.raspberrypi.org/downloads/raspbian/) eco-system the community has built around them alongside learning from some of the difficulties faced with installing Mono on the Pi (hint: it's not enough to just sudo apt get mono, you need mono-complete otherwise you get exceptions about core dependencies being unavailable such as System.Web... eek!) as well as the annoying issue that this post revolves around.

## What's the Audio confusion issue?
As said in the previous section, my Mono application schedules different jobs to run at different times and play an audio file. I initially started out my implementation by using the original [SoundPlayer](https://docs.microsoft.com/en-us/dotnet/api/system.media.soundplayer?view=netframework-4.7.2) class that is found in the [.NET Framework](https://docs.microsoft.com/en-us/dotnet/framework/) and during development on my Windows machine within JetBrains Rider, this worked fine both in debug and release.

However, upon running my application on my Raspberry Pi Zero... no luck. My application logs were suggesting that there were no exceptions being thrown or errors at hand, however whilst I could play the same audio files on my Pi in VLC Player, they just weren't being played when triggered through my application.

It eventually became evident that there was clearly an incompatibility issue with the System.Media SoundPlayer class and my Raspberry Pi Zero. This meant I had to look for alternative ways to trigger a .wav file to be played on my Pi and I decided to just use the built in audio player within the operating system by triggering a bash command of "aplay *name-of-file*.wav". This worked.

After thinking everything was dandy, I then realised that all this time, the audio I was hearing during testing on my Pi wasn't actually coming from the plugged in USB speakers. It was coming from the built-in speakers in my overhead projector that I was using as my Raspberry Pi Zero's monitor connected via HDMI! (I now have my Pi SSH'd on my main PC so I don't need to worry about a UI, but I left that until the end... silly me!)

So, what was happening was that aplay configures itself at OS startup to match the settings within a configuration file (alsa.conf) that can be found at (/usr/share/alsa). By typing aplay -l (lowercase l, not uppercase), you get displayed all the recognised audio devices that aplay *could* potentially be outputting audio to.

```bash
pi@raspberrypi:~ $ aplay -l
**** List of PLAYBACK Hardware Devices ****
card 0: ALSA [bcm2835 ALSA], device 0: bcm2835 ALSA [bcm2835 ALSA]
  Subdevices: 7/7
  Subdevice #0: subdevice #0
  Subdevice #1: subdevice #1
  Subdevice #2: subdevice #2
  Subdevice #3: subdevice #3
  Subdevice #4: subdevice #4
  Subdevice #5: subdevice #5
  Subdevice #6: subdevice #6
card 0: ALSA [bcm2835 ALSA], device 1: bcm2835 ALSA [bcm2835 IEC958/HDMI]
  Subdevices: 1/1
  Subdevice #0: subdevice #0
card 1: Device [USB2.0 Device], device 0: USB Audio [USB Audio]
  Subdevices: 1/1
  Subdevice #0: subdevice #0
```

They are grouped by card and then by device. So in my case, the configuration file was set to card: 0 and device: 0 by default. This meant that aplay would always try to play audio to the default audio device within my Pi (even when none exists/is connected) as opposed to card: 1, device: 0 which was my USB speakers.

```json
defaults.pcm.card 0 // In my case, I changed this to 1.
defaults.pcm.device 0
```

Silly, right? Well, perhaps that's the wrong terminology to use. But it would be nice if this sort of thing *magically* correlated to the operating system's default audio output setting which in my case was set to not be HDMI.

No idea if this will help anyone in the future? But I certainly would've liked Father Google to have blessed me with these minor pointers a week or so ago.

Au revoir!