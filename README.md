# Orbit Talk 

Frontend implementation for the Orbit Talk chat app.

It calls a set of restful APIs exposed from [orbittalk-api](https://github.com/zhna123/orbittalk-api)

Developed with

* React + Vite
* Tailwind CSS
* React Hook Form

## Testing

Vitest + React testing library

Steps to set up:
1. `npm install vitest --save-dev`
2. add `"test": "vitest",` to script in `package.json`
To use with react testing library
1. install jsdom `npm install jsdom --save-dev`
2. include jsdom in vite config file. - remember to change import
```
test: {
  environment: 'jsdom',
},
```
3. install react testing library
`npm install @testing-library/react @testing-library/jest-dom --save-dev`
4. add a test setup file `tests/setup.ts`
5. include the setup file in vite config file
6. install `npm install @testing-library/user-event --save-dev`

## Accessibility

Attempted to address issues around:

* Semantic HTML & ARIA
* Keyboard navigation support & Tab focus
* Accessible colors & Meaningful text
