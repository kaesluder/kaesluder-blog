---js
const title = '31 August 2025: Surfshark and NixOS';
const date = "2025-08-31";
const draft = false;
const tags = ["linux"];
const mermaid = false;
---

# NixOS and Surfshark

With all the anti-trans news of this week I'm working on bringing up some better internet security, including a vpn subscription to Surfshark. Simultaneously, I'm distro-hopping again looking for a few improvements on some minor issues that individually are not a big deal, but over the months have become more and more frustrating.

NixOS is worth a shot. There are some configuration and software things I end up setting up in nearly every new computer. My experience at Amazon has sold me on configuration as code. And my personal laptop (Thinkpad E14 Intel Gen. 1) has some quirks that require some special handling. The NixOS config file reminds me of the Freebsd centralized [config files](https://docs.freebsd.org/en/books/handbook/config/). Nix has its own quirks.

Honestly the most challenging part so far was setting up Surfshark, which uses its own configuration client distributed as snap or flatpak. The first step was setting up flatpak [according to wiki instructions](https://wiki.nixos.org/wiki/Flatpak).


```nix
  services.flatpak.enable = true;
  systemd.services.flatpak-repo = {
    wantedBy = [ "multi-user.target" ];
    path = [ pkgs.flatpak ];
    script = ''
      flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
    '';
  };
```

A trickier problem to fix was DNS resolution failures when Surfshark is active. A solution was to disable `resolv.conf` in favor of NetworkManager DNS settings. These settings configure the system to use the Surfshark DNS servers set through NetworkManager rather than attempt to use resolv.conf.


```nix
  services.resolved.enable = true;
  networking.resolvconf.enable = false;
  networking.networkmanager.dns = "systemd-resolved";
```

Future work:

1. using NixOS for a while to get a feel for how to manage it
2. separating agnostic command-line utils from linux-specific to possibly use nix on other systems

# Kagi

Also experimenting with [Kagi search](https://kagi.com/). Never been comfortable with google's privacy models, their results just keep getting worse, and I like the ability to downrank less-reliable sites and sources that inexplicably get the top results elesewhere.
