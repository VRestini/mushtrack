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
