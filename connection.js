if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


















// Mongodb Connection Example //
/* MongoDB */
const { MongoClient } = require('mongodb');
const DBpass = 'ZK5C%24hi6wZA2KkZ' /* 'ZK5C$hi6wZA2KkZ' >> non URL encoded */ /* ::TO-DO:: DB access on clear >> to hide in .env config */

/* connect to MongoDB cluster, 
call functions that query database, 
and disconnect from cluster.*/

async function main() {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = `mongodb+srv://Gabryx:${DBpass}@datacluster-t5wqs.mongodb.net/test?retryWrites=true&w=majority`

    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await listDatabases(client);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

/* main().catch(console.error); >> execute async main function (DB try connection)*/

/* Lists Databases on mongoDB cluster */
async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};