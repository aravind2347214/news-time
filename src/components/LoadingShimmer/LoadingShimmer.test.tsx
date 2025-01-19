import { render, screen } from '@testing-library/react';
import LoadingShimmer from './LoadingShimmer'; // adjust the import path as necessary
import {describe, it , expect } from 'vitest';

describe('LoadingShimmer Component', () => {

  it('renders the section to have correct classnames', () => {
    const count = 5; // example count
    render(<LoadingShimmer count={count} />);

    // Check if the skeletons are rendered
    const section = screen.getByTestId('loader'); 
    expect(section).toBeInTheDocument() 
    expect(section).toHaveClass("max-h-[75vh] flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 overflow-y-auto")
  });

  it('has correct aria properties', () => {
    const count = 3;
    render(<LoadingShimmer count={count} />);
    const section = screen.getByTestId('loader');
    console.log(section)
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('aria-busy', 'true');
    expect(section).toHaveAttribute('aria-label', 'loader');
  });
  
});
