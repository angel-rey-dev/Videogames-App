import React from 'react'
import "@testing-library/jest-dom"
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'

import Page404 from "../components/Page404/Page404"

describe('Test for <Page404 /> component', () => {
    let component
    beforeEach(() => {
        component = render(
            <BrowserRouter>
                <Page404 />
            </BrowserRouter>
        )
    })

    test('render <Page404 /> component', () => {
        expect(component.container).toBeInTheDocument()
    });
    test('renders its content', () => {
        expect(component.container.querySelector('.page-404__content')).toBeDefined()
    })
    test('renders an illustration', () => {
        expect(component.container.querySelector('.page-404__illustration')).toBeDefined()
    })

    test('should have a "Page not found" title', () => {
        const { getByTestId } = component
        expect(getByTestId('page-404-title')).toHaveTextContent('Page not found')
    });

    test('should have a go to home page button', () => {
        const { getByTestId } = component
        expect(getByTestId('go-to-home-page-btn')).toHaveAttribute('href', '/home')
    });
});

