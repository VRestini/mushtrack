CREATE DATABASE MushTrack
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
	nome varchar (65)
);
create table estufa (
	id int primary key auto_increment,
	nome varchar (45),
	cogumelo_id int,
	empresa_id int,
	constraint fkEstufaCogumelo foreign key (cogumelo_id) references cogumelo(id),
    constraint fkEstufaEmpresa foreign key (empresa_id) references empresa(id)
);
create table sensor (
	id int primary key auto_increment,
	tipo varchar (45),
	nome varchar(45),
	status varchar (45),
	constraint chkStatusSensor check (status in ('Ativo', 'Inativo')),
	numero_serie varchar(20), 
	dt_instalacao datetime,
	dt_manutencao datetime, 
	posicao varchar(45),
	estufa_id int,
	constraint fkSensorEstufa foreign key (estufa_id) references estufa (id)
);
create table estagio (
	id int primary key auto_increment,
	tipo varchar (45),
	cogumelo_id int,
	constraint fkEstagioCogumelo foreign key (cogumelo_id) references cogumelo (id)
);

create table parametro (
	id int primary key auto_increment,
	temp_minima decimal(4,2),
	temp_maxima decimal(4,2),
	umi_minima decimal(4,2),
	umi_maxima decimal(4,2),
	cogumelo_id int,
	estagio_id int,
	constraint fkParametroCogumelo foreign key (cogumelo_id) references cogumelo(id),
	constraint fkParametroEstagio foreign key (estagio_id) references estagio(id) 
);

create table dados(
	id int primary key auto_Increment, 
	data_captura datetime default current_timestamp, 
	umidade float, 
	temperatura float, 
	sensor_id int, 
	constraint fkHistoricoSensor foreign key (sensor_id) references sensor (id)
);

create table alerta (
	id int primary key auto_increment,
	data_alerta datetime default current_timestamp,
	descricao varchar(200),
	dados_id int,
	sensor_id int,
	constraint fkAlertaDados foreign key (dados_id) references dados(id),
	constraint fkAlertaSensor foreign key (sensor_id) references sensor(id)
);

