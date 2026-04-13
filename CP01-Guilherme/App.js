import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, StatusBar, Alert, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaskedTextInput } from 'react-native-mask-text';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

function TelaCadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [curso, setCurso] = useState('');
  const [disciplina, setDisciplina] = useState('');
  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@dados_usuario');
        if (jsonValue != null) {
          const dados = JSON.parse(jsonValue);
          setNome(dados.nome);
          setCpf(dados.cpf);
          setTelefone(dados.telefone);
          setCurso(dados.curso);
          setDisciplina(dados.disciplina);
          setDescricao(dados.descricao);
        }
      } catch (e) {
        Alert.alert("Erro", "Falha ao carregar os dados.");
      }
    };
    carregarDados();
  }, []);

  const handleEnviar = async () => {
    if (!nome || !cpf || !telefone || !curso || !disciplina || !descricao) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }
    const dados = { nome, cpf, telefone, curso, disciplina, descricao };
    try {
      await AsyncStorage.setItem('@dados_usuario', JSON.stringify(dados));
      navigation.navigate('Perfil', { dados });
    } catch (e) {
      Alert.alert("Erro", "Falha ao salvar.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <Text style={styles.headerSubtitle}>CHECKPOINT 02</Text>
          <Text style={styles.headerTitle}>Seu Cadastro</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>NOME COMPLETO</Text>
          <TextInput
            style={styles.input}
            placeholder="Seu nome"
            placeholderTextColor="#727272"
            value={nome}
            onChangeText={setNome}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>CPF</Text>
          <MaskedTextInput
            mask="999.999.999-99"
            style={styles.input}
            placeholder="***.***.***-**"
            placeholderTextColor="#727272"
            keyboardType="numeric"
            value={cpf}
            onChangeText={(text) => setCpf(text)}
            secureTextEntry={true}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>TELEFONE</Text>
          <MaskedTextInput
            mask="(99) 99999-9999"
            style={styles.input}
            placeholder="(**) *****-****"
            placeholderTextColor="#727272"
            keyboardType="numeric"
            value={telefone}
            onChangeText={(text) => setTelefone(text)}
            secureTextEntry={true}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>CURSO</Text>
          <TextInput
            style={styles.input}
            placeholder="Seu curso"
            placeholderTextColor="#727272"
            value={curso}
            onChangeText={setCurso}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>DISCIPLINA</Text>
          <TextInput
            style={styles.input}
            placeholder="Sua disciplina"
            placeholderTextColor="#727272"
            value={disciplina}
            onChangeText={setDisciplina}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>SOBRE VOCÊ</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Breve descrição..."
            placeholderTextColor="#727272"
            multiline={true}
            numberOfLines={3}
            value={descricao}
            onChangeText={setDescricao}
          />
        </View>

        <TouchableOpacity style={styles.buttonGreen} onPress={handleEnviar} activeOpacity={0.8}>
          <Text style={styles.buttonTextBlack}>SALVAR E CONTINUAR</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

function TelaPerfil({ route, navigation }) {
  const { dados } = route.params;

  const mascararCPF = (cpfReal) => {
    if (!cpfReal) return '';
    return '***.***.***-' + cpfReal.slice(-2);
  };


  const mascararTelefone = (telReal) => {
    if (!telReal) return '';
    return '(**) *****-' + telReal.slice(-4);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        <View style={styles.profileHero}>
          <Image
            source={{ uri: 'https://avatars.githubusercontent.com/u/201510987?v=4' }}
            style={styles.heroImage}
          />
          <Text style={styles.heroTitle}>{dados.nome}</Text>
          <Text style={styles.heroSubtitle}>RM 563674 • Aluno FIAP</Text>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.outlineButton} onPress={() => navigation.goBack()}>
            <Text style={styles.outlineButtonText}>EDITAR PERFIL</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.tracklistHeader}>Suas Informações</Text>

        <View style={styles.trackItem}>
          <Text style={styles.trackNumber}>1</Text>
          <View style={styles.trackDetails}>
            <Text style={styles.trackTitle}>{mascararCPF(dados.cpf)}</Text>
            <Text style={styles.trackSubtitle}>CPF</Text>
          </View>
        </View>

        <View style={styles.trackItem}>
          <Text style={styles.trackNumber}>2</Text>
          <View style={styles.trackDetails}>
            <Text style={styles.trackTitle}>{mascararTelefone(dados.telefone)}</Text>
            <Text style={styles.trackSubtitle}>Telefone</Text>
          </View>
        </View>

        <View style={styles.trackItem}>
          <Text style={styles.trackNumber}>3</Text>
          <View style={styles.trackDetails}>
            <Text style={styles.trackTitle}>{dados.curso}</Text>
            <Text style={styles.trackSubtitle}>Curso</Text>
          </View>
        </View>

        <View style={styles.trackItem}>
          <Text style={styles.trackNumber}>4</Text>
          <View style={styles.trackDetails}>
            <Text style={styles.trackTitle}>{dados.disciplina}</Text>
            <Text style={styles.trackSubtitle}>Disciplina</Text>
          </View>
        </View>

        <View style={styles.trackItem}>
          <Text style={styles.trackNumber}>5</Text>
          <View style={styles.trackDetails}>
            <Text style={styles.trackTitle}>{dados.descricao}</Text>
            <Text style={styles.trackSubtitle}>Descrição Pessoal</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name="Cadastro" component={TelaCadastro} />
        <Stack.Screen name="Perfil" component={TelaPerfil} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    marginTop: 40,
    marginBottom: 30,
  },
  headerSubtitle: {
    color: '#1DB954',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '900',
    marginTop: 4,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#2A2A2A',
    color: '#FFFFFF',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#1DB954',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 16,
  },
  buttonGreen: {
    backgroundColor: '#1DB954',
    paddingVertical: 18,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonTextBlack: {
    color: '#000000',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  profileHero: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  heroImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginBottom: 20,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'center',
  },
  heroSubtitle: {
    color: '#B3B3B3',
    fontSize: 16,
    marginTop: 6,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: '#727272',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  outlineButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
  },
  tracklistHeader: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  trackNumber: {
    color: '#1DB954',
    fontSize: 16,
    fontWeight: '700',
    width: 30,
    textAlign: 'center',
  },
  trackDetails: {
    marginLeft: 15,
    flex: 1,
  },
  trackTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  trackSubtitle: {
    color: '#B3B3B3',
    fontSize: 14,
    marginTop: 4,
  },
});