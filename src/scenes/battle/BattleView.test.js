import React from 'react';
import TestRenderer, { create } from 'react-test-renderer';

import BattleView from './BattleView.js';


describe('BattleView', () => {

  it('renders correctly', () => {
    const battle = create(<BattleView />)
    expect(battle).toMatchSnapshot();
  })

})
