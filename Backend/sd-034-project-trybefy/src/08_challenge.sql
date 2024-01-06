SELECT full_name "Nome completo", email "E-mail", p.name "Plano" FROM users u
INNER JOIN plans p
ON u.plan_id = p.id
ORDER BY full_name ASC;

