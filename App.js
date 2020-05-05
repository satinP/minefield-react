import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import params from './src/params'
import MineField from './src/components/MineField';
import { createMinedBoard, cloneBoard, openField, 
         hasExplosion, wonGame, showMines, invertFlag, usedFlags } from './src/functions';
import Header from './src/components/Header';
import LevelSelection from './src/screens/LevelSelection'

export default class App extends Component{

  constructor(props) {
    super(props)
    this.state = this.createState()
  }

  getMinesAmount = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();
    return Math.ceil(cols * rows * params.difficultLevel)
  }
  
  createState = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();

    return {
      board: createMinedBoard(rows, cols, this.getMinesAmount()),
      won: false,
      lost: false,
      showLevelSelection: false,
    }
  }

  onOpenField = ( row, column ) => {
    const board = cloneBoard(this.state.board);

    openField(board, row, column);

    const lost = hasExplosion(board);
    const won = wonGame(board);

    if ( lost ) {
      console.log('perdeu');
      showMines(board);
    }

    if ( won ) {
      console.log('ganhou');
    }

    this.setState({ board, lost, won });
  }

  onSelectField = ( row, column ) => {
    const board = cloneBoard(this.state.board);

    invertFlag(board, row, column);

    const won = wonGame(board);

    if (won) {
      console.log('ganhou');
    }

    this.setState({board, won});
  }

  onLevelSelected = level => {
    params.difficultLevel = level;

    this.setState(this.createState());
  }

  render() {
    return (
      <View style={styles.container}>

        <LevelSelection isVisible={this.state.showLevelSelection}
                        onLevelSelected={this.onLevelSelected}
                        onCancel={() => this.setState({ showLevelSelection: false })}>

        </LevelSelection>

        <Header  flagsLeft={this.getMinesAmount() - usedFlags(this.state.board)} 
                 onNewGame={() => this.setState(this.createState())}
                 onFlagPress={() => {this.setState({ showLevelSelection: true })}}>
        </Header>

        <View style={styles.board}>
          <MineField board={this.state.board}
            onOpenField={this.onOpenField}
            onSelectField={this.onSelectField}/>
        </View>

       </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA',
  }
});
