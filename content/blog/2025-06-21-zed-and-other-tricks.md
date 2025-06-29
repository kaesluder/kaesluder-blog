---js
const title = '21 June 2025: Roundup: Speeding up linux disk decryption, share topics, reflections, games';
const date = "2025-06-21";
const draft = false;
const tags = ["linux", "javascript"];
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/0FyLcHxbSRk?si=qAEMAohBM02byDmk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Playing with Manjaro

Working (again) on making an older Thinkpad T420 (2011) useful for home surfing and light development. Trying out [ Manjaro ](https://manjaro.org/) for now because with hardware this old I've run into issue with immutable systems like [Fedora Atomic](https://fedoraproject.org/atomic-desktops/).

### Tweaking full-disk encryption

Full-disk encryption defaults can be unbearably slow for unlocking (over 1 minute) on this machine. Unlocking happens early during the boot process before the system has access to crypto hardware. I tweaked this using the following to set the number of iterations to a lower value. Dropping from 1,500,000 to 10,000 combined with a high-entropy passphrase is hopefully good enough for the need:


````bash
sudo cryptsetup luksChangeKey --pbkdf-force-iterations 10000 --key-slot 0 /dev/sda1

# check key creation
sudo cryptsetup luksDump /dev/sda1

# remove old key
sudo cryptsetup luksKillKey /dev/sda1 0
````

As always, double-check device ids and RTFM before making changes.



## Tools Show and Share

Working on a show-and-share featuring the following:

- [Zed Editor](https://zed.dev/): Fast editor written in rust.
- [aichat](https://github.com/sigoden/aichat): Command line LLM client. Good for working through tricky bash and git options.

## Challenges of the Week

- Adapting a legacy web component to read a new data spec as part of our plaid integration. So far it's mostly understanding the old data structure and renaming fields so that everything (hopefully) works.
- Translation tags for a feature I've been working on.

## Games

- Started a playthrough of [The Alters](https://altersthegame.com/). This is similar to the 1996 movie [Multiplicity](https://www.imdb.com/title/tt0117108/) where a stressed-out husband clones himself multiple times. *The Alters* is a base-building survival game centered around Jan, a construction expert. Fortunately, he has weird science to clone himself multiple times, giving each clone fake memories of the training and skills he lacks. Unfortunately, each clone has survived a different set of challenges and traumas. As is frequently the case in survival scifi, your biggest challenge is yourself.
- Backed [Defy the Gods](https://www.kickstarter.com/projects/hecticelectron/defy-the-gods-rpg), a mesopotamian-themed TTRPG.
- Picked up [Homeworld: Revelations](https://modiphius.net/en-us/pages/homeworld), because I've never been quite able to get the CRPG to run.
