import React, { useState, useContext } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BattleContext } from '../../contexts/BattleContext.js';

const AttackCommands = () => {
  const { chickenHealth, changeResult, opponentHealth, inputText, battleReport, changeBattleReport, chickenTurn, result, changeChickenTurn, changeOpponentHealth, changeChickenHealth, changeInputText } = useContext(BattleContext)
  let winner = false;

  const checkInput = (text) => {
<<<<<<< HEAD:src/scenes/battle/AttackCommands.js
    if (winner) {return}
    changeInputText(text)
    if(chickenTurn == true) {
        if (text.toLowerCase() == "frapper") {
            changeInputText("")
            chickenAttack()
        }
=======
    setInputText(text)
    if (chickenTurn == true) {
      if (text.toLowerCase() == "frapper") {
        setInputText("")
        chickenAttack()
      }
>>>>>>> main:src/AttackCommands.js
    }
  }

  const chickenAttack = () => {
    changeOpponentHealth(Math.floor(Math.random() * 6) + 20)
    changeBattleReport("Le chicken a frappé l’adversaire")
    checkHealth()
    changeChickenTurn()
    opponentTurn()
  }

  const opponentTurn = () => {
<<<<<<< HEAD:src/scenes/battle/AttackCommands.js
    if (winner) { return }
    checkHealth()
    setTimeout(() => {
      changeChickenHealth(Math.floor(Math.random() * 6) + 20)
      changeBattleReport("L’adversaire a frappé le chicken")
      changeChickenTurn()
=======
    setTimeout(() => {
      props.setChickenHealth(props.chickenHealth - (Math.floor(Math.random() * 6) + 20))
      setBattleReport("L’adversaire a frappé le chicken")
      checkHealth()
      setChickenTurn(true)
>>>>>>> main:src/AttackCommands.js
    }, 2000)
  }

  const checkHealth = () => {
<<<<<<< HEAD:src/scenes/battle/AttackCommands.js
    if(opponentHealth <= 20) {
      winner = true
      changeResult("You won!")
      return;
    } else if(chickenHealth <= 20) {
      winner = true;
      changeResult("You lost")
      return;
=======
    if (chickenTurn) {
      if (props.opponentHealth <= 20) {
        setResult("You won")
      }
    } else {
      if (props.chickenHealth <= 20) {
        setResult("You lost")
>>>>>>> main:src/AttackCommands.js
      }
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.hintText}>Hint: Frapper</Text>
      <Text style={styles.hintText}>{`${battleReport}`}</Text>
      <Text style={styles.hintText}>{`${result}`}</Text>
      <TextInput style={styles.input}
        placeholderTextColor="black"
        testID="textInput"
        onChangeText={checkInput}
        value={inputText}
      ></TextInput>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: wp('100%'),
    padding: hp("2%")
  },
  hintText: {
    alignSelf: "center",
    paddingBottom: hp("1%")

  },
  input: {
    width: wp("40%"),
    height: hp("5%"),
    fontSize: 20,
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius: 5,
    textAlign: "center",
    alignSelf: "center"
  }
});

export default AttackCommands;