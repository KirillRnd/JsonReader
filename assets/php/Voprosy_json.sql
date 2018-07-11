SELECT
interview_fields.interview_id,
interview.`name`,
interview_fields.id,
interview_fields.question
FROM
interview
INNER JOIN interview_fields ON interview_fields.interview_id = interview.id
WHERE
interview_fields.type = 'json'
