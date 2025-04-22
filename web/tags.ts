import { tag } from 'epic-tag'

export const Header = tag('header', 'flex center p-huge')
export const Content = tag('main', 'flex flex1 col gap-medium p-large center')
export const Text = tag('p', 'normal', { bold: 'bold' })
export const Lead = tag(Text, 'fontSize-lead bold color-highlight')
export const Button = tag('button', 'button bg-interact color-white p-medium r-large', {
  hover: 'bg-lightgray color-black',
  press: 'bg-highlight color-white',
  bold: 'bold',
})
export const Horizontal = tag('div', 'flex gap-medium alignItems-center', {
  center: 'justifyContent-center',
})
export const Vertical = tag('div', 'flex flex1 column gap-small alignItems-start')
