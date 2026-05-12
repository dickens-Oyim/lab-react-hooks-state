import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import App from '../App'

const renderApp = () => render(<App />)

describe('Dark Mode Toggle', () => {
  test('button initially reads "Switch to Dark Mode"', () => {
    renderApp()
    expect(screen.getByRole('button', { name: /switch to dark mode/i })).toBeInTheDocument()
  })

  test('button changes to "Switch to Light Mode" after click', () => {
    renderApp()
    fireEvent.click(screen.getByRole('button', { name: /switch to dark mode/i }))
    expect(screen.getByRole('button', { name: /switch to light mode/i })).toBeInTheDocument()
  })

  test('button toggles back to "Switch to Dark Mode" on second click', () => {
    renderApp()
    fireEvent.click(screen.getByRole('button', { name: /switch to dark mode/i }))
    fireEvent.click(screen.getByRole('button', { name: /switch to light mode/i }))
    expect(screen.getByRole('button', { name: /switch to dark mode/i })).toBeInTheDocument()
  })
})

describe('Add to Cart', () => {
  test('each product has an "Add to Cart" button', () => {
    renderApp()
    expect(screen.getAllByRole('button', { name: /add to cart/i }).length).toBeGreaterThan(0)
  })

  test('clicking adds item with "[Name] is in your cart."', () => {
    renderApp()
    fireEvent.click(screen.getAllByRole('button', { name: /add to cart/i })[0])
    expect(screen.getByText(/is in your cart/i)).toBeInTheDocument()
  })

  test('adding two items shows both in cart', () => {
    renderApp()
    const buttons = screen.getAllByRole('button', { name: /add to cart/i })
    fireEvent.click(buttons[0])
    fireEvent.click(buttons[1])
    expect(screen.getAllByText(/is in your cart/i)).toHaveLength(2)
  })

  test('button is disabled after item is added', () => {
    renderApp()
    const btn = screen.getAllByRole('button', { name: /add to cart/i })[0]
    fireEvent.click(btn)
    expect(btn).toBeDisabled()
  })
})

describe('Category Filter', () => {
  test('dropdown has All, Fruits, Dairy options', () => {
    renderApp()
    expect(screen.getByRole('option', { name: 'All' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Fruits' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Dairy' })).toBeInTheDocument()
  })

  test('selecting Fruits hides dairy products', () => {
    renderApp()
    fireEvent.change(screen.getByLabelText(/filter by category/i), { target: { value: 'Fruits' } })
    expect(screen.getByText('Apple')).toBeInTheDocument()
    expect(screen.queryByText('Milk')).not.toBeInTheDocument()
  })

  test('selecting Dairy hides fruit products', () => {
    renderApp()
    fireEvent.change(screen.getByLabelText(/filter by category/i), { target: { value: 'Dairy' } })
    expect(screen.getByText('Milk')).toBeInTheDocument()
    expect(screen.queryByText('Apple')).not.toBeInTheDocument()
  })

  test('selecting All shows every product', () => {
    renderApp()
    const select = screen.getByLabelText(/filter by category/i)
    fireEvent.change(select, { target: { value: 'Fruits' } })
    fireEvent.change(select, { target: { value: 'all' } })
    expect(screen.getByText('Milk')).toBeInTheDocument()
    expect(screen.getByText('Apple')).toBeInTheDocument()
  })
})

describe('Cart Total', () => {
  test('cart count updates as items are added', () => {
    renderApp()
    expect(screen.getByText(/cart \(0\)/i)).toBeInTheDocument()
    fireEvent.click(screen.getAllByRole('button', { name: /add to cart/i })[0])
    expect(screen.getByText(/cart \(1\)/i)).toBeInTheDocument()
    fireEvent.click(screen.getAllByRole('button', { name: /add to cart/i })[0])
    expect(screen.getByText(/cart \(2\)/i)).toBeInTheDocument()
  })
})