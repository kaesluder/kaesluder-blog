---js
const title = '14 June 2025: Cut-Ups, Simplified Krell Patch';
const date = "2025-06-14";
const draft = false;
const tags = ["link", "ruby"];
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/UrfFHzqGBZI?si=fEakddz0v1WR7Epk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Cut-Ups and Solo TTRPG Play

[Solo Roleplaying](https://www.forbes.com/sites/robwieland/2023/11/25/now-is-a-great-time-to-check-out-solo-roleplaying/) combines elements of traditional tabletop RPGs like _Dungeons and Dragons,_ creative journaling, and the use of divination oracles as a means for brainstroming and reflection. The games use oracles such as random dice tables, tarot, or playing cards to create an element of challenge and surpise usually provided by gamemasters or (in the case of computer-rpgs) game-design teams.

Lately I've been experimenting with [cut-up techniques](https://en.wikipedia.org/wiki/Cut-up_technique) as a way to drive scenes and plot developments. a more direct TTRPG implementation is included in the [Tilt: An oracle for solo roleplaying](https://www.drivethrurpg.com/en/product/319632/tilt-an-oracle-for-solo-roleplaying).

Primarily I've been using song lyrics because poetry offers a high level of imagery per word. The process I use involves the following steps:

1. Collection
2. Curation
3. Random Draws
4. Editing

Collection: Pulling text from sources that match the overall theme of the current game. In the example below, I started with music that felt personally and/or politically apocalyptic (even if the song isn't necessarily science fiction themed). After a few trials, I added in some additional texts to fill in some missing pieces (in this case, "Building Steam with a Grain of Salt," "Not," and "Many Moons"). These get copied into a markdown file with source citations at the top and lyrics below.

```markdown
# music for scifi game

## Sources

- St. Vincent, "Los Ageless"
- Beast in Black, "Moonlight Rendezvous"
- Reliqa, "E.O.D."
- Reliqa, "Cold World"
- Frozen Crown, "I am the Tyrant"
- Rolling Stones, "Paint it Black"
- DJ Shadow, "Building Steam with a Grain of Salt"
- Patti Smith (orig Springsteen), "Because the Night"
- Leonard Cohen, "You Want it Darker"
- Big Thief, "Not"
- Janelle Monae, "Many Moons"

## Text

In Los Ageless,
the winter never comes
the mothers milk their young
But I can keep running
...
```

Curation: I edit down the original text to get rid of repeated lines. I also break up lines to get a single idea per line,

Random Draws: I use the simple unix command line `tail -n +18 music_scifi.md | shuf | head -n 15`. (Remove the first 18 lines (sources), shuffle all the lines, take the first 15 lines.)

Editing: Further edit the result to fit the situation and grammar. For example, a response to "What really motivates the antagonist?":

```markdown
Is there a lullaby for suffering? ("You Want it Darker")
Come on now, try to understand ("Because the Night")
My doubts make me alone ("Because the Night")
Not your stable words ("Not")
```

Through the process of sifting and editing, a previously flat antagonist now has depth, a motivation, and a possible weakness.

## Sonic Pi: A Krell-ish Experiment

<iframe width="560" height="315" src="https://www.youtube.com/embed/oNKhju6Pryg?si=SrIF1OpmEpfHI2fk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Bebe and Louis Barron's soundtrack work for *Forbidden Planet* is considered to be one of the first examples of generative electronic music in cinema. It's also a project that's often imitated because it includes pitch, envelope, and filter randomization. Here's a simplified attempt at a "krell patch" implemented in sonic pi:

```ruby
# Welcome to Sonic Pi

define :three_d_6 do
  result = 0
  3.times do
    result += dice 6
  end
  puts result
  result
end

time_scale = 0.25
note_slide = 1
ring_mod_freq = 60

with_fx :ring_mod, mix: 0.8, freq: ring_mod_freq do
  3.times do
    attack = three_d_6 * time_scale
    release = three_d_6 * time_scale
    note = 70 + rrand(3,12)
    use_synth :fm
    play note, attack: attack, release: release, note_slide: note_slide
    use_synth :chipbass
    play note - rrand(6, 24), attack: attack, release: release, note_slide: note_slide
    sleep attack + release + 1
  end
end
```

## Work Research

- [senic gem](https://github.com/scenic-views/scenic) - Ruby gem for for managing postgres views.
- [Our Journey: Exploring the Magic of Views in Rails Applications](https://medium.com/@snapsheetclaims/our-journey-exploring-the-magic-of-views-in-rails-applications-28e5b3797254)
- [How to create Database Views in Ruby on Rails?](https://alisepehri.medium.com/how-to-create-database-views-in-ruby-on-rails-537f1a981e3d)
- [Bruno](https://www.usebruno.com/) - new postman substitute that uses github for synchronizing collections
