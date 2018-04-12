var config = {

    development: {
        //url to be used in link generation
        url: 'postgres://',
        //db connection settings
        database: {

            dbName: 'Fassos',
            user: 'postgres',
            password: 'postgres'
        },
       
        //server details
        server: {
            host: 'localhost', // server name or IP address;
            port: 5432,
        }
        
       
    },
    production: {

          url: 'postgres://',
        //db connection settings
        database: {
            dbName: 'dbu7aacvtihc4a',
            user: 'zmwguchmdrctfi',
            password: 'ee76b6631f7c3f25005f0c7becba64f3f817bec6f7da4d751bf3636edef669bb'
        },
        //server details
        server: {
            host: 'ec2-107-21-126-193.compute-1.amazonaws.com', // server name or IP address;
            port: 5432,
        }
    },



}


   

    module.exports =config;