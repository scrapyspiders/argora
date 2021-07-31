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
  ],
  yellow: '#fcef1f'
};

/*
 *  Backgrounds are sorted from darker to brighter.
 *  Contrasts are sorted from more contrasted 
 *  to less contrasted with theme background.
 */

const themes = {
  light: {
    background: [
      '#dfe0f1',
      '#ffffff'
    ],
    contrast: [
      '#18152E',
      '#231A53',
      '#64528C'
    ],
    purple: colors.purple[0],
    green: colors.green[0],
    blue: colors.blue[0]
  },
  dark: {
    background: [
      '#060727',
      '#0c0e33'
    ],
    contrast: [
      '#FFFFFF',
      '#EBEBEC',
      '#B4B4B8'
    ],
    purple: colors.purple[2],
    green: colors.green[2],
    blue: colors.blue[2]
  },
};

const transition = "transition: background 0.2s ease-in, color 0.2s ease-in, border-color 0.2s ease-in, opacity 0.2s ease-in;"

export {colors, themes, transition};