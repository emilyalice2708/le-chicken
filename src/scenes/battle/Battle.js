import React, { useContext } from 'react';
import { View } from 'react-native';
import { GameContext } from '../../contexts/GameContext.js'

import ChickenOpponent from './ChickenOpponent.js'
import BattleChicken from './BattleChicken.js'
import AttackCommands from './AttackCommands.js'
import BattleView from './BattleView.js'
import HealthBar from './HealthBar.js'
import FenceOpponent from './FenceOpponent.js'


const Battle = () => {
  const { level } = useContext(GameContext)

  const opponent = () => {
    if (level === 4) {
      return (
        <ChickenOpponent></ChickenOpponent>
      )
    } else if (level === 6) {
      return (
        <FenceOpponent></FenceOpponent>
      )
    }
  }

  return (
    <View>
      <HealthBar character={"Chicken"} />
      <BattleChicken></BattleChicken>
      { opponent()}
      <HealthBar character={"Opponent"} />
      <BattleView></BattleView>
      <AttackCommands></AttackCommands>
    </View>
  )

}

export default Battle;
