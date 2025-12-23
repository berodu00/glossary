
# TestSprite AI Testing Report(MCP)

---

## 1️⃣ Document Metadata
- **Project Name:** backend
- **Date:** 2025-12-23
- **Prepared by:** TestSprite AI Team

---

## 2️⃣ Requirement Validation Summary

#### Test TC001
- **Test Name:** dev login should return valid jwt token
- **Test Code:** [TC001_dev_login_should_return_valid_jwt_token.py](./TC001_dev_login_should_return_valid_jwt_token.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/eddf3e6b-87a9-42c9-96a7-0142853750ee/805cb6c3-56f9-4895-b855-de3def9296a3
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC002
- **Test Name:** processes get should list_all_non_deleted_processes
- **Test Code:** [TC002_processes_get_should_list_all_non_deleted_processes.py](./TC002_processes_get_should_list_all_non_deleted_processes.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/eddf3e6b-87a9-42c9-96a7-0142853750ee/627ad685-be58-4901-a44d-73add76653f2
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC003
- **Test Name:** processes post should create_new_process_with_valid_data
- **Test Code:** [TC003_processes_post_should_create_new_process_with_valid_data.py](./TC003_processes_post_should_create_new_process_with_valid_data.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 53, in <module>
  File "<string>", line 28, in test_processes_post_should_create_new_process_with_valid_data
AssertionError: Unexpected status code: 400, Response: {"type":"about:blank","title":"Bad Request","status":400,"detail":"Invalid request content.","instance":"/api/v1/processes"}

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/eddf3e6b-87a9-42c9-96a7-0142853750ee/98b296c0-b703-4fc4-b245-b005f3a9a94d
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC004
- **Test Name:** processes id put should update_existing_process
- **Test Code:** [TC004_processes_id_put_should_update_existing_process.py](./TC004_processes_id_put_should_update_existing_process.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 66, in <module>
  File "<string>", line 23, in test_processes_id_put_should_update_existing_process
AssertionError: Failed to create process for update test: {"type":"about:blank","title":"Bad Request","status":400,"detail":"Invalid request content.","instance":"/api/v1/processes"}

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/eddf3e6b-87a9-42c9-96a7-0142853750ee/ca4bbc44-18ea-4491-bca6-36637d06c3b3
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC005
- **Test Name:** processes id delete should soft_delete_process
- **Test Code:** [TC005_processes_id_delete_should_soft_delete_process.py](./TC005_processes_id_delete_should_soft_delete_process.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 66, in <module>
  File "<string>", line 26, in test_processes_id_delete_should_soft_delete_process
AssertionError: Create process failed: {"type":"about:blank","title":"Bad Request","status":400,"detail":"Invalid request content.","instance":"/api/v1/processes"}

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/eddf3e6b-87a9-42c9-96a7-0142853750ee/4a58be77-b1fc-4bf4-a117-a878ff851592
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC006
- **Test Name:** terms get should search_terms_with_filters_excluding_deleted
- **Test Code:** [TC006_terms_get_should_search_terms_with_filters_excluding_deleted.py](./TC006_terms_get_should_search_terms_with_filters_excluding_deleted.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 112, in <module>
  File "<string>", line 33, in test_terms_get_should_search_terms_with_filters_excluding_deleted
AssertionError: Failed to create term, status: 405, body: {"type":"about:blank","title":"Method Not Allowed","status":405,"detail":"Method 'POST' is not supported.","instance":"/api/v1/terms"}

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/eddf3e6b-87a9-42c9-96a7-0142853750ee/8fb5414e-5abf-4d38-b868-9a3d0531002a
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC007
- **Test Name:** terms post should create_term_and_store_initial_en_capitalized
- **Test Code:** [TC007_terms_post_should_create_term_and_store_initial_en_capitalized.py](./TC007_terms_post_should_create_term_and_store_initial_en_capitalized.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 50, in <module>
  File "<string>", line 29, in test_terms_post_should_create_term_and_store_initial_en_capitalized
AssertionError: Unexpected status code: 405, response: {"type":"about:blank","title":"Method Not Allowed","status":405,"detail":"Method 'POST' is not supported.","instance":"/api/v1/terms"}

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/eddf3e6b-87a9-42c9-96a7-0142853750ee/2097a0c7-ce39-4299-8d99-12eced560b01
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC008
- **Test Name:** terms id get should_return_term_detail_or_404_if_deleted
- **Test Code:** [TC008_terms_id_get_should_return_term_detail_or_404_if_deleted.py](./TC008_terms_id_get_should_return_term_detail_or_404_if_deleted.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 72, in <module>
  File "<string>", line 30, in test_terms_id_get_should_return_term_detail_or_404_if_deleted
AssertionError: Term creation failed: {"type":"about:blank","title":"Method Not Allowed","status":405,"detail":"Method 'POST' is not supported.","instance":"/api/v1/terms"}

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/eddf3e6b-87a9-42c9-96a7-0142853750ee/909e7762-e5f0-48fc-bd98-7057594f78af
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC009
- **Test Name:** suggestions post should_create_new_term_suggestion
- **Test Code:** [TC009_suggestions_post_should_create_new_term_suggestion.py](./TC009_suggestions_post_should_create_new_term_suggestion.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 36, in <module>
  File "<string>", line 27, in test_suggestions_post_should_create_new_term_suggestion
AssertionError: Expected status 200 or 201 but got 400

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/eddf3e6b-87a9-42c9-96a7-0142853750ee/8cec7360-476a-4ab5-ad23-6f7ced76258f
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC010
- **Test Name:** bookmarks terms termid post should_toggle_bookmark_status
- **Test Code:** [TC010_bookmarks_terms_termid_post_should_toggle_bookmark_status.py](./TC010_bookmarks_terms_termid_post_should_toggle_bookmark_status.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 73, in <module>
  File "<string>", line 33, in test_bookmarks_terms_termid_post_should_toggle_bookmark_status
AssertionError: Failed to create term: {"type":"about:blank","title":"Method Not Allowed","status":405,"detail":"Method 'POST' is not supported.","instance":"/api/v1/terms"}

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/eddf3e6b-87a9-42c9-96a7-0142853750ee/852ab0cd-8614-4b10-bea0-5044daedc3d4
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---


## 3️⃣ Coverage & Matching Metrics

- **20.00** of tests passed

| Requirement        | Total Tests | ✅ Passed | ❌ Failed  |
|--------------------|-------------|-----------|------------|
| ...                | ...         | ...       | ...        |
---


## 4️⃣ Key Gaps / Risks
{AI_GNERATED_KET_GAPS_AND_RISKS}
---