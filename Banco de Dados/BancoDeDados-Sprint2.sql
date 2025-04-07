create database PISprint2;

use PISprint2;

-- Criação da tabela Empresa
create table Empresa (
idEmpresa int primary key auto_increment,
nome_Empresa varchar (45),
cnpj char (14),
email_Empresa varchar (70),
cep_Empresa varchar (20)
);

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
foto_Usuario varchar (300),
fkEmpresa int, 
	constraint fkUsuarioEmpresa foreign key (fkEmpresa) references Empresa (idEmpresa)
);

	
-- Criação da tabela Registro
create table Registro (
idRegistro int primary key auto_increment,
tipo_Registro varchar (45),
dt_Registro datetime,
descricao_Registro varchar (400),
fkUsuario int,
	constraint fkRegistroUsuario foreign key (fkUsuario) references Usuario (idUsuario)
);

-- Criação da tabela Cogumelo
create table Cogumelo (
idCogumelo int primary key auto_increment,
nome_Cogumelo varchar (45)
);

-- Criação da tabela Parametro
create table Parametro (
idParametro int primary key auto_increment,
tempMaxFrutificacao int,
tempMaxIncubacao int,
tempMinFrutificacao int,
tempMinIncubacao int,
umiMaxFrutifucacao int, 
umiMaxIncubacao int, 
umiMinIncubacao int, 
umiMinFrutificacao int 
);

-- Criação da tabela Estágio
create table Estagio (
idEstagio int primary key auto_increment,
tipo_Estagio varchar (45),
fkCogumelo int,
fkParametro int,
	constraint fkEstagioCogumelo foreign key (fkCogumelo) references Cogumelo (idCogumelo),
    constraint fkEstagioParametro foreign key (fkParametro) references Parametro (idParametro)
);

-- Criação da tabela Estufa 
create table Estufa (
idEstufa int primary key auto_increment,
nome_Estufa varchar (45),
foto_Estufa varchar (300),
fkCogumelo int,
fkEmpresa int,
	constraint fkEstufaCogumelo foreign key (fkCogumelo) references Cogumelo (idCogumelo),
    constraint fkEstufaEmpresa foreign key (fkEmpresa) references Empresa (idEmpresa)
);


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

select * from Empresa;
select * from Usuario;
select * from Cogumelo;
select * from Parametro;
select * from Estagio;
select * from Estufa;
select * from Sensor;









