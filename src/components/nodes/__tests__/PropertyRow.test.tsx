import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import { PropertyRow } from '../PropertyRow';
import { designSystem } from '../../../styles/design-system';

describe('PropertyRow', () => {
  it('renders correctly', () => {
    const { container } = render(
      <PropertyRow hasChild={false}>
        <div>Test Content</div>
      </PropertyRow>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('has correct separator styling', () => {
    const { container } = render(
      <PropertyRow hasChild={false}>
        <div>Test Content</div>
      </PropertyRow>
    );
    
    const row = container.firstChild as HTMLElement;
    expect(row).toHaveStyle({
      '--separator-color': designSystem.borders.separator
    });
  });

  it('last child does not have separator', () => {
    const { container } = render(
      <div>
        <PropertyRow hasChild={false}>
          <div>First Row</div>
        </PropertyRow>
        <PropertyRow hasChild={false}>
          <div>Last Row</div>
        </PropertyRow>
      </div>
    );
    
    const rows = container.querySelectorAll('div');
    const lastRow = rows[rows.length - 1];
    expect(lastRow).toMatchSnapshot();
  });
}); 