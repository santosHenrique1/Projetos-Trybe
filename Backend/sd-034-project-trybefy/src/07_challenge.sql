UPDATE users
SET plan_id = 1
WHERE id = 4;

UPDATE users 
SET plan_id = 1
WHERE id = 8;

DELETE FROM plans
where name = 'trimestral';
