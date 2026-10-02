/**
 * AlgoVisualizer — Motor de Execução e Visualização de Algoritmos
 * Focado em conceitos de Engenharia de Software e Notação Big-O.
 */

// ============================================================================
// 1. Áudio Sintetizado (Web Audio API)
// ============================================================================
class AlgoSound {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem('algo_muted') === 'true';
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  playTone(val, maxVal = 100) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    // Mapeia valor entre 160Hz e 920Hz (escala harmônica)
    const freq = 160 + (val / maxVal) * 760;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playSuccess() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [440, 554, 659, 880];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.07);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.07 + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + idx * 0.07);
      osc.stop(this.ctx.currentTime + idx * 0.07 + 0.3);
    });
  }

  toggle() {
    this.muted = !this.muted;
    localStorage.setItem('algo_muted', this.muted);
    return this.muted;
  }
}

const audio = new AlgoSound();

// ============================================================================
// 2. Metadados e Código dos Algoritmos (Big-O & Snippets)
// ============================================================================
const ALGORITHMS_DATA = {
  bubble: {
    title: 'Bubble Sort (Bolha)',
    best: 'O(n)',
    bestDesc: 'Array já ordenado (1 passagem)',
    avg: 'O(n²)',
    avgDesc: 'Elementos em ordem aleatória',
    worst: 'O(n²)',
    worstDesc: 'Array em ordem totalmente inversa',
    space: 'O(1)',
    spaceDesc: 'In-place (sem memória adicional)',
    code: [
      'for (let i = 0; i < n - 1; i++) {',
      '  for (let j = 0; j < n - i - 1; j++) {',
      '    if (arr[j] > arr[j + 1]) {',
      '      [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];',
      '    }',
      '  }',
      '}'
    ]
  },
  selection: {
    title: 'Selection Sort (Seleção)',
    best: 'O(n²)',
    bestDesc: 'Sempre busca o menor elemento',
    avg: 'O(n²)',
    avgDesc: 'Comparações quadráticas',
    worst: 'O(n²)',
    worstDesc: 'Comparações quadráticas',
    space: 'O(1)',
    spaceDesc: 'In-place',
    code: [
      'for (let i = 0; i < n - 1; i++) {',
      '  let minIdx = i;',
      '  for (let j = i + 1; j < n; j++) {',
      '    if (arr[j] < arr[minIdx]) minIdx = j;',
      '  }',
      '  if (minIdx !== i) swap(arr, i, minIdx);',
      '}'
    ]
  },
  insertion: {
    title: 'Insertion Sort (Inserção)',
    best: 'O(n)',
    bestDesc: 'Array já ordenado (sem deslocamentos)',
    avg: 'O(n²)',
    avgDesc: 'Média de n²/4 comparações',
    worst: 'O(n²)',
    worstDesc: 'Array ordenado inversamente',
    space: 'O(1)',
    spaceDesc: 'In-place e estável',
    code: [
      'for (let i = 1; i < n; i++) {',
      '  let key = arr[i];',
      '  let j = i - 1;',
      '  while (j >= 0 && arr[j] > key) {',
      '    arr[j + 1] = arr[j];',
      '    j--;',
      '  }',
      '  arr[j + 1] = key;',
      '}'
    ]
  },
  quick: {
    title: 'Quick Sort (Divisão e Conquista)',
    best: 'O(n log n)',
    bestDesc: 'Pivôs dividem o array ao meio',
    avg: 'O(n log n)',
    avgDesc: 'Particionamento médio balanceado',
    worst: 'O(n²)',
    worstDesc: 'Pivô é sempre o menor ou maior',
    space: 'O(log n)',
    spaceDesc: 'Pilha de chamadas recursivas',
    code: [
      'function quickSort(arr, low, high) {',
      '  if (low < high) {',
      '    let pi = partition(arr, low, high);',
      '    quickSort(arr, low, pi - 1);',
      '    quickSort(arr, pi + 1, high);',
      '  }',
      '}'
    ]
  },
  merge: {
    title: 'Merge Sort (Intercalação)',
    best: 'O(n log n)',
    bestDesc: 'Sempre divide em metades log(n)',
    avg: 'O(n log n)',
    avgDesc: 'Garantia assintótica constante',
    worst: 'O(n log n)',
    worstDesc: 'Mesmo no pior caso não degrada',
    space: 'O(n)',
    spaceDesc: 'Memória auxiliar para mesclagem',
    code: [
      'function mergeSort(arr, l, r) {',
      '  if (l >= r) return;',
      '  let m = l + Math.floor((r - l) / 2);',
      '  mergeSort(arr, l, m);',
      '  mergeSort(arr, m + 1, r);',
      '  merge(arr, l, m, r);',
      '}'
    ]
  },
  binary: {
    title: 'Busca Binária (Binary Search)',
    best: 'O(1)',
    bestDesc: 'Elemento alvo está exatamente no centro',
    avg: 'O(log n)',
    avgDesc: 'Divide o espaço de busca pela metade',
    worst: 'O(log n)',
    worstDesc: 'Elemento nos extremos ou não existe',
    space: 'O(1)',
    spaceDesc: 'Iterativo, sem alocação extra',
    code: [
      'let low = 0, high = n - 1;',
      'while (low <= high) {',
      '  let mid = Math.floor((low + high) / 2);',
      '  if (arr[mid] === target) return mid;',
      '  if (arr[mid] < target) low = mid + 1;',
      '  else high = mid - 1;',
      '}'
    ]
  }
};

// ============================================================================
// 3. Geradores de Passos dos Algoritmos (Passo a Passo / Animação)
// ============================================================================
function* bubbleSortGen(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      yield {
        type: 'compare',
        indices: [j, j + 1],
        codeLine: 2,
        explanation: `Comparando arr[${j}] (${arr[j]}) com arr[${j + 1}] (${arr[j + 1]})`
      };

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        yield {
          type: 'swap',
          indices: [j, j + 1],
          values: [arr[j], arr[j + 1]],
          codeLine: 3,
          explanation: `Inversão detectada! Trocando ${arr[j]} com ${arr[j + 1]}`
        };
      }
    }
    yield {
      type: 'sorted',
      indices: [n - i - 1],
      codeLine: 0,
      explanation: `Elemento arr[${n - i - 1}] posicionado na posição final correta.`
    };
  }
  yield { type: 'sorted', indices: [0], codeLine: 0, explanation: 'Array totalmente ordenado!' };
}

function* selectionSortGen(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    yield {
      type: 'pivot',
      index: minIdx,
      codeLine: 1,
      explanation: `Assumindo arr[${i}] (${arr[i]}) como o menor atual do subarray não-ordenado.`
    };

    for (let j = i + 1; j < n; j++) {
      yield {
        type: 'compare',
        indices: [j, minIdx],
        codeLine: 3,
        explanation: `Buscando menor: comparando arr[${j}] (${arr[j]}) com arr[${minIdx}] (${arr[minIdx]})`
      };

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        yield {
          type: 'pivot',
          index: minIdx,
          codeLine: 3,
          explanation: `Novo menor elemento encontrado no índice ${minIdx} (${arr[minIdx]})!`
        };
      }
    }

    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      yield {
        type: 'swap',
        indices: [i, minIdx],
        values: [arr[i], arr[minIdx]],
        codeLine: 5,
        explanation: `Posicionando o menor elemento no índice ${i}.`
      };
    }
    yield {
      type: 'sorted',
      indices: [i],
      codeLine: 0,
      explanation: `Índice ${i} consolidado como ordenado.`
    };
  }
  yield { type: 'sorted', indices: [n - 1], codeLine: 0, explanation: 'Array totalmente ordenado!' };
}

function* insertionSortGen(arr) {
  const n = arr.length;
  yield { type: 'sorted', indices: [0], codeLine: 0, explanation: 'Primeiro elemento já está trivialmente ordenado.' };

  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;

    yield {
      type: 'pivot',
      index: i,
      codeLine: 1,
      explanation: `Inserindo chave arr[${i}] (${key}) na partição esquerda ordenada.`
    };

    while (j >= 0 && arr[j] > key) {
      yield {
        type: 'compare',
        indices: [j, j + 1],
        codeLine: 3,
        explanation: `arr[${j}] (${arr[j]}) > chave (${key}). Deslocando elemento para a direita.`
      };

      arr[j + 1] = arr[j];
      yield {
        type: 'overwrite',
        index: j + 1,
        value: arr[j],
        codeLine: 4,
        explanation: `Deslocando valor ${arr[j]} para o índice ${j + 1}.`
      };
      j--;
    }

    arr[j + 1] = key;
    yield {
      type: 'overwrite',
      index: j + 1,
      value: key,
      codeLine: 7,
      explanation: `Chave (${key}) inserida na posição correta ${j + 1}.`
    };

    for (let k = 0; k <= i; k++) {
      yield { type: 'sorted', indices: [k], codeLine: 0, explanation: `Subarray [0..${i}] ordenado.` };
    }
  }
}

function* quickSortGen(arr) {
  function* partition(low, high) {
    let pivot = arr[high];
    yield {
      type: 'pivot',
      index: high,
      codeLine: 2,
      explanation: `Pivô selecionado: arr[${high}] (${pivot})`
    };

    let i = low - 1;
    for (let j = low; j < high; j++) {
      yield {
        type: 'compare',
        indices: [j, high],
        codeLine: 3,
        explanation: `Comparando arr[${j}] (${arr[j]}) com pivô (${pivot})`
      };

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        yield {
          type: 'swap',
          indices: [i, j],
          values: [arr[i], arr[j]],
          codeLine: 4,
          explanation: `Elemento menor que o pivô posicionado na partição esquerda (índice ${i}).`
        };
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    yield {
      type: 'swap',
      indices: [i + 1, high],
      values: [arr[i + 1], arr[high]],
      codeLine: 5,
      explanation: `Colocando pivô (${pivot}) no centro exato entre as duas partições (índice ${i + 1}).`
    };
    yield {
      type: 'sorted',
      indices: [i + 1],
      codeLine: 5,
      explanation: `Pivô no índice ${i + 1} agora está na sua posição final definitiva!`
    };

    return i + 1;
  }

  function* qs(low, high) {
    if (low <= high) {
      if (low === high) {
        yield { type: 'sorted', indices: [low], codeLine: 1, explanation: `Elemento ${low} ordenado.` };
        return;
      }
      const piGen = partition(low, high);
      let res = piGen.next();
      while (!res.done) {
        yield res.value;
        res = piGen.next();
      }
      const pi = res.value;

      yield* qs(low, pi - 1);
      yield* qs(pi + 1, high);
    }
  }

  yield* qs(0, arr.length - 1);
}

function* mergeSortGen(arr) {
  function* merge(l, m, r) {
    let n1 = m - l + 1;
    let n2 = r - m;

    let L = [];
    let R = [];

    for (let i = 0; i < n1; i++) L.push(arr[l + i]);
    for (let j = 0; j < n2; j++) R.push(arr[m + 1 + j]);

    let i = 0, j = 0, k = l;

    while (i < n1 && j < n2) {
      yield {
        type: 'compare',
        indices: [l + i, m + 1 + j],
        codeLine: 5,
        explanation: `Intercalando: Comparando elemento da esquerda (${L[i]}) com elemento da direita (${R[j]})`
      };

      if (L[i] <= R[j]) {
        arr[k] = L[i];
        yield {
          type: 'overwrite',
          index: k,
          value: L[i],
          codeLine: 5,
          explanation: `Menor valor (${L[i]}) gravado na posição ${k}.`
        };
        i++;
      } else {
        arr[k] = R[j];
        yield {
          type: 'overwrite',
          index: k,
          value: R[j],
          codeLine: 5,
          explanation: `Menor valor (${R[j]}) gravado na posição ${k}.`
        };
        j++;
      }
      k++;
    }

    while (i < n1) {
      arr[k] = L[i];
      yield {
        type: 'overwrite',
        index: k,
        value: L[i],
        codeLine: 5,
        explanation: `Despejando restante da esquerda (${L[i]}) na posição ${k}.`
      };
      i++;
      k++;
    }

    while (j < n2) {
      arr[k] = R[j];
      yield {
        type: 'overwrite',
        index: k,
        value: R[j],
        codeLine: 5,
        explanation: `Despejando restante da direita (${R[j]}) na posição ${k}.`
      };
      j++;
      k++;
    }

    // Marca intervalo como ordenado
    for (let idx = l; idx <= r; idx++) {
      yield { type: 'sorted', indices: [idx], codeLine: 5, explanation: `Intervalo [${l}..${r}] mesclado e ordenado.` };
    }
  }

  function* ms(l, r) {
    if (l < r) {
      let m = l + Math.floor((r - l) / 2);
      yield* ms(l, m);
      yield* ms(m + 1, r);
      yield* merge(l, m, r);
    }
  }

  yield* ms(0, arr.length - 1);
}

function* binarySearchGen(arr) {
  // Primeiro garante que está ordenado
  arr.sort((a, b) => a - b);
  for (let i = 0; i < arr.length; i++) {
    yield { type: 'overwrite', index: i, value: arr[i], codeLine: 0, explanation: 'Pré-requisito da Busca Binária: Array pré-ordenado!' };
  }

  // Escolhe um alvo para buscar (ex: um valor que está no array)
  const targetIdx = Math.floor(Math.random() * arr.length);
  const target = arr[targetIdx];

  let low = 0;
  let high = arr.length - 1;

  yield {
    type: 'pivot',
    index: targetIdx,
    codeLine: 0,
    explanation: `🎯 Objetivo: Encontrar o valor ${target} usando Busca Binária (O(log n))`
  };

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);

    yield {
      type: 'compare',
      indices: [mid, targetIdx],
      codeLine: 2,
      explanation: `Calculado meio (índice ${mid}, valor ${arr[mid]}). Comparando com alvo ${target}.`
    };

    if (arr[mid] === target) {
      yield {
        type: 'sorted',
        indices: [mid],
        codeLine: 3,
        explanation: `🎉 Alvo ${target} encontrado com sucesso no índice ${mid} em tempo O(log n)!`
      };
      return;
    }

    if (arr[mid] < target) {
      yield {
        type: 'pivot',
        index: mid,
        codeLine: 4,
        explanation: `${arr[mid]} < ${target}. Descartando metade esquerda [${low}..${mid}]. Novo low = ${mid + 1}.`
      };
      low = mid + 1;
    } else {
      yield {
        type: 'pivot',
        index: mid,
        codeLine: 5,
        explanation: `${arr[mid]} > ${target}. Descartando metade direita [${mid}..${high}]. Novo high = ${mid - 1}.`
      };
      high = mid - 1;
    }
  }
}

// ============================================================================
// 4. Controlador da Interface & Estado da Aplicação
// ============================================================================
class VisualizerApp {
  constructor() {
    this.currentAlgo = 'bubble';
    this.array = [];
    this.generator = null;
    this.isRunning = false;
    this.isPaused = false;
    this.delay = 70;

    // Métricas
    this.comparisons = 0;
    this.swaps = 0;
    this.accesses = 0;
    this.startTime = null;
    this.timerInterval = null;

    this.initDOM();
    this.loadAlgorithm(this.currentAlgo);
    this.generateArray();
  }

  initDOM() {
    // Nav tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        if (this.isRunning) return;
        document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
        const target = e.currentTarget;
        target.classList.add('active');
        this.currentAlgo = target.dataset.algo;
        this.loadAlgorithm(this.currentAlgo);
        this.generateArray();
      });
    });

    // Controles de Array
    document.getElementById('btn-generate').addEventListener('click', () => {
      if (!this.isRunning) this.generateArray();
    });

    document.getElementById('array-type').addEventListener('change', () => {
      if (!this.isRunning) this.generateArray();
    });

    const sizeSlider = document.getElementById('array-size');
    sizeSlider.addEventListener('input', (e) => {
      document.getElementById('size-val').textContent = e.target.value;
      if (!this.isRunning) this.generateArray();
    });

    const speedSlider = document.getElementById('anim-speed');
    speedSlider.addEventListener('input', (e) => {
      // Inverter valor para que direita seja mais rápido (menor delay)
      const maxVal = 255;
      this.delay = maxVal - parseInt(e.target.value);
      const label = this.delay < 40 ? 'Muito Rápido' : this.delay < 100 ? 'Médio' : 'Lento';
      document.getElementById('speed-val').textContent = label;
    });

    // Ações de Execução
    document.getElementById('btn-play').addEventListener('click', () => this.start());
    document.getElementById('btn-pause').addEventListener('click', () => this.togglePause());
    document.getElementById('btn-step').addEventListener('click', () => this.step());
    document.getElementById('btn-reset').addEventListener('click', () => this.reset());

    // Som
    const btnSound = document.getElementById('btn-sound');
    const soundIcon = document.getElementById('sound-icon');
    soundIcon.textContent = audio.muted ? '🔇' : '🔊';
    btnSound.addEventListener('click', () => {
      const isMuted = audio.toggle();
      soundIcon.textContent = isMuted ? '🔇' : '🔊';
    });

    // Modal Teoria
    const btnGuide = document.getElementById('btn-guide');
    const guideModal = document.getElementById('guide-modal');
    const btnCloseGuide = document.getElementById('btn-close-guide');
    const btnUnderstood = document.getElementById('btn-understood-guide');

    btnGuide.addEventListener('click', () => guideModal.style.display = 'flex');
    [btnCloseGuide, btnUnderstood].forEach(b => {
      b.addEventListener('click', () => guideModal.style.display = 'none');
    });
  }

  loadAlgorithm(algoKey) {
    const data = ALGORITHMS_DATA[algoKey];
    if (!data) return;

    document.getElementById('current-algo-title').textContent = data.title;
    document.getElementById('comp-best').textContent = data.best;
    document.getElementById('desc-best').textContent = data.bestDesc;

    document.getElementById('comp-avg').textContent = data.avg;
    document.getElementById('desc-avg').textContent = data.avgDesc;

    document.getElementById('comp-worst').textContent = data.worst;
    document.getElementById('desc-worst').textContent = data.worstDesc;

    document.getElementById('comp-space').textContent = data.space;
    document.getElementById('desc-space').textContent = data.spaceDesc;

    // Renderiza código com tags para destaque
    const codeEl = document.getElementById('code-snippet');
    codeEl.innerHTML = '';
    data.code.forEach((line, idx) => {
      const lineSpan = document.createElement('span');
      lineSpan.className = 'code-line';
      lineSpan.id = `code-line-${idx}`;
      lineSpan.textContent = line;
      codeEl.appendChild(lineSpan);
    });

    document.getElementById('step-explanation').innerHTML = 
      `Pronto para executar <strong>${data.title}</strong>. Clique em <strong>Iniciar</strong> para assistir à mágica assintótica!`;
  }

  generateArray() {
    this.resetMetrics();
    const size = parseInt(document.getElementById('array-size').value);
    const type = document.getElementById('array-type').value;

    this.array = [];
    if (type === 'random') {
      for (let i = 0; i < size; i++) {
        this.array.push(Math.floor(Math.random() * 95) + 5);
      }
    } else if (type === 'nearly-sorted') {
      for (let i = 0; i < size; i++) {
        this.array.push(Math.floor((i / size) * 90) + 8);
      }
      // Troca alguns elementos
      for (let k = 0; k < Math.floor(size * 0.15); k++) {
        const i1 = Math.floor(Math.random() * size);
        const i2 = Math.floor(Math.random() * size);
        [this.array[i1], this.array[i2]] = [this.array[i2], this.array[i1]];
      }
    } else if (type === 'reversed') {
      for (let i = 0; i < size; i++) {
        this.array.push(Math.floor(((size - i) / size) * 90) + 8);
      }
    }

    this.renderBars();
    this.generator = null;
  }

  renderBars() {
    const container = document.getElementById('bars-container');
    container.innerHTML = '';
    const showValues = this.array.length <= 35;

    this.array.forEach((val, idx) => {
      const bar = document.createElement('div');
      bar.className = 'bar';
      bar.id = `bar-${idx}`;
      bar.style.height = `${val}%`;

      if (showValues) {
        const valLabel = document.createElement('span');
        valLabel.className = 'bar-value';
        valLabel.textContent = val;
        bar.appendChild(valLabel);
      }

      container.appendChild(bar);
    });
  }

  start() {
    if (this.isRunning && this.isPaused) {
      this.isPaused = false;
      this.updateStatus('Executando...', 'running');
      document.getElementById('btn-play').disabled = true;
      document.getElementById('btn-pause').disabled = false;
      this.runLoop();
      return;
    }

    if (!this.generator) {
      const copy = [...this.array];
      switch (this.currentAlgo) {
        case 'bubble': this.generator = bubbleSortGen(copy); break;
        case 'selection': this.generator = selectionSortGen(copy); break;
        case 'insertion': this.generator = insertionSortGen(copy); break;
        case 'quick': this.generator = quickSortGen(copy); break;
        case 'merge': this.generator = mergeSortGen(copy); break;
        case 'binary': this.generator = binarySearchGen(copy); break;
      }
      this.resetMetrics();
      this.startTimer();
    }

    this.isRunning = true;
    this.isPaused = false;
    this.updateStatus('Executando...', 'running');
    document.getElementById('btn-play').disabled = true;
    document.getElementById('btn-pause').disabled = false;
    document.getElementById('btn-generate').disabled = true;
    document.getElementById('array-size').disabled = true;

    this.runLoop();
  }

  async runLoop() {
    while (this.isRunning && !this.isPaused) {
      const done = this.step();
      if (done) break;
      await new Promise(r => setTimeout(r, this.delay));
    }
  }

  step() {
    if (!this.generator) {
      const copy = [...this.array];
      switch (this.currentAlgo) {
        case 'bubble': this.generator = bubbleSortGen(copy); break;
        case 'selection': this.generator = selectionSortGen(copy); break;
        case 'insertion': this.generator = insertionSortGen(copy); break;
        case 'quick': this.generator = quickSortGen(copy); break;
        case 'merge': this.generator = mergeSortGen(copy); break;
        case 'binary': this.generator = binarySearchGen(copy); break;
      }
      this.startTimer();
    }

    const next = this.generator.next();
    if (next.done) {
      this.finish();
      return true;
    }

    this.applyStep(next.value);
    return false;
  }

  applyStep(step) {
    this.clearTemporaryClasses();

    if (step.explanation) {
      document.getElementById('step-explanation').innerHTML = step.explanation;
    }

    this.highlightCodeLine(step.codeLine);

    switch (step.type) {
      case 'compare':
        this.comparisons++;
        this.accesses += 2;
        step.indices.forEach(idx => {
          const el = document.getElementById(`bar-${idx}`);
          if (el) el.classList.add('comparing');
        });
        if (this.array[step.indices[0]]) {
          audio.playTone(this.array[step.indices[0]]);
        }
        break;

      case 'swap':
        this.swaps++;
        this.accesses += 4;
        const [i, j] = step.indices;
        [this.array[i], this.array[j]] = step.values;
        this.updateBarHeight(i, this.array[i]);
        this.updateBarHeight(j, this.array[j]);
        document.getElementById(`bar-${i}`)?.classList.add('swapping');
        document.getElementById(`bar-${j}`)?.classList.add('swapping');
        audio.playTone(this.array[i]);
        break;

      case 'overwrite':
        this.swaps++;
        this.accesses += 2;
        this.array[step.index] = step.value;
        this.updateBarHeight(step.index, step.value);
        document.getElementById(`bar-${step.index}`)?.classList.add('swapping');
        audio.playTone(step.value);
        break;

      case 'pivot':
        this.accesses++;
        document.getElementById(`bar-${step.index}`)?.classList.add('pivot');
        audio.playTone(this.array[step.index]);
        break;

      case 'sorted':
        step.indices.forEach(idx => {
          const el = document.getElementById(`bar-${idx}`);
          if (el) {
            el.className = 'bar sorted';
          }
        });
        break;
    }

    this.updateMetricsUI();
  }

  updateBarHeight(index, val) {
    const bar = document.getElementById(`bar-${index}`);
    if (bar) {
      bar.style.height = `${val}%`;
      const valLabel = bar.querySelector('.bar-value');
      if (valLabel) valLabel.textContent = val;
    }
  }

  clearTemporaryClasses() {
    document.querySelectorAll('.bar.comparing, .bar.swapping, .bar.pivot').forEach(b => {
      b.classList.remove('comparing', 'swapping', 'pivot');
    });
  }

  highlightCodeLine(lineIndex) {
    document.querySelectorAll('.code-line').forEach(l => l.classList.remove('active-step'));
    if (lineIndex !== undefined && lineIndex !== null) {
      const activeLine = document.getElementById(`code-line-${lineIndex}`);
      if (activeLine) activeLine.classList.add('active-step');
    }
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    if (this.isPaused) {
      this.updateStatus('Pausado', 'paused');
      document.getElementById('btn-play').disabled = false;
      document.getElementById('btn-pause').disabled = true;
    } else {
      this.updateStatus('Executando...', 'running');
      document.getElementById('btn-play').disabled = true;
      document.getElementById('btn-pause').disabled = false;
      this.runLoop();
    }
  }

  finish() {
    this.isRunning = false;
    this.isPaused = false;
    this.stopTimer();
    this.updateStatus('Concluído!', 'completed');

    // Marca todas como sorted
    document.querySelectorAll('.bar').forEach(b => b.className = 'bar sorted');

    audio.playSuccess();
    document.getElementById('step-explanation').innerHTML = 
      `🎉 <strong>Algoritmo Finalizado!</strong> Array perfeitamente ordenado com ${this.comparisons} comparações e ${this.swaps} trocas.`;

    document.getElementById('btn-play').disabled = false;
    document.getElementById('btn-pause').disabled = true;
    document.getElementById('btn-generate').disabled = false;
    document.getElementById('array-size').disabled = false;
  }

  reset() {
    this.isRunning = false;
    this.isPaused = false;
    this.generator = null;
    this.stopTimer();
    this.resetMetrics();
    this.generateArray();
    this.updateStatus('Pronto', 'ready');

    document.getElementById('btn-play').disabled = false;
    document.getElementById('btn-pause').disabled = true;
    document.getElementById('btn-generate').disabled = false;
    document.getElementById('array-size').disabled = false;
  }

  startTimer() {
    this.startTime = Date.now();
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      if (this.isRunning && !this.isPaused) {
        const elapsed = Date.now() - this.startTime;
        document.getElementById('metric-time').textContent = `${elapsed} ms`;
      }
    }, 50);
  }

  stopTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
  }

  resetMetrics() {
    this.comparisons = 0;
    this.swaps = 0;
    this.accesses = 0;
    this.updateMetricsUI();
    document.getElementById('metric-time').textContent = '0 ms';
  }

  updateMetricsUI() {
    document.getElementById('metric-comparisons').textContent = this.comparisons;
    document.getElementById('metric-swaps').textContent = this.swaps;
    document.getElementById('metric-accesses').textContent = this.accesses;
  }

  updateStatus(text, type) {
    const pill = document.getElementById('algo-status');
    if (pill) {
      pill.textContent = text;
      pill.className = `status-pill ${type}`;
    }
  }
}

// Inicializar na carga do documento
document.addEventListener('DOMContentLoaded', () => {
  new VisualizerApp();
});
