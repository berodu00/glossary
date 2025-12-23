-- 1. Processes (공정)
CREATE TABLE processes (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 2. Terms (용어)
CREATE TABLE terms (
    id BIGSERIAL PRIMARY KEY,
    name_ko VARCHAR(255) NOT NULL,
    name_en VARCHAR(255),
    abbreviation VARCHAR(100),
    description TEXT NOT NULL,
    photo_url VARCHAR(512),
    initial_ko CHAR(1) NOT NULL,
    initial_en CHAR(1) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP,
    updated_by VARCHAR(50),
    deleted_at TIMESTAMP
);

-- 3. Term Process Mapping
CREATE TABLE term_process_mapping (
    term_id BIGINT NOT NULL,
    process_id BIGINT NOT NULL,
    PRIMARY KEY (term_id, process_id),
    CONSTRAINT fk_mapping_term FOREIGN KEY (term_id) REFERENCES terms(id) ON DELETE CASCADE,
    CONSTRAINT fk_mapping_process FOREIGN KEY (process_id) REFERENCES processes(id)
);

-- 4. Term Synonyms
CREATE TABLE term_synonyms (
    id BIGSERIAL PRIMARY KEY,
    term_id BIGINT NOT NULL,
    synonym VARCHAR(255) NOT NULL,
    CONSTRAINT fk_synonym_term FOREIGN KEY (term_id) REFERENCES terms(id) ON DELETE CASCADE
);

-- 5. Term Suggestions
CREATE TABLE term_suggestions (
    id BIGSERIAL PRIMARY KEY,
    requester_id VARCHAR(50) NOT NULL,
    name_ko VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    process_ids TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING',
    reviewer_id VARCHAR(50),
    reviewer_note TEXT,
    approved_term_id BIGINT,
    created_at TIMESTAMP DEFAULT NOW(),
    reviewed_at TIMESTAMP,
    CONSTRAINT fk_suggestion_term FOREIGN KEY (approved_term_id) REFERENCES terms(id)
);

-- 6. Bookmarks
CREATE TABLE bookmarks (
    user_id VARCHAR(50) NOT NULL,
    term_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, term_id),
    CONSTRAINT fk_bookmark_term FOREIGN KEY (term_id) REFERENCES terms(id) ON DELETE CASCADE
);

-- 7. Search Logs
CREATE TABLE search_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id VARCHAR(50),
    query VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes (Optional but recommended)
CREATE INDEX idx_terms_name_ko ON terms(name_ko);
CREATE INDEX idx_terms_initial_ko ON terms(initial_ko);
