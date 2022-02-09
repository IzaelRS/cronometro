import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';


class App extends Component {

  // contruindo uma states por que o texto dentro da styles.timer tem que ser mutavel, então é preciso fazer um constructor
  // dentro do this.state é mazenadas todas as states
  constructor(props) {
    super(props);
    this.state = {
      numero: 0,
      botao: 'VAI',
      ultimo: null
    };
    //Variavel do timer do relogio
    this.timer = null;

    // dentro do constructor é preciso fazer o bind para ligar as funções no constructor
    this.vai = this.vai.bind(this); // script de ligação com a função vai, criada abaixo
    this.limpar = this.limpar.bind(this); // script de ligação com a função limpar, criada abaixo
  }

  vai() {

    if (this.timer != null) {
      // Aqui vai parar o timer
      clearInterval(this.timer);
      this.timer = null;

      this.setState({ botao: 'VAI' });
    } else {

      // Comeca girar o timer
      this.timer = setInterval(() => {
        this.setState({ numero: this.state.numero + 0.1 })
        //0.1 + 0.1 + 0,1 ....
      }, 100); // tempo que vai pular a cada milesegundos .

      this.setState({ botao: 'PARAR' });
    }

  }

  limpar() {
    if (this.timer != null) {

      //Aqui vai para o timer
      clearInterval(this.timer);
      this.timer = null;
    }
    this.setState({
      ultimo: this.state.numero,
      numero: 0,
      botao: 'VAI'
    })
  }

  render() {
    return (
      <View style={styles.container}>

        <Image
          source={require('./src/cronometro.png')}
          style={styles.img}
        />

        <Text style={styles.timer}>
          {this.state.numero.toFixed(2)} {/* toFixed() serve para aumentar o número de casas numericas após a virgula */}
        </Text>

        <View style={styles.btnArea}>

          <TouchableOpacity style={styles.btn} onPress={this.vai}>
            <Text style={styles.btnTexto}>
              {this.state.botao} {/* chamando a state */}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={this.limpar}>
            <Text style={styles.btnTexto}>
              LIMPAR
            </Text>
          </TouchableOpacity>

        </View>

        <View style={styles.areaUltima}>
          <Text style={styles.textoTempo}>
            {/* é preciso fazer esse script logo abaixo pelo fato do favor começar com null */}
            {this.state.ultimo > 0 ? 'Ultimo tempo' + this.state.ultimo.toFixed(2) + 's' : ''} {/*' ? ' significa vai receber, ':' signica senão */}
          </Text>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', // alinhamento
    justifyContent: 'center', // espaço entre margem 
    backgroundColor: '#00aeef'// cor de fundo
  },

  timer: {
    marginTop: -160, // serve para centralizar os números do cronometro que esta em time, consequentimente o que esta em baixo tambem sobe!!!
    color: '#fff',
    fontSize: 65,
    fontWeight: 'bold' // serve para deixar grossa o tipo de fonte!
  },

  btnArea: {
    flexDirection: 'row', // deixar os textos dos botões em linhas
    marginTop: 70, //serve para descer os  textos dos botões 'vai' e 'limpar'
    height: 40, // altura da área
  },

  btn: {
    flex: 1, // server para modificar toda área
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'while',
    height: 40,
    margin: 17, // serve para desgrudar os botões
    borderRadius: 10, // arendondar as bodas da margens dos botões

  },
  btnTexto: {
    fontSize: 20,
    fontWeight: 'bold', // deixar grosso o tipo de fonte
    color: '#00aeef',
  },
  areaUltima: {
    marginTop: 40,
  },

  textoTempo: {
    fontSize: 25,
    fontStyle: 'italic',
    color: '#fff'

  }

});

export default App;

