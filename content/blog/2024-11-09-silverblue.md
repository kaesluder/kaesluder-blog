---js
const title = 'Fedora Silverblue'
const date = "2024-11-16"
const draft = false
const tags = ["linux"]
---

I like to try out different linux distributions.
Part of it is testing how how different groups implement some of the same ideas,
but part is due to inevitably finding rough edges as an install ages over time.
At the same time, there are parts of a linux install that I find annoying.
The big ones are hardware compatibility and desktop environments.
To be fair, I've never had a clean setup on MSWindows either.

My latest go at this is [Fedora Silverblue](https://fedoraproject.org/atomic-desktops/silverblue/).
Silverblue is one of Fedora's atomic operating system variants.
Atomic here means that base operating system updates happen as one reversible chunk
rather than file-by-file which is typical.
The base system and utilities are declared immutable,
at least for binaries.
Some configuration files can be changed as normal.

How are you supposed to install software?
For applications that run in the shell,
the preferred method is to run OCI (Docker) containers
with personalized or specialized installs.
Silverblue ships with `toolbox` a utility to
download and install selected images
that are configured to work with the host operating system
including Wayland and port forwarding.

`toolbox` is compatible with [Distrobox](https://distrobox.it/#distrobox),
which provides more features and support for additional linux distributions.
Currently I have arch, bazzite-arch, and alpine ready to run.
[bazzite-arch](https://github.com/ublue-os/bazzite-arch) is an interesting example of a special-purpose image.
It comes with multiple apps for linux gaming pre-installed.
Distrobox also has the ability to assign different home folders to containers.
By default they all use the same home folder, which makes accessing files convenient.

![List of distrobox images including arch, bazzite-arch, and alpine](/images/distrobox_list.png)

Forwarding of graphical windows from a container to the Siverblue host works well.
Distrobox also has a utility to export desktop menu information
so I can launch apps directly from the Gnome desktop. (How do games play?
I've had mixed results but I don't have a gaming laptop
and have not done a lot of testing here.)
There are some minor glitches but few consistent problems.

![My election survival toolkit on Lutris](/images/lutris_screenshot.png)

*Lutris running from bazzite-arch container*

![Biblically Accurate Xeyes](/images/xeyes_screenshot.png)

*Biblically Accurate Xeyes*

The switch also included jumping into Gnome for the first time in several years.
Mostly I've been sticking with KDE but have been wanting a change focused on minimizing distractions.
Gnome does well with the everything full-screen style I prefer,
without the radical changes imposed by tiling WMs.
Flatpak is the preferred method for installing graphical software,
including firefox, chrome, media players, and terminal emulators.

The base operating system can be changed using `rpm-ostree`,
[another image-based package system](https://coreos.github.io/rpm-ostree/).
This raises another complication if you're going beyond Flatpak.
My laptop now has two container systems, three container managers,
and separate package managers and collections for each container.
I don't mind, but it could be confusing to have too many other systems running as clients.

There are related projects supporting different WMs and Desktop environments:

* [Fedora Atomic Desktops](https://fedoraproject.org/atomic-desktops/)
* [OpenSUSE Aeon](https://aeondesktop.github.io/)
* [universal blue images](https://universal-blue.org/) (Fedora Atomic with additional customization)

Overall it's been an easy and comfortable experience so far.
There are a few glitches here and there,
primarily due to flatpak permissions,
but overall it provides a solid base for experimentation.
