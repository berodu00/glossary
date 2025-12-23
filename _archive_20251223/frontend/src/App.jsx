import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [keyword, setKeyword] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const searchTerms = async (q) => {
    setLoading(true)
    try {
      const response = await axios.get(`http://localhost:8080/api/terms?q=${q}`)
      setResults(response.data)
    } catch (error) {
      console.error("Error fetching terms:", error)
    } finally {
      setLoading(false)
    }
  }

  // Debounce search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      searchTerms(keyword)
    }, 300)

    return () => clearTimeout(delayDebounce)
  }, [keyword])

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    // Optional: Show toast
  }

  return (
    <>
      <h1>Vibe Glossary</h1>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="표준 용어를 검색하세요 (예: 고객, CUST)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : results.length > 0 ? (
        <table className="results-table">
          <thead>
            <tr>
              <th>용어명 (Logical)</th>
              <th>영문명 (Physical)</th>
              <th>도메인</th>
              <th>타입</th>
            </tr>
          </thead>
          <tbody>
            {results.map((term) => (
              <tr key={term.termId}>
                <td>{term.logicalName}</td>
                <td>
                  {term.physicalName}
                  <button className="copy-btn" onClick={() => copyToClipboard(term.physicalName)}>Copy</button>
                </td>
                <td>{term.domainName}</td>
                <td>{term.dataType}({term.dataLength})</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="empty-state">
          {keyword ? '검색 결과가 없습니다.' : '검색어를 입력해주세요.'}
        </div>
      )}
    </>
  )
}

export default App
