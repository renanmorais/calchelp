angular.module('starter.controllers', [])
    .controller('CadastroProdutoController', function ($scope, $cordovaSQLite, $location, $stateParams) {
        $scope.produto = [];

        //função para salvar o produto no banco de dados.
        $scope.salvarProduto = function (produto) {
            produto.icon = null;
            sql = 'INSERT INTO produtos (descricao, valor, icon) VALUES (?,?,?)';
            $cordovaSQLite.execute(db, sql, [produto.descricao, produto.valor, produto.icon])
                .then(function (result) {
                    $scope.produto = [];
                    console.log("Registro salvo com sucesso")
                }, function (error) {
                    console.log("Error ao salvar: " + error.message);
                })
        }

        $scope.novoProduto = function () {
            $scope.produto = [];

        }

        $scope.voltarPesquisa = function () {
            $location.path('/tab/pesquisa-produto');
        }

        $scope.getProduto = function (produtoId) {
            sql = 'SELECT * FROM produtos where id = ? ORDER BY id DESC';
            $cordovaSQLite.execute(db, sql, [produtoId]).then(function (res) {
                $scope.produto.id = res.rows.item(0).id;
                $scope.produto.descricao = res.rows.item(0).descricao;
                $scope.produto.valor = res.rows.item(0).valor;
                $scope.produto.icon = res.rows.item(0).icon;
            })
        }
    })

    .controller('PesquisaProdutoController', function ($scope, $cordovaSQLite, $location) {

        $scope.produtos = [];
        $scope.teste = {};
        //$scope.atualizarLista();

        $scope.getListaProdutos = function () {
            sql = 'SELECT * FROM produtos ORDER BY id DESC';
            $cordovaSQLite.execute(db, sql, []).then(function (res) {
                    $scope.teste = res.rows.length;
                    $scope.produtos = [];
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            $scope.produtos.push({
                                id: res.rows.item(i).id,
                                descricao: res.rows.item(i).descricao,
                                valor: res.rows.item(i).valor,
                                icon: res.rows.item(i).icon
                            });
                        }
                    } else {
                        $scope.produtos.push({
                            id: '0',
                            descricao: 'Cadastre um produto',
                            valor: '0.00',
                            icon: ''
                        });
                    }
                },
                function (error) {
                    console.log("Error on loading: " + error.message);
                }
            );
        }

        $scope.cadastrarNovo = function () {
            $location.path('/tab/cadastro-produto');
        }

        $scope.atualizarLista = function () {
            $scope.getListaProdutos();
        }


        $scope.remove = function (produto) {
            sql = 'DELETE FROM produtos WHERE id = ?';
            $cordovaSQLite.execute(db, sql, [produto.id])
                .then(function (result) {
                    $scope.atualizarLista();
                    console.log("Registro excluido com sucesso")
                }, function (error) {
                    console.log("Error ao excluir: " + error.message);
                });
        }
    })

    .controller('CalculadoraController', function ($scope, $cordovaSQLite, $location) {
        $scope.produtos = [];
        $scope.resultado = 200;

        $scope.getListaProdutos = function () {
            sql = 'SELECT * FROM produtos ORDER BY id DESC';
            $cordovaSQLite.execute(db, sql, []).then(function (res) {
                    $scope.teste = res.rows.length;
                    $scope.produtos = [];
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            $scope.produtos.push({
                                id: res.rows.item(i).id,
                                descricao: res.rows.item(i).descricao,
                                valor: res.rows.item(i).valor,
                                icon: res.rows.item(i).icon
                            });
                        }
                    }
                },
                function (error) {
                    console.log("Error on loading: " + error.message);
                }
            );
        }

        $scope.atualizarLista = function () {
            $scope.getListaProdutos();
        }

        $scope.cadastrarNovo = function () {
            $location.path('/tab/cadastro-produto');
        }

        $scope.somaProduto = function(produto){
            $scope.resultado.valor = $scope.resultado.valor + produto.valor;
        }

        $scope.subtraiProduto = function(produto){
            $scope.resultado.valor = $scope.resultado.valor - produto.valor;
        }

        $scope.zeraResultado = function(){
            $scope.resultado = {};
        }

    })

    .controller('InfoController', function ($scope) {

    });
