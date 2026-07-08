import { useState } from 'react';
import './ContactForm.css';

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);

    try {
      const response = await fetch('https://formspree.io/f/mdarjreq', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setIsSubmitted(true);
        e.target.reset();
        setTimeout(() => setIsSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-form-wrapper">
        <h2>제휴 문의</h2>
        <p className="contact-subtitle">저희와 함께 성장할 파트너를 기다리고 있습니다</p>

        {isSubmitted && (
          <div className="success-message">
            ✓ 문의가 성공적으로 전송되었습니다!
          </div>
        )}

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">이름 *</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="이름을 입력하세요"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">이메일 *</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="이메일을 입력하세요"
            />
          </div>

          <div className="form-group">
            <label htmlFor="company">회사명</label>
            <input
              type="text"
              id="company"
              name="company"
              placeholder="회사명을 입력하세요"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">연락처</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="연락처를 입력하세요"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">제휴 분야 *</label>
            <select id="category" name="category" required>
              <option value="">선택하세요</option>
              <option value="technology">기술 협력</option>
              <option value="marketing">마케팅 협력</option>
              <option value="investment">투자/펀딩</option>
              <option value="distribution">유통/판매</option>
              <option value="partnership">기타 제휴</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">문의 내용 *</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              placeholder="제휴 내용을 상세히 설명해주세요"
            />
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? '전송 중...' : '문의 보내기'}
          </button>
        </form>

        <p className="form-note">* 필수 항목입니다</p>
      </div>
    </div>
  );
}
