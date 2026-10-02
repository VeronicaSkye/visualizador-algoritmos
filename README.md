# ⚡ AlgoVisualizer — Visualizador de Algoritmos & Complexidade Big-O

> Plataforma interativa para visualização de algoritmos de ordenação e busca, análise assintótica em tempo real (Notação Big-O), síntese sonora via Web Audio API e rastreamento de execução passo a passo linha por linha.

🎮 **[Acessar Demonstração Online (GitHub Pages)](https://veronicaskye.github.io/visualizador-algoritmos/)**

---

## 🌟 Visão Geral do Projeto

Este projeto foi desenvolvido com foco nos conceitos fundamentais ensinados no **2º semestre de Engenharia de Software e Ciência da Computação** (*Algoritmos e Estruturas de Dados*). Ele permite que estudantes e desenvolvedores observem o comportamento prático da eficiência algorítmica em vez de apenas decorarem fórmulas matemáticas.

### 🎯 Principais Funcionalidades:
- **6 Algoritmos Clássicos**:
  - 🫧 **Bubble Sort**: Intuitivo, didático e quadrático $\mathcal{O}(n^2)$.
  - 🎯 **Selection Sort**: Minimização contínua $\mathcal{O}(n^2)$.
  - 📥 **Insertion Sort**: Eficiente para dados quase ordenados $\mathcal{O}(n)$.
  - ⚡ **Quick Sort**: Divisão e Conquista de alta velocidade $\mathcal{O}(n \log n)$.
  - 🧩 **Merge Sort**: Algoritmo recursivo estável com garantia estrita de $\mathcal{O}(n \log n)$.
  - 🔍 **Busca Binária**: Redução logarítmica de espaço de busca $\mathcal{O}(\log n)$.
- **Áudio Frequencial Sintetizado**: Cada barra gera um tom harmônico senoidal na Web Audio API proporcional ao seu valor, reproduzindo o clássico efeito audiovisual de algoritmos.
- **Rastreamento de Código em Tempo Real**: Destaca a linha de código exata que está sendo executada no momento, com explicações contextuais do passo.
- **Métricas de Performance em Tempo Real**:
  - Número de comparações ($C$)
  - Trocas / Acessos de memória ($S$)
  - Tempo decorrido em milissegundos ($ms$)
- **Controle Total**: Modos *Aleatório*, *Quase Ordenado* e *Invertido (Pior Caso)*, com ajuste de velocidade e execução passo a passo (*Step-by-step*).

---

## 📊 Tabela de Complexidade Assintótica (Big-O)

| Algoritmo | Melhor Caso | Caso Médio | Pior Caso | Espaço Auxiliar | Estabilidade |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Bubble Sort** | $\mathcal{O}(n)$ | $\mathcal{O}(n^2)$ | $\mathcal{O}(n^2)$ | $\mathcal{O}(1)$ | Estável |
| **Selection Sort** | $\mathcal{O}(n^2)$ | $\mathcal{O}(n^2)$ | $\mathcal{O}(n^2)$ | $\mathcal{O}(1)$ | Instável |
| **Insertion Sort** | $\mathcal{O}(n)$ | $\mathcal{O}(n^2)$ | $\mathcal{O}(n^2)$ | $\mathcal{O}(1)$ | Estável |
| **Quick Sort** | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n^2)$ | $\mathcal{O}(\log n)$ | Instável |
| **Merge Sort** | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n)$ | Estável |
| **Busca Binária** | $\mathcal{O}(1)$ | $\mathcal{O}(\log n)$ | $\mathcal{O}(\log n)$ | $\mathcal{O}(1)$ | N/A |

---

## 🛠️ Tecnologias & Princípios de Engenharia de Software

1. **JavaScript Generator Functions (`function*` e `yield`)**:
   - Os algoritmos foram implementados como **funções geradoras**. Isso permite pausar, continuar e avançar passo a passo sem travar a thread principal da interface (*Event Loop* do navegador).
2. **Web Audio API (`OscillatorNode` + `GainNode`)**:
   - Geração de ondas senoidais puras em tempo real mapeadas matematicamente para o valor numérico de cada barra ($160\text{Hz}$ a $920\text{Hz}$), com zero dependências externas ou arquivos de áudio pesados.
3. **HTML5 Semântico & CSS3 Moderno**:
   - Variáveis CSS (Custom Properties), Flexbox e Grid responsivos, animações em GPU e estética Dark Mode moderna com cores neon acessíveis.
4. **Clean Code & Programação Orientada a Objetos**:
   - Separação clara de responsabilidades: motor de áudio, geradores de algoritmos e controlador da interface do usuário.

---

## 🚀 Como Executar Localmente

Não requer instalação de Node.js ou pacotes externos!

1. Clone o repositório:
   ```bash
   git clone https://github.com/VeronicaSkye/visualizador-algoritmos.git
   cd visualizador-algoritmos
   ```

2. Abra o arquivo `index.html` em seu navegador preferido ou use extensões como o *Live Server*.

---

## 💡 Por que este projeto chama a atenção de Recrutadores e Líderes Técnicos?

- Demonstra domínio direto dos **fundamentos da computação** (Big-O, árvores de recursão, algoritmos in-place vs memória extra).
- Prova habilidade com **programação assíncrona** avançada em JavaScript nativo sem depender de frameworks prontos.
- Mostra capricho com **UX/UI** e acessibilidade visual.

---

Desenvolvido com 💚 para enriquecer o aprendizado em Engenharia de Software.
