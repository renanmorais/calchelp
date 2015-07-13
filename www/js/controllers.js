angular.module('starter.controllers', [])
    .controller('CadastroProdutoController', function ($scope, $cordovaSQLite, $location, $stateParams) {
        $scope.produto = [];

        //função para salvar o produto no banco de dados.
        $scope.salvarProduto = function (produto) {
            if (produto.valor > 0 && produto.valor != undefined) {
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

    .controller('PesquisaProdutoController', function ($scope, $cordovaSQLite, $location, $rootScope) {

        $scope.produtos = [];
        //$scope.atualizarLista();

        $scope.getListaProdutos = function () {
            sql = 'SELECT * FROM produtos ORDER BY id DESC';
            $cordovaSQLite.execute(db, sql, []).then(function (res) {
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

        $scope.editarProduto = function(produto){
            $rootScope.produto = produto;
            $location.path('/tab/cadastro-produto');
        }
    })

    .controller('CalculadoraController', function ($scope, $cordovaSQLite, $location) {
        $scope.produtos = [];
        $scope.resultado = 0;


        $scope.getListaProdutos = function () {
            sql = 'SELECT * FROM produtos ORDER BY id DESC';
            $cordovaSQLite.execute(db, sql, []).then(function (res) {
                    $scope.produtos = [];
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            $scope.produtos.push({
                                id: res.rows.item(i).id,
                                descricao: res.rows.item(i).descricao,
                                valor: res.rows.item(i).valor,
                                icon: res.rows.item(i).icon,
                                qtd: res.rows.item(i).qtd
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

        $scope.somaProduto = function (produto) {
            quantidade = produto.qtd + 1;
            sql = 'UPDATE produtos set qtd = ? where id = ?'
            $cordovaSQLite.execute(db, sql, [quantidade, produto.id])
                .then(function (result) {
                    $scope.atualizarLista();
                }, function (error) {
                    console.log("Error: " + error.message);
                });
            $scope.resultado = $scope.resultado + produto.valor;
        }

        $scope.subtraiProduto = function (produto) {
            if ($scope.resultado - produto.valor >= 0 && produto.qtd > 0) {
                quantidade = produto.qtd - 1;
                sql = 'UPDATE produtos set qtd = ? where id = ?'
                $cordovaSQLite.execute(db, sql, [quantidade, produto.id])
                    .then(function (result) {
                        $scope.atualizarLista();
                    }, function (error) {
                        console.log("Error: " + error.message);
                    });
                $scope.resultado = $scope.resultado - produto.valor;
            }
        }

        $scope.zeraResultado = function () {
            $scope.resultado = 0;
            sql = 'UPDATE produtos set qtd = 0'
            $cordovaSQLite.execute(db, sql)
                .then(function (result) {
                    $scope.atualizarLista();
                }, function (error) {
                    console.log("Error: " + error.message);
                });
        }

    })

    .controller('InfoController', function ($scope) {

    });
