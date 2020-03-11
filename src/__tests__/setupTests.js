// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/';
import pruebaMul from '../tontería.js'
import DomainJSONLDParser from '../utils/importing/DomainJSONLDParser'
const prueba = (a, b) => (a+b);

test('Adds two numbers', () =>{
    expect(prueba(1,2)).toBe(3)
});

test('Adds two numbers', () =>{
    expect(pruebaMul(1,2)).toBe(2)
});

