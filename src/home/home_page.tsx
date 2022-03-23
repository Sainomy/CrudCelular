import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import CelularServico from '../servico/celular_servico'
import Icon from 'react-native-vector-icons/Ionicons'
import { Celular } from '../modelo/Celular'


export default class App extends React.Component {
  
constructor(props) {
    super(props);
    this.findAllCelular() 
    }
    
    state = {
    celular:Celular,
    lista_array_dados_celular: [],
    value: null, 
    Id_pesquisar:null, 
    onChangeText: null,
    formularioId: null,
    formularioModelo:null,
    formularioMarca:null,
    formularioMemoriaInterna:null,
    formularioBateria: null,
    }
    
    //acionado quando o componente e montado
    componentDidMount () {
    this.instanciarCelular();
    this.findAllCelular ();
    }
    
    //escuta atualizações na lista
    componentDidUpdate (prevProps, prevState) {
    if (prevState.lista_array_dados_celular !== this.state.lista_array_dados_celular) {
    this.findAllCelular ();
    }
    }

    findAllCelular=()=> {
        CelularServico.findAll()
        .then((response: any) => {
        this.setState({
        lista_array_dados_celular: response._array,
        isLoading: false,
        })
        }), (error) => {
        console.log(error);
        }
        }


    deleteCelular=(id)=> {
    this.findCelularById(id)
    if (this.state.formularioId != null || this.state.formularioId != undefined) {
        CelularServico.deleteById(id)
    Alert.alert("celular excluido com sucesso: ")
    }
    }
    
    atualizaCelular=(item0, item1, item2,item3, item4)=> {
    let celular=new Celular()// cria objeto memória
    celular.id=item0 // seta o atributo nome do objeto 
    celular.modelo=item1 // seta o atributo nome do objeto 
    celular.marca=item2 // seta o atributo nome do objeto 
    celular.memoriaInterna=item3 // seta o atributo nome do objeto 
    celular.bateria=item4
    // com o valor(state) do item
    
    CelularServico.updateByObjeto(celular).then((response: any) => {
    if (response._array.length >0 && response!= null && response!= undefined) {
    // popular o objeto da memória
    Alert.alert("Atualizado"); 
    
    } else {
    Alert.alert("Nome não encontrado")
    }
    }), (error) => {
    console.log(error);
    }
    }
    
    
    insertCelular=(item1, item2,item3,item4)=> {
    let celular=new Celular()// cria objeto memória
    celular.modelo=item1 // seta o atributo nome do objeto 
    celular.marca=item2 // seta o atributo nome do objeto 
    celular.memoriaInterna=item3 // seta o atributo nome do objeto 
    celular.bateria=item4 // seta o atributo nome do objeto 
    // com o valor(state) do item
    
    // cria um id no banco para persistir o objeto
    const insertId=CelularServico.addData(celular);
    // testa pra ver se deu certo a criação do id
    if(insertId==null || insertId==undefined){
    Alert.alert("Não foi possivel inserir um novo celular")
    }
    return celular
    }
    
    instanciarCelular=()=>{
    let celular:Celular=new Celular()// cria objeto memória
    return celular
    }
    
    
    
    findCelularById=(id)=> {
    CelularServico.findById(id)
    .then((response: any) => {
    if (response._array.length >0 && response!= null && response!= undefined) {
    } else {
    Alert.alert("id não encontrado")
    }
    }), (error) => {
    console.log(error);
    }
    }
    
    localizaCelular=(id)=> { 
    CelularServico.findById(id)
    .then((response: any) => {
    if (response._array.length >0 && response!= null && response!= undefined) {
    let celularpesquisa:Celular=new Celular()// cria objeto memória
    const celularretorno=response._array.map((item,key)=>{
    celularpesquisa.id=item.id;
    celularpesquisa.modelo=item.modelo;
    celularpesquisa.marca=item.marca;
    celularpesquisa.memoriaInterna=item.memoriaInterna;
    celularpesquisa.bateria=item.bateria;
    })
    // o SetState abaixo mostra para o usuário o objeto recuperado do banco
    // e atualmente somente em memória 

    this.setState({
    celular:celularpesquisa,
    formularioId: celularpesquisa.id,
    formularioModelo:celularpesquisa.modelo,
    formularioMarca:celularpesquisa.marca,
    formularioMemoriaInterna:celularpesquisa.memoriaInterna,
    formularioBateria: celularpesquisa.bateria,
    })
    // popular o objeto da memória
    //Alert.alert("Atualizado"); 
        } else {
    Alert.alert("Nome Não foi possível atualizar")
    }
    }), (error) => {
    console.log(error);
    }
    }


    // fim da parte de funções
    // agora é necessário passar os parametros para a visão através de renderização
    


    // aqui temos a renderização da tela (visão)
    render() {

        //extrai as propriedades entre chaves
        const {celular,lista_array_dados_celular,value,Id_pesquisar,formularioId,formularioModelo,formularioMarca, formularioMemoriaInterna, formularioBateria} = this.state;
        // se tivermos animais listados oriundos do banco
        // a lista é mostrada na visão
        //const {animal}=animal;
        
        const celularList = lista_array_dados_celular.map((item, key) => {
            return (
                <> 
                    <Text style={{borderColor: "purple", fontSize: 15, borderWidth: 1}}>id:{item.id} modelo:{item.modelo} marca:{item.marca} memoriaInterna:{item.memoriaInterna} bateria:{item.bateria} </Text>
                </>
            )
        })

        return (

            <View style={styles.container}>

                <Text style={{ fontSize: 20, paddingBottom: 20 , color: "purple"}}>Crud de Celular</Text>

                <TextInput
                    placeholder="digite o id Pesquisar"
                    style={styles.textInput}
                    onChangeText={Id_pesquisar => { this.setState({ Id_pesquisar: Id_pesquisar }) }}
                    value={Id_pesquisar}
                />

                <Text>{formularioId}</Text>
                    
              
                <TextInput
                    placeholder="digite o modelo do novo celular"
                    style={styles.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={formularioModelo => { this.setState({ formularioModelo: formularioModelo }) }}
                    value={formularioModelo}
                />

                    <TextInput
                    placeholder="digite a marca "
                    style={styles.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={formularioMarca => { this.setState({ formularioMarca: formularioMarca }) }}
                    value={formularioMarca}
                    
                />

                <TextInput
                    placeholder="digite a capacidade de memoria interma "
                    style={styles.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={formularioMemoriaInterna => { this.setState({ formularioMemoriaInterna: formularioMemoriaInterna }) }}
                    value={formularioMemoriaInterna}
                    
                />

                <TextInput
                    placeholder="digite a capacidade da bateria "
                    style={styles.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={formularioBateria => { this.setState({ formularioBateria: formularioBateria }) }}
                    value={formularioBateria}
                    
                />
               
                <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() =>  {formularioModelo == null  ? Alert.alert("O campo de nome não pode ser vazio") :this.insertCelular(formularioModelo, formularioMarca, formularioMemoriaInterna, formularioBateria)}} style={{ alignItems: "center", backgroundColor: 'purple' }}>
                        <Icon name="md-add" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() =>  {formularioId == null  ? Alert.alert("Não tem Objeto para atualizar faça uma pesquisa") :this.atualizaCelular(formularioId,formularioModelo, formularioMarca, formularioMemoriaInterna, formularioBateria)}} style={{ alignItems: "center", backgroundColor: 'purple' }}>
                        <Icon name="md-refresh" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerTouch}>
                <TouchableOpacity onPress={() => { Id_pesquisar == null ? Alert.alert("O campo de id não pode ser vazio") : this.localizaCelular(Id_pesquisar) }} style={{ alignItems: "center", backgroundColor: 'purple' }}>
                        <Icon name="md-search" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() => { formularioId == null ? Alert.alert("O campo de id não pode ser vazio") : this.deleteCelular(Id_pesquisar) }} style={{ alignItems: "center", backgroundColor: 'purple' }}>
                        <Icon text="apagar" name="md-remove" size={30} color="white" />
                    </TouchableOpacity>
                </View>
                {celularList}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    textInput:{
        alignItems: "center", 
        width: 200, 
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1 
    },
    containerTouch:{
        width: 200,
         padding: 10
    }
});