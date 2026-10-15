// Faces and paper/ink pairs shared with lists lists (all verified to load from Google Fonts).
const FONTS = [
    // serif
    "Literata", "EB Garamond", "Crimson Pro", "Libre Baskerville", "Lora", "Merriweather",
    "Source Serif 4", "Spectral", "Cormorant Garamond", "Alegreya", "Vollkorn", "Gentium Book Plus",
    "Newsreader", "Fraunces", "Instrument Serif", "Playfair Display", "Bodoni Moda", "Old Standard TT",
    "Cardo", "Sorts Mill Goudy", "PT Serif", "Bitter", "Domine", "Libre Caslon Text", "IM Fell English",
    // sans
    "Atkinson Hyperlegible", "Inter", "IBM Plex Sans", "Work Sans", "Fira Sans", "Space Grotesk",
    "Libre Franklin", "Alegreya Sans", "PT Sans", "Manrope", "Archivo", "Syne", "Public Sans", "Jost",
    "Lexend", "Figtree", "Karla",
    // mono
    "IBM Plex Mono", "JetBrains Mono", "Fira Code", "Space Mono", "Courier Prime", "Inconsolata",
    "Victor Mono", "DM Mono", "Overpass Mono", "Cousine", "Martian Mono", "Azeret Mono",
    // odd ones
    "Major Mono Display", "Unica One",
    // type-nerd favourites (added 2026-10-14)
    "Young Serif", "Gloock", "Libre Bodoni", "Ibarra Real Nova", "Besley", "Petrona", "Brygada 1918", "Imbue",
    "Castoro", "Rosarivo", "Zilla Slab", "Piazzolla", "Gelasio",
    "Bricolage Grotesque", "Hanken Grotesk", "Schibsted Grotesk", "Instrument Sans", "Recursive", "Chivo",
    "Spline Sans", "Geist", "Funnel Display", "Familjen Grotesk", "Epilogue", "Commissioner", "Big Shoulders Display",
    "Onest", "Darker Grotesque", "Radio Canada Big",
    "Chivo Mono", "Spline Sans Mono", "Geist Mono", "Atkinson Hyperlegible Mono", "Sometype Mono", "Red Hat Mono",
    "Fragment Mono", "Tiny5",
  ];
const PAPERS = [
    ["#fbf8f1", "#1b1b1b"], ["#111111", "#f2efe6"], ["#f4e9d8", "#3a2a1a"], ["#ffffff", "#0033cc"],
    ["#ffe94d", "#111111"], ["#e9f1ea", "#16351f"], ["#1d1f3a", "#f7d488"], ["#f7f2ff", "#3b1d6e"],
    ["#fff5f5", "#b3001b"], ["#eeeeee", "#222222"], ["#0b3d2e", "#e8f5e9"], ["#fdf0e6", "#c2410c"],
    ["#fff8e7", "#7a1f00"], ["#0f1e3d", "#ffd6a5"], ["#f0fff4", "#05603a"], ["#2b0a3d", "#ffb3f6"],
    ["#ffefd5", "#5b2c06"], ["#002b36", "#93e1d8"], ["#fdf6e3", "#073642"], ["#ff6b6b", "#1a0000"],
    ["#ffd1dc", "#6b0f2b"], ["#e0f7fa", "#004d57"], ["#3d0000", "#ffcfa3"], ["#f5f5dc", "#3b3b00"],
    ["#000000", "#39ff14"], ["#14213d", "#fca311"], ["#ffffff", "#008000"], ["#ffe4e1", "#8b0000"],
    ["#283618", "#fefae0"], ["#fefae0", "#bc4749"], ["#cdeac0", "#2d3a1f"], ["#03045e", "#caf0f8"],
    ["#f8edeb", "#6d597a"], ["#2d00f7", "#ffffff"], ["#ff9f1c", "#1d1d1d"], ["#a8dadc", "#1d3557"],
    ["#ffffff", "#7b2cbf"], ["#1e1e1e", "#ff8c42"], ["#f2e8cf", "#386641"], ["#ffc6ff", "#3a0ca3"],
    ["#06d6a0", "#073b4c"], ["#ffbe0b", "#3a0ca3"], ["#22223b", "#f2e9e4"], ["#ffd6e0", "#0b3954"],
    ["#00a6fb", "#001b2e"],
    // designer favourites (added 2026-10-14): Klein blue, Swiss and Vignelli red, Bauhaus, Penguin, Braun, Riso pink,
    // Mondrian, editor themes (Gruvbox, Dracula, Nord, Tokyo Night, Catppuccin, Rosé Pine, Everforest, Monokai), Pantone years
    ["#002fa7", "#f4f1ea"], ["#e30613", "#ffffff"], ["#f2c12e", "#111111"], ["#ef6c1a", "#111111"],
    ["#2b2b2b", "#ff7a1a"], ["#ff48b0", "#1b1b1b"], ["#ffffff", "#1d3ec9"], ["#ffffff", "#d52b1e"],
    ["#282828", "#ebdbb2"], ["#fbf1c7", "#3c3836"], ["#282a36", "#f8f8f2"], ["#2e3440", "#d8dee9"],
    ["#1a1b26", "#c0caf5"], ["#1e1e2e", "#cdd6f4"], ["#eff1f5", "#4c4f69"], ["#191724", "#e0def4"],
    ["#faf4ed", "#575279"], ["#2d353b", "#d3c6aa"], ["#272822", "#f8f8f2"], ["#0f4c81", "#f5f5f0"],
    ["#bb2649", "#fff4f0"], ["#ffbe98", "#3b1f14"], ["#81d8d0", "#0d2b2a"], ["#ff4f00", "#111111"],
    ["#ede8e0", "#2f2a24"], ["#a47864", "#1c120d"], ["#e4447b", "#1a0a10"],
  ];
