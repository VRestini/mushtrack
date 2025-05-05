
-- CREATE DATABASE MushTrack;
use MushTrack;

-- Criação da tabela Empresa
 create table Empresa (
 idEmpresa int primary key auto_increment,
 nome_Empresa varchar (45),
 cnpj_Empresa char (14),
 email_Empresa varchar (70),
 Nome_Representante varchar (45)
 );
 
 -- Criação da tabela Usuário
 create table Usuario (
 idUsuario int primary key auto_increment,
 nome_Usuario varchar(45),
 email_Usuario varchar(70),
 senha_Usuario varchar(45),
 status_Usuario varchar (45),
 	constraint chkStatusUsuario check (status_Usuario in ('Ativo', 'Inativo')),
 fkEmpresa int, 
 	constraint fkUsuarioEmpresa foreign key (fkEmpresa) references Empresa (idEmpresa)
 );
 
 -- Criação da tabela Cogumelo
create table Cogumelo (
idCogumelo int primary key auto_increment,
nome_Cogumelo varchar (45)
);

 -- Criação da tabela Estufa 
create table Estufa (
idEstufa int primary key auto_increment,
nome_Estufa varchar (45),
fkCogumelo int,
fkEmpresa int,
	constraint fkEstufaCogumelo foreign key (fkCogumelo) references Cogumelo(idCogumelo),
    constraint fkEstufaEmpresa foreign key (fkEmpresa) references Empresa(idEmpresa)
);

-- Criação da tabela Sensor 
create table Sensor (
idSensor int primary key auto_increment,
tipo_Sensor varchar (45),
nome_Sensor varchar(45),
status_Sensor varchar (45),
	constraint chkStatusSensor check (status_Sensor in ('Ativo', 'Inativo')),
numero_Serie int, 
dtInstalacao datetime,
dtManutencao datetime, 
posicao_Sensor varchar(45),
fkEstufa int,
	constraint fkSensorEstufa foreign key (fkEstufa) references Estufa (idEstufa)
);


-- Criação da tabela Estágio
create table Estagio (
idEstagio int primary key auto_increment,
tipo_Estagio varchar (45),
fkCogumelo int,
	constraint fkEstagioCogumelo foreign key (fkCogumelo) references Cogumelo (idCogumelo)
);

create table Parametro (
idParametro int primary key auto_increment,
temp_Minima decimal(4,2),
temp_Maxima decimal(4,2),
umi_Minima decimal(4,2),
umi_Maxima decimal(4,2),
fk_Cogumelo int,
fk_Estagio int,
constraint fkParametroCogumelo foreign key (fk_cogumelo) references Cogumelo(idCogumelo),
constraint fkParametroEstagio foreign key (fk_Estagio) references Estagio(idEstagio) 
);

create table Dados(
idDados int primary key auto_Increment, 
data_Captura datetime default current_timestamp, 
dados_Umidade float, 
dados_Temperatura float, 
fkSensor int, 
constraint fkHistoricoSensor foreign key (fkSensor) references Sensor (idSensor)
);

create table Alerta (
idAlerta int primary key auto_increment,
data_Alerta datetime default current_timestamp,
descricao_Alerta varchar(60),
fkDados int,
fkSensor int,
constraint fkAlertaDados foreign key (fkDados) references Dados(idDados),
constraint fkAlertaSensor foreign key (fkSensor) references Sensor(idSensor)
);


-- Empresa
INSERT INTO Empresa (nome_Empresa, cnpj_Empresa, email_Empresa, Nome_Representante) VALUES
('MushTrack Agro', '12345678000195', 'contato@mushtrack.com', 'Ana Lima'),
('FungiTech Ltda', '98765432000101', 'suporte@fungitech.com', 'Carlos Souza');

-- Usuario
INSERT INTO Usuario (nome_Usuario, email_Usuario, senha_Usuario, status_Usuario, fkEmpresa) VALUES
('João Mendes', 'joao@mushtrack.com', 'senha123', 'Ativo', 1),
('Mariana Silva', 'mariana@fungitech.com', '1234senha', 'Ativo', 2),
('Lucas Rocha', 'lucas@mushtrack.com', 'admin123', 'Inativo', 1);

-- Cogumelo
INSERT INTO Cogumelo (nome_Cogumelo) VALUES
('Shimeji Preto'),
('Champignon de Paris'),
('Shiitake');

-- Estufa
INSERT INTO Estufa (nome_Estufa, fkCogumelo, fkEmpresa) VALUES
('Estufa 01', 1, 1),
('Estufa 02', 2, 1),
('Estufa Fungi', 3, 2);

-- Sensor
INSERT INTO Sensor (tipo_Sensor, nome_Sensor, status_Sensor, numero_Serie, dtInstalacao, dtManutencao, posicao_Sensor, fkEstufa) VALUES
('Temperatura', 'TempSensor A', 'Ativo', 1001, '2025-01-01 08:00:00', '2025-04-01 10:00:00', 'Centro', 1),
('Umidade', 'UmiSensor B', 'Ativo', 1002, '2025-01-02 09:00:00', '2025-04-02 10:00:00', 'Leste', 1),
('Temperatura', 'TempSensor C', 'Inativo', 1003, '2025-02-01 10:00:00', '2025-04-10 10:00:00', 'Norte', 3);

-- Estagio
INSERT INTO Estagio (tipo_Estagio, fkCogumelo) VALUES
('Incubação', 1),
('Frutificação', 1),
('Colheita', 1),
('Incubação', 2),
('Frutificação', 3);

-- Parametro
INSERT INTO Parametro (temp_Minima, temp_Maxima, umi_Minima, umi_Maxima, fk_Cogumelo, fk_Estagio) VALUES
(18.00, 22.00, 85.00, 95.00, 1, 1), -- Incubação Shimeji
(20.00, 24.00, 80.00, 90.00, 1, 2), -- Frutificação Shimeji
(22.00, 25.00, 70.00, 85.00, 2, 4), -- Incubação Champignon
(16.00, 21.00, 90.00, 95.00, 3, 5); -- Frutificação Shiitake

-- Dados
INSERT INTO Dados (dados_Umidade, dados_Temperatura, fkSensor) VALUES
(88.5, 21.0, 1),
(92.0, 20.5, 1),
(89.0, 22.0, 2),
(95.5, 23.5, 3);

-- Alerta
INSERT INTO Alerta (descricao_Alerta, fkDados, fkSensor) VALUES
('Temperatura fora do ideal', 1, 1),
('Umidade acima do ideal', 4, 3);


select * from Empresa;
select * from Usuario;
select * from Cogumelo;
select * from Dados;
select * from Estagio;
select * from Estufa;
select * from Sensor;
select * from Parametro;
select * from Alerta;











