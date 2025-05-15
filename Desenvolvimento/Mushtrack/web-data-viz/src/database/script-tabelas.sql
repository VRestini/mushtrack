CREATE DATABASE MushTrack
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

