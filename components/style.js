import React from 'react';
import { StyleSheet } from 'react-native-web';

const styles = StyleSheet.create({
    QuestionInput: {
        borderColor:'blue', 
        borderWidth: 1, 
        marginBottom: 5, 
        width: '90%', 
        height: 50
    },
    Botões2: {
        flexDirection:'row', 
        justifyContent:'space-between', 
        width: '90%'},
    View2: {
        width: '90%', 
        height: 150, 
        marginBottom: 45},
    View1: {
        alignItems: 'center', 
        width: '90%', 
        marginStart: 'auto', 
        marginEnd: 'auto'},
    Image: {
        width: '90%', 
        height: 150, 
        marginBottom: 45, 
        height:150},
    Text: {
        fontSize: 16, 
        marginBottom: 5, 
        textAlign: 'justify', 
        width: '90%'},
    QuizzView: {
        width: '90%', 
        marginBottom: 15}
});

  export default styles;