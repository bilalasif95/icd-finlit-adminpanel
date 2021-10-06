
window.alert = () => ({});
window.matchMedia = () => ({});
window.scrollTo = () => { };
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
};
global.localStorage = localStorageMock;
import '@testing-library/jest-dom';
