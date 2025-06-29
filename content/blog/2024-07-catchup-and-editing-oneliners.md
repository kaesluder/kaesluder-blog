---js
const title = 'July 2024, Catchup and Quick Ideas'
const date = "2024-07-30T15:10:54-04:00"
const draft = false
---

Catching up after a few months of big life and family changes.
Some of what I've been working on includes
punting on a bit of *yak shedding*
(over-optimizing process instead of real work),
giving up on DIYing everything,
and focusing on paid gig work.

## `/etc/hosts` blocking with `ex`

I like to block certain websites
when I'm doing deep focus work
or have problems getting into a groove.
A simple way to do this on Linux is the [`/etc/hosts` file.](https://www.baeldung.com/linux/etc-hosts-block-specific-websites)
This file maps host names to IP numbers,
overriding DNS queries where appropriate.
For example, the following lines map reddit hostnames
to the special IP number `0.0.0.0`.

```txt
0.0.0.0   www.reddit.com
0.0.0.0   reddit.com
```

Probably about once a week,
a web search will point
to a resource on reddit
that might be useful.
Quick one-liners to enable and disable this are:

````bash
# enable filter
# Run ex with the following commands:
# 1. pick all lines with 'reddit' anywhere on the line
# 2. substitute start of line '^' with '# '
# 3. save and quit ('w')
sudo ex -c 'g/reddit/s/^/# /' -c 'wq' /etc/hosts

# disable filter
# Run ex with the following commands:
# 1. pick all lines with 'reddit' anywhere on the line
# 2. substitute '^# ' at start of line with nothing.
# 3. save and quit ('wq')
sudo ex -c 'g/reddit/s/^# //' -c 'wq' /etc/hosts
````

Why `ex`? `ex` is just vi/vim in 'script mode' or 'command mode'.
The commands used here are the same as vim commands.
You can do something similar
with any scriptable text-editing tool.
vi/vim just happens to be familiar
for me.
And I've found significant compatibility issues with sed
between bsd (MacOS) and gnu (Linux and others).

neovim didn't come with an ex alias on my system,
but similar scripts can be performed with:

````bash
nvim -u NONE -es -c '{commands}' {filename}
````

## Toolbox links

Apps that I *can* do in other ways
but I feel the need for additional scaffolding.

- [Trevor AI](https://app.trevorai.com/app): I *can* do time-blocking
but my DIY solutions
are quickly abandoned
when I most need them.
- [YNAB (You Need a Budget)](https://www.ynab.com/): As with Trevor AI,
my own solutions using `hledger` got too complex
to keep up with when busy and/or stressed.

## 'AI' and regex

A lot of my gig work involves
doing code reviews for AI-produced code.
An area where I almost always see AI struggle
is using regex. I think some of the reasons are:

1. Not fully understanding the context of the problem
2. Too many regex variations
3. Absurdly compact syntax
4. Low quality of regex code examples (backtracking, edge cases, nesting, groups).

To be fair, writing regex is difficult for humans for many of the same reasons.
