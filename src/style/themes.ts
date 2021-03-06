import {themes} from '../constants';

const light = {
  bodyBackground: themes.light.background[0],
  postBackground: themes.light.background[1],
  text: themes.light.contrast[0],
  purple: themes.light.purple,
  purpleInvert: themes.dark.purple,
  green: themes.light.green,
  greenInvert: themes.dark.green,
  blue: themes.light.blue,
  blueInvert: themes.dark.blue
}

const dark = {
  bodyBackground: themes.dark.background[0],
  postBackground: themes.dark.background[1],
  text: themes.dark.contrast[0],
  purple: themes.dark.purple,
  purpleInvert: themes.light.purple,
  green: themes.dark.green,
  greenInvert: themes.light.green,
  blue: themes.dark.blue,
  blueInvert: themes.light.blue
}

export {light, dark};

/*
Notes for later:

purple: #bc00ff
pink: #ee16ad
bright pink: #f817b6

green: #2eaf3e
cyber green: #8fee9f
yellowish green: #b9f43e

blue: #485aff
bright blue: #1a98ff
blue other: #6aaee4


-- light theme --
bg: #e4e5f6
text: from most contrasted to less contrasted
#18152E
#231A53
#64528C

-- dark theme --
bg: #0c0e33
text: from most contrasted to less contrasted
#FFFFFF
#EBEBEC
#B4B4B8

other:
yellow: #fcef1f
*/