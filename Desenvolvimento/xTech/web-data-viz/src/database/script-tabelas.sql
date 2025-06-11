CREATE DATABASE MushTrack;

use MushTrack;

 create table empresa (
 	id int primary key auto_increment,
 	nome varchar (60) NOT NULL,
 	cnpj char (14) UNIQUE NOT NULL,
 	senha varchar(255) NOT NULL,
 	email varchar (100) UNIQUE NOT NULL,
 	nome_representante varchar (60) NOT NULL
 );
 
 create table usuario (
 	id int primary key auto_increment,
 	nome varchar(60),
 	email varchar(100) UNIQUE NOT NULL,
 	senha varchar(255) NOT NULL,
 	status varchar (45),
 	constraint chkStatusUsuario check (status in ('Ativo', 'Inativo')),
	empresa_id int NOT NULL, 
 	constraint fkUsuarioEmpresa foreign key (empresa_id) references empresa (id)
 );
 
create table cogumelo (
	id int primary key auto_increment,
	nome varchar (65) NOT NULL
);
create table estufa (
	id int primary key auto_increment,
	nome varchar (45) NOT NULL,
	cogumelo_id int NOT NULL,
	empresa_id int NOT NULL,
	estagio_id int NOT NULL,
	constraint fkEstufaEstagio foreign key (estagio_id) references estagio(id),
	constraint fkEstufaCogumelo foreign key (cogumelo_id) references cogumelo(id),
    constraint fkEstufaEmpresa foreign key (empresa_id) references empresa(id)
);
create table sensor (
	id int primary key auto_increment,
	tipo varchar (45) NOT NULL,
	nome varchar(45) NOT NULL,
	status varchar (45) NOT NULL,
	constraint chkStatusSensor check (status in ('Ativo', 'Inativo')),
	numero_serie varchar(20) NOT NULL, 
	dt_instalacao datetime NOT NULL,
	dt_manutencao datetime NOT NULL, 
	posicao varchar(45) NOT NULL,
	estufa_id int NOT NULL ,
	constraint fkSensorEstufa foreign key (estufa_id) references estufa (id)
);
create table estagio (
	id int primary key auto_increment,
	tipo varchar (45)
);

create table parametro (
	id int primary key auto_increment,
	temp_minima decimal(4,2)NOT NULL,
	temp_maxima decimal(4,2)NOT NULL,
	umi_minima decimal(4,2) NOT NULL,
	umi_maxima decimal(4,2) NOT NULL,
	cogumelo_id int NOT NULL,
	estagio_id int NOT NULL,
	constraint fkParametroCogumelo foreign key (cogumelo_id) references cogumelo(id),
	constraint fkParametroEstagio foreign key (estagio_id) references estagio(id) 
);

create table dados(
	id int primary key auto_Increment, 
	data_captura datetime default current_timestamp, 
	umidade float NOT NULL, 
	temperatura float NOT NULL, 
	sensor_id int NOT NULL, 
	constraint fkHistoricoSensor foreign key (sensor_id) references sensor (id)
);

create table alerta (
	id int primary key auto_increment,
	data_alerta datetime default current_timestamp,
	descricao varchar(200),
	dados_id int NOT NULL,
	sensor_id int NOT NULL,
	constraint fkAlertaDados foreign key (dados_id) references dados(id),
	constraint fkAlertaSensor foreign key (sensor_id) references sensor(id)
);

