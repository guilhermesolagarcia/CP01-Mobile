import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';

export default function App() {
  const [nome, setNome] = useState('');
  const [curso, setCurso] = useState('');
  const [disciplina, setDisciplina] = useState('');
  const [descricao, setDescricao] = useState('');

  const [dadosEnviados, setDadosEnviados] = useState(null);

  useEffect(() => {
    console.log('Interface carregada');
  }, []);

  const handleEnviar = () => {
    setDadosEnviados({ nome, curso, disciplina, descricao });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <Text style={styles.headerSubtitle}>BEM-VINDO AO</Text>
          <Text style={styles.headerTitle}>Portal do Aluno</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Seus Dados</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}> Nome Completo</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome.."
              placeholderTextColor="#B3B3B3" 
              value={nome}
              onChangeText={setNome}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}> Curso</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu curso.."
              placeholderTextColor="#B3B3B3"
              value={curso}
              onChangeText={setCurso}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}> Disciplina</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite a disciplina.."
              placeholderTextColor="#B3B3B3"
              value={disciplina}
              onChangeText={setDisciplina}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}> Sobre você</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Conte um pouco sobre você..."
              placeholderTextColor="#B3B3B3"
              value={descricao}
              onChangeText={setDescricao}
              multiline={true}
              numberOfLines={3}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleEnviar} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Confirmar Cadastro</Text>
          </TouchableOpacity>
        </View>

        {dadosEnviados && (
          <View style={[styles.card, styles.resultCard]}>
            <View style={styles.successBadge}>
              <Text style={styles.successBadgeText}>Sucesso</Text>
            </View>
            <Text style={styles.resultTitle}>Resumo do Cadastro</Text>
            
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Nome:</Text>
              <Text style={styles.resultValue}>{dadosEnviados.nome}</Text>
            </View>
            <View style={styles.divider} />
            
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Curso:</Text>
              <Text style={styles.resultValue}>{dadosEnviados.curso}</Text>
            </View>
            <View style={styles.divider} />
            
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Disciplina:</Text>
              <Text style={styles.resultValue}>{dadosEnviados.disciplina}</Text>
            </View>
            <View style={styles.divider} />
            
            <View style={styles.resultRowBlock}>
              <Text style={styles.resultLabel}>Descrição:</Text>
              <Text style={styles.resultValueBlock}>{dadosEnviados.descricao}</Text>
            </View>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212', 
  },
  scrollContainer: {
    padding: 24,
    flexGrow: 1,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#B3B3B3', 
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF', 
    marginTop: 4,
  },
  card: {
    backgroundColor: '#181818', 
    borderRadius: 8, 
    padding: 24,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#2A2A2A',
    color: '#FFFFFF',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 16,
  },
  button: {
    backgroundColor: '#1DB954', 
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#000000', 
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  resultCard: {
    backgroundColor: '#282828',
    borderWidth: 1,
    borderColor: '#1DB954',
    paddingTop: 30,
  },
  successBadge: {
    position: 'absolute',
    top: -15,
    alignSelf: 'center',
    backgroundColor: '#1DB954',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#121212',
  },
  successBadgeText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  resultRowBlock: {
    marginTop: 8,
  },
  resultLabel: {
    color: '#B3B3B3',
    fontSize: 15,
    fontWeight: '600',
  },
  resultValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'right',
    marginLeft: 10,
  },
  resultValueBlock: {
    color: '#FFFFFF',
    fontSize: 15,
    marginTop: 6,
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: '#333333', 
    marginBottom: 12,
  },
});