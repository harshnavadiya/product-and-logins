var helper = require("./helpers");
const MongoClient = require("mongodb").MongoClient;

// const pass = encodeURIComponent("admin");
const uri =
  "mongodb+srv://harsh_admin:admin@appmagicassignment1-kf4ex.gcp.mongodb.net/product?retryWrites=true&w=majority";
// console.log("Hello");


const client = new MongoClient(uri, { useNewUrlParser: true });

// if (config.has('optionalFeature.detail')) {
//     var detail = config.get('optionalFeature.detail');
//     Dlog("config : " + detail);
// }

// db.connect(function(err) {
//     if (err) {
//         throw err;
//     } else {
//         helper.Dlog(' Connect DB' + helper.server_YYYYMMDD_HHmmss());
//         console.log("\n\t *** New connection established with the database. ***")
//     }
// })

client.connect(err => {
  if (err) {
    const collection = client.db("product").collection("devices");
    // perform actions on the collection object
    client.close();
  } else {
    
    helper.Dlog(" Connect DB" + helper.server_YYYYMMDD_HHmmss());
    console.log(
      "\n\t *** New connection established with the MongoDB database. ***"
    );
  }
});

function reconnect(connection) {
    helper.Dlog("\n New connection tentative... (" + helper.server_YYYYMMDD_HHmmss() + ")");

    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
  if (err) {
    const collection = client.db("product").collection("devices");
    // perform actions on the collection object
    client.close();
  } else {
    
    helper.Dlog(" Connect DB" + helper.server_YYYYMMDD_HHmmss());
    console.log(
      "\n\t *** New connection established with the MongoDB database. ***"
    );
  }
});
}

module.exports = {
  collection_insert: (col_name, args, callback) => {
    const dbo = client.db("product");
    dbo.collection(col_name).insertOne(
      args,
      function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        client.close();
      },
      (error, result) => {
        return callback(error, result);
      }
    );
  },
  collection_find: (col_name,callback) => {
    const dbo = client.db("product");
    dbo.collection(col_name).find(
      {}).limit(100).toArray(
      function(err, result) {
        //  if (err) throw err;
        // resdata = CircularJSON.stringify(result);
        // console.log(result);
        return callback(err, result);
        client.close();
      }
    );
  },
  collection_find_query: (col_name,args,callback) => {
    const dbo = client.db("product");
    dbo.collection(col_name).find(
      arg).toArray(
      function(err, result) {
        if (err) throw err;
        console.log(result.name);
        client.close();
      },
      (error, result) => {
        return callback(error, result);
      }
    );
  },
  query: (sql_query, args, callback) => {
    db.query(sql_query, args, (error, result) => {
      return callback(error, result);
    });
  },

  insert: (table, columm_sql, args, callback) => {
    // db.query('INSERT INTO `' + table +'` ('+  +') VALUES ('+ +');', args, (error, result) => {
    //     return callback(error, result)
    // })
  }
};

process.on("uncaughtException", err => {
  // handle the error safely
  helper.Dlog(
    "------------------------------ App is Crash DB helper (" +
      helper.server_YYYYMMDD_HHmmss() +
      ") ------------------------"
  );
  helper.ThrowHtmlError(err);
  if (err.code === "PROTOCOL_CONNECTION_LOST") {
    helper.Dlog(
      "/!\\ PROTOCOL_CONNECTION_LOST Cannot establish a connection with the database. /!\\ (" +
        err.code +
        ")"
    );
    reconnect(db);
  } else if (err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT") {
    helper.Dlog(
      "/!\\ PROTOCOL_ENQUEUE_AFTER_QUIT Cannot establish a connection with the database. /!\\ (" +
        err.code +
        ")"
    );
    reconnect(db);
  } else if (err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
    helper.Dlog(
      "/!\\ PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR Cannot establish a connection with the database. /!\\ (" +
        err.code +
        ")"
    );
    reconnect(db);
  } else if (err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE") {
    helper.Dlog(
      "/!\\PROTOCOL_ENQUEUE_HANDSHAKE_TWICE  Cannot establish a connection with the database. /!\\ (" +
        err.code +
        ")"
    );
    reconnect(db);
  } else if (err.code === "ECONNREFUSED") {
    helper.Dlog(
      "/!\\ECONNREFUSED  Cannot establish a connection with the database. /!\\ (" +
        err.code +
        ")"
    );
    reconnect(db);
  }
});
