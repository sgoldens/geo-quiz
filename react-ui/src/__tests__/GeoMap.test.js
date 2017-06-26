import React from 'react';
import GeoMap from '../components/GeoMap';
import { shallow } from 'enzyme';

describe('GeoMap', () => {

  xit('displays a Google Map', () => {
    const wrapper = shallow(
      <GeoMap />
    )

    // expect (wrapper.()).toBe('');
  });

  xit('displays a bordered country without a labeled name', () => {
    const wrapper = shallow(
      <GeoMap />
    )

    // expect (wrapper.()).x();;
  });
});
