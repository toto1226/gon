import { useState } from 'react';
import './App.css';

function generateLottoNumbers() {
  const numbers = Array.from({ length: 45 }, (_, index) => index + 1);
  const shuffled = [...numbers].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 6).sort((a, b) => a - b);
}

function generateLottoSets(count = 5) {
  return Array.from({ length: count }, () => generateLottoNumbers());
}

function App() {
  const [lottoSets, setLottoSets] = useState([]);

  const handleGenerate = () => {
    setLottoSets(generateLottoSets());
  };

  return (
    <div className="App">
      <main className="App-main">
        <section className="App-card">
          <p className="eyebrow">오늘의 행운</p>
          <h1>로또 번호 생성기</h1>
          <p className="description">
            버튼을 누르면 5개의 로또 번호 세트가 한 번에 생성됩니다.
          </p>
          <button type="button" className="generate-button" onClick={handleGenerate}>
            로또 번호 생성
          </button>

          <div className="result-grid" aria-live="polite">
            {lottoSets.length === 0 ? (
              <p className="placeholder">아직 번호가 없습니다. 버튼을 눌러보세요.</p>
            ) : (
              lottoSets.map((numbers, index) => (
                <article key={`${numbers.join('-')}-${index}`} className="lotto-set" data-testid="lotto-set">
                  <span className="set-number">{index + 1}번</span>
                  <div className="numbers">
                    {numbers.map((number) => (
                      <span key={`${number}-${index}`} className="number-ball">
                        {number}
                      </span>
                    ))}
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
