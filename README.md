# Domino
### Table of Contents
* [Introduction](#introduction)
* [Features](#features)
* [Technology](#technology)
* [Publishing notes](#publishing-notes)

### Introduction
This project is a digital modification of the *"Kozel" (Goat)*  dominoes game (a variant of the classic [Draw Game](https://en.wikipedia.org/wiki/List_of_domino_games#Draw_Game)) with a number of house rules. It offers extensive rule customization, allowing you to tailor the game experience to your preferences.

### Features
* **Single-player mode**: challenge yourself against a sophisticated AI opponent.
* **Customizable AI**: choose from pre-set opponent strategies or craft your own for a unique challenge.
* **Track your and opponent's performances**: analyze detailed player statistics.
* **Theme customization**: personalize the game's appearance with various options.
* **Game log**: review past games and analyze your strategies.

### Technology
- Electron.NET
- ASP.NET 8
- Angular 18
- LiteDb
- MediatR
- FluentValidation
- Serilog
- Tailwind CSS

### Publishing notes
Publish Angular:  
Run `ng build` from Domino.UI folder  
Build command (from Domino.WebAPI folder):  
`electronize build /target linux`  
Start command:  
`electronize start`

Notes:
To avoid error ERR_ELECTRON_BUILDER_CANNOT_EXECUTE delete Domino.WebAPI/obj and Domino.WebAPI/bin folders.

