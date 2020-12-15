import React, { useContext, useEffect } from 'react';
import { Image } from 'react-native';
import { GameContext } from './contexts/GameContext.js';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const Chicken = () => {
  const { chickenPosition, dPadPressed, level, chickenGraphic, changeChickenGraphic, increaseChickenPosition, chickenDirection, changeChickenToMove, chickenToMove, walls, currentScene, needToUpdateChickenGraphic, changeNeedToUpdateChickenGraphic } = useContext(GameContext)
  const chickenWidth = wp("11.73%")
  const chickenHeight = hp("5.42%")
  const stepSizeVertical = hp("0.5%")
  const stepSizeHorizontal = wp("1.0%")



  const moveIncrement = (direction) => {

    switch (direction) {
      case 'up':
        increaseChickenPosition(0, -stepSizeVertical)
        break;
      case 'down':
        increaseChickenPosition(0, stepSizeVertical)
        break;
      case 'right':
        increaseChickenPosition(stepSizeHorizontal, 0)
        break;
      case 'left':
        increaseChickenPosition(-stepSizeHorizontal, 0)
        break;
    }
  }

  const finishMovement = (interval) => {
    clearInterval(interval)
    changeChickenToMove(0);
    triggerGraphicChange()
  }

  const triggerGraphicChange = () => {
    if (!dPadPressed) {
      changeNeedToUpdateChickenGraphic(true);
    }
  }

  const stepSize = (direction) => {
    if (isVertical(direction)) {
      return stepSizeVertical
    } else {
      return stepSizeHorizontal
    }
  }

  const isVertical = (direction) => {
    return (direction == 'up' || direction == 'down')
  }

  const capDistanceForWall = (wall, distance, direction) => {
    const padding = linePadding(wall.stroke, direction)
    const wallPosition = adjustCoords(wall.position, direction, padding)
    if (chickenWillReach(wallPosition, distance, direction) && chickenInLineWith(wall)) {
      distance = Math.floor((Math.abs(chickenEdge(direction) - wallPosition)) / stepSize(direction))
    }
    return distance
  }

  const move = (direction, distance) => {
    if (currentScene == 'maze') {
      walls.forEach(wall => distance = capDistanceForWall(wall, distance, direction))
    }
    let interval = setInterval(() => {
      if (distance > 0) {
        moveIncrement(direction);
        distance--;
      } else {
        finishMovement(interval);
      }
    }, 30)
  }

  const linePadding = (stroke, direction) => {
    let padding = stroke / 2
    if (direction == 'up' || direction == 'left') {
      return padding
    } else {
      return -padding
    }
  }

  const chickenWillReach = (wallPosition, distance, direction) => {
    let chickenStartsBeforeWall
    let chickenEndsBeyondWall
    switch (direction) {
      case 'up':
        chickenStartsBeforeWall = chickenEdge(direction) >= wallPosition - stepSizeVertical
        chickenEndsBeyondWall = chickenPositionAfterMovement(distance, direction) <= wallPosition + stepSizeVertical
        break;
      case 'down':
        chickenStartsBeforeWall = chickenEdge(direction) <= wallPosition + stepSizeVertical
        chickenEndsBeyondWall = chickenPositionAfterMovement(distance, direction) >= wallPosition - stepSizeVertical
        break;
      case 'right':
        chickenStartsBeforeWall = chickenEdge(direction) <= wallPosition + stepSizeHorizontal
        chickenEndsBeyondWall = chickenPositionAfterMovement(distance, direction) >= wallPosition - stepSizeHorizontal
        break;
      case 'left':
        chickenStartsBeforeWall = chickenEdge(direction) >= wallPosition - stepSizeHorizontal
        chickenEndsBeyondWall = chickenPositionAfterMovement(distance, direction) <= wallPosition + stepSizeHorizontal
        break;
    }
    return chickenStartsBeforeWall && chickenEndsBeyondWall
  }

  const chickenEdge = (direction) => {
    switch (direction) {
      case 'up':
        return chickenPosition[1]
      case 'down':
        return chickenPosition[1] + chickenHeight
      case 'right':
        return chickenPosition[0] + chickenWidth
      case 'left':
        return chickenPosition[0]
    }
  }

  const chickenPositionAfterMovement = (distance, direction) => {
    switch (direction) {
      case 'up':
        return chickenEdge(direction) - (distance * stepSizeVertical)
      case 'down':
        return chickenEdge(direction) + (distance * stepSizeVertical)
      case 'right':
        return chickenEdge(direction) + (distance * stepSizeHorizontal)
      case 'left':
        return chickenEdge(direction) - (distance * stepSizeHorizontal)
    }
  }

  const chickenInLineWith = (wall) => {
    if (wall.type == 'horizontal' && isVertical(chickenDirection)) {
      return chickenPosition[0] > adjustXCoords(wall.start) && chickenPosition[0] < adjustXCoords(wall.end)
    } else if (wall.type == 'vertical' && !isVertical(chickenDirection)) {
      return chickenPosition[1] > adjustYCoords(wall.start) && chickenPosition[1] < adjustYCoords(wall.end)
    }
  }

  const adjustCoords = (coord, direction, padding = 0) => {
    if (isVertical(direction)) {
      return adjustYCoords(coord, padding)
    } else {
      return adjustXCoords(coord, padding)
    }
  }

  const adjustXCoords = (coord, padding = 0) => {
    return wp(coord) + wp(padding)
  }

  const adjustYCoords = (coord, padding = 0) => {
    return hp(coord) + hp('5.00%') + hp("1.85%") + hp(padding)
  }

  useEffect(() => {
    if (chickenToMove == 0) {
      return;
    }
    move(chickenDirection, chickenToMove);
  }, [level, chickenToMove, chickenDirection])

  useEffect(() => {
    let action
    if (chickenToMove > 0) {
      action = 'walk'
    } else {
      action = 'idle'
    }
    if (needToUpdateChickenGraphic == true) {
      changeChickenGraphic(`${action}${chickenDirection}`)
      changeNeedToUpdateChickenGraphic(false)
    }
  }, [chickenToMove, chickenDirection, needToUpdateChickenGraphic])


  const graphics = {
    idleleft: require('../assets/chicken-left.png'),
    idleright: require('../assets/chicken-right.png'),
    idleup: require('../assets/chicken-stand-back.png'),
    idledown: require('../assets/chicken-stand-front.png'),
    walkup: require('../assets/chicken-run-back.gif'),
    walkright: require('../assets/chicken-run-right.gif'),
    walkleft: require('../assets/chicken-run-left.gif'),
    walkdown: require('../assets/chicken-run-front.gif'),
  }


  return (
    < Image
      style={{
        position: 'absolute',
        top: chickenPosition[1],
        left: chickenPosition[0],
        width: chickenWidth,
        height: chickenHeight,
        zIndex: 4,
      }}
      nativeID={`chicken-${chickenGraphic}`}
      source={graphics[chickenGraphic]}
    />
  );

}

export default Chicken
