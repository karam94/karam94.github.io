---
title: Removing conflicted copies on Dropbox
date: 2017-03-09
published: true
tags: ["Scripts", "Miscellaneous"]
series: false
cover_image: ./images/pawel-czerwinski-RkIsyD_AVvc-unsplash.jpg
cover_image_credits: Paweł Czerwiński https://unsplash.com/@pawel_czerwinski?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
canonical_url: false
description: "As someone who uses Dropbox on pretty much all the different gazillion devices I own, I came across a rather frustrating issue. For some reason, almost every time my Macbook Pro would try to synchronise files modified on one of my Windows devices with Dropbox, meaning the older versions still on my Macbook would need updating, I'd end up with a 'conflicted copy' version of that file being generated by Dropbox."
---

As someone who uses Dropbox on pretty much all the different gazillion devices I own, I came across a rather frustrating issue.

For some reason, almost every time my Macbook Pro would try to synchronise files modified on one of my Windows devices with Dropbox, meaning the older versions still on my Macbook would need updating, I'd end up with a 'conflicted copy' version of that file being generated by Dropbox.

I haven't bothered tracing the exact reasons as to why this seems to constantly occur, but according to Dropbox it happens when more than one device are modifying the same file... which is never really the case when these files do crop up.

Now, for obvious reasons this was really annoying because not only did it take up more storage space but as someone who can be quite OCD in terms of having minimal, clean folder structures, it made my Dropbox directories look incredibly messy.

After some investigation, it became clear that the non-conflicted copies were in fact mostly identical to the most up to date versions of the files. It was also brought to my attention that the conflicted copies were being generated in the background every time a Dropbox sync happened on my Macbook Pro. I'm talking thousands of files almost every time a synchronisation happened... so it certainly wasn't a case of having all of these files open or being modified simultaneously. I've also formatted my Macbook Pro numerous time also and the problem never seemed to die down.

So, I thought it was about time I came up with an automated solution of some sort to solve this issue. A bash script was the obvious solution that I can run every month or so to clean out the files. Not an ideal solution, but it gets the job done, right?

    cd /YourDropboxLocation/Dropbox/
    find . | grep "conflicted copy" | while read i; do echo $i; \rm "$i"; done

The script is pretty straight forward. It simply runs in the root Dropbox directory, looks for all files which match the text "conflicted copy" using the grep command, pipes the files to a loop which iterates through all the found files and removes each and every single one.

Now, the obvious hiccup occurs during the grep search command, where if we happened to have non Dropbox generated conflicted copy files (e.g. a file we have purposely called conflicted copy for some reason that isn't actually a Dropbox conflicted copy we want to delete) then that would get picked up as well and deleted. But other than that, I'd assume the chances of this occurring are incredibly slim.

In conclusion, I'm sure I'm not the only one with this issue and hopefully this little script helps you out :)