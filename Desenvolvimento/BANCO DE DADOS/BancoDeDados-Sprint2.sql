CREATE DATABASE MushTrack;
use MushTrack;

-- Criação da tabela Empresa
 create table Empresa (
 idEmpresa int primary key auto_increment,
 nome_Empresa varchar (45),
 cnpj char (14),
 email_Empresa varchar (70),
 Nome_Representante varchar (45)
 );
 
insert into Empresa (nome_Empresa, cnpj, email_Empresa, Nome_Representante) values 
('Estufas do Sabor', '12345678000195', 'contato@estufasdosabor.com', 'João Silva'),
('Cogumelos da Terra', '98765432000100', 'info@cogumelosdaterra.com', 'Maria Oliveira'),
('Cultivo Verde', '11122233000145', 'sac@cultivoverde.com', 'Carlos Pereira'),
('Fungos Gourmet', '22233344000156', 'contato@fungosgourmet.com', 'Ana Costa'),
('Estufas Naturais', '33344455000167', 'atendimento@estufasnaturais.com', 'Roberto Santos');
 
 -- Criação da tabela Usuário
 create table Usuario (
 idUsuario int primary key auto_increment,
 nome_Usuario varchar (45),
 email_Usuario varchar (70),
 tel_Usuario char (11),
 cpf_Usuario char (11),
 status_Usuario varchar (45),
 permissao_Usuario varchar (45),
 	constraint chkPermissaoUsuario check (permissao_Usuario in ('Administrador', 'Gestor', 'Funcionário')),
 	constraint chkStatusUsuario check (status_Usuario in ('Ativo', 'Inativo')),
 fkEmpresa int, 
 	constraint fkUsuarioEmpresa foreign key (fkEmpresa) references Empresa (idEmpresa)
 );
insert into Usuario (nome_Usuario, email_Usuario, tel_Usuario, cpf_Usuario, status_Usuario, permissao_Usuario, foto_Usuario, fkEmpresa) values 
('Lucas Almeida', 'lucas.almeida@email.com', '11987654321', '12345678901', 'Ativo', 'Administrador', 1),
('Fernanda Souza', 'fernanda.souza@email.com', '11976543210', '10987654321', 'Ativo', 'Gestor', 2),
('Carlos Mendes', 'carlos.mendes@email.com', '11965432109', '09876543210', 'Inativo', 'Funcionário', 3),
('Ana Clara', 'ana.clara@email.com', '11954321098', '98765432100', 'Ativo', 'Funcionário', 1),
('Roberto Lima', 'roberto.lima@email.com', '11943210987', '87654321009', 'Ativo', 'Gestor', 2);
 
-- Criação da tabela Registro
create table Registro (
idRegistro int primary key auto_increment,
tipo_Registro varchar (45),
dt_Registro datetime,
descricao_Registro varchar (400),
fkUsuario int,
	constraint fkRegistroUsuario foreign key (fkUsuario) references Usuario (idUsuario)
);

insert into Registro (tipo_Registro, dt_Registro, descricao_Registro, fkUsuario) values 
('Entrada', '2023-10-01 08:00:00', 'Usuário Lucas Almeida registrou a entrada.', 1),
('Saída', '2023-10-01 17:00:00', 'Usuário Fernanda Souza registrou a saída.', 2),
('Entrada', '2023-10-02 08:15:00', 'Usuário Carlos Mendes registrou a entrada.', 3),
('Saída', '2023-10-02 16:45:00', 'Usuário Ana Clara registrou a saída.', 4),
('Entrada', '2023-10-03 09:00:00', 'Usuário Roberto Lima registrou a entrada.', 5);

-- Criação da tabela Cogumelo
create table Cogumelo (
idCogumelo int primary key auto_increment,
nome_Cogumelo varchar (45)
);
insert into Cogumelo (nome_Cogumelo) values
('Shimeji'),
('Shitake'),
('Champignon de Paris');

-- Criação da tabela Estágio
create table Estagio (
idEstagio int primary key auto_increment,
tempMinima float, 
tempMaxima float, 
umiMinima float,
umiMaxima float,
tipo_Estagio varchar (45),
fkCogumelo int,
	constraint fkEstagioCogumelo foreign key (fkCogumelo) references Cogumelo (idCogumelo)
);
INSERT INTO Estagio (tempMinima, tempMaxima, umiMinima, umiMaxima, tipo_Estagio, fkCogumelo) 
VALUES 
(15.0, 20.0, 60.0, 80.0, 'Germinação', 1), 
(18.0, 25.0, 50.0, 70.0, 'Frutificação', 1), 
(20.0, 25.0, 55.0, 75.0, 'Germinação', 2),  
(22.0, 28.0, 60.0, 80.0, 'Frutificação', 2),
(16.0, 22.0, 65.0, 85.0, 'Germinação', 3);  

-- Criação da tabela Estufa 
create table Estufa (
idEstufa int primary key auto_increment,
nome_Estufa varchar (45),
fkCogumelo int,
fkEmpresa int,
	constraint fkEstufaCogumelo foreign key (fkCogumelo) references Cogumelo (idCogumelo),
    constraint fkEstufaEmpresa foreign key (fkEmpresa) references Empresa (idEmpresa)
);
INSERT INTO Estufa (nome_Estufa, fkCogumelo, fkEmpresa) 
VALUES 
('Estufa 1 - Shimeji', 1, 1), 
('Estufa 2 - Shitake', 2, 2), 
('Estufa 3 - Champignon', 3, 1),  
('Estufa 4 - Shimeji', 1, 3), 
('Estufa 5 - Shitake', 2, 2);  

-- Criação da tabela Sensor 
create table Sensor (
idSensor int primary key auto_increment,
tipo_Sensor varchar (45),
status_Sensor varchar (45),
	constraint chkStatusSensor check (status_Sensor in ('Ativo', 'Inativo')),
numeroSeries int, 
dtInstalacao datetime,
dtManutencao datetime, 
valorSensor int,
fkEstufa int,
	constraint fkSensorEstufa foreign key (fkEstufa) references Estufa (idEstufa)
);
insert into Sensor (tipo_Sensor, status_Sensor, numeroSeries, dtInstalacao, dtManutencao, valorSensor, fkEstufa) values 
('Temperatura', 'Ativo', 1001, '2023-01-15 10:00:00', '2023-06-15 10:00:00', 25, 1),
('Umidade', 'Ativo', 1002, '2023-02-20 11:00:00', '2023-07-20 11:00:00', 60, 2), 
('CO2', 'Inativo', 1003, '2023-03-10 09:30:00', '2023-08-10 09:30:00', 400, 3),  
('Luminosidade', 'Ativo', 1004, '2023-04-05 14:00:00', '2023-09-05 14:00:00', 300, 4), 
('Pressão', 'Ativo', 1005, '2023-05-12 08:45:00', '2023-10-12 08:45:00', 1010, 5); 
create table Historico(
idHistorico int primary key auto_Increment, 
dataDeCaptura datetime default current_timestamp, 
valorUmidade float, 
valorTemperatura float, 
fkSensor int, 
constraint fkHistoricoSensor foreign key (fkSensor) references Sensor (idSensor)
);

select * from empresa join usuario on fkempresa = idEmpresa;


select * from Empresa;
select * from Usuario;
select * from Cogumelo;
select * from Historico;
select * from Estagio;
select * from Estufa;
select * from Sensor;









