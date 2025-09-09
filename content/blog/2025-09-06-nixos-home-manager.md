---js
const title = '6 September 2025: More Nix with home manager';
const date = "2025-09-06";
const draft = false;
const tags = ["linux"];
const mermaid = false;
---

## Nixos after a week

So far so good. Been running a week and not experienced the issue I was having with wake from sleep. I didn't expect Nixos to become a daily driver, but it is for now.

## Home-manager

One of my goals is to have a consistent set of software and utilities I can easily manage across multiple linux and Macos systems. These include:

* helix and/or nvim: primary editors
* fd and rg: "easier" replacements for find and grep
* yazi, zellij, zoxide, chezmoi: shell helper utilities

Nix is very good at declaring software installs. And home manager built on nix seems like a good solution for keeping that list in my user-space.

### Problem 1: Global or Standalone?

The [home-manager manual](https://nix-community.github.io/home-manager/) has instructions for installing home-manager in stand-alone mode and as an extension of the global `/etc/nixos/configuration.nix` file. I found out the hard way I can't do both (documentation is inconsistent and a bit frustrating.) Standalone seems to be more portable. Integration with `configuration.nix` might be useful if you want to configure everything in one file.

The one change I made at the OS level was to add home-manager to `environment.systemPackages` in `/etc/nixos/configuration.nix/`.

### Problem 2: Portability?

The recommend determinate MacOS installer uses the "experimental" feature flakes, which pushes me into flakes on Nixos as well. It took me a long time and a lot of fiddling to figure out how to use a flake as part of my home profile. I credit [Zero to Nix](https://zero-to-nix.com/) for somewhat figuring out how flakes work, and [Flakes aren't real and cannot hurt you: a guide to using Nix flakes the non-flake way](https://jade.fyi/blog/flakes-arent-real/) for figuring out some perspective.

If you have flakes enabled as a feature, home-manager creates two boilerplate files, `home.nix` and `flake.nix`. However neither of these are exactly portable `home.nix` includes references to my username and home directory:

````nix
  home.username = "kaes";
  home.homeDirectory = "/home/kaes";
````

While flake.nix specifies a system architecture.

````nix
	system = "x86_64-linux";
````

Why not use environment variables? Nix with flakes considers environment variable, "impure", one of those pure-functional language choices that I understand but find annoying.

So far the hack I'm using is to add third file that only includes the list of packages I want installed. My `packages.nix` file is careful not to include any platform-specific code:

````nix
{ pkgs, ... }:

{
  home.packages = with pkgs; [
    btop
    fish
    fzf
    zsh
    helix

    gh
    nodejs_24
    typescript
    typescript-language-server

		...

    ripgrep
    fd
    neovim

  ];
}
````

This is imported into the boilerplate flake.nix as a module:

````nix
  outputs =
    { nixpkgs, home-manager, ... }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
    in
    {
      homeConfigurations."kaes" = home-manager.lib.homeManagerConfiguration {
        inherit pkgs;

        # Specify your home configuration modules here, for example,
        # the path to your home.nix.
        modules = [
          ./home.nix
          ./packages.nix
        ];

        # Optionally use extraSpecialArgs
        # to pass through arguments to home.nix
      };
    };

````

Ideally I want to either auto-detect the system and username or modularize that as a minimal local config. But I'm still a beginner at this.
