
-- CREATE DATABASE MushTrack;
create database MushTrack;
use MushTrack;

-- Criação da tabela Empresa
 create table Empresa (
 id_empresa int primary key auto_increment,
 nome_empresa varchar (45),
 cnpj char (14),
 email_empresa varchar (70),
 senha_empresa varchar(255),
 nome_representante varchar (45)
 );
 
 -- Criação da tabela Usuário
 create table Usuario (
 id_usuario int primary key auto_increment,
 nome_usuario varchar(45),
 email_usuario varchar(70),
 senha_usuario varchar(255),
 status_usuario varchar (45),
 	constraint chkStatusUsuario check (status_usuario in ('Ativo', 'Inativo')),
 fkEmpresa int, 
 	constraint fkUsuarioEmpresa foreign key (fkEmpresa) references Empresa (id_empresa)
 );
 
 -- Criação da tabela Cogumelo
create table Cogumelo (
id_cogumelo int primary key auto_increment,
nome_cogumelo varchar (45)
);

 -- Criação da tabela Estufa 
create table Estufa (
id_estufa int primary key auto_increment,
nome_estufa varchar (45),
fk_cogumelo int,
fk_empresa int,
	constraint fkEstufaCogumelo foreign key (fk_cogumelo) references Cogumelo(id_cogumelo),
    constraint fkEstufaEmpresa foreign key (fk_empresa) references Empresa(id_empresa)
);

-- Criação da tabela Sensor 
create table Sensor (
id_sensor int primary key auto_increment,
tipo_sensor varchar (45),
nome_sensor varchar(45),
status_sensor varchar (45),
	constraint chkStatusSensor check (status_sensor in ('Ativo', 'Inativo')),
numero_serie int, 
dt_instalacao datetime,
dt_manutencao datetime, 
posicao_sensor varchar(45),
fk_estufa int,
	constraint fkSensorEstufa foreign key (fk_estufa) references Estufa (id_estufa)
);

-- Criação da tabela Estágio
create table Estagio (
id_estagio int primary key auto_increment,
tipo_estagio varchar (45),
fk_cogumelo int,
	constraint fkEstagioCogumelo foreign key (fk_cogumelo) references Cogumelo (id_cogumelo)
);

create table Parametro (
id_parametro int primary key auto_increment,
temp_minima decimal(4,2),
temp_maxima decimal(4,2),
umi_minima decimal(4,2),
umi_maxima decimal(4,2),
fk_cogumelo int,
fk_estagio int,
constraint fkParametroCogumelo foreign key (fk_cogumelo) references Cogumelo(id_cogumelo),
constraint fkParametroEstagio foreign key (fk_estagio) references Estagio(id_estagio) 
);

create table Dados(
id_dados int primary key auto_Increment, 
data_captura datetime default current_timestamp, 
dados_umidade float, 
dados_temperatura float, 
fk_sensor int, 
constraint fkHistoricoSensor foreign key (fk_sensor) references Sensor (id_sensor)
);

create table Alerta (
id_alerta int primary key auto_increment,
data_alerta datetime default current_timestamp,
descricao_alerta varchar(60),
fk_dados int,
fk_sensor int,
constraint fkAlertaDados foreign key (fk_dados) references Dados(id_dados),
constraint fkAlertaSensor foreign key (fk_sensor) references Sensor(id_sensor)
);

select * from Empresa;
select * from Usuario;
select * from Cogumelo;
select * from Dados;
select * from Estagio;
select * from Estufa;
select * from Sensor;
select * from Parametro;
select * from Alerta;











