/*
 *  This palette is inspired from the 1984 theme on my vscode.
 *  Colors are sorted from darker to brighter.
 */

const colors = {
  purple: [
    '#bc00ff',
    '#ee16ad',
    '#f817b6'
  ],
  green: [
    '#2eaf3e',
    '#8fee9f',
    '#b9f43e'
  ],
  blue: [
    '#485aff',
    '#1a98ff',
    '#6aaee4'
  ]
};

/*
 *  Contrasts are sorted from more contrasted 
 *  to less contrasted with theme background.
 */

const themes = {
  light: {
    background: '#e4e5f6',
    contrast: [
      '#18152E',
      '#231A53',
      '#64528C'
    ]
  },
  dark: {
    background: '#0c0e33',
    contrast: [
      '#FFFFFF',
      '#EBEBEC',
      '#B4B4B8'
    ]
  },
};

export {colors, themes};