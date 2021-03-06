import React from 'react';
import { create, act } from 'react-test-renderer';

import Chicken from './Chicken.js';
import { GameContext } from './contexts/GameContext.js';

const mockContext = {
  chickenPosition: {
    x: 0,
    y: 0
  },
  level: 0,
  chickenGraphic: "walkUp",
  changeChickenGraphic: jest.fn(),
  increaseChickenPosition: jest.fn(),
  chickenMoving: false,
  changeChickenMoving: jest.fn(),
  chickenDirection: "up",
  chickenToMove: 1,
  changeChickenToMove: jest.fn(),
  needToUpdateChickenGraphic: false,
  changeNeedToUpdateChickenGraphic: jest.fn()
}

test('renders correctly when the level is 0', async () => {
  await act(async () => {
    chicken = create(<GameContext.Provider value={mockContext}><Chicken /></GameContext.Provider>)
  });
  expect(mockContext.increaseChickenPosition).not.toBeCalled();
  expect(mockContext.changeChickenGraphic).not.toBeCalled();
  expect(chicken).toMatchSnapshot();
});

test('renders correctly when the level is 1', async () => {
  mockContext.level = 1
  mockContext.needToUpdateChickenGraphic = true
  jest.useFakeTimers();
  await act(async () => {
    newChicken = create(<GameContext.Provider value={mockContext}><Chicken /></GameContext.Provider>)
  });
  expect(mockContext.changeChickenGraphic).toHaveBeenCalled();
  jest.advanceTimersByTime(3000);
  expect(mockContext.increaseChickenPosition).toHaveBeenCalled();
  expect(newChicken).toMatchSnapshot();
});
