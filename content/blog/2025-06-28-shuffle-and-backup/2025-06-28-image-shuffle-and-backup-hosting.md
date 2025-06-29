---js
const title = '28 June 2025: Shuffle and Backup';
const date = "2025-06-28";
const draft = false;
const tags = ["linux", "javascript"];
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/-CR628yT7aE?si=kFxctrIzZ27sry7c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Visual Card Shuffle

Continuing my exploration of [cut-ups](/posts/cut-ups-krell/) my sourcing interesting images from Wikimedia Commons and the Met Open Access collection. Then I shuffle the images and arrange nine of them on a grid:

![screenshot of web interface with photo tiles arranged in a 3 by 3 grid](./cut-up-grid.png)

Pain points:

- Image manipulation in css: My original idea was to use css to zoom in on random sections of each image, hoping for some creative serendipity. After an evening struggling with this. I gave up and started curating square tiles manually. The result is a bit creatively more satisfying, and it's a nice easy low-bandwidth task.
- Typescript: Kept getting warnings on a helper function that returns a JSX.Element type. Documentation on how to deal with it is inconsistent. Is it handled automatically by a vite setting (and if so, why is it being flagged)? Basic conclusion is that I need to learn a lot more about how to work with Typescript before picking it up for projects.

Next steps:

- In-page documentation
- A keep-and-draw mechanic with limited keeps

## Backups

A few months ago the disk that had my only copy of multiple desktop backup failed. My thought process in procrastinating on new backups was:

- Essential work is on github
- Most of those backups were ephemera
- I rarely re-read books
- I've not looked at that stuff in a while
- Well crap, my sewing patterns are gone.

The last point pushed me to set up backups on the Thinkpad T420 I mentioned earlier as a backup system. It was mostly easy sailing once I specified full paths and set up my ssh keys. I used the Pika front end for BackupBorg to make everything work.
