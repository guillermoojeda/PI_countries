//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.

conn.sync({ force: true }).then(() => {
    server.listen(3001, () => {
        console.log('%s listening at 3001'); // eslint-disable-line no-console
    });
})
    .catch(e => console.log(e))
    ;


// Necesario para hacer conexión al servidor. Intentar usar el código de arriba
// mas adelante...
// force:true lo que hace es borrar la tabla pre-existente.

/*
server.listen(3001, () => {
    console.log('Server running on port 3001');
    conn.sync();
});
*/