INSERT OR IGNORE INTO associations
  (id, created_at, created_by, updated_at, updated_by, name, code, kind, governing_association_id)
VALUES
  ('01920000-0000-7000-8000-000000000001', 1751500800000, 'system', 1751500800000, 'system', 'Fédération Internationale de Football Association', 'FIFA', 'GLOBAL', NULL),
  ('01920000-0000-7000-8000-000000000002', 1751500800000, 'system', 1751500800000, 'system', 'Union of European Football Associations', 'UEFA', 'CONTINENTAL', '01920000-0000-7000-8000-000000000001'),
  ('01920000-0000-7000-8000-000000000003', 1751500800000, 'system', 1751500800000, 'system', 'Fotbalová asociace České republiky', 'CZE', 'NATIONAL', '01920000-0000-7000-8000-000000000002');
