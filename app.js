const { response } = require("express"); //On extrait la propriété response du package "express", qui est un framerwork pour développer des applis sur nodejs on pourra la rappeler ulterieurement
const express = require("express"); //  On importe tout le module express qu'on va stocker dans la variable express -idem, on la rappelera quand on voudra. Express embarque une structure de configuration de mise en place de routes, de responses HTTP, de requests HTTP...
const fs = require("fs"); // on importe le module fs qui sert à gérer les fichiers sur nodejs et on le stocke dans la variable du même nom, c'est un module présent directement avec nodejs, pour pouvoir la réutiliser plus tard
const { request } = require("http"); // on extrait la propriété request du module http qqui lui aussi est présent avec nodejs pour la stocker dans la variable request
const app = express(); // création de la constante App qui va servir à stocker à la valeur retournée par la fonction express. Cette constante va créer une instance d'express mais avec ses configurations (routes, réponses, requêtes...)

app.get('/data', (request, response) => { //On va se servir de la constante app pour appliquer la methode get lorsqu'elle sera appelée, la route est définie par /data, response et request sont les objets de la methode, on les a définit plus haut
    fs.readFile('data_resto.json', (err, data) => { // la fonction va se servir du module fs stocké dans la constant fs pour lire le fichier dat_resto.json (qui est le preemier argument de la fonction), le deuxième argument est une fonction de rappel avec deux arguments: err, et data
        if(err) { // premier argument de la fonction callback,
            response.status(500).json({ // c'est la réponse en cas d'erreur de lecture, il renvoit un statut http 500 
                message: "une erreur lors de la lecture des datas"// message affiché en cas d'erreur
            });
        } else {// si il ny'a pas d'erreur cela signifie que la lecture a réussi
            response.status(200).json(JSON.parse(data));// l'argument de statut http200 qui signifie que tout est ok envoie en réponse la methode json avec comme contenu, celui du fichier data qui sera au préalable converti via JSON.parse au format Javascript
        }
    })
})
app.listen(3000 , () => { // application de la methode listen à l'objet app avec pour argument le numéro de port(3000) sur lequel le serveur doit écouter les requêtes, le deuxième argument sert à vérifier via la console que l'appli tourne bien sur le port 3000
    console.log("l'app tourne sur le port 3000");
});