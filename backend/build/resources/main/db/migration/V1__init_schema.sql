-- 1. Processes
CREATE TABLE processes (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE, -- Explicit length 100 from Entity
    display_order INT NOT NULL,
    created_at TIMESTAMP
);

-- 2. Terms
CREATE TABLE terms (
    id BIGSERIAL PRIMARY KEY,
    name_ko VARCHAR(255) NOT NULL,
    name_en VARCHAR(255),
    abbreviation VARCHAR(255),
    description TEXT NOT NULL,
    photo_url VARCHAR(255),
    initial_ko CHAR(1) NOT NULL,
    initial_en CHAR(1) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    updated_by VARCHAR(255),
    deleted_at TIMESTAMP
);

-- 3. Term Process Mapping (ManyToMany)
CREATE TABLE term_process_mapping (
    term_id BIGINT NOT NULL,
    process_id BIGINT NOT NULL,
    CONSTRAINT fk_mapping_term FOREIGN KEY (term_id) REFERENCES terms(id),
    CONSTRAINT fk_mapping_process FOREIGN KEY (process_id) REFERENCES processes(id)
);

-- 4. Term Synonyms
CREATE TABLE term_synonyms (
    id BIGSERIAL PRIMARY KEY,
    term_id BIGINT NOT NULL,
    synonym VARCHAR(255) NOT NULL,
    CONSTRAINT fk_synonym_term FOREIGN KEY (term_id) REFERENCES terms(id)
);

-- 5. Term Suggestions
CREATE TABLE term_suggestions (
    id BIGSERIAL PRIMARY KEY,
    requester_id VARCHAR(255) NOT NULL,
    name_ko VARCHAR(255) NOT NULL,
    name_en VARCHAR(255),
    description TEXT NOT NULL,
    process_id BIGINT,
    status VARCHAR(20), -- Enum String length 20
    reviewer_id VARCHAR(255),
    reviewer_note TEXT,
    approved_term_id BIGINT,
    created_at TIMESTAMP,
    reviewed_at TIMESTAMP,
    CONSTRAINT fk_suggestion_process FOREIGN KEY (process_id) REFERENCES processes(id),
    CONSTRAINT fk_suggestion_term FOREIGN KEY (approved_term_id) REFERENCES terms(id)
);

-- 6. Bookmarks
CREATE TABLE bookmarks (
    id BIGSERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    term_id BIGINT NOT NULL,
    created_at TIMESTAMP,
    CONSTRAINT uk_bookmarks_user_term UNIQUE (user_id, term_id) -- Explicit UK Name
);

-- 7. Search Logs
CREATE TABLE search_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    keyword VARCHAR(255),
    search_condition TEXT, -- Mapped as TEXT in Entity
    created_at TIMESTAMP
);
