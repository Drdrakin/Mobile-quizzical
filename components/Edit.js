import React, {useState, useEffect} from "react";
import {Image, Button, TextInput, View, Alert} from "react-native";
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('quiz.db');

export default function Edit() {
    const [id, setId] = useState(null);
    const [pergunta, setPergunta] = useState('');
    const [alternativaA, setAlternativaA] = useState('');
    const [alternativaB, setAlternativaB] = useState('');
    const [alternativaC, setAlternativaC] = useState('');
    const [alternativaD, setAlternativaD] = useState('');
    const [respostaCorreta, setRespostaCorreta] = useState('');
} 

useEffect(() =>{
    carregarPergunta();
}, []);

const carregarPergunta = () => {
    db.transaction(tx => {
        tx.executeSql('select * from perguntas order by random() limit 1;', [], (_, { rows }) => {
            let pergunta = rows._array[0];
            setId(pergunta.id);
            setPergunta(pergunta.pergunta);
            setAlternativaA(pergunta.alternativaA);
            setAlternativaB(pergunta.alternativaB);
            setAlternativaC(pergunta.alternativaC);
            setAlternativaD(pergunta.alternativaD);
            setRespostaCorreta(pergunta.resposta_correta);
        });
    });
};

const atualizarPergunta = () => {
    db.transaction(tx => {
        tx.executeSql('update perguntas set pergunta = ?, alternativaA = ?, alternativaB = ?, alternativaC = ?, alternativaD = ?, resposta_correta = ? where id = ?;' 
        [pergunta, alternativaA, alternativaB, alternativaC, alternativaD, respostaCorreta, id],() => {
            Alert.alert("Sucesso!", "Pergunta atualizada com sucesso!");    
        })
    });
}

const deletarPergunta = () => {
    db.transaction(tx => {
        tx.executeSql('DELETE FROM perguntas WHERE id = ?', [id], () => {
            Alert.alert("Sucesso!","Pergunta deletada com sucesso!");
            carregarPergunta();
        });
    });
};

const proximaPergunta = () => {
    db.transaction(tx => {
        tx.executeSql("Select * from perguntas where id > ? order by id limit 1;", [id], (_, {rows}) =>{
            if(rows.length > 0) {
                let pergunta = rows._array[0];
                setId(pergunta.id);
                setPergunta(pergunta.pergunta);
                setAlternativaA(pergunta.alternativaA);
                setAlternativaB(pergunta.alternativaB);
                setAlternativaC(pergunta.alternativaC);
                setAlternativaD(pergunta.alternativaD);
                setRespostaCorreta(pergunta.resposta_correta);
            } else {
                Alert.alert("Informação", "Esta é a última pergunta.");
            }
        })
    })
}

return (
    <View style={{alignItems:'center'}}>
        <Image source={require('../assets/logo.png')} style={{width: '90%', height: 150, marginBottom: 45}}/>
        <TextInput placeholder="Digite a pergunta" value={pergunta} multiline={true} onChangeText={{setPergunta}} numberOfLines={4}
        style={{height: 80, borderColor: 'blue', borderWidth: 1, marginBottom: 5, width: '90%'}}/>
        <TextInput placeholder="Digite a Alternativa A" value={alternativaA} onChangeText={setAlternativaA} style={{borderColor: 'blue', borderWidth: 1, marginBottom: 5, width: '90%'}}/>
        <TextInput placeholder="Digite a Alternativa B" value={alternativaB} onChangeText={setAlternativaB} style={{borderColor: 'blue', borderWidth: 1, marginBottom: 5, width: '90%'}}/>
        <TextInput placeholder="Digite a Alternativa C" value={alternativaC} onChangeText={setAlternativaC} style={{borderColor: 'blue', borderWidth: 1, marginBottom: 5, width: '90%'}}/>
        <TextInput placeholder="Digite a Alternativa D" value={alternativaD} onChangeText={setAlternativaD} style={{borderColor: 'blue', borderWidth: 1, marginBottom: 5, width: '90%'}}/>
        <TextInput placeholder="Digite a letra da resposta correta" value={respostaCorreta} onChangeText={setRespostaCorreta} style={{borderColor: 'blue', borderWidth: 1, marginBottom: 5, width: '90%'}}/>
        
        <View style={{marginBottom: 15}}>
            <Button title="Atualizar pergunta" onPress={atualizarPergunta} style={{marginBottom: 5}}/>
        </View>

        <Button title="Deletar pergunta" onPress={deletarPergunta} style={{marginBottom: 5}}/>
        
        <View style={{flexDirection:'row', justifyContent:'space-between', width: '90%'}}>
            <Button title="Voltar" onPress={perguntaAnterior}/>
            <Button title="Avançar" onPress={proximaPergunta}/>
        </View>
    </View>
);

//styles coletados