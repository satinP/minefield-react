import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import params from './src/params'
import MineField from './src/components/MineField'
import { createMinedBoard, cloneBoard, openField, 
         hasExplosion, wonGame, showMines } from './src/functions'

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
      lost: false
    }
  }

  onOpenField = ( row, column ) => {
    const clonedBoard = cloneBoard(this.state.board);

    openField(clonedBoard, row, column);

    const lost = hasExplosion(cloneBoard);
    const won = wonGame(board);

    if ( lost ) {
      showMines(board);
      console.log('perdeu');
    }

    if ( won ) {
      console.log('venceu');
    }

    this.setState({ board, lost, won });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text >
          Campo minado!
        </Text>
        <Text style={styles.instructions}>
          Tamanho da grade: {params.getRowsAmount()}x{params.getColumnsAmount()}
        </Text>
        <View style={styles.board}>
          <MineField board={this.state.board}
            onOpenField={this.onOpenField}/>
        </View>
       </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
