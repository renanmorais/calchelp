angular.module('starter.services', [])
    .factory('Produtos', function(){
        var produtos = [
            {"id": "1", "descricao": "Rapadura", "valor": "3,50"},
            {"id": "2", "descricao": "Cocada", "valor": "2,50"},
            {"id": "3", "descricao": "Paçoca", "valor": "1,50"},
            {"id": "4", "descricao": "Quentão", "valor": "4,50"},
            {"id": "5", "descricao": "Coca-Cola", "valor": "2,50"},
            {"id": "6", "descricao": "Caldo", "valor": "4,50"},
            {"id": "7", "descricao": "Algodão-Doce", "valor": "6,50"},
            {"id": "8", "descricao": "Pipoca", "valor": "7,50"},
            {"id": "9", "descricao": "Doce-Leite", "valor": "8,50"},
            {"id": "10", "descricao": "Chocolate", "valor": "2,50"},
            {"id": "11", "descricao": "Cachorro-Quente", "valor": "2,50"}];

        return {
            save: function(objeto){
                produtos.push(objeto);
            },
            all: function () {
                return produtos;
            },
            remove: function (produto) {
                produtos.splice(produtos.indexOf(produto), 1);
            },
            get: function (produtoId) {
                for (var i = 0; i < produtos.length; i++) {
                    if (produtos[i].id === parseInt(produtoId)) {
                        return produtos[i];
                    }
                }
                return null;
            }
        };
    })
    .factory('Chats', function () {
        // Might use a resource here that returns a JSON array
        // Some fake testing data
        var chats = [{
            id: 0,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
        }, {
            id: 1,
            name: 'Max Lynx',
            lastText: 'Hey, it\'s me',
            face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
        }, {
            id: 2,
            name: 'Adam Bradleyson',
            lastText: 'I should buy a boat',
            face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
        }, {
            id: 3,
            name: 'Perry Governor',
            lastText: 'Look at my mukluks!',
            face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
        }, {
            id: 4,
            name: 'Mike Harrington',
            lastText: 'This is wicked good ice cream.',
            face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
        }];

        return {
            all: function () {
                return chats;
            },
            remove: function (chat) {
                chats.splice(chats.indexOf(chat), 1);
            },
            get: function (chatId) {
                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].id === parseInt(chatId)) {
                        return chats[i];
                    }
                }
                return null;
            }
        };
    });

