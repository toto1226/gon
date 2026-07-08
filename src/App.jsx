import { useMemo, useState } from 'react';
import './App.css';
import ContactForm from './ContactForm';

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
  const [theme, setTheme] = useState('dark');
  const [activeTab, setActiveTab] = useState('lotto');

  const handleGenerate = () => {
    setLottoSets(generateLottoSets());
  };

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  const buttonLabel = useMemo(() => (theme === 'dark' ? '화이트 모드' : '다크 모드'), [theme]);

  return (
    <div className={`App ${theme}`}>
      <main className="App-main">
        <div className="tabs-header">
          <button
            className={`tab-button ${activeTab === 'lotto' ? 'active' : ''}`}
            onClick={() => setActiveTab('lotto')}
          >
            로또 생성기
          </button>
          <button
            className={`tab-button ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            제휴 문의
          </button>
          <button type="button" className="theme-toggle-top" onClick={toggleTheme}>
            {buttonLabel}
          </button>
        </div>

        {activeTab === 'lotto' && (
        <section className="App-card">
          <div className="top-row">
            <p className="eyebrow">오늘의 행운</p>
          </div>
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
        )}

        {activeTab === 'contact' && (
          <ContactForm />
        )}
      </main>
    </div>
  );
}

export default App;
