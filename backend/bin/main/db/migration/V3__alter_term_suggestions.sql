-- Add name_en and process_id to term_suggestions
-- Drop process_ids (old text field)

ALTER TABLE term_suggestions ADD COLUMN name_en VARCHAR(255);
ALTER TABLE term_suggestions ADD COLUMN process_id BIGINT;

ALTER TABLE term_suggestions DROP COLUMN process_ids;

ALTER TABLE term_suggestions ADD CONSTRAINT fk_suggestion_process FOREIGN KEY (process_id) REFERENCES processes(id);
