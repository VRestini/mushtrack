use MushTrack;
INSERT INTO estagio (tipo) VALUES
("Incubação"),
("Indução"),
("Frutificação");
INSERT INTO cogumelo(nome) VALUES
("Champignon de Paris"),
("Shiitake"),
("Shimeji Cinza"),
("Shimeji Branco"),
("Shimeji Preto");
SELECT* from cogumelo;
SELECT* from estagio;
SELECT* from parametro;
-- Champignon de Paris
INSERT INTO parametro (temp_minima,temp_maxima, umi_minima, umi_maxima,cogumelo_id,estagio_id) VALUES
(22,26,90,100,1,1),
(20,26,85,95,1,2),
(22,26,85,95,1,3);

-- Shimeji branco
INSERT INTO parametro (temp_minima,temp_maxima, umi_minima, umi_maxima,cogumelo_id,estagio_id) VALUES
(22,26,90,100,4,1),
(20,26,85,95,4,2),
(22,26,85,95,4,3);

-- Shimeji preto
INSERT INTO parametro (temp_minima,temp_maxima, umi_minima, umi_maxima,cogumelo_id,estagio_id) VALUES
(22,26,95,100,5,1),
(10,15,98,100,5,2),
(10,15,90,95,5,3);

-- Shimeji cinza
INSERT INTO parametro (temp_minima,temp_maxima, umi_minima, umi_maxima,cogumelo_id,estagio_id) VALUES
(22,26,95,100,3,1),
(15,20,98,100,3,2),
(15,20,90,95,3,3);

-- Shimeji cinza
INSERT INTO parametro (temp_minima,temp_maxima, umi_minima, umi_maxima,cogumelo_id,estagio_id) VALUES
(24,27,60,70,2,1),
(18,22,85,95,2,2),
(15,20,80,90,2,3);

select * from sensor;
INSERT INTO sensor (tipo, nome, status, numero_serie, dt_instalacao, dt_manutencao, posicao, estufa_id) VALUES
('Temperatura', 'Sensor T-100', 'Ativo', 'SNTMP001', '2023-01-15 09:00:00', '2023-06-20 14:30:00', 'Superior Esquerdo', 1),
('Umidade', 'Sensor U-200', 'Ativo', 'SNUMD002', '2023-01-15 09:00:00', '2023-06-20 14:30:00', 'Superior Direito', 1),
('CO2', 'Sensor C-300', 'Ativo', 'SNCO2003', '2023-01-15 09:00:00', '2023-07-10 10:15:00', 'Central', 1),
('Luminosidade', 'Sensor L-400', 'Ativo', 'SNLUM004', '2023-01-15 09:00:00', '2023-07-10 10:15:00', 'Frontal', 1),
('Vazão de Água', 'Sensor V-500', 'Ativo', 'SNVAZ005', '2023-02-10 11:30:00', '2023-08-05 09:45:00', 'Inferior', 1),
('Temperatura', 'Sensor T-101', 'Inativo', 'SNTMP006', '2022-12-05 14:00:00', '2023-05-15 16:20:00', 'Traseiro', 1),
('Umidade do Solo', 'Sensor US-600', 'Ativo', 'SNUSO007', '2023-03-20 10:45:00', '2023-09-01 11:00:00', 'Base', 1);
