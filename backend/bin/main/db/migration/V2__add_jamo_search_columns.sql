-- V2__add_jamo_search_columns.sql

-- Add columns for Jamo decomposition and Full Initials
ALTER TABLE terms ADD COLUMN name_jamo VARCHAR(255);
ALTER TABLE terms ADD COLUMN name_initials VARCHAR(255);

-- Create indexes for performance
CREATE INDEX idx_terms_name_jamo ON terms(name_jamo);
CREATE INDEX idx_terms_name_initials ON terms(name_initials);
