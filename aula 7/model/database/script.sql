#Permite criar uma database
create database db_filmes_20261_b;

#Permite vizualizar todos databases existentes
show databases;

#Permite escolher  o database a ser utilizado
use db_filmes_20261_b;

#Permite vizualizar todas as tabelas existentes dentro do database
show tables;

create table tbl_filme (
	id 					int not null auto_increment primary key,
    nome 				varchar(80) not null, 
    sinopse 			text not null,
    capa 				varchar(255) not null,
    data_lancamento 	date not null,
    duracao 			time not null,
    valor 				decimal(5,2) default 0,
    avaliacao 			decimal (3,2) default null
);


# o drop apaga tudo
#drop table tbl_filmes;

#drop database db_filmes_20261_b;

insert into tbl_filme (
						nome, 
                        sinopse,
                        capa,
                        data_lancamento,
                        duracao,
                        valor,
                        avaliacao
) values (
	'Super Mario Galaxy: O Filme',
    'Uma nova aventura leva Mario a enfrentar um inédito e ameaçador super vilão. Em Super Mario Galaxy: O Filme, o bigodudo encanador italiano e seus aliados embarcam numa aventura galáctica repleta de ação e momentos emocionantes depois de salvar o Reino dos Cogumelos.',
    'https://br.web.img3.acsta.net/c_310_420/img/5b/ea/5bea1aeac3323aeaaf82449a34fafbbf.jpg',
    '2026-04-02',
    '01:39:00',
    '50.60',
    if("", null, 2)
);


select *from tbl_filme;
select *from tbl_filme order by id desc;
select *from tbl_filme where id = 15;

#Atualizar infromações de algo já cadastrado
update tbl_filme set
	nome = 'Filme 05',
    sinopse = 'Testando atualização de filme',
    capa = 'teste',
    data_lancamento = '2026-04-29',
    duracao = '02:30:00',
    valor = '10',
    avaliacao = '5'
where id = 19;

#delete from tbl_filme where id > 0


#Tabela de gênero
create table tbl_genero (
	id			int not null auto_increment primary key,
    nome		varchar(30) not null,
    descricao	varchar(250) not null
);

insert into tbl_genero (
			nome,
            descricao
) values(
	'Animação',
    'Filmes produzidos por meio de técnicas de desenho, computação gráfica ou stop-motion.'
);

select *from tbl_genero;
select *from tbl_genero order by id desc;
select *from tbl_genero where id = 1;

update tbl_genero set 
where id = 1;

#delete from tbl_genero where id > 0





