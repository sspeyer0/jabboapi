const express = require("express");
const app = express();
const mysql = require('mysql');

var sql = mysql.createConnection({
  host: 'localhost',
  port: 8889,
  user: 'root',
  password: 'root'
});

var port = 3000;

var debug = true;
var secretKey = null;

if(debug == true){
 secretKey = "DEBUGAPIKEY";
}else{
 secretKey = makeSecretKey(12);
}


console.log("::::::::::: :::     :::::::::  :::::::::   ::::::::      :::     ::::::::: ::::::::::: \n"+
           "    :+:   :+: :+:   :+:    :+: :+:    :+: :+:    :+:   :+: :+:   :+:    :+:    :+:     \n"+
           "    +:+  +:+   +:+  +:+    +:+ +:+    +:+ +:+    +:+  +:+   +:+  +:+    +:+    +:+     \n"+
           "    +#+ +#++:++#++: +#++:++#+  +#++:++#+  +#+    +:+ +#++:++#++: +#++:++#+     +#+     \n"+
           "    +#+ +#+     +#+ +#+    +#+ +#+    +#+ +#+    +#+ +#+     +#+ +#+           +#+     \n"+
           "#+# #+# #+#     #+# #+#    #+# #+#    #+# #+#    #+# #+#     #+# #+#           #+#     \n"+
           " #####  ###     ### #########  #########   ########  ###     ### ###       ########### \n"+
           "       Jabbo API Server - version 1.0.0 - par Sple pour http://jabbo.eu/ \n");

console.log("Clé secrète d'API actuel: "+secretKey+" \n");

if(debug == true){
 console.log("ATTENTION: MODE DEBUGGAGE ACTIVEE, VEUILLEZ LE DESACTIVER AVANT TOUTE UTILISATION PUBLIQUE ");
}

sql.connect(function(err) {
  if (err) {
    console.error('Erreur lors de la connexion au serveur MySQL: ' + err.stack);
    return;
  }
 
  console.log("Connecté au serveur MySQL avec l'ID #" + sql.threadId);

  sql.query('SELECT 1', function (error, results, fields) {
    if (error) throw error;
    
    console.log(results);
  });
});

app.use(express.static('public'));

app.get("/", (req, res) => res.sendFile('public/index.html'));
app.get("/getAvatarByUsername", (req,res) => {
   var data = {
     "Sple": {
       "avatar": "fa-1212-62.hr-3163-37.ca-1813-62.hd-190-1.wa-2001-62.ch-255-br100.lg-3057-81.he-1607-62.ha-3488-62.ea-6136543-62",
     },
     "Thomas":{
       "avatar": "ha-1009-1410.sh-290-1408.lg-5223-110.hr-5204-31.hd-600-3.ch-7854-1334",
     }
   };

   var result = data.Sple;

  res.json(result);
})
app.listen(port, () => console.log(`Le serveur de l'API de http://jabbo.eu/ écoute sur le port ${port}!`));

function makeSecretKey(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}