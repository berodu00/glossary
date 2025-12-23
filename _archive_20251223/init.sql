-- 1. 표준 단어 (Atomic Words)
CREATE TABLE IF NOT EXISTS std_word (
    word_id SERIAL PRIMARY KEY,
    logical_name VARCHAR(100) NOT NULL, -- 한글명 (예: 고객)
    physical_name VARCHAR(100) NOT NULL, -- 영문명 (예: CUST)
    definition TEXT,
    status VARCHAR(20) DEFAULT 'APPROVED'
);

-- 2. 표준 도메인 (Data Types)
CREATE TABLE IF NOT EXISTS std_domain (
    domain_id SERIAL PRIMARY KEY,
    domain_name VARCHAR(100) NOT NULL, -- 도메인명 (예: 번호_V20)
    data_type VARCHAR(50), -- VARCHAR
    data_length INTEGER, -- 20
    description TEXT
);

-- 3. 표준 용어 (Composite Terms)
CREATE TABLE IF NOT EXISTS std_term (
    term_id SERIAL PRIMARY KEY,
    logical_name VARCHAR(200) NOT NULL, -- 용어명 (예: 고객번호)
    physical_name VARCHAR(200) NOT NULL, -- 영문명 (예: CUST_NO)
    domain_id INTEGER REFERENCES std_domain(domain_id),
    status VARCHAR(20), -- REQUESTED, APPROVED, REJECTED
    requester_id VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. 용어 구성 정보 (단어와 용어의 매핑 관계)
CREATE TABLE IF NOT EXISTS term_composition (
    term_id INTEGER REFERENCES std_term(term_id),
    word_id INTEGER REFERENCES std_word(word_id),
    order_seq INTEGER -- 단어 결합 순서
);
