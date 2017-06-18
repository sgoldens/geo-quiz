import React from 'react';
import GeoQuiz from '../components/GeoQuiz';
import { shallow } from 'enzyme';

describe('GeoQuiz Main', () => {

  it('displays title', () => {
    const wrapper = shallow(
      <GeoQuiz />
    )

    expect (wrapper.text()).toBe('Geographic Border Quiz');
  });

});
